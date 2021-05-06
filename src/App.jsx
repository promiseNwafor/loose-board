import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "./lib/firebase";
import Auth from "./Components/Auth/Auth";
import AddAccount from "./Components/Admin/AddAccount";
import AddReport from "./Components/User/AddReport";
import ManagerAnalytics from "./Components/User/ManagerAnalytics";
import Analytics from "./Components/Admin/Analytics";

export const AuthScreen = React.createContext();
export const AuthContext = React.createContext();

function App() {
  const accountsRef = firebase.firestore().collection("account");
  const [isAdmin, setIsAdmin] = useState(false);
  const [locale, setLocale] = useState("");
  const [isLogged, setIsLogged] = useState("false");
  const [loading, setLoading] = useState(false);
  const [managerAccounts, setManagerAccounts] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  var date = new Date(),
    today =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  const setAuthScreen = () => {
    localStorage.setItem("isLogged", "true");
    localStorage.setItem("isRegistered", "true");
  };

  const addToFacebook = (id, newAccount) => {
    setLoading(true);
    accountsRef
      .doc(id)
      .collection("facebook")
      .doc(newAccount.id)
      .set(newAccount)
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        setLoading(false);
        alert("Report added");
        console.log(newAccount);
      });
    setLoading(false);
  };

  const addToInstagram = (id, newAccount) => {
    setLoading(true);
    accountsRef
      .doc(id)
      .collection("instagram")
      .doc(newAccount.id)
      .set(newAccount)
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        setLoading(false);
        alert("Report added");
        console.log(newAccount);
      });
    setLoading(false);
  };

  const addToLinkedin = (id, newAccount) => {
    setLoading(true);
    accountsRef
      .doc(id)
      .collection("linkedin")
      .doc(newAccount.id)
      .set(newAccount)
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        setLoading(false);
        alert("Report added");
        console.log(newAccount);
      });
    setLoading(false);
  };

  const addToTwitter = (id, newAccount) => {
    setLoading(true);
    accountsRef
      .doc(id)
      .collection("twitter")
      .doc(newAccount.id)
      .set(newAccount)
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        setLoading(false);
        alert("Report added");
        console.log(newAccount);
      });
    setLoading(false);
  };

  const handleAddAccount = (newAccount) => {
    setLoading(true);
    accountsRef
      .doc(newAccount.id)
      .set(newAccount)
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        setLoading(false);
        alert("Account added");
        console.log(newAccount);
      });

    setLoading(false);
  };

  const getManagerAccounts = () => {
    accountsRef
      .where("manager", "==", currentUser.displayName)
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setManagerAccounts(items);
        // return items
      });
    // console.log(managerAccounts)
  };

  const getAccounts = () => {
    accountsRef.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setAccounts(items);
    });
    console.log(accounts);
  };

  useEffect(() => {
    setLocale(localStorage.getItem("isLogged"));
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    currentUser ? getManagerAccounts() : console.log("No user yet");
    // console.log(today)
    getAccounts();
    currentUser
      ? currentUser.email.includes("seun") ||
        currentUser.email.includes("ized") ||
        currentUser.email.includes("kemi") ||
        currentUser.email.includes("charles") ||
        currentUser.email.includes("mobola")
        ? setIsAdmin(true)
        : setIsAdmin(false)
      : console.log("no currentUser");
    console.log(isLogged);
  }, [currentUser, isAdmin]);

  useEffect(() => {
    console.log(currentUser);
    console.log(locale);
  }, [loading, isAdmin]);

  return (
    <AuthContext.Provider
      value={{
        setCurrentUser,
        handleAddAccount,
        addToFacebook,
        addToInstagram,
        addToLinkedin,
        addToTwitter,
        setIsAdmin,
        isAdmin,
        managerAccounts,
        currentUser,
        loading,
        accounts,
      }}
    >
      <AuthScreen.Provider value={{ setAuthScreen, setIsLogged }}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/">
                {locale === "true" && isAdmin ? (
                  <Analytics />
                ) : locale === "true" && !isAdmin ? (
                  <ManagerAnalytics />
                ) : (
                  <Auth />
                )}
              </Route>
              <Route exact path="/home">
                {isAdmin ? <Analytics /> : <ManagerAnalytics />}
              </Route>
              <Route exact path="/auth">
                <Auth />
              </Route>
              <Route exact path="/addReport">
                <AddReport />
              </Route>
              {/* <Route exact path="/overview">
                            <Overview />
                        </Route> */}
              <Route exact path="/addAccount">
                <AddAccount />
              </Route>
              <Route exact path="/analytics">
                <Analytics />
              </Route>
              <Route exact path="/managerAnalytics">
                <ManagerAnalytics />
              </Route>
            </Switch>
            {/* { locale === 'true' ? <Login /> : <Register /> } */}
          </div>
        </Router>
      </AuthScreen.Provider>
    </AuthContext.Provider>
  );
}

export default App;
