import React, { useState, useContext } from 'react'
import firebase from '../../lib/firebase'
import { AuthScreen, AuthContext } from '../../App'
import './auth.css'
import { SetIsRegister } from './Auth';

function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

    const setIsRegister = useContext(SetIsRegister)
    const setAuthScreen = useContext(AuthScreen)
    const {currentUser} = useContext(AuthContext)

    const register = (e) => {
        e.preventDefault()
        if (email === "" || password === "" || password !== confirmPassword) {
            alert("Input valid details")
            resetInput()
        } else {
            setLoading(true)
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password).then(() => {
                    firebase.auth().currentUser.updateProfile({ displayName: username })
                })
                .then(() => {
                    // setAuthScreen()
                    currentUser ? currentUser.email.includes('seun') ? window.location.pathname = '/addAccount' : window.location.pathname = '/addReport'
                    : console.log('None')
                    console.log(currentUser.t.code)
                    setLoading(false)
                    resetInput();
                })
                .catch((err) => {
                    console.error(err);
                });
                setLoading(false)
        }
    };

    const resetInput = () => {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      };


    return (
        <div className="Register">
            <div className="logo">
                <img src="/logo.png" alt="Loosemedia logo"/>
            </div>
        <div className="Box">
        <div className="wrap">
            <div className="h4"><h4>Register</h4></div>
            <form>
                <div className="Input">
                    <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Name" type="text" />

                </div>
                <div className="Input">
                    <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" type="text" />

                </div>
                <div className="Input">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="text" />

                </div>
                <div className="Input">
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" type="text" />

                </div>
            </form>
            <div className="Btn">
            {
                  loading ? <p>Loading...</p> :
                <button onClick={register} type="submit">REGISTER</button>
            }
            </div>

        </div>
        </div>
        <div className="foot">
            <p onClick={() => setIsRegister(false)}>Already have an account?</p>
        </div>
        </div>
    )
}

export default Register
