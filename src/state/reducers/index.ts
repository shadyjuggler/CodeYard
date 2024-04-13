import { combineReducers } from "redux";
import projectsReducer from "./projectsReducer";
import bundlesReducer from "./bundlesReducer";
import userRedcuer from "./userReducer";
import notificationReducer from "./notificationReducer";

const reducers = combineReducers({
    userProjects: projectsReducer,
    bundles: bundlesReducer,
    users: userRedcuer,
    notifications: notificationReducer
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;