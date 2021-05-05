import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { AuthContext } from "../../App";
import "./admin.css";

function AddAccount() {
  const { handleAddAccount, loading } = useContext(AuthContext);
  const [accountName, setAccountName] = useState("");
  const [manager, setManager] = useState("");
  const [platform, setPlatform] = useState("");
//   const [addMore, setAddMore] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [shares, setShares] = useState(0);
  const [saves, setSaves] = useState(0);
  const [leads, setLeads] = useState(0);
  const [impressions, setImpressions] = useState(0);
  const [views, setViews] = useState(0);
  const [downloads, setDownloads] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [reach, setReach] = useState(0);

  const managers = [
    { value: "Ramsey", label: "Ramsey" },
    { value: "Ayomide", label: "Ayomide" },
    { value: "Janelle", label: "Janelle" },
    { value: "Chucks", label: "Chucks" },
  ];
  const platforms = [
    { value: "facebook", label: "facebook" },
    { value: "twitter", label: "twitter" },
    { value: "instagram", label: "instagram" },
    { value: "linkedin", label: "linkedin" },
  ];

  var date = new Date(),
    today =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      accountName;
  var day =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  const handleBtnClick = () => {
    if (platform !== "" || accountName !== "") {
      switch (platform.value) {
        case "facebook":
          handleAddAccount({
            id: accountName,
            label: accountName,
            manager: manager.value,
            date: day,
            facebook: {
              likes,
              comments,
              reach,
              shares,
              leads,
              views,
              impressions,
              followers,
              downloads,
            },
          });
          break;
        case "twitter":
          handleAddAccount({
            id: accountName,
            label: accountName,
            manager: manager.value,
            date: day,
            twitter: {
              likes,
              comments,
              reach,
              shares,
              leads,
              views,
              impressions,
              followers,
              downloads,
            },
          });
          break;
        case "instagram":
          handleAddAccount({
            id: accountName,
            label: accountName,
            manager: manager.value,
            date: day,
            instagram: {
              likes,
              comments,
              saves,
              reach,
              shares,
              leads,
              views,
              impressions,
              followers,
              downloads,
            },
          });
          break;
        case "linkedin":
          handleAddAccount({
            id: accountName,
            label: accountName,
            manager: manager.value,
            date: day,
            linkedin: {
              likes,
              comments,
              reach,
              shares,
              leads,
              views,
              impressions,
              followers,
              downloads,
            },
          });
          break;
      }
    }
  };

//   const handleAddMore = () => {
//     setAddMore(true);
//   };

//   useEffect(() => {

//   }, [addMore])

  const showForm = (
    <>
      <form>
        <div className="Input">
          <input
            onChange={(e) => setAccountName(e.target.value)}
            placeholder="Account name"
            type="text"
          />
        </div>
        <div className="select">
          <Select
            className="Select"
            placeholder="Community manager"
            value={manager}
            onChange={setManager}
            options={managers}
          />
        </div>
        <div className="select">
          <Select
            className="Select"
            placeholder="Platform"
            value={platform}
            onChange={setPlatform}
            options={platforms}
          />
        </div>
        <div className="input">
          <input
            onChange={(e) => setReach(e.target.value)}
            placeholder="Reach"
            type="number"
            required
          />
          {platform.value === "twitter" ? (
            <input
              onChange={(e) => setShares(e.target.value)}
              placeholder="Retweets"
              type="number"
              required
            />
          ) : (
            <input
              onChange={(e) => setShares(e.target.value)}
              placeholder="Shares"
              type="number"
              required
            />
          )}
          {platform.value === "instagram" ? (
            <input
              onChange={(e) => setSaves(e.target.value)}
              placeholder="Saves"
              type="number"
              required
            />
          ) : (
            ""
          )}
          <input
            onChange={(e) => setLeads(e.target.value)}
            placeholder="Leads"
            type="number"
            required
          />
          <input
            onChange={(e) => setImpressions(e.target.value)}
            placeholder="Impressions"
            type="number"
            required
          />
          <input
            onChange={(e) => setComments(e.target.value)}
            placeholder="Comments"
            type="number"
            required
          />
          <input
            onChange={(e) => setDownloads(e.target.value)}
            placeholder="Downloads"
            type="number"
            required
          />
          <input
            onChange={(e) => setLikes(e.target.value)}
            placeholder="Likes"
            type="number"
            required
          />
          <input
            onChange={(e) => setViews(e.target.value)}
            placeholder="Views"
            type="number"
            required
          />
          <input
            onChange={(e) => setFollowers(e.target.value)}
            placeholder="Followers"
            type="number"
            required
          />
        </div>
      </form>
    </>
  );

  return (
    <div className="AddAccount">
      <div className="wrap">
        <div className="head">
          <h3>New Account</h3>
        </div>
        {showForm}
        <div className="Btn">
          {loading ? (
            <p>Adding...</p>
          ) : (
            <button onClick={handleBtnClick} className="btn" type="submit">
              SUBMIT
            </button>
          )}
        </div>
        {/* <div className="Btn">
          <button onClick={handleAddMore} className="btn" type="submit">
            ADD MORE
          </button>
        </div> */}
        {/* {
            addMore ? <>
            {showForm}
            <div className="Btn">
          {loading ? (
            <p>Adding...</p>
          ) : (
            <button onClick={handleBtnClick} className="btn" type="submit">
              SUBMIT
            </button>
          )}
        </div>
        <div className="Btn">
          <button onClick={handleAddMore} className="btn" type="submit">
            ADD MORE
          </button>
        </div>
            </> : null
        } */}
      </div>
    </div>
  );
}

export default AddAccount;
