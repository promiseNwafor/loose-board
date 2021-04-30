import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import firebase from './lib/firebase'
import Auth from './Components/Auth/Auth'
import AddAccount from './Components/Admin/AddAccount'
import AddReport from './Components/User/AddReport'
import Overview from './Components/Admin/Overview'


export const AuthScreen = React.createContext()
export const AuthContext = React.createContext();


function App() {
    const accountsRef = firebase.firestore().collection("accounts");
    const facebookRef = firebase.firestore().collection("facebook");
    const twitterRef = firebase.firestore().collection("twitter");
    const instagramRef = firebase.firestore().collection("instagram");
    const linkedinRef = firebase.firestore().collection("linkedin");
    const [isAdmin, setIsAdmin] = useState(false)
    const [locale, setLocale] = useState('')
    const [isLogged, setIsLogged] = useState(false)
  const [loading, setLoading] = useState(false);
  const [managerAccounts, setManagerAccounts] = useState([])
  const [accounts, setAccounts] = useState([])
  const [facebookItems, setFacebookItems] = useState([])
  const [twitterItems, setTwitterItems] = useState([])
  const [instagramItems, setInstagramItems] = useState([])
  const [linkedinItems, setLinkedinItems] = useState([])
    const [currentUser, setCurrentUser] = useState(null);
    
    var date = new Date(),
    today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    
    const setAuthScreen = () => {
        localStorage.setItem('isRegistered', 'true');
    };

    const addToFacebook = (newAccount, updateAcc, day) => {
        setLoading(true)
        // facebookRef.doc(day).get().then((res) => {
        //     if (res.exists){
        //         facebookRef.doc(day).update({
        //            updateAcc
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         }).then(()=> {
        //             setLoading(false)
        //             alert("Report added")
        //         })
        //     }else{
                facebookRef.doc(newAccount.id)
                .set(newAccount)
                .catch((err) => {
                    console.log(err);
                }).then(()=> {
                    setLoading(false)
                    alert("Report added")
                    console.log(newAccount)
                })
                
        //     }
        // })
        setLoading(false)
    }

    const addToInstagram = (newAccount, updateAcc, day) => {
        setLoading(true)
        //  instagramRef.doc(day).get().then((res) => {
        //     if (res.exists){
        //         instagramRef.doc(day).update({
        //            accounts: firebase.firestore.FieldValue.arrayUnion(updateAcc)
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         }).then(()=> {
        //             alert("Report added")
        //             setLoading(false)
        //         })
        //     }else{
                instagramRef.doc(newAccount.id)
                .set(newAccount)
                .catch((err) => {
                    console.log(err);
                }).then(()=> {
                    alert("Report added")
                    setLoading(false)
                    console.log(newAccount)
                })
                
        //     }
        // })
        setLoading(false)
    }

    const addToLinkedin = (newAccount, updateAcc, day) => {
                setLoading(true)
            //     linkedinRef
            // .doc(day).get().then((res) => {
            //     if (res.exists){
            //         linkedinRef.doc(day).update({
            //            accounts: firebase.firestore.FieldValue.arrayUnion(updateAcc)
            //         })
            //         .set({newAccount})
            //         .catch((err) => {
            //             console.log(err);
            //         }).then(()=> {
            //             setLoading(false)
            //     alert("Report added")
            //         })
            //     }else{
                    linkedinRef.doc(newAccount.id)
                    .set({newAccount})
                    .catch((err) => {
                        console.log(err);
                    }).then(()=> {
                        setLoading(false)
                        alert("Report added")
                        console.log(newAccount)
                    })
                    
            //     }
            // })
            setLoading(false)
    }

    const addToTwitter = (newAccount, updateAcc, day) => {
                setLoading(true)
        //         twitterRef
        //     .doc(day).get().then((res) => {
        //         if (res.exists){
        //             twitterRef.doc(day).update({
        //                accounts: firebase.firestore.FieldValue.arrayUnion(updateAcc)
        //             })
        //             .catch((err) => {
        //                 console.log(err);
        //             }).then(()=> {
        //         setLoading(false)
        //         alert("Report added")
        //     })
        // }else{
            twitterRef.doc(newAccount.id)
            .set(newAccount)
            .catch((err) => {
                console.log(err);
            }).then(()=> {
                setLoading(false)
                alert("Report added")
                console.log(newAccount)
                    })
    
                    setLoading(false)
                // }
            // })
    }

    const handleAddAccount = (newAccount, id) => {
            setLoading(true)
            accountsRef
            .doc(id).get().then((res) => {
                if (res.exists){
         accountsRef
            .doc(id)
            .update(newAccount)
            .catch((err) => {
                console.log(err);
            }).then(()=> {
                setLoading(false)
                alert("Account added")
                console.log(newAccount)
            })
        }else{
            accountsRef
               .doc(newAccount.id)
               .set(newAccount)
               .catch((err) => {
                   console.log(err);
               }).then(()=> {
                   setLoading(false)
                   alert("Account added")
                   console.log(newAccount)
               })

        }
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

    const getAccounts = () => {
        accountsRef.onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach((doc) => {
                items.push(doc.data())
            })
            setAccounts(items)
        })
        console.log(accounts)
    }

    const getFacebook = (accName) => {
        // where("state", "==", "CO").where("name", "==", "Denver")
        const items = []
        facebookRef.where("accountName", "==", accName).onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                items.push(doc.data())
            })
            // setFacebookItems(items)
            console.log(items)
            // console.log(facebookItems)
        })
        // return items
    }

    const getTwitter = () => {
        twitterRef.onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach((doc) => {
                items.push(doc.data())
            })
            setTwitterItems(items)
        })
        console.log(twitterItems)
    }

    const getInstagram = () => {
        instagramRef.onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach((doc) => {
                items.push(doc.data())
            })
            setInstagramItems(items)
        })
        console.log(instagramItems)
    }

    const getLinkedin = () => {
        linkedinRef.onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach((doc) => {
                items.push(doc.data())
            })
            setLinkedinItems(items)
        })
        console.log(linkedinItems)
    }

    useEffect(() => {
        setLocale(localStorage.getItem('isRegistered'))
        firebase.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
        currentUser ? getManagerAccounts() : console.log("No user yet")
        // console.log(today)
        getAccounts()
        // getFacebook("Cellar Central")
    }, [currentUser])

    // useEffect(() => {
    //     getAccounts()
    // }, [])

    useEffect(() => {
        console.log(isAdmin)
    }, [loading, isAdmin])

    return (
        <AuthContext.Provider
      value={{
        setCurrentUser,
        getFacebook,
        handleAddAccount,
        addToFacebook,
        addToInstagram,
        addToLinkedin,
        addToTwitter,
        setIsAdmin,
        managerAccounts,
        currentUser,
        loading,
        accounts,
        facebookItems,
      }}
    >
        <AuthScreen.Provider value={{setAuthScreen, setIsLogged}}>
            <Router>
                <div className="App">
                    <Switch>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                        <Route exact path="/home">
                            { isAdmin ?
                                <AddAccount /> 
                                : <AddReport />}
                        </Route>
                        {/* <Route exact path="/addReport">
                            <AddReport />
                        </Route> */}
                        <Route exact path="/overview">
                            <Overview />
                        </Route>
                        <Route exact path="/addAccount">
                            <AddAccount />
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
