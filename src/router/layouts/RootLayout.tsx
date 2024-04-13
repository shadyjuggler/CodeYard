import Navbar from "../../components/Navbar";
import AuthEventHandler from "../../firebase/authEventHandler";
import { Outlet } from "react-router-dom";

const RootLayout: React.FC = () => {
    AuthEventHandler();
    return (
        <div className="root-layout">
            <Navbar />
            <div className="container">
                <Outlet />
            </div>
        </div>
    )
}

export default RootLayout;