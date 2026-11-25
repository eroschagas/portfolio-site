import assert from "node:assert/strict";
import test from "node:test";
import { RouteImagePrefetcher } from "../app/services/RouteImagePrefetcher.ts";

test("concurrent prefetches share work and prepare each image at low priority", async () => {
  let resolutions = 0;
  const requests = [];
  const prefetcher = new RouteImagePrefetcher(
    async () => {
      resolutions++;
      return ["/images/one.webp", "/images/one.webp", "/images/two.webp"];
    },
    {
      prepare: async (...args) => {
        requests.push(args);
      },
    },
  );
  await Promise.all([
    prefetcher.prefetch("/ai-assisted"),
    prefetcher.prefetch("/ai-assisted"),
  ]);
  await prefetcher.prefetch("/ai-assisted");
  assert.equal(resolutions, 1);
  assert.deepEqual(requests, [
    ["/images/one.webp", "low"],
    ["/images/two.webp", "low"],
  ]);
});

test("failed speculative requests do not reject navigation and can be retried", async () => {
  let attempts = 0;
  const prefetcher = new RouteImagePrefetcher(
    async () => ["/images/one.webp"],
    {
      prepare: async () => {
        if (++attempts === 1) throw Error("Offline");
      },
    },
  );
  await prefetcher.prefetch("/ai-assisted");
  await prefetcher.prefetch("/ai-assisted");
  assert.equal(attempts, 2);
});
