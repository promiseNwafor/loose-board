import React, { useState, useEffect } from 'react'
import "./auth.css";
import Login from './Login';
import Register from './Register';

export const SetIsRegister = React.createContext()


function Auth() {
  const [isRegister, setIsRegister] = useState(true);

  useEffect(() => {
    
  }, [isRegister])

  return (
    <div className="Auth">
          <img src="/bg.png" className="bg" alt="Background"/>
        <SetIsRegister.Provider value={setIsRegister}>
          {
            isRegister ? <Register /> : <Login />
          }
    </SetIsRegister.Provider>
      </div>

  )
}

export default Auth
