import React, { useState, useEffect, useContext } from "react";
import firebase from "../../lib/firebase";
import { AuthContext } from "../../App";
import Popup from "./Popup";
import "./admin.css";
import Nav from "../Nav";
import LoadingIndicator from "../LoadingIndicator";

function Analytics() {
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
    accountsRef.doc(`${account.label}-${currentUser.displayName}`).onSnapshot((querySnapshot) => {
      itemTotal = querySnapshot.data().facebook;
      // console.log(itemTotal);
    });
    var finalAns;
    const items = [];
    accounts.length > 0
      ? accountsRef
          .doc(`${account.label}-${currentUser.displayName}`)
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
            likes =
              comments =
              reach =
              shares =
              leads =
              impressions =
              downloads =
              views =
              followers =
                0;
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
              likes: itemTotal.likes < 1 ? 0
              : Math.round((likes / itemTotal.likes) * 100).toFixed(0),
              // comments
              comments: itemTotal.comments < 1 ? 0 
              : Math.round((comments / itemTotal.comments) * 100).toFixed(0),
              // shares
              shares: itemTotal.shares < 1 ? 0 : Math.round((shares / itemTotal.shares) * 100).toFixed(0),
              // reach
              reach: itemTotal.reach < 1 ? 0 : Math.round((reach / itemTotal.reach) * 100).toFixed(0),
              // impressions
              impressions: itemTotal.impressions < 1 ? 0 : Math.round(
                (impressions / itemTotal.impressions) * 100
              ).toFixed(0),
              // leads
              leads: itemTotal.leads < 1 ? 0 : Math.round((leads / itemTotal.impressions) * 100).toFixed(
                0
              ),
              // views
              views: itemTotal.views < 1 ? 0 : Math.round((views / itemTotal.impressions) * 100).toFixed(
                0
              ),
              // downloads
              downloads: itemTotal.downloads < 1 ? 0 : Math.round(
                (downloads / itemTotal.impressions) * 100
              ).toFixed(0),
              // followers
              followers: itemTotal.shares < 1 ? 0 : Math.round(
                (followers / itemTotal.impressions) * 100
              ).toFixed(0),
            }
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
    accountsRef.doc(`${account.label}-${currentUser.displayName}`).onSnapshot((querySnapshot) => {
      itemTotal = querySnapshot.data().twitter;
      // console.log(itemTotal);
    });
    var finalAns;
    const items = [];
    accounts.length > 0
      ? accountsRef
          .doc(`${account.label}-${currentUser.displayName}`)
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
            likes =
              comments =
              reach =
              shares =
              leads =
              impressions =
              downloads =
              views =
              followers =
                0;
            // if (items.length > 0) {
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
            // }
            // ===============get the percentage met===============
            finalAns = {
              likes: itemTotal.likes < 1 ? 0
              : Math.round((likes / itemTotal.likes) * 100).toFixed(0),
              // comments
              comments: itemTotal.comments < 1 ? 0 
              : Math.round((comments / itemTotal.comments) * 100).toFixed(0),
              // shares
              shares: itemTotal.shares < 1 ? 0 : Math.round((shares / itemTotal.shares) * 100).toFixed(0),
              // reach
              reach: itemTotal.reach < 1 ? 0 : Math.round((reach / itemTotal.reach) * 100).toFixed(0),
              // impressions
              impressions: itemTotal.impressions < 1 ? 0 : Math.round(
                (impressions / itemTotal.impressions) * 100
              ).toFixed(0),
              // leads
              leads: itemTotal.leads < 1 ? 0 : Math.round((leads / itemTotal.impressions) * 100).toFixed(
                0
              ),
              // views
              views: itemTotal.views < 1 ? 0 : Math.round((views / itemTotal.impressions) * 100).toFixed(
                0
              ),
              // downloads
              downloads: itemTotal.downloads < 1 ? 0 : Math.round(
                (downloads / itemTotal.impressions) * 100
              ).toFixed(0),
              // followers
              followers: itemTotal.shares < 1 ? 0 : Math.round(
                (followers / itemTotal.impressions) * 100
              ).toFixed(0),
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
    accountsRef.doc(`${account.label}-${currentUser.displayName}`).onSnapshot((querySnapshot) => {
      itemTotal = querySnapshot.data().instagram;
      // console.log(itemTotal);
    });
    var finalAns;
    const items = [];
    accounts.length > 0
      ? accountsRef
          .doc(`${account.label}-${currentUser.displayName}`)
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
            likes =
              comments =
              reach =
              shares =
              saves =
              leads =
              impressions =
              downloads =
              views =
              followers =
                0;
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
              likes: itemTotal.likes < 1 ? 0
              : Math.round((likes / itemTotal.likes) * 100).toFixed(0),
              // comments
              comments: itemTotal.comments < 1 ? 0 
              : Math.round((comments / itemTotal.comments) * 100).toFixed(0),
              // saves
              saves: itemTotal.saves < 1 ? 0 : Math.round((saves / itemTotal.saves) * 100).toFixed(0),
              // shares
              shares: itemTotal.shares < 1 ? 0 : Math.round((shares / itemTotal.shares) * 100).toFixed(0),
              // reach
              reach: itemTotal.reach < 1 ? 0 : Math.round((reach / itemTotal.reach) * 100).toFixed(0),
              // impressions
              impressions: itemTotal.impressions < 1 ? 0 : Math.round(
                (impressions / itemTotal.impressions) * 100
              ).toFixed(0),
              // leads
              leads: itemTotal.leads < 1 ? 0 : Math.round((leads / itemTotal.impressions) * 100).toFixed(
                0
              ),
              // views
              views: itemTotal.views < 1 ? 0 : Math.round((views / itemTotal.impressions) * 100).toFixed(
                0
              ),
              // downloads
              downloads: itemTotal.downloads < 1 ? 0 : Math.round(
                (downloads / itemTotal.impressions) * 100
              ).toFixed(0),
              // followers
              followers: itemTotal.shares < 1 ? 0 : Math.round(
                (followers / itemTotal.impressions) * 100
              ).toFixed(0),
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
    accountsRef.doc(`${account.label}-${currentUser.displayName}`).onSnapshot((querySnapshot) => {
      itemTotal = querySnapshot.data().linkedin;
      // console.log(itemTotal);
    });
    var finalAns;
    const items = [];
    accounts.length > 0
      ? accountsRef
          .doc(`${account.label}-${currentUser.displayName}`)
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
            likes =
              comments =
              reach =
              shares =
              leads =
              impressions =
              downloads =
              views =
              followers =
                0;
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
              likes: itemTotal.likes < 1 ? 0
              : Math.round((likes / itemTotal.likes) * 100).toFixed(0),
              // comments
              comments: itemTotal.comments < 1 ? 0 
              : Math.round((comments / itemTotal.comments) * 100).toFixed(0),
              // shares
              shares: itemTotal.shares < 1 ? 0 : Math.round((shares / itemTotal.shares) * 100).toFixed(0),
              // reach
              reach: itemTotal.reach < 1 ? 0 : Math.round((reach / itemTotal.reach) * 100).toFixed(0),
              // impressions
              impressions: itemTotal.impressions < 1 ? 0 : Math.round(
                (impressions / itemTotal.impressions) * 100
              ).toFixed(0),
              // leads
              leads: itemTotal.leads < 1 ? 0 : Math.round((leads / itemTotal.impressions) * 100).toFixed(
                0
              ),
              // views
              views: itemTotal.views < 1 ? 0 : Math.round((views / itemTotal.impressions) * 100).toFixed(
                0
              ),
              // downloads
              downloads: itemTotal.downloads < 1 ? 0 : Math.round(
                (downloads / itemTotal.impressions) * 100
              ).toFixed(0),
              // followers
              followers: itemTotal.shares < 1 ? 0 : Math.round(
                (followers / itemTotal.impressions) * 100
              ).toFixed(0),
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
    setIsLoading(true);
    // viewFacebook(accounts[0])
    currentUser
      ? accountsRef
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
    // console.log(isAdmin)
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
          <LoadingIndicator type="Circles" height={100} width={100} />
        </center>
      </div>
    );
  }
  return (
    <div className="Cover">
      <Nav
        path="/addAccount"
        name={currentUser ? `Welcome, ${currentUser.displayName}` : ""}
      />
      {isAdmin ? (
        <div className="Wrap">
          <div className="head displayName">
            <h3>Welcome {currentUser.displayName}</h3>
          </div>
          <div className="Analytics">
            <div className="wrap">
              <div className="head">
                <h3>Accounts overview</h3>
              </div>
              {isLoading ? (
                <center>
                  <LoadingIndicator type="Rings" height={50} width={50} />
                </center>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Account</th>
                      <th>Handler</th>
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
                          <td>{account.manager}</td>
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
                          <p>{totalMetricFacebook.shares}% shares</p>
                          <p>{totalMetricFacebook.followers}% followers</p>
                          <p>{totalMetricFacebook.impressions}% impressions</p>
                          <p>{totalMetricFacebook.downloads}% downloads</p>
                          <p>{totalMetricFacebook.reach}% reach</p>
                          <p>{totalMetricFacebook.leads}% leads</p>
                          <p>{totalMetricFacebook.views}% views</p>
                        </>
                      ) : metric === "twitter" ? (
                        <>
                          <p>{totalMetricTwitter.likes}% likes</p>
                          <p>{totalMetricTwitter.comments}% comments</p>
                          <p>{totalMetricTwitter.shares}% retweets</p>
                          <p>{totalMetricTwitter.followers}% followers</p>
                          <p>{totalMetricTwitter.views}% views</p>
                          <p>{totalMetricTwitter.downloads}% downloads</p>
                          <p>{totalMetricTwitter.reach}% reach</p>
                          <p>{totalMetricTwitter.impressions}% impressions</p>
                          <p>{totalMetricTwitter.leads}% leads</p>
                        </>
                      ) : metric === "instagram" ? (
                        <>
                          <p>{totalMetricInstagram.likes}% likes</p>
                          <p>{totalMetricInstagram.comments}% comments</p>
                          <p>{totalMetricInstagram.saves}% saves</p>
                          <p>{totalMetricInstagram.shares}% shares</p>
                          <p>{totalMetricInstagram.views}% views</p>
                          <p>{totalMetricInstagram.followers}% followers</p>
                          <p>{totalMetricInstagram.impressions}% impressions</p>
                          <p>{totalMetricInstagram.reach}% reach</p>
                          <p>{totalMetricInstagram.downloads}% downloads</p>
                          <p>{totalMetricInstagram.leads}% leads</p>
                        </>
                      ) : metric === "linkedin" ? (
                        <>
                          <p>{totalMetricLinkedin.likes}% likes</p>
                          <p>{totalMetricLinkedin.comments}% comments</p>
                          <p>{totalMetricLinkedin.shares}% shares</p>
                          <p>{totalMetricLinkedin.views}% views</p>
                          <p>{totalMetricLinkedin.followers}% followers</p>
                          <p>{totalMetricLinkedin.reach}% reach</p>
                          <p>{totalMetricLinkedin.impressions}% impressions</p>
                          <p>{totalMetricLinkedin.leads}% leads</p>
                        </>
                      ) : null}
                    </div>
                  }
                  handleClose={togglePopup}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <center>
            <h2>Please you're not an Admin</h2>
          </center>
        </div>
      )}
    </div>
  );
}

export default Analytics;
