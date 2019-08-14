import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  externalSchematic
} from "@angular-devkit/schematics";

export function external(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return chain([
      externalSchematic("@schematics/angular", "component", {
        project: options.project,
        name: options.name
      }),
      extend()
    ])(tree, context);
  };
}

export function extend(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info("Extending schematic");
    return tree;
  };
}
