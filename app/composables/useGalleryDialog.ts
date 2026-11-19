import { ImageCarouselState } from "~/models/ImageCarouselState";
import { GalleryImageLoader } from "~/services/GalleryImageLoader";

export const useGalleryDialog = (getImages: () => string[]) => {
  const carousel = reactive(new ImageCarouselState(getImages().length));
  const dialog = ref<HTMLDialogElement | null>(null);
  const isOpen = ref(false);
  const isClosing = ref(false);
  const imageLoader = new GalleryImageLoader();
  let previousOverflow: string | null = null;
  let animation: Animation | null = null;

  const animate = (closing: boolean) => {
    animation?.cancel();
    if (
      !dialog.value ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return null;

    const frames = [
      { opacity: 0, transform: "translateY(12px) scale(0.98)" },
      { opacity: 1, transform: "translateY(0) scale(1)" },
    ];
    animation = dialog.value.animate(closing ? frames.reverse() : frames, {
      duration: closing ? 160 : 220,
      easing: closing ? "ease-in" : "ease-out",
    });
    return animation;
  };

  const open = (index: number) => {
    if (!dialog.value || dialog.value.open) return;
    carousel.select(index);
    isOpen.value = true;
    imageLoader.preload(getImages(), carousel.index);
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.value.showModal();
    animate(false);
  };

  const close = async () => {
    if (!dialog.value?.open || isClosing.value) return;
    isClosing.value = true;
    await nextTick();
    if (!dialog.value?.open) return;
    const closingAnimation = animate(true);
    if (closingAnimation) {
      try {
        await closingAnimation.finished;
      } catch {
        return;
      }
    }
    dialog.value?.close();
  };

  const onClose = () => {
    animation?.cancel();
    animation = null;
    isClosing.value = false;
    isOpen.value = false;
    if (previousOverflow !== null) {
      document.body.style.overflow = previousOverflow;
      previousOverflow = null;
    }
  };

  const onBackdropClick = (event: MouseEvent) => {
    const element = dialog.value;
    if (!element || event.target !== element) return;
    const rect = element.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      close();
  };

  watch(getImages, (images) => {
    close();
    carousel.reset(images.length);
    imageLoader.clear();
  });

  onBeforeUnmount(() => {
    animation?.cancel();
    dialog.value?.close();
    onClose();
    imageLoader.clear();
  });

  return {
    carousel,
    dialog,
    isOpen,
    isClosing,
    open,
    close,
    onClose,
    onBackdropClick,
  };
};
