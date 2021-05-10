// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { readFileSync } from 'fs';
function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	
	let disposable = vscode.commands.registerCommand('playvideovscode.helloWorld',   () => {
		vscode.window.showInformationMessage("Start video!");
		const file = readFileSync('/Users/Retard/video/config', 'utf-8');
		var frameCount: number = +file;
		const { activeTextEditor  } = vscode.window;
		if(activeTextEditor){
			const { document } = activeTextEditor;
			changeFrame(0, frameCount, document);
		}
	});
	context.subscriptions.push(disposable);
}
async function changeFrame(i: number, framesAmount: number, document: vscode.TextDocument){
		if(i >= framesAmount){
			return;
		}
		let text = readFileSync('/Users/Retard/video/' + i + '.txt', 'utf-8') + i;
		const edit = new vscode.WorkspaceEdit();
		edit.replace(document.uri, new vscode.Range(document.lineAt(0).range.start, document.lineAt(document.lineCount - 1).range.end), text);
		await vscode.workspace.applyEdit(edit);
		changeFrame(i + 1, framesAmount, document);

}
// this method is called when your extension is deactivated
export function deactivate() {}
