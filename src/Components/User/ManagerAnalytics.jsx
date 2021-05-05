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
    
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsLoading(true);
    currentUser ? accountsRef.where('manager', '==', currentUser.displayName)
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
      }) : console.log("No user")
  }, []);


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
