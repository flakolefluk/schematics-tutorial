import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';


const collectionPath = path.join(__dirname, '../collection.json');


describe('extended-schematic', () => {
  it('Should throw if path argument is missing', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    let errorMessage;
    try {
      runner.runSchematic('extended-schematic', {}, Tree.empty());
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toMatch(/required property 'folder'/);
  });

  it('Should create a file in the given path', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('extended-schematic', { folder: 'hello/world' }, Tree.empty());
    expect(tree.files).toEqual([
      '/hello/world/another-file.md',
      '/hello/world/template-file.ts',
      '/hello/world/hello/world.html',
      '/hello/world/hello/world.ts'
    ]);
  });
});
