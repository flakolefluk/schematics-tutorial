import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { RemoveFileOptions } from './schema';

export function removeFile(options: RemoveFileOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    tree.delete(options.path);
    return tree;
  };
}
