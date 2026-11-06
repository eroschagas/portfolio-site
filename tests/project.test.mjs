import assert from "node:assert/strict";
import test from "node:test";
import { Project } from "../app/models/Project.ts";

test("plain text is available in both languages without a GitHub link", () => {
  const project = new Project({
    name: "Portfolio",
    description: "My project",
    link: "https://example.com",
  });
  assert.equal(project.getName("en"), "Portfolio");
  assert.equal(project.getName("pt"), "Portfolio");
  assert.equal(project.getDescription("en"), "My project");
  assert.equal(project.github, undefined);
});

test("localized fields follow the selected language", () => {
  const project = new Project({
    name: { en: "My project", pt: "Meu projeto" },
    description: { en: "English description", pt: "Descrição em português" },
    link: "https://example.com/project",
    github: "https://github.com/user/project",
  });
  assert.equal(project.getName("pt"), "Meu projeto");
  assert.equal(project.getDescription("en"), "English description");
  assert.equal(project.getDescription("pt"), "Descrição em português");
  assert.equal(project.github, "https://github.com/user/project");
});

test("links must be absolute HTTP or HTTPS URLs", () => {
  const data = {
    name: "Project",
    description: "Description",
    link: "javascript:alert(1)",
  };
  assert.throws(() => new Project(data));
  assert.throws(() => new Project({ ...data, link: "/relative" }));
  assert.throws(
    () =>
      new Project({
        ...data,
        link: "https://example.com",
        github: "javascript:alert(1)",
      }),
  );
});
