import React, { useState, useEffect } from "react";
import { send } from "emailjs-com";
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
  const [isWeekend, setIsWeekend] = useState(false);
  const setAuthScreen = () => {
    localStorage.setItem("isLogged", "true");
    localStorage.setItem("isRegistered", "true");
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.setItem("isLogged", "false");
      })
      .then(() => {
        setLocale(localStorage.getItem("isLogged"));
        window.location.pathname = "/";
      });
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
    // setLoading(false);
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
        // alert("Report added");
        console.log(newAccount);
      });
    // setLoading(false);
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
        // alert("Report added");
        console.log(newAccount);
      });
    // setLoading(false);
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
        // alert("Report added");
        console.log(newAccount);
      });
    // setLoading(false);
  };

  const handleAddAccount = (newAccount) => {
    setLoading(true);
    accountsRef
      .doc(newAccount.id)
      .get()
      .then((res) => {
        if (res.exists) {
          accountsRef
            .doc(newAccount.id)
            .update(newAccount)
            .catch((err) => {
              console.log(err);
            })
            .then(() => {
              setLoading(false);
              alert("Account added");
              console.log(newAccount);
            });
        } else {
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
        }
      });

    // setLoading(false);
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
    // console.log(accounts);
  };

  const handleSendEmail = () => {
    send(
      "service_leolhdo",
      "template_dqdqsfn",
      {
        from_name: "Loosebot",
        to_name: currentUser.displayName,
        to_email: currentUser.email,
        message: "It's time for your daily report,<br/><b> Ensure to do so</b>",
        reply_to: "",
      },
      "user_TcK80igUFauKfN3Gqb1QS"
    )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
      })
      .catch((err) => {
        console.log("FAILED...", err);
      });
    // console.log("Happening");
  };

  useEffect(() => {
    setLocale(localStorage.getItem("isLogged"));
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    currentUser ? getManagerAccounts() : console.log("No user yet");
    getAccounts();
    currentUser
      ? currentUser.email.includes("seun") ||
        currentUser.email.includes("ized") ||
        currentUser.email.includes("kemi") ||
        currentUser.email.includes("charles") ||
        currentUser.email.includes("elizabeth") ||
        currentUser.email.includes("joan") ||
        currentUser.email.includes("mobola")
        ? setIsAdmin(true)
        : setIsAdmin(false)
      : console.log("no currentUser");
      // console.log(currentUser);
  }, [currentUser, isAdmin, locale]);

  useEffect(() => {
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth();
    var day = currentTime.getDate();
    var hour = 18;
    var minute = 0;
    var second = 0;
    var atSix = new Date(year, month, day, hour, minute, second);
    var positiveDifference = atSix.getTime() - currentTime.getTime();
    var negativeDifference = 86400000 - (currentTime.getTime() - atSix.getTime());
    var delay =
      atSix.getTime() > currentTime.getTime()
        ? positiveDifference
        : negativeDifference;

    // console.log(atSix.getTime(), currentTime.getTime());
    // console.log(atSix.getTime() - currentTime.getTime());
    // console.log(delay);
    // 86400000 milliseconds in 1 day

    const handleInterval = () => setInterval(handleSendEmail, 86400000);

    currentUser && !isAdmin && !isWeekend
      ? setTimeout(() => {
          handleInterval();
        }, delay)
      : clearInterval(handleInterval());
  }, [currentUser, isAdmin, isWeekend]);

  useEffect(() => {
    var day = new Date().getDay()
    setIsWeekend((day === 6) || (day  === 0))
    // console.log(isWeekend);
  }, [isWeekend]);

  useEffect(() => {
    // console.log(currentUser);
    // console.log(locale);
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
        handleLogout,
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
          </div>
        </Router>
      </AuthScreen.Provider>
    </AuthContext.Provider>
  );
}

export default App;
