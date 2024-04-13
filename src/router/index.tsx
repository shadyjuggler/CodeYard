import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import StartForm from "../components/StartForm";
import Profile from "../components/Profile";
import About from "../components/About";
import NotFound from "../components/NotFound";
import SelectProject from "../components/SelectProject";
import CellList from "../components/CellList";
import Manual from "../components/Manual";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route path="/" element={<StartForm />} />
            <Route path="profile" element={<Profile />} />
            <Route path="about" element={<About />} />
            <Route path="select" element={<SelectProject />}/>
            <Route path="project/:id" element={<CellList />}/>
            <Route path="manual" element={<Manual />}/>
            <Route path="*" element={<NotFound />} />
        </Route>
    )
)

export default router;