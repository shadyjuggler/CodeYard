import { useActions } from "../hooks/use-actions";

interface ActionBarProps {
    cellId: string;
    projId: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ projId, cellId }) => {
    const { moveCell, deleteCell } = useActions();

    return (
        <div className="action-bar-wrapper">
            <div className="actionBar-hover">
                <div className="action-bar">
                    <button className="button is-primary is-small" onClick={() => moveCell(projId, cellId, "up")}>
                        <span className="icon">
                            <i className="fas fa-arrow-up"></i>
                        </span>
                    </button>
                    <button className="button is-primary is-small" onClick={() => moveCell(projId, cellId, "down")}>
                        <span className="icon">
                            <i className="fas fa-arrow-down"></i>
                        </span>
                    </button>
                    <button className="button is-primary is-small" onClick={() => deleteCell(projId, cellId)}>
                        <span className="icon">
                            <i className="fas fa-trash"></i>
                        </span>
                    </button>
                </div>
            </div>
        </div>

    )
}

export default ActionBar;