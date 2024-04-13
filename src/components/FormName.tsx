import { useState } from "react";
import { useActions } from "../hooks/use-actions";
import { useNotificationContext } from "../context/notificationContext";

const FormName: React.FC = () => {
    const [value, setValue] = useState<string>("");
    const { userCredentialsUpdate } = useActions();
    const { notificate } = useNotificationContext();

    const onFormSubmit = async () => {
        if (value) {
            const updateRes = await userCredentialsUpdate("displayName", value)
            // @ts-ignore
            const { displayName, error } = updateRes;
            displayName || displayName === "" ?
                notificate("success", "Username updated")
                :
                notificate("error", error)
        } else {
            notificate("error", "Username must be provided")
        }
    }

    return (
        <form className="formName form" action="">
            <div className="fromField">
                <input value={value} onChange={e => setValue(e.target.value)} placeholder="Enter your name" className="fromField-input" type="text" />
            </div>
            <button onClick={onFormSubmit} type="button" className="formButton">submit</button>
        </form>
    )
}

export default FormName;