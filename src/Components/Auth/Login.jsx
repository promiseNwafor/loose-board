import React, { useState, useContext, useEffect } from "react";
import firebase from "../../lib/firebase";
import { AuthScreen } from "../../App";
import { SetIsRegister } from "./Auth";
import "./auth.css";
import LoadingIndicator from "../LoadingIndicator";

function Login() {
  const { setAuthScreen } = useContext(AuthScreen);
  const setIsRegister = useContext(SetIsRegister);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const login = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Input details");
    } else {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          setAuthScreen();
        })
        .then(() => {
          setLoading(false);
          resetInput();
          // window.location.pathname = "/";
          console.log(firebase.auth().currentUser);
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
        });
    }
    // setLoading(false);
  };

  const resetInput = () => {
    setEmail("");
    setPassword("");
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  useEffect(() => {}, [loading]);

  return (
    <div className="Login">
      <div className="logo">
        <img src="/logo.png" alt="Loosemedia logo" />
      </div>
      <div className="Box">
        <div className="wrap">
          <div className="h4">
            <h4>Login</h4>
          </div>
          <form>
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
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                type={passwordShown ? "text" : "password"}
              />
              <i
                className="fa fa-eye"
                aria-hidden="true"
                onClick={togglePasswordVisiblity}
              ></i>
            </div>
          </form>
          {/* <div className="Btn"> */}
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
              <button onClick={login} type="submit">
                LOGIN
              </button>
            </div>
          )}
          {/* </div> */}
        </div>
      </div>
      <div className="foot">
        <p onClick={() => setIsRegister(true)}>Don't have an account?</p>
      </div>
    </div>
  );
}

export default Login;
