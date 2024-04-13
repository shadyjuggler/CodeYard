import { ActionType } from "../action-types/index";

export interface BundleStartAction {
    type: ActionType.BUNDLE_START;
    payload: {
        cellId: string;
    }
}

export interface BundleCompleteAction {
    type: ActionType.BUNDLE_COMPLETE;
    payload: {
        cellId: string;
        bundle: {
            code: string;
            err: string;
        }
    }
}