import React, { useState, useEffect, useContext } from "react";
import firebase from "../../lib/firebase";
import { AuthContext } from "../../App";
import Popup from "./Popup";
import "./admin.css";
import Nav from "../Nav";

function Analytics() {
  const { currentUser } = useContext(AuthContext);
  const accountsRef = firebase.firestore().collection("account");
  const [accounts, setAccounts] = useState([]);
  const [metric, setMetric] = useState();
  const [totalMetric, setTotalMetric] = useState();
  const [error, setError] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const viewFacebook = async (account) => {
    await accountsRef
      .doc(account.label)
      .collection("facebook")
      .get()
      .then((response) => {
        // get the subcollection metric
        const items = [];
        response.forEach((document) => {
          const fetchedItem = {
            id: document.id,
            ...document.data(),
          };
          items.push(fetchedItem);
        });
        // add up each metric
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
        // var comments = 0;
        items.forEach((item) => {
          likes += item.likes;
          comments += item.comments;
          reach += item.reach;
          shares += item.shares;
          leads += item.leads;
          impressions += item.impressions;
          downloads += item.downloads;
          views += item.views;
          followers += item.followers;
          // saves += item.saves;
        });
        // check if total is not empty before setting facebook
        totalMetric
          ? setMetric({
              likes: ((likes / totalMetric.likes) * 100).toFixed(0),
              comments: ((comments / totalMetric.comments) * 100).toFixed(0),
              reach: ((reach / totalMetric.reach) * 100).toFixed(0),
              shares: ((shares / totalMetric.shares) * 100).toFixed(0),
              leads: ((leads / totalMetric.leads) * 100).toFixed(0),
              impressions: (
                (impressions / totalMetric.impressions) *
                100
              ).toFixed(0),
              downloads: ((downloads / totalMetric.downloads) * 100).toFixed(0),
              views: ((views / totalMetric.views) * 100).toFixed(0),
              followers: ((followers / totalMetric.followers) * 100).toFixed(0),
              // saves: ((saves / totalMetric.saves) * 100).toFixed(0),
            })
          : console.log("Fb empty");
        console.log(metric);
      })
      .then(() => {
        //   open popup
        togglePopup();
      });
  };

  const viewTwitter = (account) => {
    accountsRef
      .doc(account.label)
      .collection("twitter")
      .get()
      .then((response) => {
        // get the subcollection metric
        const items = [];
        response.forEach((document) => {
          const fetchedItem = {
            id: document.id,
            ...document.data(),
          };
          items.push(fetchedItem);
        });
        // add up each metric
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
        items.forEach((item) => {
          likes += item.likes;
          comments += item.comments;
          reach += item.reach;
          shares += item.shares;
          leads += item.leads;
          impressions += item.impressions;
          downloads += item.downloads;
          views += item.views;
          followers += item.followers;
        });
        // check if total is not empty before setting facebook
        totalMetric
          ? setMetric({
              likes: ((likes / totalMetric.likes) * 100).toFixed(0),
              comments: ((comments / totalMetric.comments) * 100).toFixed(0),
              reach: ((reach / totalMetric.reach) * 100).toFixed(0),
              shares: ((shares / totalMetric.shares) * 100).toFixed(0),
              leads: ((leads / totalMetric.leads) * 100).toFixed(0),
              impressions: (
                (impressions / totalMetric.impressions) *
                100
              ).toFixed(0),
              downloads: ((downloads / totalMetric.downloads) * 100).toFixed(0),
              views: ((views / totalMetric.views) * 100).toFixed(0),
              followers: ((followers / totalMetric.followers) * 100).toFixed(0),
            })
          : console.log("Tw empty");
        console.log(metric);
      })
      .then(() => {
        //   open popup
        togglePopup();
      });
  };

  const viewInstagram = (account) => {
    accountsRef
      .doc(account.label)
      .collection("instagram")
      .get()
      .then((response) => {
        // get the subcollection metric
        const items = [];
        response.forEach((document) => {
          const fetchedItem = {
            id: document.id,
            ...document.data(),
          };
          items.push(fetchedItem);
        });
        // add up each metric
        var likes,
          comments,
          reach,
          shares,
          leads,
          impressions,
          downloads,
          views,
          followers,
          saves;
        likes = comments = reach = shares = leads = impressions = downloads = views = followers = saves = 0;
        items.forEach((item) => {
          likes += item.likes;
          comments += item.comments;
          reach += item.reach;
          shares += item.shares;
          leads += item.leads;
          impressions += item.impressions;
          downloads += item.downloads;
          views += item.views;
          followers += item.followers;
          saves += item.saves;
        });
        // check if total is not empty before setting facebook
        totalMetric
          ? setMetric({
              likes: ((likes / totalMetric.likes) * 100).toFixed(0),
              comments: ((comments / totalMetric.comments) * 100).toFixed(0),
              reach: ((reach / totalMetric.reach) * 100).toFixed(0),
              shares: ((shares / totalMetric.shares) * 100).toFixed(0),
              leads: ((leads / totalMetric.leads) * 100).toFixed(0),
              impressions: (
                (impressions / totalMetric.impressions) *
                100
              ).toFixed(0),
              downloads: ((downloads / totalMetric.downloads) * 100).toFixed(0),
              views: ((views / totalMetric.views) * 100).toFixed(0),
              followers: ((followers / totalMetric.followers) * 100).toFixed(0),
              saves: ((saves / totalMetric.saves) * 100).toFixed(0),
            })
          : console.log("Ig empty");
        console.log(metric);
      })
      .then(() => {
        //   open popup
        togglePopup();
      });
  };

  const viewLinkedin = (account) => {
    accountsRef
      .doc(account.label)
      .collection("linkedin")
      .get()
      .then((response) => {
        // get the subcollection metric
        const items = [];
        response.forEach((document) => {
          const fetchedItem = {
            id: document.id,
            ...document.data(),
          };
          items.push(fetchedItem);
        });
        // add up each metric
        var likes,
          comments,
          reach,
          shares,
          leads,
          impressions,
          downloads,
          views,
          followers,
          likes = (comments = reach = shares = leads = impressions = downloads = views = followers = 0);
        items.forEach((item) => {
          likes += item.likes;
          comments += item.comments;
          reach += item.reach;
          shares += item.shares;
          leads += item.leads;
          impressions += item.impressions;
          downloads += item.downloads;
          views += item.views;
          followers += item.followers;
        });
        // check if total is not empty before setting facebook
        totalMetric
          ? setMetric({
              likes: ((likes / totalMetric.likes) * 100).toFixed(0),
              comments: ((comments / totalMetric.comments) * 100).toFixed(0),
              reach: ((reach / totalMetric.reach) * 100).toFixed(0),
              shares: ((shares / totalMetric.shares) * 100).toFixed(0),
              leads: ((leads / totalMetric.leads) * 100).toFixed(0),
              impressions: (
                (impressions / totalMetric.impressions) *
                100
              ).toFixed(0),
              downloads: ((downloads / totalMetric.downloads) * 100).toFixed(0),
              views: ((views / totalMetric.views) * 100).toFixed(0),
              followers: ((followers / totalMetric.followers) * 100).toFixed(0),
            })
          : console.log("Ln empty");
        console.log(metric);
      })
      .then(() => {
        //   open popup
        togglePopup();
      });
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsLoading(true);
    accountsRef
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
        console.log(accounts);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(true);
      });
  }, []);

  useEffect(() => {}, [metric, totalMetric, isOpen]);

  return (
    <div className="Cover">
      <Nav path="/addAccount" name={currentUser ? currentUser.displayName : ""} />
      <div className="Analytics">
        <div className="wrap">
          <div className="head">
            <h3>Analytics</h3>
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
                            //   get assigned target
                            setTotalMetric(account.facebook);
                            viewFacebook(account);
                          }}
                        >
                          View
                        </small>
                      </td>
                      <td>
                        <small
                          onClick={() => {
                            //   get assigned target
                            setTotalMetric(account.twitter);
                            viewTwitter(account);
                          }}
                        >
                          View
                        </small>
                      </td>
                      <td>
                        <small
                          onClick={() => {
                            //   get assigned target
                            setTotalMetric(account.instagram);
                            viewInstagram(account);
                          }}
                        >
                          View
                        </small>
                      </td>
                      <td>
                        <small
                          onClick={() => {
                            //   get assigned target
                            setTotalMetric(account.linkedin);
                            viewLinkedin(account);
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
                  {metric ? (
                    <>
                      <div className="head">
                        <h3>Monthly percentage</h3>
                      </div>
                      <p>{metric.likes}% likes</p>
                      <p>{metric.comments}% comments</p>
                      {/* <p>{metric.shares}% shares</p> */}
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
  );
}

export default Analytics;
