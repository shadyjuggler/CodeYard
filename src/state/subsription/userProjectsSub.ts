import { store } from "../store";

import { saveUserProjectsSanpshot } from "../../firebase/db";

let timerId: any;

const debounce = () => {
    const startUserPorjects = store.getState().userProjects;

    timerId = setTimeout(() => {
        const currentUserProjects = store.getState().userProjects;
        if (startUserPorjects === currentUserProjects) {
            const { projects } = currentUserProjects;
            saveUserProjectsSanpshot(projects)

        } else {
            debounce(); // Continue waiting
        }
    }, 800);
};

export const handleUserPorejctsChange = (userId: string) => {
    return () => {
        clearTimeout(timerId);
        debounce();
    }
};
