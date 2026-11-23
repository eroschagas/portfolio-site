export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  const normalized = url.pathname.replace(/\/+$/, "") || "/";
  if (
    url.pathname !== normalized &&
    useRuntimeConfig(event).discoveryPaths.includes(normalized)
  ) {
    return sendRedirect(event, normalized + url.search, 308);
  }
});
