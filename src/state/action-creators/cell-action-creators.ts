import { Dispatch } from "redux";
import { Action, ProjectsChangeTitle } from "../actions";
import { ActionType } from "../action-types";
import {
    UpdateCellAction,
    DeleteCellAction,
    MoveCellAction,
    InsertCellAfterAction,
    ProjectsCreateNewAction,
    ProjectsAddDescrAction,
    ProjectsDeleteAction
} from "../actions";

import { CellTypes, CellMoveDirections } from "../state-types/cell";
import { Projects } from "../state-types/projects";

import { getAllUserProjects } from "../../firebase/db";

import { store } from "../store";

export const getProjects = (userId: string) => {
    return (dispatch: Dispatch<Action>) => {

        dispatch({
            type: ActionType.PROJECTS_LOAD_START
        })

        getAllUserProjects(userId)
            .then((projects: Projects) => {

                dispatch({
                    type: ActionType.PROJECTS_LOAD_SUCCESS,
                    payload: projects
                })

                console.log(store.getState())
            })
            .catch((error: any) => {
                dispatch({
                    type: ActionType.PROJECTS_LOAD_FAILURE,
                    payload: error.code
                })
            })
    }
}

export const createNewProject = (): ProjectsCreateNewAction => {
    const id = generateID(20);
    const title = `Untiltled`;
    const DOC = getCurrentDateString();

    return {
        type: ActionType.PROJECTS_CREATE_NEW,
        payload: {
            id,
            title,
            DOC
        }
    }
}

export const changeProjectTitle = (projId: string, title: string): ProjectsChangeTitle => {
    return {
        type: ActionType.PROJECTS_CHANGE_TITLE,
        payload: {
            id: projId,
            title
        }
    }
}

export const addProjectDescr = (id: string, descr: string): ProjectsAddDescrAction => {
    return {
        type: ActionType.PROJECTS_ADD_DESCR,
        payload: {
            id,
            descr
        }
    }
}

export const deleteProject = (id: string): ProjectsDeleteAction => {
    return {
        type: ActionType.PROJECTS_DELETE,
        payload: id
    }
}

export const updateCell = (projId: string, cellId: string, content: string): UpdateCellAction => {
    console.log(store.getState())
    return {
        type: ActionType.UPDATE_CELL,
        payload: {
            projId,
            cellId,
            content
        }
    };
};

export const deleteCell = (projId: string, cellId: string): DeleteCellAction => {
    console.log(store.getState())
    return {
        type: ActionType.DELETE_CELL,
        payload: {
            projId,
            cellId,
        }
    }
}

export const moveCell = (projId: string, cellId: string, direction: CellMoveDirections): MoveCellAction => {
    console.log(store.getState())
    return {
        type: ActionType.MOVE_CELL,
        payload: {
            projId,
            cellId,
            direction
        }
    }
}

export const insertCellAfter = (projId: string, cellId: string | null, cellType: CellTypes): InsertCellAfterAction => {
    console.log(store.getState())
    return {
        type: ActionType.INSERT_CELL_AFTER,
        payload: {
            projId,
            cellId,
            type: cellType
        }
    }
}

export const generateID = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const getCurrentDateString = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = currentDate.getFullYear();
    return `${day}-${month}-${year}`;
}