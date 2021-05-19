import React, { useState, useEffect, useContext } from "react";
import firebase from "../../lib/firebase";
import { AuthContext } from "../../App";
import Popup from "../Admin/Popup";
import "../Admin/admin.css";
import Nav from "../Nav";
import LoadingIndicator from "../LoadingIndicator";

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
  const [numberFacebook, setNumberFacebook] = useState({});
  const [itemTotalFacebook, setItemTotalFacebook] = useState({});
  const [totalMetricTwitter, setTotalMetricTwitter] = useState({});
  const [numberTwitter, setNumberTwitter] = useState({});
  const [itemTotalTwitter, setItemTotalTwitter] = useState({});
  const [totalMetricInstagram, setTotalMetricInstagram] = useState({});
  const [numberInstagram, setNumberInstagram] = useState({});
  const [itemTotalInstagram, setItemTotalInstagram] = useState({});
  const [totalMetricLinkedin, setTotalMetricLinkedin] = useState({});
  const [numberLinkedin, setNumberLinkedin] = useState({});
  const [itemTotalLinkedin, setItemTotalLinkedin] = useState({});
  const [error, setError] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const viewFacebook = async (account) => {
    // ===============set the assigned target metrics===============
    var itemTotal;
    accountsRef.doc(account.label).onSnapshot((querySnapshot) => {
      itemTotal = querySnapshot.data().facebook;
      setItemTotalFacebook(itemTotal);
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
            setNumberFacebook({
              likes,
              comments,
              reach,
              shares,
              leads,
              impressions,
              downloads,
              views,
              followers,
            });
            // ===============get the percentage met===============
            finalAns = {
              likes: Math.round((likes / itemTotal.likes) * 100).toFixed(0),
              comments: Math.round(
                (comments / itemTotal.comments) * 100
              ).toFixed(0),
              shares: Math.round((shares / itemTotal.shares) * 100).toFixed(0),
              reach: Math.round((reach / itemTotal.reach) * 100).toFixed(0),
              impressions: Math.round(
                (impressions / itemTotal.impressions) * 100
              ).toFixed(0),
              leads: Math.round((leads / itemTotal.impressions) * 100).toFixed(
                0
              ),
              views: Math.round((views / itemTotal.impressions) * 100).toFixed(
                0
              ),
              downloads: Math.round(
                (downloads / itemTotal.impressions) * 100
              ).toFixed(0),
              followers: Math.round(
                (followers / itemTotal.impressions) * 100
              ).toFixed(0),
            };
            // console.log(`${likes/parseInt(itemTotal.likes)} ${itemTotal.likes} likes and ${comments} comments`)
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
      itemTotal = querySnapshot.data().twitter;
      setItemTotalTwitter(itemTotal);
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
            setNumberTwitter({
              likes,
              comments,
              reach,
              shares,
              leads,
              impressions,
              downloads,
              views,
              followers,
            });
            // ===============get the percentage met===============
            finalAns = {
              likes: Math.round(
                (likes / parseInt(itemTotal.likes)) * 100
              ).toFixed(0),
              comments: Math.round(
                (comments / parseInt(itemTotal.comments)) * 100
              ).toFixed(0),
              shares: Math.round((shares / itemTotal.shares) * 100).toFixed(0),
              reach: Math.round((reach / itemTotal.reach) * 100).toFixed(0),
              impressions: Math.round(
                (impressions / itemTotal.impressions) * 100
              ).toFixed(0),
              leads: Math.round((leads / itemTotal.impressions) * 100).toFixed(
                0
              ),
              views: Math.round((views / itemTotal.impressions) * 100).toFixed(
                0
              ),
              downloads: Math.round(
                (downloads / itemTotal.impressions) * 100
              ).toFixed(0),
              followers: Math.round(
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
    accountsRef.doc(account.label).onSnapshot((querySnapshot) => {
      itemTotal = querySnapshot.data().instagram;
      setItemTotalInstagram(itemTotal);
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
            setNumberInstagram({
              likes,
              comments,
              saves,
              reach,
              shares,
              leads,
              impressions,
              downloads,
              views,
              followers,
            });
            // ===============get the percentage met===============
            finalAns = {
              likes: Math.round((likes / itemTotal.likes) * 100).toFixed(0),
              comments: Math.round(
                (comments / itemTotal.comments) * 100
              ).toFixed(0),
              saves: Math.round((saves / itemTotal.saves) * 100).toFixed(0),
              shares: Math.round((shares / itemTotal.shares) * 100).toFixed(0),
              reach: Math.round((reach / itemTotal.reach) * 100).toFixed(0),
              impressions: Math.round(
                (impressions / itemTotal.impressions) * 100
              ).toFixed(0),
              leads: Math.round((leads / itemTotal.impressions) * 100).toFixed(
                0
              ),
              views: Math.round((views / itemTotal.impressions) * 100).toFixed(
                0
              ),
              downloads: Math.round(
                (downloads / itemTotal.impressions) * 100
              ).toFixed(0),
              followers: Math.round(
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
    accountsRef.doc(account.label).onSnapshot((querySnapshot) => {
      itemTotal = querySnapshot.data().linkedin;
      setItemTotalLinkedin(itemTotal);
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
            setNumberLinkedin({
              likes,
              comments,
              reach,
              shares,
              leads,
              impressions,
              downloads,
              views,
              followers,
            });
            // ===============get the percentage met===============
            finalAns = {
              likes: Math.round((likes / itemTotal.likes) * 100).toFixed(0),
              comments: Math.round(
                (comments / itemTotal.comments) * 100
              ).toFixed(0),
              shares: Math.round((shares / itemTotal.shares) * 100).toFixed(0),
              reach: Math.round((reach / itemTotal.reach) * 100).toFixed(0),
              impressions: Math.round(
                (impressions / itemTotal.impressions) * 100
              ).toFixed(0),
              leads: Math.round((leads / itemTotal.impressions) * 100).toFixed(
                0
              ),
              views: Math.round((views / itemTotal.impressions) * 100).toFixed(
                0
              ),
              downloads: Math.round(
                (downloads / itemTotal.impressions) * 100
              ).toFixed(0),
              followers: Math.round(
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
    // console.log(numberFacebook);
    // console.log(itemTotalFacebook);
  }, [numberFacebook, itemTotalFacebook]);

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
          {/* <h2>Please ensure you're signed in</h2> */}
          <LoadingIndicator type="Circles" height={100} width={100} />
        </center>
      </div>
    );
  }
  return (
    <div className="Cover">
      <Nav
        path="/addReport"
        name={
          currentUser && currentUser.displayName
            ? `Welcome, ${currentUser.displayName}`
            : "Welcome"
        }
      />
      {!isAdmin ? (
        <div className="Analytics">
          <div className="head displayName">
            <h3>Welcome {currentUser.displayName}</h3>
          </div>
          <div className="wrap">
            <div className="head">
              <h3>Here's your overview</h3>
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
                        <div className="">
                          <div>{accFacebook.label} Facebook</div>
                        </div>
                        <p className="span">
                          <span className="head">{`${numberFacebook.likes} of ${itemTotalFacebook.likes}`}</span>
                          <span>|</span>
                          <span>{`${totalMetricFacebook.likes}% likes`}</span>
                        </p>
                        <p className="span">
                          <span className="head">{`${numberFacebook.comments} of ${itemTotalFacebook.comments}`}</span>
                          <span>|</span>
                          <span>{`${totalMetricFacebook.comments}% comments`}</span>
                        </p>
                        <p className="span">
                          <span className="head">{`${numberFacebook.shares} of ${itemTotalFacebook.shares}`}</span>
                          <span>|</span>
                          <span>{`${totalMetricFacebook.shares}% shares`}</span>
                        </p>
                      </>
                    ) : metric === "twitter" ? (
                      <>
                        <div className="">
                          <div>{accTwitter.label} Twitter</div>
                        </div>
                        <p className="span">
                          <span className="head">{`${numberTwitter.likes} of ${itemTotalTwitter.likes}`}</span>
                          <span>|</span>
                          <span>{`${totalMetricTwitter.likes}% likes`}</span>
                        </p>
                        <p className="span">
                          <span className="head">{`${numberTwitter.comments} of ${itemTotalTwitter.comments}`}</span>
                          <span>|</span>
                          <span>{`${totalMetricTwitter.comments}% comments`}</span>
                        </p>
                        <p className="span">
                          <span className="head">{`${numberTwitter.shares} of ${itemTotalTwitter.shares}`}</span>
                          <span>|</span>
                          <span>{`${totalMetricTwitter.shares}% retweets`}</span>
                        </p>
                      </>
                    ) : metric === "instagram" ? (
                      <>
                        <div className="">
                          <div>{accInstagram.label} Instagram</div>
                        </div>
                        <p className="span">
                          <span className="head">{`${numberInstagram.likes} of ${itemTotalInstagram.likes}`}</span>
                          <span>|</span>
                          <span>{`${totalMetricInstagram.likes}% likes`}</span>
                        </p>
                        <p className="span">
                          <span className="head">{`${numberInstagram.comments} of ${itemTotalInstagram.comments}`}</span>
                          <span>|</span>
                          <span>{`${totalMetricInstagram.comments}% comments`}</span>
                        </p>
                        <p className="span">
                          <span className="head">{`${numberInstagram.saves} of ${itemTotalInstagram.saves}`}</span>
                          <span>|</span>
                          <span>{`${totalMetricInstagram.saves}% saves`}</span>
                        </p>
                      </>
                    ) : metric === "linkedin" ? (
                      <>
                        <div className="">
                          <div>{accLinkedin.label} Linkedin</div>
                        </div>
                        <p className="span">
                          <span className="head">{`${numberLinkedin.likes} of ${itemTotalLinkedin.likes}`}</span>
                          <span>|</span>
                          <span>{`${totalMetricLinkedin.likes}% likes`}</span>
                        </p>
                        <p className="span">
                          <span className="head">{`${numberLinkedin.comments} of ${itemTotalLinkedin.comments}`}</span>
                          <span>|</span>
                          <span>{`${totalMetricLinkedin.comments}% comments`}</span>
                        </p>
                        <p className="span">
                          <span className="head">{`${numberLinkedin.shares} of ${itemTotalLinkedin.shares}`}</span>
                          <span>|</span>
                          <span>{`${totalMetricLinkedin.shares}% shares`}</span>
                        </p>
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
