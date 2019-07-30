import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

export function myCollection(_options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Info message');
    context.logger.warn('Warn message');
    context.logger.error('Error message');
    return tree;
  };
}
