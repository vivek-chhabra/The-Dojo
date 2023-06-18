import { useLoginAuth } from "../../hooks/useLoginAuth";
import React from "react";
import "./Login.css";
import { useToggle } from "../../hooks/useToggle";
import { useInput } from "../../hooks/useInput";
import { ErrorMsg } from "../../helpers";

export default function Login() {
    // use toggle hook
    const [showPassword, toggleShowPassword] = useToggle(false);

    // use input hook
    const [email, updateEmail] = useInput("");
    const [password, updatePassword] = useInput("");

    // use login auth hook
    const { error, isPending, login } = useLoginAuth(email, password);

    // handling submission of the form
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login();
    };

    return (
        <div className="Login">
            {error && <ErrorMsg error={error}/>}
            <form onSubmit={handleSubmit}>
                <p>Login</p>
                <div className="mb-0">
                    <label for="email" className="form-label">
                        Email :
                    </label>
                    <input type="email" value={email} onChange={updateEmail} className="shadow-none form-control" id="email" aria-describedby="emailHelp" />
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
