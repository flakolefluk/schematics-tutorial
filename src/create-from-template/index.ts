import {
  Rule,
  SchematicContext,
  Tree,
  Source,
  url,
  mergeWith,
  move,
  apply
} from "@angular-devkit/schematics";
import { CreateFromTemplateOptions } from "./schema";
import { normalize } from "@angular-devkit/core";

export function createFromTemplate(options: CreateFromTemplateOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const source: Source = url("./files");
    const transformedSource: Source = apply(source, [
      move(normalize(options.folder))
    ]);

    return mergeWith(transformedSource)(tree, context);
  };
}
