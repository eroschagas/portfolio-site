import { ImageCarouselState } from "~/models/ImageCarouselState";
import { GalleryImageLoader } from "~/services/GalleryImageLoader";

export const useGalleryDialog = (getImages: () => string[]) => {
  const carousel = reactive(new ImageCarouselState(getImages().length));
  const dialog = ref<HTMLDialogElement | null>(null);
  const isOpen = ref(false);
  const imageLoader = new GalleryImageLoader();
  let previousOverflow: string | null = null;

  const open = (index: number) => {
    if (!dialog.value || dialog.value.open) return;
    carousel.select(index);
    isOpen.value = true;
    imageLoader.preload(getImages(), carousel.index);
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.value.showModal();
  };

  const close = () => dialog.value?.close();

  const onClose = () => {
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
    close();
    onClose();
    imageLoader.clear();
  });

  return { carousel, dialog, isOpen, open, close, onClose, onBackdropClick };
};
