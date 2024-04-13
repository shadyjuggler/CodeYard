import { ActionType } from "../action-types/index";
import { CellTypes, CellMoveDirections } from "../state-types/cell";
import { Projects } from "../state-types/projects";

export interface ProjectLoadStartAction {
    type: ActionType.PROJECTS_LOAD_START
}

export interface ProjectLoadFailureAction {
    type: ActionType.PROJECTS_LOAD_FAILURE
    payload: string
}

export interface ProjectLoadSuccessAction {
    type: ActionType.PROJECTS_LOAD_SUCCESS
    payload: Projects
}

export interface ProjectsCreateNewAction {
    type: ActionType.PROJECTS_CREATE_NEW,
    payload: {
        id: string,
        title: string,
        DOC: string
    }
}

export interface ProjectsChangeTitle {
    type: ActionType.PROJECTS_CHANGE_TITLE,
    payload: {
        id: string,
        title: string
    };
}

export interface ProjectsAddDescrAction {
    type: ActionType.PROJECTS_ADD_DESCR,
    payload: {
        id: string,
        descr: string,
    }
}

export interface ProjectsDeleteAction {
    type: ActionType.PROJECTS_DELETE,
    payload: string
}

export interface MoveCellAction {
    type: ActionType.MOVE_CELL;
    payload: {
        projId: string;
        cellId: string;
        direction: CellMoveDirections;
    }
}

export interface DeleteCellAction {
    type: ActionType.DELETE_CELL;
    payload: {
        projId: string;
        cellId: string;
    };
}

export interface InsertCellAfterAction {
    type: ActionType.INSERT_CELL_AFTER;
    payload: {
        projId: string;
        cellId: string | null;
        type: CellTypes;
    }
}

export interface UpdateCellAction {
    type: ActionType.UPDATE_CELL;
    payload: {
        projId: string;
        cellId: string;
        content: string;
    }
}
