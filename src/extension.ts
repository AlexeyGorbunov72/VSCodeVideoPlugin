import * as vscode from 'vscode';
import { readFileSync } from 'fs';
export function activate(context: vscode.ExtensionContext) {
	
	let disposable = vscode.commands.registerCommand('playvideovscode.helloWorld',   () => {});
	let playVideo = vscode.commands.registerCommand('playvideovscode.playVideo', () => {
		vscode.window.showInformationMessage("Start video!");
		const file = readFileSync('/Users/Retard/video/config', 'utf-8');
		var frameCount: number = +file;
		const { activeTextEditor  } = vscode.window;
		if(activeTextEditor){
			const { document } = activeTextEditor;
			changeFrame(0, frameCount, document);
		}
	});

	context.subscriptions.push(playVideo);
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
