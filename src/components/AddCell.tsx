import { useActions } from "../hooks/use-actions";

interface AddCellProps {
    projId: string;
    prevCellId: string | null;
    forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ projId, prevCellId, forceVisible }) => {
    const { insertCellAfter } = useActions();

    return (
        <div className={`AddCell ${forceVisible && 'force-visible'}`}>
            <div className="AddCell-buttons">
                <button className="button is-rounded is-primary is-small" onClick={() => insertCellAfter(projId, prevCellId, "code")}>
                    <span className="icon is-small">
                        <i className="fas fa-plus"></i>
                    </span>
                    <span>code</span>
                </button>
                <button className="button is-rounded is-primary is-small" onClick={() => insertCellAfter(projId, prevCellId, "text")}>
                    <span className="icon is-small">
                        <i className="fas fa-plus"></i>
                    </span>
                    <span>text</span>
                </button>
            </div>
        </div>
    )
}

export default AddCell;