import { useState } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";

import { useNavigate } from "react-router-dom";
import { useNotificationContext } from "../context/notificationContext";

import FormName from "./FormName";
import FormPass from "./FormPass";
import FormImg from "./FormImg";

enum ActiveForm {
    None,
    FormName,
    FormPass,
    FormImg
}

const Profile: React.FC = () => {
    const [activeForm, setActiveForm] = useState<ActiveForm>(ActiveForm.None);
    const name = useTypedSelector((state) => state.users.user?.name);
    const { projects } = useTypedSelector(state => state.userProjects);

    const navigate = useNavigate();
    const {notificate} = useNotificationContext();

    const onFormOpen = (form: ActiveForm) => {
        setActiveForm(form);
    }
    
    const onProjectClick = (projId: string) => {
        navigate(`/project/${projId}`);
        notificate("warning", ` ${projects[projId].title} opened!`)
    }   

    const renderProjects = Object.keys(projects).map(projId => {
        return (
            <div onClick={() => onProjectClick(projId)} key={projId} className="projectList-projectItem">
                <p className="projectList-projectName">{projects[projId].title}</p>
            </div>
        )
    })

    return (
        <div className="Profile">
            <h1 className="title">Profile</h1>
            <div className="Profile-main">
                <div className="Profile-content">
                    <p className="Profile-email"><span className="Profile-gray">e-mail:</span> test@asldc.om</p>
                    <p className="Profile-name"><span className="Profile-gray">name:</span> {name || "none"}</p>
                    <p className="Profile-projects"><span className="Profile-gray">projects:</span></p>
                    <div className="projectList">
                        {
                            renderProjects
                        }
                    </div>
                </div>
                <div className="Profile-settingWrapper">
                    <div className="Profile-setting">
                        <i className="fa fa-cog fa-lg" aria-hidden="true"></i>
                        <ul className="Profile-menu">
                            <li className="Profile-li">
                                <p onClick={() => onFormOpen(ActiveForm.FormName)} className="Profile-link">add name</p>
                            </li>
                            <li className="Profile-li">
                                <p onClick={() => onFormOpen(ActiveForm.FormPass)} className="Profile-link">change password</p>
                            </li>
                            <li className="Profile-li">
                                <p onClick={() => onFormOpen(ActiveForm.FormImg)} className="Profile-link">URL for avatar</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="Profile-forms">
                    {activeForm === ActiveForm.FormName && <FormName />}
                    {activeForm === ActiveForm.FormPass && <FormPass />}
                    {activeForm === ActiveForm.FormImg && <FormImg />}
                </div>
            </div>

        </div>
    )
}

export default Profile;