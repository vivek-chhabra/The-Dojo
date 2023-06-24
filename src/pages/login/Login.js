import { useLoginAuth } from "../../hooks/useLoginAuth";
import { ErrorMsg, successMsg } from "../../helpers";
import { useToggle } from "../../hooks/useToggle";
import { useInput } from "../../hooks/useInput";
import React from "react";
import "./Login.css";

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
        <div className="Login" style={error && { marginTop: "10px" }}>
            {error && <ErrorMsg error={error} />}
            <form onSubmit={handleSubmit} style={error && { marginTop: "30px" }}>
                <p>Login</p>
                <div className="mb-0">
                    <label htmlFor="email" className="form-label">
                        Email :
                    </label>
                    <input type="email" required value={email} onChange={updateEmail} className="shadow-none form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-0">
                    <label htmlFor="password" className="form-label">
                        Password :
                    </label>
                    <input type={showPassword ? "text" : "password"} required value={password} onChange={updatePassword} className="shadow-none form-control" id="password" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" onClick={toggleShowPassword} className="form-check-input shadow-none" id="exampleCheck1" />
                    <label className="form-check-label " htmlFor="exampleCheck1">
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
