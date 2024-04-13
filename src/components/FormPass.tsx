import { useState } from "react";
import { updateUserPassword } from "../firebase/credentialsUpdate";
import { useNotificationContext } from "../context/notificationContext";

const FormPass: React.FC = () => {
    const [value, setValue] = useState<string>("");
    const { notificate } = useNotificationContext();

    const onFormSubmit = async () => {
        if (value && value.length >= 6) {
            const updateRes = await updateUserPassword(value)
            const {error} = updateRes;
            !error ? 
                notificate("success", "Password updated!")
                :
                notificate("error", error.message)
        } else {
            notificate("error", "Provide valid password")
        }
    }

    return (
        <form className="formPass form" action="">
            <div className="fromField">
                <input value={value} onChange={e => setValue(e.target.value)} placeholder="enter new password" className="fromField-input" type="password" />
            </div>
            <button onClick={onFormSubmit} type="button" className="formButton">submit</button>
        </form>
    )
}

export default FormPass;