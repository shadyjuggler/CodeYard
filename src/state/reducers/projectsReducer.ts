import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../state-types/cell";
import { Projects } from "../state-types/projects";

import { store } from "../store";
import { act } from "react-dom/test-utils";


interface ProjectsState {
    loading: boolean;
    error: string | null;
    projects: Projects
}

const initialState: ProjectsState = {
    loading: false,
    error: null,
    projects: {}
}

const reducer = produce((
    state: ProjectsState = initialState,
    action: Action
) => {
    switch (action.type) {
        case ActionType.PROJECTS_LOAD_START: {
            state.loading = true;
            state.error = null;
            return state;
        }

        case ActionType.PROJECTS_LOAD_FAILURE: {
            state.loading = false;
            state.error = action.payload;
            return state;
        }

        case ActionType.PROJECTS_LOAD_SUCCESS: {
            state.loading = false;
            state.error = null;
            state.projects = action.payload;
            return state;
        }

        case ActionType.PROJECTS_CREATE_NEW: {
            const {id, title, DOC} = action.payload;
            state.projects[id] = {
                title,
                descr: "",
                DOC,
                order: [],
                data: {}
            };
            return state;
        }

        case ActionType.PROJECTS_CHANGE_TITLE: {
            const {id, title} = action.payload;
            state.projects[id].title = title;
            return state;
        }

        case ActionType.PROJECTS_ADD_DESCR: {
            const {id, descr} = action.payload;
            state.projects[id].descr = descr;
            return state;
        }

        case ActionType.PROJECTS_DELETE: {
            delete state.projects[action.payload];
            return state;
        }

        case ActionType.USER_SIGNED_OUT: {
            state.loading = false;
            state.error = null;
            state.projects = initialState.projects;
            return state;
        }


        case ActionType.UPDATE_CELL: {
            const { projId, cellId, content } = action.payload;
            state.projects[projId].data[cellId].content = content;

            return state;
        }

        case ActionType.DELETE_CELL: {
            const { projId, cellId } = action.payload;
            delete state.projects[projId].data[cellId];
            state.projects[projId].order = state.projects[projId].order.filter(id => id !== cellId);

            return state;
        }

        case ActionType.MOVE_CELL: {
            const { projId, cellId, direction } = action.payload;
            const index = state.projects[projId].order.findIndex((id) => id === cellId);
            const targetIndex = direction === "up" ? index - 1 : index + 1;

            if (targetIndex < 0 || targetIndex > state.projects[projId].order.length - 1) {
                return state;
            }

            state.projects[projId].order[index] = state.projects[projId].order[targetIndex];
            state.projects[projId].order[targetIndex] = cellId;

            return state;
        }

        case ActionType.INSERT_CELL_AFTER: {
            const { projId, cellId, type } = action.payload;

            const cell: Cell = {
                content: "",
                type,
                id: randomId()
            }

            state.projects[projId].data[cell.id] = cell;

            const foundIndex = state.projects[projId].order.findIndex((id) => id === cellId);

            if (foundIndex < 0) {
                state.projects[projId].order.unshift(cell.id)
            } else {
                state.projects[projId].order.splice(foundIndex + 1, 0, cell.id);
            }

            return state;
        }

        default:
            return state;
    }
});

const randomId = () => {
    return Math.random().toString(36).substring(2, 10);
}

export default reducer;