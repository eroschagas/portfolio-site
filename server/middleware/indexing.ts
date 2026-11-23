export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);
  if (
    !(
      config.public.indexable === true ||
      String(config.public.indexable) === "true"
    )
  ) {
    setHeader(event, "X-Robots-Tag", "noindex, nofollow");
  }
  setHeader(event, "Vary", "Cookie");
});
