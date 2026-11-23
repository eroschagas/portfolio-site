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
  assert.deepEqual(project.getImages(), []);
  assert.deepEqual(project.getImageMetadata("pt"), []);
});

test("project images preserve order and localize accessible metadata", () => {
  const images = [
    {
      src: "/ai-assisted/lunera/01-home.png",
      alt: { en: "Home screen", pt: "Tela inicial" },
      description: { en: "Local files", pt: "Arquivos locais" },
    },
    {
      src: "https://example.com/screenshot.webp",
      alt: { en: "Results", pt: "Resultados" },
    },
  ];
  const project = new Project({
    name: "Lunera",
    description: "Desktop app",
    link: "https://example.com",
    images,
  });
  images[0].alt.pt = "Changed";
  assert.deepEqual(project.getImages(), [
    "/ai-assisted/lunera/01-home.png",
    "https://example.com/screenshot.webp",
  ]);
  assert.deepEqual(project.getImageMetadata("pt"), [
    { alt: "Tela inicial", description: "Arquivos locais" },
    { alt: "Resultados", description: "" },
  ]);
  assert.equal(project.getImageMetadata("en")[0].alt, "Home screen");
});

test("image sources require local public paths or absolute HTTP URLs", () => {
  [
    "javascript:alert(1)",
    "//example.com/image.png",
    "/\\example.com/image.png",
    "relative.png",
  ].forEach((src) => {
    assert.throws(
      () =>
        new Project({
          name: "Project",
          description: "Description",
          link: "https://example.com",
          images: [{ src, alt: { en: "Screenshot", pt: "Captura de tela" } }],
        }),
    );
  });
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
