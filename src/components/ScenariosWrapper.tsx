import Welcome from "./Welcome"

import { useTypedSelector } from "../hooks/use-typed-selector";


import { useState } from "react";

const ScenariosWrapper = () => {
    // const isNewUser = useTypedSelector(({users}) => users.newUser);
    
    const [isNewUser, setisNewUser] = useState(true);

    return (

        <div className={`scenariosWrapper ${isNewUser? "scenariosWrapper-active" : ''}`}>
            <button onClick={() => setisNewUser(!isNewUser)} style={{position: "absolute", top: "20px", left: "20px", zIndex: "20", color: "red"}}>toggle</button>

            {
                isNewUser && <Welcome/>
            }
        </div>
    )
}

export default ScenariosWrapper;