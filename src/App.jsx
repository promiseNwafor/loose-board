import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import firebase from './lib/firebase'
import Register from './Components/Auth/Register'
import Auth from './Components/Auth/Auth'
import AddAccount from './Components/Admin/AddAccount'
import AddReport from './Components/User/AddReport'


export const AuthScreen = React.createContext()
export const AuthContext = React.createContext();


function App() {
    const accountsRef = firebase.firestore().collection("accounts");
    const facebookRef = firebase.firestore().collection("facebook");
    const twitterRef = firebase.firestore().collection("twitter");
    const instagramRef = firebase.firestore().collection("instagram");
    const linkedinRef = firebase.firestore().collection("linkedin");
    const [locale, setLocale] = useState('')
    const [isLogged, setIsLogged] = useState(false)
    const [managerAccounts, setManagerAccounts] = useState([])
    const [currentUser, setCurrentUser] = useState(null);
    
    const setAuthScreen = () => {
        localStorage.setItem('isRegistered', 'true');
    };

    const addToFacebook = (newAccount) => {
         facebookRef
            .doc(newAccount.id)
            .set(newAccount)
            .catch((err) => {
                console.log(err);
            }).then(()=> {
                console.log(newAccount)
            })
    }

    const addToInstagram = (newAccount) => {
         instagramRef
            .doc(newAccount.id)
            .set(newAccount)
            .catch((err) => {
                console.log(err);
            }).then(()=> {
                console.log(newAccount)
            })
    }

    const addToLinkedin = (newAccount) => {
         linkedinRef
            .doc(newAccount.id)
            .set(newAccount)
            .catch((err) => {
                console.log(err);
            }).then(()=> {
                console.log(newAccount)
            })
    }

    const addToTwitter = (newAccount) => {
         twitterRef
            .doc(newAccount.id)
            .set(newAccount)
            .catch((err) => {
                console.log(err);
            }).then(()=> {
                console.log(newAccount)
            })
    }

    const handleAddAccount = (newAccount) => {
         accountsRef
            .doc(newAccount.id)
            .update(newAccount)
            .catch((err) => {
                console.log(err);
            }).then(()=> {
                console.log(newAccount)
            })
    }

    const getManagerAccounts = () => {
        accountsRef.where('manager', '==', currentUser.displayName).onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach((doc) => {
                items.push(doc.data())
            })
            setManagerAccounts(items)
            // return items
        })
        console.log(managerAccounts)
    }

    useEffect(() => {
        setLocale(localStorage.getItem('isRegistered'))
        firebase.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
        currentUser ? getManagerAccounts() : console.log("No user yet")
        // console.log(isLogged)
    }, [currentUser])

    return (
        <AuthContext.Provider
      value={{
          managerAccounts,
          handleAddAccount,
          addToFacebook,
          addToInstagram,
          addToLinkedin,
          addToTwitter,
        currentUser,
      }}
    >
        <AuthScreen.Provider value={{setAuthScreen, setIsLogged}}>
            <Router>
                <div className="App">
                    <Switch>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                        <Route exact path="/addAccount">
                            <AddAccount />
                        </Route>
                        <Route exact path="/addReport">
                            <AddReport />
                        </Route>
                        <Route exact path="/register">
                            <Register />
                        </Route>
                    </Switch>
                    {/* { locale === 'true' ? <Login /> : <Register /> } */}
                </div>
            </Router>

        </AuthScreen.Provider>

    </AuthContext.Provider>

    )
}

export default App
