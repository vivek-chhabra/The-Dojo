import { Navigate, Route, Routes, useParams } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home(dashboard)/Home";
import { useContext, useState } from "react";
import Signup from "./pages/signup/Signup";
import NavBar from "./components/NavBar";
import Login from "./pages/login/Login";
import "./App.css";

function App() {
    // auth context
    const { user, isAuthReady } = useContext(AuthContext);

    // toggling navbar in certain situations
    const [showNav, setShowNav] = useState(true);

    return (
        isAuthReady && (
            <>
                {!user && showNav && <NavBar />}
                <Routes>
                    <Route path="/The-Dojo" element={<Navigate to={"/dashboard"} />} />
                    <Route path="/" element={user ? <Navigate to={"/dashboard"} /> : <Navigate to={"/login"} />} />
                    <Route path="/dashboard/category/:field" element={user ? <Home /> : <Navigate to={"/login"} />} />
                    <Route path="/dashboard" element={user ? <Home /> : <Navigate to={"/login"} />} />
                    <Route path="/login" element={user ? <Navigate to={"/dashboard"} /> : <Login />} />
                    <Route path="/signup" element={user ? <Navigate to={"/dashboard"} /> : <Signup />} />
                    <Route path="/create" element={user ? <Home /> : <Navigate to={"/login"} />} />
                    <Route path="/dashboard/project/:id" element={user ? <Home /> : <Navigate to={"/login"} />} />
                    <Route path="*" element={<PageNotFound setShowNav={setShowNav} />} />
                </Routes>
            </>
        )
    );
}

export default App;
