import { AuthContext } from "../context/AuthContext";
import { useLogOut } from "../hooks/useLogOut";
import { NavLink, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import logo from "../assets/temple.svg";
import { ErrorMsg } from "../helpers";
import "./NavBar.css";

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
        <>
            <div className="NavBar" style={user && { paddingInline: "0px" }}>
                <div className="head">
                    <img src={logo} alt="" />
                    <NavLink className={"brand"} to={"/"}>
                        The Dojo
                    </NavLink>
                </div>
                <div className="links">
                    {user ? (
                        isPending ? (
                            <button disabled className="btn primary-btn">
                                Logging Out...
                            </button>
                        ) : (
                            <button className="btn primary-btn" onClick={handleLogout}>
                                Logout
                            </button>
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
            </div>
            {error && <ErrorMsg error={error} />}
        </>
    );
}
