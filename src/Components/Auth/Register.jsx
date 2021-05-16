import React, { useState, useContext } from "react";
import firebase from "../../lib/firebase";
import { AuthScreen } from "../../App";
import "./auth.css";
import { SetIsRegister } from "./Auth";
import LoadingIndicator from "../LoadingIndicator";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const setIsRegister = useContext(SetIsRegister);
  const { setAuthScreen } = useContext(AuthScreen);

  const register = (e) => {
    e.preventDefault();
    if (email === "" || password === "" || password !== confirmPassword) {
      alert("Input valid details");
      resetInput();
    } else {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase.auth().currentUser.updateProfile({ displayName: username });
        })
        .then(() => {
          setAuthScreen();
          setLoading(false);
          resetInput();
          window.location.pathname = "/";
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
    // setLoading(false);
  };

  const resetInput = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <div className="Register">
      <div className="logo">
        <img src="/logo.png" alt="Loosemedia logo" />
      </div>
      <div className="Box">
        <div className="wrap">
          <div className="h4">
            <h4>Register</h4>
          </div>
          <form>
            <div className="Input">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Name"
                type="text"
              />
            </div>
            <div className="Input">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email"
                type="email"
              />
            </div>
            <div className="Input password">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type={passwordShown ? "text" : "password"}
              />
              <i
                className="fa fa-eye"
                aria-hidden="true"
                onClick={togglePasswordVisiblity}
              ></i>
            </div>
            <div className="Input password">
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                type={passwordShown ? "text" : "password"}
              />
              <i
                className="fa fa-eye"
                aria-hidden="true"
                onClick={togglePasswordVisiblity}
              ></i>
            </div>
          </form>
          {loading ? (
            <center>
              <LoadingIndicator
                className="loader"
                type="Circles"
                height={30}
                width={30}
              />
            </center>
          ) : (
            <div className="Btn">
              <button onClick={register} type="submit">
                REGISTER
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="foot">
        <p onClick={() => setIsRegister(false)}>Already have an account?</p>
      </div>
    </div>
  );
}

export default Register;
