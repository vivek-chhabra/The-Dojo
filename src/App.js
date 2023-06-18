import { Navigate, Route, Routes, useParams } from "react-router-dom";
import ProjectDetails from "./pages/project/ProjectDetails";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home(dashboard)/Home";
import Project from "./pages/project/Project";
import Signup from "./pages/signup/Signup";
import Create from "./pages/create/Create";
import NavBar from "./components/NavBar";
import Login from "./pages/login/Login";
import { useContext } from "react";
import "./App.css";


function App() {
    // using params
    const { id } = useParams();

    // auth context
    const { user } = useContext(AuthContext);

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/The-Dojo" element={<Navigate to={"/"} />} />
                <Route path="/" element={user ? <Home /> : <Navigate to={'/login'}/>} />
                <Route path="/login" element={user ? <Navigate to={'/'}/> : <Login />} />
                <Route path="/signup" element={user ? <Navigate to={'/'}/> : <Signup />} />
                <Route path="/create" element={user ? <Create /> : <Navigate to={'/login'}/>} />
                <Route path="/project" element={user ? <Project /> : <Navigate to={'/login'}/>} />
                <Route path="/project/:id" element={<ProjectDetails />} />
            </Routes>
        </>
    );
}

export default App;
