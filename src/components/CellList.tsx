import CellListItem from "./CellListItem";
import AddCell from "./AddCell";
import ProjectActionBar from "./ProjectActionBar";

import { useState, Fragment, useEffect } from "react";

import { useParams } from "react-router-dom";

import { store } from "../state";

import { useActions } from "../hooks/use-actions";

import { useTypedSelector } from "../hooks/use-typed-selector";

import { Cell } from "../state";

import { useNotificationContext } from "../context/notificationContext";


const CellList: React.FC = () => {
    const { loading, projects } = useTypedSelector(({ userProjects }) => userProjects);
    const [display, setDisplay] = useState<any>("loading...");
    const [title, setTitle] = useState<string>("");
    const { id: projId } = useParams<string>();
    const [rednerCount, setRenderCount] = useState<number>(0);

    const { changeProjectTitle } = useActions();
    const { notificate } = useNotificationContext();

    useEffect(() => {
        if (!loading && projId && projects[projId]) {

            const { title, descr, order, data } = store.getState().userProjects.projects[projId];

            const cells = order.map((id: string) => {
                return data[id];
            });

            const renderedCells = cells.map(cell => {
                return <Fragment key={cell.id}>
                    <CellListItem key={cell.id} projId={projId} cell={cell} />
                    <AddCell projId={projId} prevCellId={cell.id} />
                </Fragment>
            });

            setTitle(title);

            setDisplay(
                renderProject(projId, cells, renderedCells, descr)
            )

        } else {
            setDisplay(<h1 className="title">Loading...</h1>)
        }

        if (!projId) {
            setDisplay(<h1 className="title">Something goes wrong</h1>)
        }

        // @ts-ignore
    }, [loading, projects[projId]]);



    let timerId: NodeJS.Timeout;

    const onTitleChange = (projId: string, value: string) => {
        setTitle(value);
    }


    useEffect(() => {
        setRenderCount(rednerCount + 1)

        if (rednerCount > 1) {
            const debounce = (projId: string, value: string) => {
                if (title === value) {
                    changeProjectTitle(projId, value);
                    notificate("warning", "Project title changed")
                }
            }

            clearInterval(timerId);

            timerId = setTimeout(() => {
                if (projId) debounce(projId, title)
                console.log("runned")
            }, 750)

            return () => {
                clearTimeout(timerId);
            };
        }
    }, [title])

    const renderProject = (projId: string, cells: Cell[], renderedCells: JSX.Element[], descr: string) => {
        return (
            <>
                <AddCell projId={projId} key={Math.random()} forceVisible={cells.length === 0} prevCellId={null} />
                {renderedCells}
                <ProjectActionBar projId={projId} initialDescr={descr} />
            </>
        )
    }

    return (
        <div className="cell-list">
            <input onChange={e => onTitleChange(projId ? projId : "test", e.target.value)} className="project-title title" type="text" value={title} />
            {display}
        </div>
    )
}

export default CellList;