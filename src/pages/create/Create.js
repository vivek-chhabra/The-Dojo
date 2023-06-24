import { useCollection } from "../../hooks/useCollection";
import React, { useEffect, useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import { useInput } from "../../hooks/useInput";
import { Timestamp } from "firebase/firestore";
import { auth } from "../../firebase/config";
import { ErrorMsg } from "../../helpers";
import Select from "react-select";
import "./Create.css";

export default function Create({ isPending, setAddCollStart, addDocument, response }) {
    // states for the creation of the project
    const [details, updateDetails, resetDetails] = useInput("");
    const [dueDate, updateDate, resetDueDate] = useInput("");
    const [assignedUser, setAssignedUser] = useState([]);
    const [name, updateName, resetName] = useInput("");
    const [category, setCategory] = useState("");
    const [formErr, setFormErr] = useState(null);

    // use toggel hook
    const [isCategoryAvail, toggleIsCategoryAvail] = useToggle(true);

    // the options for selecting categories
    const categories = [
        { value: "development", label: "Developement" },
        { value: "design", label: "Design" },
        { value: "sales", label: "Sales" },
        { value: "marketing", label: "Marketing" },
        { value: "trading", label: "Trading" },
    ];

    // use collection hook
    const { document } = useCollection("user");

    // the options for selecting the users
    let selectUsers;
    if (document) {
        selectUsers = document.map((user) => ({ value: user, label: user.name }));
    }

    // checking if the due date is not the past date
    useEffect(() => {}, [dueDate]);

    const project = {
        projectName: name,
        projectDetails: details,
        dueDate: Timestamp.fromDate(new Date(dueDate)),
        comments: [],
        createdBy: { name: auth.currentUser.displayName, uid: auth.currentUser.uid, photoURL: auth.currentUser.photoURL },
        category,
        assignedUser: assignedUser.map((u) => {
            return {
                userName: u.value.name,
                userUID: u.value.id,
                userPhotoURL: u.value.photoURL,
            };
        }),
    };

    // handling the submission of project from
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErr(null);

        // throwing error if the certain fields are not selected
        if (!category) {
            setFormErr("Category Must Not Be Empty");
            window.scrollTo(0, 0);
            return;
        } else if (assignedUser.length < 1) {
            setFormErr("Assign The Project To Atleast One User");
            window.scrollTo(0, 0);
            return;
        }

        // the object that will be stored the the firestore db in projects collection
        let dueDateSec = Timestamp.fromDate(new Date(dueDate));
        let currDateSec = Timestamp.fromDate(new Date());
        if (currDateSec.toDate().toLocaleDateString() !== dueDateSec.toDate().toLocaleDateString()) {
            if (currDateSec > dueDateSec) {
                setFormErr("Duedate Must Not Be the Past Date!");
                window.scrollTo(0, 0);
                return;
            }
        }

        // adding doc is there is no error
        setAddCollStart(true);
        addDocument("projects", project);
    };

    useEffect(() => {
        // reseting the input fields
        if (response.success) {
            resetDetails();
            resetDueDate();
            resetName();
            setAssignedUser([]);
            setCategory("");
        }
    }, [response.success]);

    return (
        <div className="Create">
            {formErr && <ErrorMsg error={formErr} />}
            <form onSubmit={handleSubmit} style={formErr && { marginTop: "30px" }}>
                <h2 className="page-title">Create a new project.</h2>
                <div className="project-name">
                    <label htmlFor="p-name" className="form-label">
                        Project Name :
                    </label>
                    <input type="text" required value={name} onChange={updateName} className="shadow-none form-control" id="p-name" aria-describedby="emailHelp" />
                </div>
                <div className="project-details">
                    <label htmlFor="p-details" className="form-label">
                        Project Details :
                    </label>
                    <textarea name="" type="text" required value={details} onChange={updateDetails} id="p-details" cols="30" rows="7"></textarea>
                </div>
                <div className="mb-0">
                    <label htmlFor="date" className="form-label">
                        Due Date :
                    </label>
                    <input type="date" required value={dueDate} onChange={updateDate} className="shadow-none form-control" id="date" />
                </div>
                <div className="mb-0">
                    <label htmlFor="category" className="form-label">
                        Category :
                    </label>
                    {isCategoryAvail ? (
                        <Select options={categories} required placeholder={"Select Category"} onChange={(options) => setCategory(options.value)} />
                    ) : (
                        <input type="text" placeholder="Specify the category" required value={category} onChange={(e) => setCategory(e.target.value)} className="shadow-none form-control" id="category" />
                    )}
                </div>
                <div className="mb-0 form-check">
                    <input type="checkbox" onClick={toggleIsCategoryAvail} className="form-check-input shadow-none" id="noCat" />
                    <label className="form-check-label " htmlFor="noCat">
                        Category Not Available In The Above List
                    </label>
                </div>
                <div className="mb-0">
                    <label htmlFor="category" className="form-label">
                        Project Assignment :
                    </label>
                    <Select isMulti options={selectUsers} placeholder={"Assign project to"} onChange={(option) => setAssignedUser(option)} />
                </div>
                {isPending ? (
                    <button type="submit" disabled className="btn btn-primary">
                        Loading...
                    </button>
                ) : (
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                )}
            </form>
        </div>
    );
}
