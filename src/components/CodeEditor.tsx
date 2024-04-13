import { useRef, useState } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

import checkInnerWidth from "../hooks/helpers/checkInnerWidth";

interface CodeEditorProps {
	initialValue: string,
	onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
	const [isThemeLoaded, setIsThemeLoaded] = useState(false);
	const editorRef = useRef<any>();

	const onEditorDidMount: OnMount = (editor, monaco) => {

		editorRef.current = editor

		monaco.editor.defineTheme("mine", {
			base: 'vs-dark',
			inherit: true,
			rules: [
				{ "token": "comment.js", "foreground": "F1A569" },
				{ "token": "keyword", 'foreground': "7FC7D9" },
				{ "token": "string", 'foreground': "DCF2F1" },
				{ "token": "number", 'foreground': "DCF2F1" }
			],
			colors: {
				'editor.lineHighlightBorder': '#F1A569',
				'editor.background': '#7077A1',
				'editorLineNumber.foreground': '#DCF2F1'
			}
		})

		setIsThemeLoaded(true);

		editor.onDidChangeModelContent(() => {
			onChange(editor.getValue());
		});
	}

	const onFormatClick = () => {
		const unformatted = editorRef.current.getModel().getValue();

		const formatted = prettier.format(unformatted, {
			parser: "babel",
			plugins: [parser],
			semi: true,
			tabWidth: 4
		}).replace(/\n$/, "");

		editorRef.current.setValue(formatted);
	}

	return (
		<div className="editor-wrapper">
			<button
				className="button button-format is-primary is-small"
				onClick={onFormatClick}>
				Format
			</button>
			<Editor
				onMount={onEditorDidMount}
				value={initialValue}
				language="javascript"
				theme={isThemeLoaded ? "mine" : "vs-dark"}
				height="100%"
				options={
					{
						minimap: { enabled: false },
						wordWrap: "on",
						showUnused: false,
						folding: true,
						lineNumbersMinChars: 3,
						fontSize: 16,
						scrollBeyondLastLine: true,
						glyphMargin: false,
						lineNumbers: checkInnerWidth(768) ? "on" : "off",
						lineDecorationsWidth: 0,
					}
				}
			/>
		</div>
	)

}

export default CodeEditor;