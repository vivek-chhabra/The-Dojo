import { NavLink } from "react-router-dom";
import logo from "../assets/temple.svg";
import React, { useContext } from "react";
import "./NavBar.css";
import { AuthContext } from "../context/AuthContext";
import { useLogOut } from "../hooks/useLogOut";
import { ErrorMsg } from "../helpers";

export default function NavBar() {
    // auth context
    const { user } = useContext(AuthContext);

    // use logout hook
    const { error, isPending, logOut } = useLogOut();

    // logging out the user
    const handleLogout = async () => {
        await logOut();
    };

    return (
        <div className="NavBar">
            <div className="head">
                <img src={logo} alt="" />
                <NavLink className={"brand"} to={"/"}>
                    The Dojo
                </NavLink>
            </div>
            <div className="links">
                {user ? (
                    isPending ? (
                        <button disabled className="btn primary-btn" onClick={handleLogout}>
                            Logging Out...
                        </button>
                    ) : (
                        <button className="btn primary-btn">Logout</button>
                    )
                ) : (
                    <>
                        <NavLink className={"navlink"} to={"/login"}>
                            Login
                        </NavLink>
                        <NavLink className={"navlink"} to={"/signup"}>
                            Signup
                        </NavLink>
                    </>
                )}
            </div>
            {error && <ErrorMsg error={error} />}
        </div>
    );
}
