import assert from "node:assert/strict";
import test from "node:test";
import { GalleryImageLoader } from "../app/services/GalleryImageLoader.ts";

const mockImage = (context, implementation) => {
  const original = Object.getOwnPropertyDescriptor(globalThis, "Image");
  Object.defineProperty(globalThis, "Image", {
    configurable: true,
    value: implementation,
  });
  context.after(() => {
    if (original) Object.defineProperty(globalThis, "Image", original);
    else delete globalThis.Image;
  });
};

test("image preparation waits for decoding and reuses preloaded images", async (context) => {
  const images = [];
  let finishDecoding;
  const decoded = new Promise((resolve) => {
    finishDecoding = resolve;
  });
  mockImage(
    context,
    class {
      constructor() {
        images.push(this);
      }
      decode() {
        return decoded;
      }
    }
  );
  const loader = new GalleryImageLoader();
  loader.preload(["/first.png"], 0);
  let ready = false;
  const preparation = loader.prepare("/first.png").then(() => {
    ready = true;
  });
  await Promise.resolve();
  assert.equal(ready, false);
  assert.equal(images.length, 1);
  finishDecoding();
  await preparation;
  assert.equal(ready, true);
});

test("failed decoding rejects preparation and allows a retry", async (context) => {
  let attempts = 0;
  mockImage(
    context,
    class {
      constructor() {
        attempts++;
      }
      decode() {
        return Promise.reject(new Error("Image unavailable"));
      }
    }
  );
  const loader = new GalleryImageLoader();
  await assert.rejects(loader.prepare("/missing.png"), /Image unavailable/);
  await assert.rejects(loader.prepare("/missing.png"), /Image unavailable/);
  assert.equal(attempts, 2);
});
