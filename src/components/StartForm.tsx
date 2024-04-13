import { useState, useEffect } from "react";
import { register, login } from "../firebase/auth";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useNavigate } from "react-router-dom";
import { useNotificationContext } from "../context/notificationContext";
import checkInnerWidth from "../hooks/helpers/checkInnerWidth";

// import { store } from "../state";

const StartForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");

    const { userAuth } = useActions();
    const { notificate } = useNotificationContext();

    const navigate = useNavigate();
    const user = useTypedSelector(({ users: { user } }) => user);

    useEffect(() => {
        if (user) {
            navigate("select");
        }
    }, [user])

    const onReg = async () => {
        const authRes = await userAuth(register, email, pass);
        //@ts-ignore
        const { user, error } = authRes;

        if (checkInnerWidth(425)) {
            user ? 
            notificate("success", `Welcome ${user.email}!`)
            :
            notificate("error", error)
        }
    }

    const onLog = async () => {
        const authRes = await userAuth(login, email, pass);
        //@ts-ignore
        const { user, error } = authRes;
        user ? 
        notificate("success", `${user.name} logged in!`)
        :
        notificate("error", error)
    }

    return (
        <div className="startForm">
            <h1 className="startForm-title title">Welcome to CodeYard</h1>
            <p className="startForm-descr">Javascript sandbox, based on React framework, where you can implement any coding ideas by importing npm modules right inside code editor</p>
            <form className="regLogForm">
                <p className="regLogForm-title">Create your account</p>
                <p className="regLogForm-subtitle">but you may have one ?</p>
                <div className="fromField">
                    <input value={email} onChange={e => setEmail(e.target.value)} placeholder="e-mail" className="fromField-input" type="text" />
                </div>
                <div className="fromField">
                    <input value={pass} onChange={e => setPass(e.target.value)} placeholder="password" className="fromField-input" type="password" />
                </div>
                <div className="regLogForm-buttons">
                    <button onClick={onReg} type="button" className="formButton regLogForm-regBtn">Register</button>
                    <button onClick={onLog} type="button" className="formButton regLogForm-logBtn">Log in</button>
                </div>
                <p className="tiny regLogForm-guestMode">or try in <a href="#" id="guestLink">guest mode</a></p>
            </form>
        </div>
    )
}

export default StartForm;