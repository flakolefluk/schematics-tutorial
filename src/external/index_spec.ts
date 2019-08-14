import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import * as path from "path";

const collectionPath = path.join(__dirname, "../collection.json");

describe("external-schematic", () => {
  it("should throw if no workspace", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    let errorMessage;
    try {
      await runner.runSchematicAsync("external", { name: 'hello', projectName: 'a project'}, Tree.empty()).toPromise();
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toMatch(/Unable to determine format for workspace path./);
  });
});
