import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useValidClick } from "../hooks/use-valid-click";
import { useNavigate } from "react-router-dom";
import { useActions } from "../hooks/use-actions";
import { useNotificationContext } from "../context/notificationContext";


interface ProjectProps {
    info: {
        projId: string;
        title: string;
        descr: string;
        DOC: string;
    }
}

const Project: React.FC<ProjectProps> = ({ info }) => {
    const projectRef = useRef<HTMLDivElement | null>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);

    const { projId, title, descr, DOC } = info;

    const navigate = useNavigate();
    const { deleteProject } = useActions();
    const { notificate } = useNotificationContext();


    const disableDeleteMode = () => {
        overlayRef.current?.classList.remove("deleteProject");
    };

    const enterDeleteMode = () => {
        overlayRef.current?.classList.add("deleteProject");
    }

    useEffect(() => {
        projectRef.current?.addEventListener("mouseleave", disableDeleteMode);
        return () => {
            projectRef.current?.removeEventListener("mouseleave", disableDeleteMode)
        }
    }, [])


    const onProjectClick = (e: any) => {
        // eslint-disable-next-line
        const isClickValid = useValidClick(e.target, ["projectOverlay-button", "projectOverlay-icon", "projectOverlay-deleteBtn"])

        if (isClickValid()) {
            navigate(`/project/${projId}`);
        }
    }

    const onDeleteProject = () => {
        deleteProject(projId)
        notificate("error", `${title} deleted!`)
    }

    return (
        <div onClick={e => onProjectClick(e)} id={projId} ref={projectRef} className="project">
            <div className="projectContent">
                <img src="./img/project-placeholder.png" className="projectContent-img" alt="img" />
                <p className="projectContent-name semi">{title}</p>
            </div>
            <div ref={overlayRef} className="projectOverlay dasd">
                <p className="project-descr">
                    <span className="project-gray">Description: </span>
                    {
                        descr.length >= 115 ?
                            descr.slice(0, 115).trim() + "..."
                            :
                            descr.length ?
                                descr
                                :
                                "No description"
                    }
                </p>
                <p className="project-DOC">
                    <span className="project-gray">Created at: </span>
                    {DOC.replace(/-/g, ".")}
                </p>
                <div className="projectOverlay-bottom">
                    <p className="projectOverlay-name semi">Test 1</p>
                    <button onClick={() => enterDeleteMode()} className="projectOverlay-button">
                        <i className="projectOverlay-icon fa fa-trash fa-lg" aria-hidden="true"></i>
                    </button>
                </div>
                <div className="projectOverlay-delete">
                    <p className="semi">you sure ?</p>
                    <div className="projectOverlay-deleteBtns">
                        <button onClick={onDeleteProject} className="projectOverlay-deleteBtn">yes</button>
                        <button onClick={() => disableDeleteMode()} className="projectOverlay-deleteBtn">no</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Project;