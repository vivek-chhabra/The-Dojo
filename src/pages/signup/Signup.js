import { useSignUpAuth } from "../../hooks/useSignUpAuth";
import { useLoginAuth } from "../../hooks/useLoginAuth";
import { useToggle } from "../../hooks/useToggle";
import { useInput } from "../../hooks/useInput";
import { ErrorMsg } from "../../helpers";
import "../login/Login.css";
import React from "react";

export default function Signup() {
    // use input hook
    const [firstName, updateFirstName] = useInput("");
    const [lastName, updateLastName] = useInput("");
    const [email, updateEmail] = useInput("");
    const [password, updatePassword] = useInput("");

    // use toggle hook
    const [showPassword, toggleShowPassword] = useToggle(false);

    // use sign up auth hook
    const { error, isPending, signUp } = useSignUpAuth(firstName, lastName, email, password);

    // on submission of the form
    const handleSubmit = async (e) => {
        e.preventDefault();
        await signUp();
    };

    return (
        <div className="Signup Login" style={error ? { marginTop: "10px" } : {}}>
            {error && <ErrorMsg error={error} />}
            <form onSubmit={handleSubmit} style={error ? { marginTop: "30px" } : {}}>
                <p>Sign Up</p>
                <div className="mb-0 name">
                    <div className="first-name">
                        <label htmlFor="f-name" className="form-label">
                            First Name :
                        </label>
                        <input type="text" required value={firstName} onChange={updateFirstName} className="shadow-none form-control" id="f-name" aria-describedby="emailHelp" />
                    </div>
                    <div className="last-name">
                        <label htmlFor="l-name" className="form-label">
                            Last Name :
                        </label>
                        <input type="text" required value={lastName} onChange={updateLastName} className="shadow-none form-control" id="l-name" aria-describedby="emailHelp" />
                    </div>
                </div>
                <div className="mb-0">
                    <label htmlFor="email" className="form-label">
                        Email :
                    </label>
                    <input type="email" required value={email} onChange={updateEmail} className="shadow-none form-control" id="email" />
                </div>
                <div className="mb-0">
                    <label htmlFor="password" className="form-label">
                        Create Password :
                    </label>
                    <input type={showPassword ? "text" : "password"} required value={password} onChange={updatePassword} className="shadow-none form-control" id="password" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" onClick={toggleShowPassword} className="form-check-input shadow-none" id="showPassword" />
                    <label className="form-check-label " htmlFor="showPassword">
                        Show Password
                    </label>
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
