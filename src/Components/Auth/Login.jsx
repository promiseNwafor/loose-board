import React, { useState, useContext, useEffect } from 'react'
import firebase from '../../lib/firebase'
import { SetIsRegister } from './Auth';
import './auth.css' 

function Login() {

    const setIsRegister = useContext(SetIsRegister)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

    const login = (e) => {
        e.preventDefault()
        if (email === "" || password === "") {
          alert("Input details")
        } else {
          setLoading(true)
          firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            // .then(() => {
            //   currentUser ? currentUser.email.includes('seun') ? setIsAdmin(true) : setIsAdmin(false) 
            //         : console.log('no curentUser')
            //         console.log(currentUser.email)
            //       })
                  .then(() => {
                    setLoading(false)
                    resetInput();
                    window.location.pathname = '/home'
                    
            })
            .catch((err) => {
              console.error(err);
            });
        }
        setLoading(false)
      };

      const resetInput = () => {
        setEmail("");
        setPassword("");
      };

      useEffect(() => {

      }, [loading])

    return (
        <div className="Login">
          <div className="logo">
                <img src="/logo.png" alt="Loosemedia logo"/>
            </div>
        <div className="Box">
          <div className="wrap">
              <div className="h4"><h4>Login</h4></div>
              <form>
                  <div className="Input">
                      <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" type="text"/>  
                      
                  </div>
                  <div className="Input">
                      <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" type="text"/>  
                      {/* <i class="fa fa-eye" aria-hidden="true"></i> */}
                      {/* <i class="fa fa-eye-slash" aria-hidden="true"></i> */}
                  </div>
              </form>
              <div className="Btn">
                {
                  loading ? <p>Loading...</p> :
                  <button onClick={login} type="submit">
                    LOGIN
                    </button>
                  }
              </div>

          </div>
        </div>
        <div className="foot">
            <p onClick={() => setIsRegister(true)}>Don't have an account?</p>
        </div>
        </div>
    )
}

export default Login
