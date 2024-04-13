import { Link } from "react-router-dom";
import { useTypedSelector } from "../hooks/use-typed-selector";

import { useActions } from "../hooks/use-actions";
import { logOut } from "../firebase/auth";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { store } from "../state";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const { user, email, name, photoURL } = useTypedSelector(state => {
        const user = state.users.user;
        return {
            user,
            email: user?.email,
            name: user?.name,
            photoURL: user?.photoURL,
        };
    });
    const showUserHelper = useTypedSelector(({ users }) => users.newUser);
    const { removeNewUserHelper } = useActions();


    const onLogOutBtnClick = () => {
        // userSignOut();
        logOut();
        navigate("/");
    }

    const onMenuMouseEnter = () => {
        removeNewUserHelper()
    }

    return (
        <nav className={`navbar ${user || "start"}`}>
            <div className="container">
                <Link className="logo" to={user ? "select" : "/"}>{"<CodeYard/>"}</Link>
                <div className="navbar-wrapper">
                    <p className="navbar-username semi">{name || email || ""}</p>
                    <div onTouchStart={() => onMenuMouseEnter()} onMouseEnter={() => onMenuMouseEnter()} className={`menu`}>
                        <ul className="menu-list">
                            <li className="menu-li">
                                <Link className="menu-link" to="profile">profile</Link>
                            </li>
                            <li className="menu-li">
                                <Link className="menu-link" to="about">about</Link>
                            </li>
                            <li className="menu-li">
                                <Link className="menu-link" to="manual">manual</Link>
                            </li>
                            <li className="menu-li">
                                <Link onClick={onLogOutBtnClick} className="menu-link" to="/">log out</Link>
                            </li>
                        </ul>
                        {
                            photoURL ?
                                <div className="menu-avatar">
                                    <img src={photoURL} alt="avatar" />
                                </div>
                                :
                                <div className="menu-avatarPlaceholder">
                                    <i className="fa fa-camera fa-lg menu-icon"></i>
                                </div>
                        }
                    </div>
                    {showUserHelper && <div className="newUserHelper">Good day! Seems you are new, great idea to check manual page in the menu above :)</div>}
                </div>
            </div>
        </nav>
    )
}
export default Navbar;