import { Rule, SchematicContext, Tree, SchematicsException } from '@angular-devkit/schematics';
import * as ts from 'typescript';
import { TsAstOptions } from './schema';

export function tsAst(options: TsAstOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const buffer = tree.read(options.path);
    if(!buffer){
      throw new SchematicsException(`File ${options.path} not found.`);
    } 

    const source = ts.createSourceFile(options.path, buffer.toString(), ts.ScriptTarget.Latest, true);
    const nodes = getSourceNodes(source);

    const interfaceDeclaration = nodes.find(n=>n.kind === ts.SyntaxKind.InterfaceDeclaration);
    if(!interfaceDeclaration){
      throw new SchematicsException(`No Interface found`);
    }

    const [openBrace, closeBrace] = [
      interfaceDeclaration!.getChildren().find(n=>n.kind===ts.SyntaxKind.OpenBraceToken),
      interfaceDeclaration!.getChildren().slice().reverse().find(n=>n.kind===ts.SyntaxKind.CloseBraceToken),
    ]

    const text = interfaceDeclaration!.getText();
    let indentation;
    const matches = text.match(/\r?\n\s*/);
    if (matches && matches.length > 0) {
      indentation = matches[0]
    } else {
      indentation= ''
    }

    const recorder = tree.beginUpdate(options.path);
    recorder.insertRight(openBrace!.end, `${indentation}first: string;`);
    recorder.insertLeft(closeBrace!.pos, `${indentation}last: string;`);
    tree.commitUpdate(recorder);
    return tree;
  };
}


// taken from angular schematics. returns an array of Nodes
function getSourceNodes(sourceFile: ts.SourceFile): ts.Node[] {
  const nodes: ts.Node[] = [sourceFile];
  const result = [];

  while (nodes.length > 0) {
    const node = nodes.shift();

    if (node) {
      result.push(node);
      if (node.getChildCount(sourceFile) >= 0) {
        nodes.unshift(...node.getChildren());
      }
    }
  }

  return result;
}
