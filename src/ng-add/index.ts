
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

export function ngAdd(_options:any): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    return tree.overwrite('README.md', 'overwritten file');
  };
}
