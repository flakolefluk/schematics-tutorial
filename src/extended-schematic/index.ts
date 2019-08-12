import { Rule, SchematicContext, Tree, chain, schematic } from '@angular-devkit/schematics';

export function extendedSchematic(options: any): Rule {

  return (tree: Tree, context: SchematicContext) => {
    return chain([
      schematic('create-from-template', {
      ...options
    }),
    extend()
  ])(tree, context)
  };
}

export function extend(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Extending schematic');
    return tree;
  };
}

