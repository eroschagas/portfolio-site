import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { stripTypeScriptTypes } from "node:module";

const contentSource = stripTypeScriptTypes(
  readFileSync("app/models/WorkContent.ts", "utf8"),
  { mode: "transform" }
);
const contentUrl = `data:text/javascript;base64,${Buffer.from(
  contentSource
).toString("base64")}`;
const projectSource = stripTypeScriptTypes(
  readFileSync("app/models/WorkProject.ts", "utf8"),
  { mode: "transform" }
).replace('"./WorkContent"', JSON.stringify(contentUrl));
const { WorkProject } = await import(
  `data:text/javascript;base64,${Buffer.from(projectSource).toString("base64")}`
);
const data = (id) => ({
  id,
  name: { en: "Project", pt: "Projeto" },
  description: { en: "Description", pt: "Descrição" },
});

test("existing projects and explicit empty subprojects remain compatible", () => {
  assert.deepEqual(new WorkProject(data("parent")).subprojects, []);
  assert.deepEqual(
    new WorkProject({ ...data("parent"), subprojects: [] }).subprojects,
    []
  );
});

test("subprojects use the same model, localized content and image lookup IDs", () => {
  const project = new WorkProject({
    ...data("parent"),
    subprojects: [{ ...data("child"), subprojects: [data("nested-child")] }],
  });
  const child = project.subprojects[0];
  assert.ok(child instanceof WorkProject);
  assert.equal(child.getId(), "child");
  assert.equal(child.getName("pt"), "Projeto");
  assert.equal(child.getDescription("en"), "Description");
  assert.equal(child.subprojects[0].getId(), "nested-child");
  assert.throws(
    () =>
      new WorkProject({ ...data("parent"), subprojects: [data("Invalid ID")] })
  );
});
