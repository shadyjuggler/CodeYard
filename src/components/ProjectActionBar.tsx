import { useState, useEffect } from "react";

import { useActions } from "../hooks/use-actions";

import { useTypedSelector } from "../hooks/use-typed-selector";
import { store } from "../state";

import { useNavigate } from "react-router-dom";
import { useNotificationContext } from "../context/notificationContext";


interface ProjectActionBarProps {
    projId: string;
    initialDescr: string;
}

const ProjectActionBar: React.FC<ProjectActionBarProps> = ({ projId, initialDescr }) => {
    const [descr, setDescr] = useState(initialDescr);

    const { addProjectDescr, deleteProject } = useActions();

    const navigate = useNavigate();
    const { notificate } = useNotificationContext();
    const title = useTypedSelector(({userProjects}) => userProjects.projects[projId].title)

    useEffect(() => {
        const buttons = document.querySelectorAll(".ProjectActionBar-btn");
        buttons.forEach((btn: any) => {
            btn.addEventListener("mouseleave", (e: any) => {
                e.target.style.cssText = "z-index: 60;"
                setTimeout(() => {
                    e.target.style.cssText = "";
                }, 200)
            })
        })

        return () => {
            const buttons = document.querySelectorAll(".ProjectActionBar-btn");
            buttons.forEach((btn: any) => {
                btn.removeEventListener("mouseleave", (e: any) => {
                    e.target.style.cssText = "z-index: 60;"
                    setTimeout(() => {
                        e.target.style.cssText = "";
                    }, 200)
                })
            })
        }
    }, [])

    const onAddDescription = () => {
        addProjectDescr(projId, descr);
        notificate("success", `New description for ${title}`)
    }

    const onDeleteProject = () => {
        navigate("/");
        deleteProject(projId);
        notificate("error", `${title} deleted!`)
    }

    return (
        <div className="ProjectActionBar">
            <button id="ProjectActionBar-save" className="ProjectActionBar-btn">
                <i className="fa-regular fa-floppy-disk fa-lg"></i>
                <div className="ProjectActionBar-overlay">
                    <div onClick={() => console.log("ok")} className="ProjectAcionBar-innerBtn ProjectActionBar-saveBtn">save ?</div>
                </div>
            </button>
            <button id="ProjectActionBar-descr" className="ProjectActionBar-btn">
                <div onClick={onAddDescription} className="ProjectAcionBar-innerBtnc ProjectActionBar-descrSaveBtn">
                    <i className="fa-regular fa-note-sticky fa-lg"></i>
                    <p>save</p>
                </div>
                <div className="ProjectActionBar-overlay">
                    <p>Description</p>
                    <textarea value={descr} onChange={(e) => setDescr(e.target.value)} rows={4} cols={50} className="ProjectActionBar-textArea"></textarea>
                </div>
            </button>
            <button id="ProjectActionBar-delete" className="ProjectActionBar-btn">
                <div className="ProjectActionBar-overlay">
                    <div onClick={() => onDeleteProject()} className="ProjectAcionBar-innerBtn ProjectActionBar-deleteYesBtn">yes</div>
                    <div onClick={() => console.log("ok")} className="ProjectAcionBar-innerBtn ProjectActionBar-deleteNoBtn">no</div>
                </div>
                <i className="fas fa-trash fa-lg"></i>
            </button>
        </div>
    )
}

export default ProjectActionBar;