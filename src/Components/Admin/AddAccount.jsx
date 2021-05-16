import React, { useState, useContext } from "react";
import Select from "react-select";
import { AuthContext } from "../../App";
import Nav from "../Nav";
import "./admin.css";
import LoadingIndicator from "../LoadingIndicator";

function AddAccount() {
  const { handleAddAccount, loading, currentUser, isAdmin } = useContext(
    AuthContext
  );
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
    { value: "Tiwa", label: "Tiwa" },
    { value: "Gift", label: "Gift" },
  ];
  const platforms = [
    { value: "facebook", label: "facebook" },
    { value: "twitter", label: "twitter" },
    { value: "instagram", label: "instagram" },
    { value: "linkedin", label: "linkedin" },
  ];

  var date = new Date();
  // today =
  //   date.getFullYear() +
  //   "-" +
  //   (date.getMonth() + 1) +
  //   "-" +
  //   date.getDate() +
  //   accountName;
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
              likes: parseInt(likes),
              comments: parseInt(comments),
              reach: parseInt(reach),
              shares: parseInt(shares),
              leads: parseInt(leads),
              views: parseInt(views),
              impressions: parseInt(impressions),
              followers: parseInt(followers),
              downloads: parseInt(downloads),
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
              likes: parseInt(likes),
              comments: parseInt(comments),
              reach: parseInt(reach),
              shares: parseInt(shares),
              leads: parseInt(leads),
              views: parseInt(views),
              impressions: parseInt(impressions),
              followers: parseInt(followers),
              downloads: parseInt(downloads),
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
              likes: parseInt(likes),
              comments: parseInt(comments),
              saves: parseInt(saves),
              reach: parseInt(reach),
              shares: parseInt(shares),
              leads: parseInt(leads),
              views: parseInt(views),
              impressions: parseInt(impressions),
              followers: parseInt(followers),
              downloads: parseInt(downloads),
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
              likes: parseInt(likes),
              comments: parseInt(comments),
              reach: parseInt(reach),
              shares: parseInt(shares),
              leads: parseInt(leads),
              views: parseInt(views),
              impressions: parseInt(impressions),
              followers: parseInt(followers),
              downloads: parseInt(downloads),
            },
          });
          break;
        default:
          return;
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
          />
          <input
            onChange={(e) => setImpressions(e.target.value)}
            placeholder="Impressions"
            type="number"
          />
          <input
            onChange={(e) => setComments(e.target.value)}
            placeholder="Comments"
            type="number"
          />
          <input
            onChange={(e) => setDownloads(e.target.value)}
            placeholder="Downloads"
            type="number"
          />
          <input
            onChange={(e) => setLikes(e.target.value)}
            placeholder="Likes"
            type="number"
          />
          <input
            onChange={(e) => setViews(e.target.value)}
            placeholder="Views"
            type="number"
          />
          <input
            onChange={(e) => setFollowers(e.target.value)}
            placeholder="Followers"
            type="number"
          />
        </div>
      </form>
    </>
  );

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
      <Nav />
      {isAdmin ? (
        <div className="AddAccount">
          {/* <div className="head displayName">
            <h3>Welcome, {currentUser.displayName}</h3>
          </div> */}
          <div className="wrap">
            <div className="head">
              <h3>New Account</h3>
            </div>
            {showForm}
            {loading ? (
              <center>
                <LoadingIndicator
                  className="loader"
                  type="Circles"
                  height={30}
                  width={30}
                />
              </center>
            ) : (
              <div className="Btn">
                <button onClick={handleBtnClick} className="btn" type="submit">
                  SUBMIT
                </button>
              </div>
            )}
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

export default AddAccount;
