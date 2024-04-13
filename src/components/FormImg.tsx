import { useState } from "react";
import { useActions } from "../hooks/use-actions";
import { useNotificationContext } from "../context/notificationContext";


const FormImg: React.FC = () => {
    const [value, setValue] = useState<string>("");
    const { userCredentialsUpdate } = useActions();
    const { notificate } = useNotificationContext();


    const onFormSubmit = async () => {
        if (value) {
            const updateRes = await userCredentialsUpdate("photoURL" , value)
            // @ts-ignore
            const { displayName, error } = updateRes;
            displayName || displayName === "" ?
                notificate("success", "Avatar updated")
                :
                notificate("error", error)
        } else {
            notificate("error", "URL must be provided")
        }
    }

    return (
        <form className="formImg form" action="">
        <div className="fromField">
            <input value={value} onChange={e => setValue(e.target.value)} placeholder="provide url for image" className="fromField-input" type="text" />
        </div>
        <button onClick={onFormSubmit} type="button" className="formButton">submit</button>
    </form>
    )
}

export default FormImg;