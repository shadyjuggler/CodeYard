import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { ActionType } from "./action-types";

export const store = createStore(reducers, {}, applyMiddleware(thunk));

// store.dispatch({
//     type: ActionType.NOTIFICATION_ADD,
//     payload: {
//         id: "59283049813",
//         type: "success",
//         message: "nasopdkfnaoskdn okashnd[on"
//     }
// })
// store.dispatch({
//     type: ActionType.NOTIFICATION_ADD,
//     payload: {
//         id: "9824920384901",
//         type: "warning",
//         message: "aksdonqawdkv nqwk"
//     }
// })
// store.dispatch({
//     type: ActionType.NOTIFICATION_ADD,
//     payload: {
//         id: "23451234123",
//         type: "error",
//         message: "asjdfkj aslkdgjasld asdfas"
//     }
// })