import { Cell } from "../state";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";
import ActionBar from "./ActionBar";

interface CellListItemProps {
    projId: string;
    cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ projId, cell }) => {
    let child: JSX.Element;
    if (cell.type === "code") {
        child = <>
            <div className="action-bar-wrapper">
                <ActionBar projId={projId} cellId={cell.id} />
            </div>
            <CodeCell projId={projId} cell={cell} />
        </>
    } else {
        child = <>
            <ActionBar projId={projId} cellId={cell.id} />
            <TextEditor projId={projId} cell={cell} />
        </>
    }

    return (
        <div className="CellListItem">
            {child}
        </div>
    )
}

export default CellListItem;