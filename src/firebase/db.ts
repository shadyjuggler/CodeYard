import { db } from ".";
import { collection, getDocs, setDoc, doc, updateDoc, deleteDoc, DocumentReference } from "firebase/firestore";

import { Projects } from "../state/state-types/projects";
import { Exception } from "sass";

import { store } from "../state";

export const getAllUserProjects = async (userId: string) => {
    const projects = await getDocs(collection(db, `projects_${userId}`));
    const output: Projects = {};
    projects.forEach((doc) => {
        // @ts-ignore
        output[doc.id] = doc.data();
    });
    return output;
}

export const saveUserProjectsSanpshot = async ( projects: Projects) => {
    const userId = store.getState().users.user?.id;

    if (!userId) {
        return;
    }

    const collectionName = `projects_${userId}`
    const projectsSnapshot = await getDocs(collection(db, collectionName)).catch((e: Exception) => console.log(e.message));

    const stateProjectsId: string[] = Object.keys(projects);
    const dbProjects: { [key: string]: DocumentReference } = {};

    // @ts-ignore
    projectsSnapshot.forEach(doc => dbProjects[doc.id] = doc.ref);

    stateProjectsId.forEach(stateProjId => {

        // update exisiting document
        if (dbProjects[stateProjId]) {
            updateDoc(dbProjects[stateProjId], projects[stateProjId])
                .then(() => {
                    console.log("updated")
                })
                .catch((e: any) => {
                    console.log(e.message);
                })

        }

        // add new document
        if (!dbProjects[stateProjId]) {
            setDoc(doc(db, collectionName, stateProjId), projects[stateProjId])
                .then(resp => {
                    console.log("new doc created")
                })
                .catch((e: any) => {
                    console.log(e.message);
                })
        }

    })

    // check for docs to delete
    const projectsToDelete = Object.keys(dbProjects).filter(dbProjId => !stateProjectsId.includes(dbProjId));
    projectsToDelete.forEach(projId => {
        deleteDoc(dbProjects[projId])
    });
}