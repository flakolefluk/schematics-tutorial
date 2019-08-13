import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('overwrite-file', () => {
  it('Should throw if path argument is missing', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    let errorMessage;
    try {
      runner.runSchematic('overwrite-file', {}, Tree.empty());
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toMatch(/required property 'path'/);
  });

  it("Should throw if file in the given path does not exist", () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    let errorMessage;
    try {
      runner.runSchematic("overwrite-file", { path: "my-file.ts" }, Tree.empty());
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toMatch(/Path "\/my-file.ts" does not exist/);
  });

  it('Should update a file in the given path', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const sourceTree =  Tree.empty();
    sourceTree.create("my-file.txt", "This is the file content");
    const tree = runner.runSchematic('overwrite-file', { path: 'my-file.txt' }, sourceTree);
    expect(tree.files).toEqual(['/my-file.txt']);
    expect(tree.readContent('/my-file.txt')).toEqual(`// ¯\_(ツ)_/¯\nThis is the file content`);
  });
});

