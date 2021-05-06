import React, { useState, useEffect, useContext } from "react";
import firebase from "../../lib/firebase";
import { AuthContext } from "../../App";
import Popup from "../Admin/Popup";
import "../Admin/admin.css";
import Nav from "../Nav";

function ManagerAnalytics() {
  const { currentUser, isAdmin } = useContext(AuthContext);
  const accountsRef = firebase.firestore().collection("account");
  const [accounts, setAccounts] = useState([]);
  const [accFacebook, setAccFacebook] = useState();
  const [accTwitter, setAccTwitter] = useState();
  const [accInstagram, setAccInstagram] = useState();
  const [accLinkedin, setAccLinkedin] = useState();
  const [metric, setMetric] = useState("");
  const [totalMetricFacebook, setTotalMetricFacebook] = useState({});
  const [totalMetricTwitter, setTotalMetricTwitter] = useState({});
  const [totalMetricInstagram, setTotalMetricInstagram] = useState({});
  const [totalMetricLinkedin, setTotalMetricLinkedin] = useState({});
  const [error, setError] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const viewFacebook = async (account) => {
    // ===============set the assigned target metrics===============
    var itemTotal;
    accountsRef.doc(account.label).onSnapshot((querySnapshot) => {
      itemTotal = querySnapshot.data().facebook;
      // console.log(itemTotal);
    });
    var finalAns;
    const items = [];
    accounts.length > 0
      ? accountsRef
          .doc(account.label)
          .collection("facebook")
          .get()
          .then((response) => {
            // ===============get the subcollection metric===============
            response.forEach((document) => {
              const fetchedItem = {
                id: document.id,
                ...document.data(),
              };
              items.push(fetchedItem);
            });
            // console.log(items);
            // ===============add up each metric report===============
            var likes,
              comments,
              reach,
              shares,
              leads,
              impressions,
              downloads,
              views,
              followers;
            likes = comments = reach = shares = leads = impressions = downloads = views = followers = 0;
            items.forEach((itemMetric) => {
              likes += parseInt(itemMetric.likes);
              comments += parseInt(itemMetric.comments);
              reach += parseInt(itemMetric.reach);
              shares += parseInt(itemMetric.shares);
              leads += parseInt(itemMetric.leads);
              impressions += parseInt(itemMetric.impressions);
              downloads += parseInt(itemMetric.downloads);
              views += parseInt(itemMetric.views);
              followers += parseInt(itemMetric.followers);
            });
            // ===============get the percentage met===============
            finalAns = {
              likes: ((likes / itemTotal.likes) * 100).toFixed(0),
              comments: ((comments / itemTotal.comments) * 100).toFixed(0),
            };
            // console.log(`${likes/parseInt(itemTotal.likes)} ${itemTotal.likes} likes and ${comments} comments`)
            // console.log(finalAns)
            setTotalMetricFacebook(finalAns);
          })
          .catch((err) => {
            setError(err);
          })
      : console.log("No accounts yet");
  };

  const viewTwitter = async (account) => {
    // ===============set the assigned target metrics===============
    var itemTotal;
    accountsRef.doc(account.label).onSnapshot((querySnapshot) => {
      itemTotal = querySnapshot.data().facebook;
      // console.log(itemTotal);
    });
    var finalAns;
    const items = [];
    accounts.length > 0
      ? accountsRef
          .doc(account.label)
          .collection("twitter")
          .get()
          .then((response) => {
            // ===============get the subcollection metric===============
            response.forEach((document) => {
              const fetchedItem = {
                id: document.id,
                ...document.data(),
              };
              items.push(fetchedItem);
            });
            // console.log(items);
            // ===============add up each metric report===============
            var likes,
              comments,
              reach,
              shares,
              leads,
              impressions,
              downloads,
              views,
              followers;
            likes = comments = reach = shares = leads = impressions = downloads = views = followers = 0;
            items.forEach((itemMetric) => {
              likes += parseInt(itemMetric.likes);
              comments += parseInt(itemMetric.comments);
              reach += parseInt(itemMetric.reach);
              shares += parseInt(itemMetric.shares);
              leads += parseInt(itemMetric.leads);
              impressions += parseInt(itemMetric.impressions);
              downloads += parseInt(itemMetric.downloads);
              views += parseInt(itemMetric.views);
              followers += parseInt(itemMetric.followers);
            });
            // ===============get the percentage met===============
            finalAns = {
              likes: ((likes / itemTotal.likes) * 100).toFixed(0),
              comments: ((comments / itemTotal.comments) * 100).toFixed(0),
            };
            // console.log(`${likes/parseInt(itemTotal.likes)} ${itemTotal.likes} likes and ${comments} comments`)
            // console.log(finalAns)
            setTotalMetricTwitter(finalAns);
          })
          .catch((err) => {
            setError(err);
          })
      : console.log("No accounts yet");
  };

  const viewInstagram = async (account) => {
    // ===============set the assigned target metrics===============
    var itemTotal;
    accountsRef.doc(account.label).onSnapshot((querySnapshot) => {
      itemTotal = querySnapshot.data().facebook;
      // console.log(itemTotal);
    });
    var finalAns;
    const items = [];
    accounts.length > 0
      ? accountsRef
          .doc(account.label)
          .collection("instagram")
          .get()
          .then((response) => {
            // ===============get the subcollection metric===============
            response.forEach((document) => {
              const fetchedItem = {
                id: document.id,
                ...document.data(),
              };
              items.push(fetchedItem);
            });
            // console.log(items);
            // ===============add up each metric report===============
            var likes,
              comments,
              reach,
              shares,
              leads,
              impressions,
              downloads,
              views,
              saves,
              followers;
            likes = comments = reach = shares = saves = leads = impressions = downloads = views = followers = 0;
            items.forEach((itemMetric) => {
              likes += parseInt(itemMetric.likes);
              comments += parseInt(itemMetric.comments);
              reach += parseInt(itemMetric.reach);
              shares += parseInt(itemMetric.shares);
              leads += parseInt(itemMetric.leads);
              impressions += parseInt(itemMetric.impressions);
              downloads += parseInt(itemMetric.downloads);
              views += parseInt(itemMetric.views);
              followers += parseInt(itemMetric.followers);
              saves += parseInt(itemMetric.saves);
            });
            // ===============get the percentage met===============
            finalAns = {
              likes: ((likes / itemTotal.likes) * 100).toFixed(0),
              comments: ((comments / itemTotal.comments) * 100).toFixed(0),
            };
            // console.log(`${likes/parseInt(itemTotal.likes)} ${itemTotal.likes} likes and ${comments} comments`)
            // console.log(finalAns)
            setTotalMetricInstagram(finalAns);
          })
          .catch((err) => {
            setError(err);
          })
      : console.log("No accounts yet");
  };

  const viewLinkedin = async (account) => {
    // ===============set the assigned target metrics===============
    var itemTotal;
    accountsRef.doc(account.label).onSnapshot((querySnapshot) => {
      itemTotal = querySnapshot.data().facebook;
      // console.log(itemTotal);
    });
    var finalAns;
    const items = [];
    accounts.length > 0
      ? accountsRef
          .doc(account.label)
          .collection("linkedin")
          .get()
          .then((response) => {
            // ===============get the subcollection metric===============
            response.forEach((document) => {
              const fetchedItem = {
                id: document.id,
                ...document.data(),
              };
              items.push(fetchedItem);
            });
            // console.log(items);
            // ===============add up each metric report===============
            var likes,
              comments,
              reach,
              shares,
              leads,
              impressions,
              downloads,
              views,
              followers;
            likes = comments = reach = shares = leads = impressions = downloads = views = followers = 0;
            items.forEach((itemMetric) => {
              likes += parseInt(itemMetric.likes);
              comments += parseInt(itemMetric.comments);
              reach += parseInt(itemMetric.reach);
              shares += parseInt(itemMetric.shares);
              leads += parseInt(itemMetric.leads);
              impressions += parseInt(itemMetric.impressions);
              downloads += parseInt(itemMetric.downloads);
              views += parseInt(itemMetric.views);
              followers += parseInt(itemMetric.followers);
            });
            // ===============get the percentage met===============
            finalAns = {
              likes: ((likes / itemTotal.likes) * 100).toFixed(0),
              comments: ((comments / itemTotal.comments) * 100).toFixed(0),
            };
            // console.log(`${likes/parseInt(itemTotal.likes)} ${itemTotal.likes} likes and ${comments} comments`)
            // console.log(finalAns)
            setTotalMetricLinkedin(finalAns);
          })
          .catch((err) => {
            setError(err);
          })
      : console.log("No accounts yet");
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setIsLoading(true);
    // viewFacebook(accounts[0])
    currentUser
      ? accountsRef
          .where("manager", "==", currentUser.displayName)
          .get()
          .then((response) => {
            const items = [];
            response.forEach((document) => {
              const fetchedItem = {
                id: document.id,
                ...document.data(),
              };
              items.push(fetchedItem);
            });
            setAccounts(items);
            setIsLoading(false);
            // console.log(accounts);
          })
          .catch((err) => {
            setError(err);
            setIsLoading(true);
          })
      : console.log("No user");
    return function cleanup() {
      abortController.abort();
    };
  }, [currentUser]);

  useEffect(() => {
    accFacebook ? viewFacebook(accFacebook) : console.log("acc not ready");
    // console.log(accFacebook);
  }, [accFacebook]);

  useEffect(() => {
    accTwitter ? viewTwitter(accTwitter) : console.log("acc not ready");
    // console.log(accTwitter);
  }, [accTwitter]);

  useEffect(() => {
    accInstagram ? viewInstagram(accInstagram) : console.log("acc not ready");
    // console.log(accInstagram);
  }, [accInstagram]);

  useEffect(() => {
    accLinkedin ? viewLinkedin(accLinkedin) : console.log("acc not ready");
    // console.log(accLinkedin);
  }, [accLinkedin]);

  useEffect(() => {
    // console.log(totalMetricFacebook);
  }, [totalMetricFacebook]);

  useEffect(() => {
    // console.log(totalMetricTwitter);
  }, [totalMetricTwitter]);

  useEffect(() => {
    // console.log(totalMetricInstagram);
  }, [totalMetricInstagram]);

  useEffect(() => {
    // console.log(totalMetricLinkedin);
  }, [totalMetricLinkedin]);

  useEffect(() => {
    // console.log(totalMetricFacebook);
  }, [metric]);

  useEffect(() => {
    // console.log(totalMetricFacebook);
  }, [isOpen]);

  if (!currentUser || currentUser.email === null) {
    return (
      <div>
        <center>
          <h2>Please ensure you're signed in</h2>
        </center>
      </div>
    );
  }
  return (
    <div className="Cover">
      <Nav
        path="/addReport"
        name={currentUser ? currentUser.displayName : ""}
      />
      {!isAdmin ? (
        <div className="Analytics">
          <div className="wrap">
            <div className="head">
              <h3>Here's your overview</h3>
            </div>
            {isLoading ? (
              <center>
                <h2>Loading...</h2>
              </center>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Account</th>
                    <th>Facebook</th>
                    <th>Twitter</th>
                    <th>Instagram</th>
                    <th>Linkedin</th>
                  </tr>
                </thead>
                {accounts.map((account) => {
                  return (
                    <tbody key={account.id}>
                      <tr>
                        <td>{account.label}</td>
                        <td>
                          <small
                            onClick={() => {
                              setMetric("facebook");
                              setAccFacebook(account);
                              togglePopup();
                            }}
                          >
                            View
                          </small>
                        </td>
                        <td>
                          <small
                            onClick={() => {
                              setMetric("twitter");
                              setAccTwitter(account);
                              togglePopup();
                            }}
                          >
                            View
                          </small>
                        </td>
                        <td>
                          <small
                            onClick={() => {
                              setMetric("instagram");
                              setAccInstagram(account);
                              togglePopup();
                            }}
                          >
                            View
                          </small>
                        </td>
                        <td>
                          <small
                            onClick={() => {
                              setMetric("linkedin");
                              setAccLinkedin(account);
                              togglePopup();
                            }}
                          >
                            View
                          </small>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            )}
            {isOpen && (
              <Popup
                content={
                  <div>
                    <div className="head">
                      <h3>Percentage met so far</h3>
                    </div>
                    {metric === "facebook" ? (
                      <>
                        <p>{totalMetricFacebook.likes}% likes</p>
                        <p>{totalMetricFacebook.comments}% comments</p>
                      </>
                    ) : metric === "twitter" ? (
                      <>
                        <p>{totalMetricTwitter.likes}% likes</p>
                        <p>{totalMetricTwitter.comments}% comments</p>
                      </>
                    ) : metric === "instagram" ? (
                      <>
                        <p>{totalMetricInstagram.likes}% likes</p>
                        <p>{totalMetricInstagram.comments}% comments</p>
                      </>
                    ) : metric === "linkedin" ? (
                      <>
                        <p>{totalMetricLinkedin.likes}% likes</p>
                        <p>{totalMetricLinkedin.comments}% comments</p>
                      </>
                    ) : null}
                  </div>
                }
                handleClose={togglePopup}
              />
            )}
          </div>
        </div>
      ) : (
        <div>
          <center>
            <h2>Please you're not a Community manager for any account</h2>
          </center>
        </div>
      )}
    </div>
  );
}

export default ManagerAnalytics;
