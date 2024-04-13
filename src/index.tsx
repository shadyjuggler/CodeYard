import "@fortawesome/fontawesome-free/css/all.min.css"
import "./sass/index.scss"

import "./sass/assets/disbale-webpack-overlay.scss";

import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { store } from "./state";

import { NotificationProvider } from "./context";
import NotificationWrapper from "./components/NotificationWrapper";


import { RouterProvider } from "react-router-dom";
import router from "./router";

const App: React.FC = () => {
    // debugging state
    return (
        //ProviderProps type d file modifed add //children type
        <Provider store={store}>
            <NotificationProvider>
                <RouterProvider router={router} />
                <NotificationWrapper/>
                {/* <ScenariosWrapper/> */}
            </NotificationProvider>
        </Provider>
    )
}

const root = createRoot(document.querySelector("#root") as HTMLElement);
root.render(<App />);
