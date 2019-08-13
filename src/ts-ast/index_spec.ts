import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('ts-ast', () => {
  it('Should throw if path argument is missing', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    let errorMessage;
    try {
      runner.runSchematic('ts-ast', {}, Tree.empty());
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toMatch(/required property 'path'/);
  });

  it("Should throw if file in the given path does not exist", () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    let errorMessage;
    try {
      runner.runSchematic("ts-ast", { path: "my-file.ts" }, Tree.empty());
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toMatch(/File my-file.ts not found/);
  });

  it("Should throw if no interface is present", () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    const sourceTree = Tree.empty();
    sourceTree.create('test.ts', 
      `export class MyClass { }`
    );
    let errorMessage;
    try {
      runner.runSchematic('ts-ast', { path: 'test.ts' }, sourceTree);
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toMatch(/No Interface found/);
  });

  it('Should update a file in the given path', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const sourceTree = Tree.empty();
    sourceTree.create('test.ts', 
      `export interface MyInterface {
        name: string;
      }`
    );
    const tree = runner.runSchematic('ts-ast', { path: 'test.ts' }, sourceTree);
    expect(tree.files).toEqual(['/test.ts']);
    expect(tree.readContent('/test.ts')).toEqual(
      `export interface MyInterface {
        first: string;
        name: string;
        last: string;
      }`
     );
  });
});

