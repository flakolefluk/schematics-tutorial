import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { CreateFileOptions } from './schema';

export function createFile(options: CreateFileOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    tree.create(options.path, "File created from schematic!");
    return tree;
  };
}
