import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { Tree } from '@angular-devkit/schematics';


const collectionPath = path.join(__dirname, '../collection.json');


describe('ng-add', () => {
  const workspaceOptions = {
    name: 'workspace',
    newProjectRoot: 'projects',
    version: '8.0.0',
  };

  const runner = new SchematicTestRunner('schematics', collectionPath);

  it('should throw if no readme is not found', async () => {
    let errorMessage;
    try{
      runner.runSchematic('ng-add', { }, Tree.empty());
    } catch(e){
      errorMessage = e.message;
    }
    expect(errorMessage).toMatch(/Path "\/README.md" does not exist./);
    
  });

  it('overwrite workspace README file', async () => {
    const sourceTree = await runner.runExternalSchematicAsync('@schematics/angular','workspace', workspaceOptions).toPromise();
    const tree = runner.runSchematic('ng-add', {}, sourceTree);
    expect(tree.files).toContain('/README.md');
    expect(tree.readContent('/README.md')).toMatch(/overwritten file/);
  });
});
