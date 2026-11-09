import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { ImageCarouselState } from "../app/models/ImageCarouselState.ts";
import { WorkImageCatalog } from "../app/services/WorkImageCatalog.ts";
import { WorkImageManifest } from "../build/WorkImageManifest.ts";
import { WorkPeriod } from "../app/models/WorkPeriod.ts";

test("work periods preserve month/year text and expose semantic dates", () => {
  const period = new WorkPeriod("01/2024", "12/2025");
  assert.equal(period.start, "01/2024");
  assert.equal(period.end, "12/2025");
  assert.equal(period.getStartDateTime(), "2024-01");
  assert.equal(period.getEndDateTime(), "2025-12");
  assert.doesNotThrow(() => new WorkPeriod("01/2026", "01/2026"));
});

test("work periods reject malformed dates, invalid months and reversed ranges", () => {
  ["1/2026", "00/2026", "13/2026", "01/0000", "2026-01", ""].forEach(
    (value) => {
      assert.throws(() => new WorkPeriod(value, "12/2026"));
      if (value) assert.throws(() => new WorkPeriod("01/2026", value));
    },
  );
  assert.throws(() => new WorkPeriod("02/2026", "01/2026"));
});

test("ongoing periods accept omitted or empty end dates", () => {
  [undefined, "", " "].forEach((end) => {
    const period = new WorkPeriod("01/2026", end);
    assert.equal(period.isCurrent, true);
    assert.equal(period.end, undefined);
    assert.equal(period.getEndDateTime(), undefined);
  });
  assert.equal(new WorkPeriod("01/2024", "12/2025").isCurrent, false);
});

test("periods sort current work first by start, then completed work by end and start", () => {
  const periods = [
    new WorkPeriod("01/2024", "01/2026"),
    new WorkPeriod("01/2020"),
    new WorkPeriod("01/2023", "12/2025"),
    new WorkPeriod("02/2025"),
    new WorkPeriod("02/2024", "01/2026"),
  ];
  const sorted = [...periods].sort((left, right) => left.compareRecent(right));
  assert.deepEqual(sorted, [
    periods[3],
    periods[1],
    periods[4],
    periods[0],
    periods[2],
  ]);
  assert.equal(
    new WorkPeriod("01/2026").compareRecent(new WorkPeriod("01/2026")),
    0,
  );
});

test("carousel wraps in both directions and resets for a different image set", () => {
  const carousel = new ImageCarouselState(3);
  carousel.previous();
  assert.equal(carousel.index, 2);
  carousel.next();
  assert.equal(carousel.index, 0);
  carousel.select(4);
  assert.equal(carousel.index, 1);
  carousel.reset(1);
  carousel.next();
  assert.equal(carousel.index, 0);
  carousel.reset(0);
  carousel.previous();
  assert.equal(carousel.index, 0);
});

test("missing and empty project image collections are empty", () => {
  const catalog = new WorkImageCatalog({
    empty: [],
    project: ["/work/project/01.png"],
  });
  assert.deepEqual(catalog.getImages("missing"), []);
  assert.deepEqual(catalog.getImages("empty"), []);
  assert.deepEqual(catalog.getImages("project"), ["/work/project/01.png"]);
});

test("manifest discovers images, ignores non-images and directories, and sorts naturally", () => {
  const prefix = join(tmpdir(), "portfolio-work-");
  const root = mkdtempSync(prefix);
  try {
    assert.deepEqual(
      new WorkImageManifest(join(root, "absent")).generate(),
      {},
    );
    mkdirSync(join(root, "project"));
    mkdirSync(join(root, "empty"));
    mkdirSync(join(root, "project", "nested.png"));
    ["10.png", "02.webp", "01 image.JPG", "notes.txt"].forEach((name) =>
      writeFileSync(join(root, "project", name), "", "utf8"),
    );
    const manifest = new WorkImageManifest(root).generate();
    assert.deepEqual(manifest.empty, []);
    assert.deepEqual(manifest.project, [
      "/work/project/01%20image.JPG",
      "/work/project/02.webp",
      "/work/project/10.png",
    ]);
  } finally {
    assert.ok(root.startsWith(prefix));
    rmSync(root, { recursive: true, force: true });
  }
});
