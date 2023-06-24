import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { NavLink, useParams } from "react-router-dom";
import ProfileImg from "../../components/ProfileImg";
import { ErrorMsg, PrimaryMsg } from "../../helpers";
import { auth } from "../../firebase/config";
import React, { useEffect } from "react";
import "./ProjectList.css";

export default function ProjectList({ filter }) {
    const { field, id } = useParams();

    // use collection hook
    const { document, error } = useCollection("projects", "category", field);

    useEffect(() => {
        if (document == null) {
            return <ErrorMsg error={error} />;
        }
    }, [document]);

    // useFirestore hook
    const { response, deleteDocument } = useFirestore();

    // deleting the document
    const deleteProject = () => {
        deleteDocument("projects", id);
    };

    return (
        <div className="ProjectList">
            {!filter.some((link) => link === field || field === undefined) && <ErrorMsg error={"Found No Such Document You Are Looking For"} />}
            {response.error && <ErrorMsg error={response.error} />}

            {document &&
                document.map((project) => {
                    return (
                        <NavLink to={`/dashboard/project/${project.id}`} className="project">
                            <div className="top">
                                <div className="project-name">
                                    <p>
                                        {project.projectName
                                            .split(" ")
                                            .slice(0, 4)
                                            .map((word) => " " + word)}
                                        ...
                                    </p>
                                    {auth.currentUser.uid === project.createdBy.uid && <i className="fa-solid fa-trash-can"></i>}
                                </div>
                                <p className="due-date">{project.dueDate.toDate().toDateString()}</p>
                            </div>
                            <div className="hr"></div>
                            <div className="assigned-users">
                                {project.assignedUser.map((user) => {
                                    return <ProfileImg url={user.userPhotoURL} color="#2e5372" />;
                                })}
                            </div>
                        </NavLink>
                    );
                })}
        </div>
    );
}
