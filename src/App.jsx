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
  const [loading, setLoading] = useState(false);
  const [managerAccounts, setManagerAccounts] = useState([])
    const [currentUser, setCurrentUser] = useState(null);
    
    var date = new Date(),
    today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    
    const setAuthScreen = () => {
        localStorage.setItem('isRegistered', 'true');
    };

    const addToFacebook = (newAccount, updateAcc, day) => {
        setLoading(true)
        facebookRef.doc(day).get().then((res) => {
            if (res.exists){
                facebookRef.doc(day).update({
                   accounts: firebase.firestore.FieldValue.arrayUnion(updateAcc)
                })
                .catch((err) => {
                    console.log(err);
                }).then(()=> {
                    setLoading(false)
                    alert("Report added")
                })
            }else{
                facebookRef.doc(newAccount.id)
                .set(newAccount)
                .catch((err) => {
                    console.log(err);
                }).then(()=> {
                    setLoading(false)
                    alert("Report added")
                    console.log(newAccount)
                })
                
            }
        })
        setLoading(false)
    }

    const addToInstagram = (newAccount, updateAcc, day) => {
        setLoading(true)
         instagramRef.doc(day).get().then((res) => {
            if (res.exists){
                instagramRef.doc(day).update({
                   accounts: firebase.firestore.FieldValue.arrayUnion(updateAcc)
                })
                .catch((err) => {
                    console.log(err);
                }).then(()=> {
                    alert("Report added")
                    setLoading(false)
                })
            }else{
                instagramRef.doc(newAccount.id)
                .set(newAccount)
                .catch((err) => {
                    console.log(err);
                }).then(()=> {
                    alert("Report added")
                    setLoading(false)
                    console.log(newAccount)
                })
                
            }
        })
        setLoading(false)
    }

    const addToLinkedin = (newAccount, updateAcc, day) => {
                setLoading(true)
                linkedinRef
            .doc(day).get().then((res) => {
                if (res.exists){
                    linkedinRef.doc(day).update({
                       accounts: firebase.firestore.FieldValue.arrayUnion(updateAcc)
                    })
                    .set({newAccount})
                    .catch((err) => {
                        console.log(err);
                    }).then(()=> {
                        setLoading(false)
                alert("Report added")
                    })
                }else{
                    linkedinRef.doc(newAccount.id)
                    .set({newAccount})
                    .catch((err) => {
                        console.log(err);
                    }).then(()=> {
                        setLoading(false)
                        alert("Report added")
                        console.log(newAccount)
                    })
                    
                }
            })
            setLoading(false)
    }

    const addToTwitter = (newAccount, updateAcc, day) => {
                setLoading(true)
                twitterRef
            .doc(day).get().then((res) => {
                if (res.exists){
                    twitterRef.doc(day).update({
                       accounts: firebase.firestore.FieldValue.arrayUnion(updateAcc)
                    })
                    .catch((err) => {
                        console.log(err);
                    }).then(()=> {
                setLoading(false)
                alert("Report added")
            })
        }else{
            twitterRef.doc(newAccount.id)
            .set(newAccount)
            .catch((err) => {
                console.log(err);
            }).then(()=> {
                setLoading(false)
                alert("Report added")
                console.log(newAccount)
                    })
    
                }
                setLoading(false)
            })
    }

    const handleAddAccount = (newAccount) => {
            setLoading(true)
         accountsRef
            .doc(newAccount.id)
            .update(newAccount)
            .catch((err) => {
                console.log(err);
            }).then(()=> {
                setLoading(false)
                alert("Account added")
                console.log(newAccount)
            })
            setLoading(false)
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
        // console.log(managerAccounts)
    }

    useEffect(() => {
        setLocale(localStorage.getItem('isRegistered'))
        firebase.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
        currentUser ? getManagerAccounts() : console.log("No user yet")
        // console.log(today)
    }, [currentUser, loading])

    useEffect(() => {
    }, [loading])

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
        loading,
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
