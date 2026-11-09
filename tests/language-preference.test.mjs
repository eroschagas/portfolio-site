import assert from "node:assert/strict";
import test from "node:test";
import { LanguagePreference } from "../app/models/LanguagePreference.ts";

test("a supported query language overrides the cookie", () => {
  const preference = new LanguagePreference();
  assert.equal(preference.resolve("pt", "en"), "pt");
  assert.equal(preference.resolve("en", "pt"), "en");
});

test("missing or unsupported query values preserve a valid cookie", () => {
  const preference = new LanguagePreference();
  [undefined, null, "", "fr", ["pt", "en"]].forEach((value) => {
    assert.equal(preference.resolve(value, "pt"), "pt");
    assert.equal(preference.resolve(value, "en"), "en");
  });
});

test("a missing or invalid cookie defaults to English", () => {
  const preference = new LanguagePreference();
  [undefined, null, "", "fr", {}, ["pt"]].forEach((value) => {
    assert.equal(preference.resolve(undefined, value), "en");
    assert.equal(preference.resolve("pt", value), "pt");
  });
});
