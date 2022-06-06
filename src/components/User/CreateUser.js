import React, { useRef, useState } from "react";
import { useAuth, signup } from "../../utils/useAuth";
import { Link } from "@gatsbyjs/reach-router";

export default function CreateUser() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordconfirmRef = useRef();
  const currentUser = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup() {
    setLoading(true);
    try {
      setError("");
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        passwordconfirmRef.current.value
      );
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
    // we don't want that people can create multiple accounts by clicking
  }

  return (
    <>
      <div className="user_container">
        <h2 className="user_container__title">Create Account</h2>
        <div class="login-page">
          <div className="form">
            <div className="register-form">
              {error && <span className="error">{error}</span>}
              <input ref={emailRef} placeholder="Email" />
              <input ref={passwordRef} type="password" placeholder="Password" />
              <input
                ref={passwordconfirmRef}
                type="password"
                placeholder="confirm your Password"
              />
              <button disabled={loading || currentUser} onClick={handleSignup}>
                Signup
              </button>
              <div>
                <span className="message">
                  Already have an account? <Link to="/Login">Login</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
