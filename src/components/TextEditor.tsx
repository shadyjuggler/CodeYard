import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

import checkInnerWidth from "../hooks/helpers/checkInnerWidth";

interface TextEditorProps {
    cell: Cell;
    projId: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ projId, cell }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [editing, setEditing] = useState<boolean>(false);
    const { updateCell } = useActions();

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (ref.current && event.target && ref.current.contains(event.target as Node)) {
                return
            }
            setEditing(false);
        }

        window.addEventListener("click", listener, { capture: true });

        return () => {
            document.removeEventListener("click", listener, true)
        }
    }, [])

    if (editing) {
        return (
            <div className="text-editor" ref={ref}>
                <MDEditor
                    value={cell.content}
                    preview={checkInnerWidth(768) ? "live": "edit"}
                    onChange={(v) => updateCell(projId, cell.id, v || "")}
                />
            </div>
        )
    }

    return (
        <div className="text-editor card" onClick={() => setEditing(true)}>
            <div className="card-content">
                <MDEditor.Markdown source={cell.content || "Click to edit"} />
            </div>
        </div>
    )
}

export default TextEditor;