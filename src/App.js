import ProjectDetails from "./pages/project/ProjectDetails";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import Home from "./pages/home(dashboard)/Home";
import Project from "./pages/project/Project";
import Signup from "./pages/signup/Signup";
import Create from "./pages/create/Create";
import NavBar from "./components/NavBar";
import Login from "./pages/login/Login";
import "./App.css";

function App() {
    // using params
    const { id } = useParams();
    // console.log(id)
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/The-Dojo" element={<Navigate to={"/"} />} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/create" element={<Create />} />
                <Route path="/project" element={<Project />} />
                <Route path="/project/:id" element={<ProjectDetails />} />
            </Routes>
        </>
    );
}

export default App;
