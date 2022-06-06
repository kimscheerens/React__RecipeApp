import React, { useRef, useState } from "react";
import { Link } from "@gatsbyjs/reach-router";
import { login, logout, useAuth } from "../../utils/useAuth";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const currentUser = useAuth();

  // const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    try {
      console.log(handleLogin);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert("Failed to sign in");
    }
    setLoading(false);
    setError("You are logged in");
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
    } catch {
      alert("error");
    }
    setLoading(false);
    setError("You are logged out");
  }

  return (
    <>
      <div className="user_container">
        <h2 className="user_container__title">Log in</h2>
        <div class="login-page">
          <div class="form">
            <div className="register-form">
              {error && <span className="error">{error}</span>}
              <span>Email:</span>
              <input type="email" ref={emailRef} required></input>
              <span>Password:</span>
              <input type="password" ref={passwordRef} required></input>
              <button disabled={loading} onClick={handleLogin} type="submit">
                Log in
              </button>
              <button disabled={loading || !currentUser} onClick={handleLogout}>
                Log out
              </button>
            </div>
            <div>
              <span className="message">
                Don't have an account? <Link to="/CreateUser"> Create one</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
