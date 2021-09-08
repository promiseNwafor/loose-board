import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import firebase from "../../lib/firebase";
import LoadingIndicator from "../LoadingIndicator";
import "./singleAccount.css";

function SingleAccount(props) {
  const [account, setAccount] = useState();
  const [fb, setFb] = useState();
  const location = useLocation();
  const accountsRef = firebase.firestore().collection("account");

  const fetchFb = () => {
    accountsRef
      .doc(`${account.label}-${account.manager}`)
      .collection("facebook")
      .get()
      .then((response) => {
        // ===============get the subcollection metric===============
        const items = [];
        response.forEach((document) => {
          const fetchedItem = {
            id: document.id,
            ...document.data(),
          };
          items.push(fetchedItem);
        });
        setFb(items);
        console.log(items);
      });
  };

  useEffect(() => {
    setAccount(location.state.account);
    account && fetchFb();
    console.log(fb);
  }, [account]);

  return (
    <div>
      <center>
        <h1>{account && account.label}</h1>
      </center>
      <div className="platforms">
        <p className="active">Facebook</p>
        <p>Twitter</p>
        <p>Instagram</p>
        <p>Linkedin</p>
      </div>
      {fb ? (
        <table className="accountTable">
          <thead>
            <tr>
              <th>Date</th>
              <th>Likes</th>
              <th>Comments</th>
              <th>Shares</th>
              <th>Impression</th>
              <th>Views</th>
              <th>Followers</th>
              <th>Reach</th>
              <th>Downloads</th>
            </tr>
          </thead>
          <tbody>
            {fb &&
              fb.map((acc, i) => {
                return (
                  <tr key={i}>
                    <td>{acc.id}</td>
                    <td>{acc.likes}</td>
                    <td>{acc.comments}</td>
                    <td>{acc.shares}</td>
                    <td>{acc.impressions}</td>
                    <td>{acc.views}</td>
                    <td>{acc.followers}</td>
                    <td>{acc.reach}</td>
                    <td>{acc.downloads}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <center>
          <LoadingIndicator type="Rings" height={100} width={100} />
        </center>
      )}
    </div>
  );
}

export default SingleAccount;
