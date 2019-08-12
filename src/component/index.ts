import { Rule, SchematicContext, Tree, chain } from '@angular-devkit/schematics';

export function component(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return chain([
      createFiles(options),
      updateModule(options)
    ])(tree, context);
  };
}

export function createFiles(_options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Will create files from templates');
    // create files implementation
    return tree;
}
}

export function updateModule(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    _context.logger.info('Will update module');
    // update module implementation
    return tree;
  };
}