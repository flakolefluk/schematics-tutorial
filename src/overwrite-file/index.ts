import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { OverwriteFileOptions } from './schema';

export function overwriteFile(options: OverwriteFileOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const buffer = tree.read(options.path);
    const content = buffer ? buffer.toString() : '';
    const comment = `// ¯\_(ツ)_/¯\n`;
    if(!content.includes(comment)){
      tree.overwrite(options.path, comment + content)
    }
    return tree;
  };
}
