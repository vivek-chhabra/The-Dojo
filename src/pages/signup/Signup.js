import { useSignUpAuth } from "../../hooks/useSignUpAuth";
import { useLoginAuth } from "../../hooks/useLoginAuth";
import { useInput } from "../../hooks/useInput";
import React from "react";
import { ErrorMsg } from "../../helpers";
import { useToggle } from "../../hooks/useToggle";

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
        <div className="Signup Login">
            {error && <ErrorMsg error={error} />}
            <form onSubmit={handleSubmit}>
                <p>Sign Up</p>
                <div className="mb-0 name">
                    <div className="first-name">
                        <label for="f-name" className="form-label">
                            First Name :
                        </label>
                        <input type="text" value={firstName} onChange={updateFirstName} className="shadow-none form-control" id="f-name" aria-describedby="emailHelp" />
                    </div>
                    <div className="last-name">
                        <label for="l-name" className="form-label">
                            Last Name :
                        </label>
                        <input type="text" value={lastName} onChange={updateLastName} className="shadow-none form-control" id="l-name" aria-describedby="emailHelp" />
                    </div>
                </div>
                <div className="mb-0">
                    <label for="email" className="form-label">
                        Email :
                    </label>
                    <input type="email" value={email} onChange={updateEmail} className="shadow-none form-control" id="email" />
                </div>
                <div className="mb-0">
                    <label for="password" className="form-label">
                        Password :
                    </label>
                    <input type={showPassword ? "text" : "password"} value={password} onChange={updatePassword} className="shadow-none form-control" id="password" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" onClick={toggleShowPassword} className="form-check-input shadow-none" id="exampleCheck1" />
                    <label className="form-check-label " for="exampleCheck1">
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
