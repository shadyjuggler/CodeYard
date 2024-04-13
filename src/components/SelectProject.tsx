import { useEffect } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";

import Project from "./Project";

import { useNavigate } from "react-router-dom";

import { useActions } from "../hooks/use-actions";

import { useNotificationContext } from "../context/notificationContext";

const SelectProject = () => {
    const navigate = useNavigate();
    const user = useTypedSelector(({ users: { user } }) => user);
    const { createNewProject } = useActions();

    const isLoading = useTypedSelector(({ userProjects }) => userProjects.loading);
    const { notificate } = useNotificationContext();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user])

    const projectsArray = useTypedSelector(({ userProjects: { projects } }) => {
        return Object.keys(projects).map(projId => {
            const { title, descr, DOC } = projects[projId];
            return <Project key={projId} info={{ projId, title, descr, DOC }} />
        })
    })
    const isProjects = projectsArray.length;

    const onCreateNewProject = () => {
        createNewProject();
        notificate("warning", "New project created")
    }

    return (
        <div className="selectProject">
            <h1 className="title">Select project</h1>
            <div className={`selectProject-wrapper ${!isProjects ? "no-projects" : ""}`}>
                {
                    isLoading ?
                        <p className="selectProject-noProjects semi">loading...</p>
                        :
                        isProjects ?
                            projectsArray
                            :
                            <p className="selectProject-noProjects semibold">
                                no projects yet, <span className="accentText">Create a new one</span>
                            </p>
                }
                <div onClick={onCreateNewProject} className="selectProject-wrapper-addProject">
                    <i className="fa fa-plus fa-2x"></i>
                    <p className="reg">Create Project</p>
                </div>
            </div>
        </div>

    )
}

export default SelectProject;