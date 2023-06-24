import { NavLink, Navigate, useNavigate, useParams } from "react-router-dom";
import { ErrorMsg, PrimaryMsg, removeEle, replaceEle } from "../../helpers";
import { useFirestore } from "../../hooks/useFirestore";
import ProfileImg from "../../components/ProfileImg";
import useDocument from "../../hooks/useDocument";
import { useToggle } from "../../hooks/useToggle";
import { useInput } from "../../hooks/useInput";
import { formatDistanceToNow } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { auth } from "../../firebase/config";
import React, { useEffect, useState } from "react";
import "./ProjectDetails.css";

export default function ProjectDetails() {
    const { id } = useParams();
    const [editComment, setEditComment] = useState(false);
    const [editedCmt, setEditedCmt] = useState();
    const [commentInfo, setcommentInfo] = useState({});

    // fetching the single document on the bases of id
    const { error, document } = useDocument("projects", id);

    // useToggle hook
    const [shoTime, toggleShoTime] = useToggle(false);

    // useInput hook
    const [commentMsg, updateCommentMsg, resetComment] = useInput("");

    // useFirestore hook
    const { response, editDocument, deleteDocument } = useFirestore();

    useEffect(() => {
        if (document === null) {
            return;
        }
    }, [document]);

    // reseting the input field
    useEffect(() => {
        if (response.success) {
            resetComment();
            setEditComment(false);
            setEditedCmt("");
        }
    }, [response.success]);

    if (error) {
        return <ErrorMsg error={error} />;
    }
    if (!document) {
        return <PrimaryMsg msg={"Loading the documents..."} />;
    }

    // handling the submission of comment
    const handleSubmit = (evt) => {
        evt.preventDefault();

        // creating comment object
        const comment = {
            message: commentMsg,
            createdBy: {
                photoURL: auth.currentUser.photoURL,
                name: auth.currentUser.displayName,
                uid: auth.currentUser.uid,
            },
            createdAtDate: new Date().toLocaleDateString(),
            createdAt: Timestamp.fromDate(new Date()),
        };

        // adding commit in the project collection
        editDocument("projects", { comments: [...document.comments, comment] }, id);
    };

    const deleteProject = () => {
        deleteDocument("projects", id);
        window.location.href = "/dashboard";
    };

    const deleteComment = (idx) => {
        editDocument("projects", { comments: removeEle(document.comments, idx) }, id);
    };

    // updating the comment
    const updateComment = (idx, comment) => {
        setcommentInfo({ idx, comment });
        setEditedCmt(comment.message);
        setEditComment(true);
    };
    const handleEdit = (e) => {
        e.preventDefault();
        editDocument("projects", { comments: replaceEle(document.comments, commentInfo.idx, { ...commentInfo.comment, message: editedCmt }) }, id);
    };

    return (
        <>
            {response.error && <ErrorMsg error={response.error} />}
            <div className="ProjectDetails">
                <div className="outer">
                    <div className="project-details">
                        <div className="project-name">
                            {document.projectName}
                            <div className="dropdown">
                                <button className="btn btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa-solid fa-bars-staggered"></i>
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <div className="dropdown-item" href="#">
                                            <div class="modal-dialog modal-dialog-centered">Options</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <p className="assigned-by">
                            Assigned by <span>{document && document.createdBy.name}</span> on {document && document.createdAtDate}
                        </p>
                        <div className="due-date">Project due by {document && document.dueDate.toDate().toDateString()}</div>
                        <div className="detail">{document && document.projectDetails}</div>
                        <div className="assigned-to">
                            <p>Project is assigned to : </p>
                            <div className="users">{document && document.assignedUser.map((user) => <ProfileImg url={user.userPhotoURL} color="#677E91" />)}</div>
                        </div>
                    </div>
                    {auth.currentUser.uid === document.createdBy.uid && (
                        <button type="button" class="btn primary-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Delete Project if its Done
                        </button>
                    )}

                    {/* popup message */}
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                                        Delete This Project.!
                                    </h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">Are you sure you want to delete the project? Deleting the project will remove all the comments and content related to it</div>
                                <div class="modal-footer">
                                    <button type="button" class="btn primary-btn" data-bs-dismiss="modal">
                                        Close
                                    </button>
                                    <NavLink to={"/dashboard"} type="button" onClick={deleteProject} data-bs-dismiss="modal" class="btn primary-btn">
                                        Delete
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="project-comment">
                    <div className="head">Project Comments</div>
                    <div className="comments">
                        {document &&
                            document.comments.map((comm, idx) => {
                                return (
                                    <div className="comment">
                                        <div className="top">
                                            <div className="user" onClick={toggleShoTime}>
                                                <ProfileImg url={comm && comm.createdBy.photoURL} />
                                                {!shoTime ? <div className="name">{comm.createdBy.name}</div> : <div className="time-passed">{formatDistanceToNow(comm.createdAt.toDate(), { addSuffix: true })}</div>}
                                            </div>
                                            <div className="dropdown">
                                                {comm.createdBy.uid === auth?.currentUser?.uid && (
                                                    <button className="btn btn-secondary" style={{ padding: "0px", border: "transparent" }} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i class="fa-solid fa-caret-down"></i>
                                                    </button>
                                                )}
                                                <ul className="dropdown-menu">
                                                    <li onClick={() => updateComment(idx, comm)}>
                                                        <div className="dropdown-item">
                                                            <div class="modal-dialog modal-dialog-centered">Edit</div>
                                                        </div>
                                                    </li>
                                                    <li onClick={() => deleteComment(idx)}>
                                                        <div className="dropdown-item">
                                                            <div class="modal-dialog modal-dialog-centered">Delete</div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="msg">
                                            <i class="fa-solid fa-quote-left"></i> {comm.message}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <form action="" onSubmit={editComment ? handleEdit : handleSubmit}>
                        <div className="add-comment">
                            <label htmlFor="comment">Add New Comment : </label>
                            {editComment && <div className="updateComment">Update Your Comment Below : </div>}
                            <textarea name="" value={editComment ? editedCmt : commentMsg} required onChange={editComment ? (e) => setEditedCmt(e.target.value) : updateCommentMsg} id="comment"></textarea>
                        </div>
                        {response.isPending ? (
                            <button disabled className="btn primary-btn">
                                Adding...
                            </button>
                        ) : (
                            <button className="btn primary-btn">{editComment ? "Update Comment" : 'Add Comment'}</button>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}
