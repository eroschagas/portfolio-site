import { GalleryImageLoader } from "~/services/GalleryImageLoader";

export const useGalleryImage = (
  getSelection: () => {
    source: string;
    index: number;
    direction: "previous" | "next";
  }
) => {
  const displayedSource = ref("");
  const displayedIndex = ref(getSelection().index);
  const displayedDirection = ref<"previous" | "next">("next");
  const loader = new GalleryImageLoader();
  let stopWatching: (() => void) | undefined;

  onMounted(() => {
    stopWatching = watch(
      getSelection,
      async (selection, _previous, onCleanup) => {
        let cancelled = false;
        onCleanup(() => {
          cancelled = true;
        });
        if (!selection.source) return;
        try {
          await loader.prepare(selection.source);
          if (cancelled) return;
          displayedSource.value = selection.source;
          displayedIndex.value = selection.index;
          displayedDirection.value = selection.direction;
        } catch {
          // Keep the current image visible if the requested image cannot be decoded.
        }
      },
      { immediate: true }
    );
  });

  onBeforeUnmount(() => {
    stopWatching?.();
    loader.clear();
  });

  return { displayedSource, displayedIndex, displayedDirection };
};
