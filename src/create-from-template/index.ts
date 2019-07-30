import {
  Rule,
  SchematicContext,
  Tree,
  Source,
  url,
  mergeWith,
  move,
  apply,
  template
} from "@angular-devkit/schematics";
import { CreateFromTemplateOptions } from "./schema";
import { normalize, strings } from "@angular-devkit/core";

export function createFromTemplate(options: CreateFromTemplateOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const folder = strings.dasherize(options.folder);
    const source: Source = url("./files");
    const transformedSource: Source = apply(source, [
      template({
        filename: options.folder,
        ...strings // dasherize, classify, camelize, etc
      }),
      move(normalize(folder))
    ]);

    return mergeWith(transformedSource)(tree, context);
  };
}