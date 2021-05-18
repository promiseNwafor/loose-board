import React, { useState, useEffect, useContext } from "react";
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
  const [platformFb, setPlatformFb] = useState(false);
  const [platformTw, setPlatformTw] = useState(false);
  const [platformIg, setPlatformIg] = useState(false);
  const [platformLn, setPlatformLn] = useState(false);
  const [likesFb, setLikesFb] = useState(0);
  const [likesTw, setLikesTw] = useState(0);
  const [likesIg, setLikesIg] = useState(0);
  const [likesLn, setLikesLn] = useState(0);
  const [commentsFb, setCommentsFb] = useState(0);
  const [commentsTw, setCommentsTw] = useState(0);
  const [commentsIg, setCommentsIg] = useState(0);
  const [commentsLn, setCommentsLn] = useState(0);
  const [sharesFb, setSharesFb] = useState(0);
  const [sharesTw, setSharesTw] = useState(0);
  const [sharesIg, setSharesIg] = useState(0);
  const [sharesLn, setSharesLn] = useState(0);
  const [leadsFb, setLeadsFb] = useState(0);
  const [leadsTw, setLeadsTw] = useState(0);
  const [leadsIg, setLeadsIg] = useState(0);
  const [leadsLn, setLeadsLn] = useState(0);
  const [saves, setSaves] = useState(0);
  const [impressionsFb, setImpressionsFb] = useState(0);
  const [impressionsTw, setImpressionsTw] = useState(0);
  const [impressionsIg, setImpressionsIg] = useState(0);
  const [impressionsLn, setImpressionsLn] = useState(0);
  const [viewsFb, setViewsFb] = useState(0);
  const [viewsTw, setViewsTw] = useState(0);
  const [viewsIg, setViewsIg] = useState(0);
  const [viewsLn, setViewsLn] = useState(0);
  const [downloadsFb, setDownloadsFb] = useState(0);
  const [downloadsTw, setDownloadsTw] = useState(0);
  const [downloadsIg, setDownloadsIg] = useState(0);
  const [downloadsLn, setDownloadsLn] = useState(0);
  const [followersFb, setFollowersFb] = useState(0);
  const [followersTw, setFollowersTw] = useState(0);
  const [followersIg, setFollowersIg] = useState(0);
  const [followersLn, setFollowersLn] = useState(0);
  const [reachFb, setReachFb] = useState(0);
  const [reachTw, setReachTw] = useState(0);
  const [reachIg, setReachIg] = useState(0);
  const [reachLn, setReachLn] = useState(0);
  const [formCount, setFormCount] = useState(0);
  const [pushForm, setPushForm] = useState([formCount]);
  // const [likes, setLikes] = useState(0);
  // const [comments, setComments] = useState(0);
  // const [shares, setShares] = useState(0);
  // const [saves, setSaves] = useState(0);
  // const [leads, setLeads] = useState(0);
  // const [impressions, setImpressions] = useState(0);
  // const [views, setViews] = useState(0);
  // const [downloads, setDownloads] = useState(0);
  // const [followers, setFollowers] = useState(0);
  // const [reach, setReach] = useState(0);

  const managers = [
    { value: "Ramsey", label: "Ramsey" },
    { value: "Ayomide", label: "Ayomide" },
    { value: "Janelle", label: "Janelle" },
    { value: "Chucks", label: "Chucks" },
    { value: "Tiwalade", label: "Tiwalade" },
    { value: "Gift", label: "Gift" },
    { value: "Iyimide", label: "Iyimide" },
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
      // switch (platform.value) {
      //   case "facebook":
      handleAddAccount({
        id: accountName,
        label: accountName,
        manager: manager.value,
        date: day,
        facebook: {
          likes: parseInt(likesFb),
          comments: parseInt(commentsFb),
          reach: parseInt(reachFb),
          shares: parseInt(sharesFb),
          leads: parseInt(leadsFb),
          views: parseInt(viewsFb),
          impressions: parseInt(impressionsFb),
          followers: parseInt(followersFb),
          downloads: parseInt(downloadsFb),
        },
        twitter: {
          likes: parseInt(likesTw),
          comments: parseInt(commentsTw),
          reach: parseInt(reachTw),
          shares: parseInt(sharesTw),
          leads: parseInt(leadsTw),
          views: parseInt(viewsTw),
          impressions: parseInt(impressionsTw),
          followers: parseInt(followersTw),
          downloads: parseInt(downloadsTw),
        },
        instagram: {
          likes: parseInt(likesIg),
          comments: parseInt(commentsIg),
          reach: parseInt(reachIg),
          shares: parseInt(sharesIg),
          saves: parseInt(saves),
          leads: parseInt(leadsIg),
          views: parseInt(viewsIg),
          impressions: parseInt(impressionsIg),
          followers: parseInt(followersIg),
          downloads: parseInt(downloadsIg),
        },
        linkedin: {
          likes: parseInt(likesLn),
          comments: parseInt(commentsLn),
          reach: parseInt(reachLn),
          shares: parseInt(sharesLn),
          leads: parseInt(leadsLn),
          views: parseInt(viewsLn),
          impressions: parseInt(impressionsLn),
          followers: parseInt(followersLn),
          downloads: parseInt(downloadsLn),
        },
      });
      //   break;
      // case "twitter":
      //   handleAddAccount({
      //     id: accountName,
      //     label: accountName,
      //     manager: manager.value,
      //     date: day,
      //     twitter: {
      //       likes: parseInt(likes),
      //       comments: parseInt(comments),
      //       reach: parseInt(reach),
      //       shares: parseInt(shares),
      //       leads: parseInt(leads),
      //       views: parseInt(views),
      //       impressions: parseInt(impressions),
      //       followers: parseInt(followers),
      //       downloads: parseInt(downloads),
      //     },
      //   });
      //   break;
      // case "instagram":
      //   handleAddAccount({
      //     id: accountName,
      //     label: accountName,
      //     manager: manager.value,
      //     date: day,
      //     instagram: {
      //       likes: parseInt(likes),
      //       comments: parseInt(comments),
      //       saves: parseInt(saves),
      //       reach: parseInt(reach),
      //       shares: parseInt(shares),
      //       leads: parseInt(leads),
      //       views: parseInt(views),
      //       impressions: parseInt(impressions),
      //       followers: parseInt(followers),
      //       downloads: parseInt(downloads),
      //     },
      //   });
      //   break;
      // case "linkedin":
      //   handleAddAccount({
      //     id: accountName,
      //     label: accountName,
      //     manager: manager.value,
      //     date: day,
      //     linkedin: {
      //       likes: parseInt(likes),
      //       comments: parseInt(comments),
      //       reach: parseInt(reach),
      //       shares: parseInt(shares),
      //       leads: parseInt(leads),
      //       views: parseInt(views),
      //       impressions: parseInt(impressions),
      //       followers: parseInt(followers),
      //       downloads: parseInt(downloads),
      //     },
      //   });
      //   break;
      // default:
      //   return;
      // }
    }
  };

  const addForm = () => {
    setFormCount(formCount + 1);
    setPushForm([...pushForm, formCount]);
    // console.log(pushForm);
  };

  useEffect(() => {}, [pushForm]);

  useEffect(() => {
    // console.log(platform.value);
  }, [platform]);

  const showFacebook = (
    <div className="input">
      <input
        onChange={(e) => setLikesFb(e.target.value)}
        placeholder="Likes"
        type="number"
      />
      <input
        onChange={(e) => setCommentsFb(e.target.value)}
        placeholder="Comments"
        type="number"
      />
      <input
        onChange={(e) => setSharesFb(e.target.value)}
        placeholder="Shares"
        type="number"
        required
      />
      <input
        onChange={(e) => setLeadsFb(e.target.value)}
        placeholder="Leads"
        type="number"
      />
      <input
        onChange={(e) => setViewsFb(e.target.value)}
        placeholder="Views"
        type="number"
      />
      <input
        onChange={(e) => setReachFb(e.target.value)}
        placeholder="Reach"
        type="number"
      />
      <input
        onChange={(e) => setImpressionsFb(e.target.value)}
        placeholder="Impressions"
        type="number"
      />
      <input
        onChange={(e) => setDownloadsFb(e.target.value)}
        placeholder="Downloads"
        type="number"
      />
      <input
        onChange={(e) => setFollowersFb(e.target.value)}
        placeholder="Followers"
        type="number"
      />
    </div>
  );

  const showTwitter = (
    <div className="input">
      <input
        onChange={(e) => setLikesTw(e.target.value)}
        placeholder="Likes"
        type="number"
      />
      <input
        onChange={(e) => setCommentsTw(e.target.value)}
        placeholder="Comments"
        type="number"
      />
      <input
        onChange={(e) => setSharesTw(e.target.value)}
        placeholder="Retweets"
        type="number"
        required
      />
      <input
        onChange={(e) => setLeadsTw(e.target.value)}
        placeholder="Leads"
        type="number"
      />
      <input
        onChange={(e) => setViewsTw(e.target.value)}
        placeholder="Views"
        type="number"
      />
      <input
        onChange={(e) => setReachTw(e.target.value)}
        placeholder="Reach"
        type="number"
      />
      <input
        onChange={(e) => setImpressionsTw(e.target.value)}
        placeholder="Impressions"
        type="number"
      />
      <input
        onChange={(e) => setDownloadsTw(e.target.value)}
        placeholder="Downloads"
        type="number"
      />
      <input
        onChange={(e) => setFollowersTw(e.target.value)}
        placeholder="Followers"
        type="number"
      />
    </div>
  );

  const showInstagram = (
    <div className="input">
      <input
        onChange={(e) => setLikesIg(e.target.value)}
        placeholder="Likes"
        type="number"
      />
      <input
        onChange={(e) => setCommentsIg(e.target.value)}
        placeholder="Comments"
        type="number"
      />
      <input
        onChange={(e) => setSaves(e.target.value)}
        placeholder="Saves"
        type="number"
        required
      />
      <input
        onChange={(e) => setSharesIg(e.target.value)}
        placeholder="Shares"
        type="number"
        required
      />
      <input
        onChange={(e) => setLeadsIg(e.target.value)}
        placeholder="Leads"
        type="number"
      />
      <input
        onChange={(e) => setImpressionsIg(e.target.value)}
        placeholder="Impressions"
        type="number"
      />
      <input
        onChange={(e) => setReachIg(e.target.value)}
        placeholder="Reach"
        type="number"
      />
      <input
        onChange={(e) => setDownloadsIg(e.target.value)}
        placeholder="Downloads"
        type="number"
      />
      <input
        onChange={(e) => setViewsIg(e.target.value)}
        placeholder="Views"
        type="number"
      />
      <input
        onChange={(e) => setFollowersIg(e.target.value)}
        placeholder="Followers"
        type="number"
      />
    </div>
  );

  const showLinkedin = (
    <div className="input">
      <input
        onChange={(e) => setLikesLn(e.target.value)}
        placeholder="Likes"
        type="number"
      />
      <input
        onChange={(e) => setCommentsLn(e.target.value)}
        placeholder="Comments"
        type="number"
      />
      <input
        onChange={(e) => setSharesLn(e.target.value)}
        placeholder="Shares"
        type="number"
        required
      />
      <input
        onChange={(e) => setLeadsLn(e.target.value)}
        placeholder="Leads"
        type="number"
      />
      <input
        onChange={(e) => setImpressionsLn(e.target.value)}
        placeholder="Impressions"
        type="number"
      />
      <input
        onChange={(e) => setReachLn(e.target.value)}
        placeholder="Reach"
        type="number"
      />
      <input
        onChange={(e) => setDownloadsLn(e.target.value)}
        placeholder="Downloads"
        type="number"
      />
      <input
        onChange={(e) => setViewsLn(e.target.value)}
        placeholder="Views"
        type="number"
      />
      <input
        onChange={(e) => setFollowersLn(e.target.value)}
        placeholder="Followers"
        type="number"
      />
    </div>
  );

  const handlePlatformChange = (e) => {
    switch (e.value) {
      case "facebook":
        setPlatformFb(true);
        setPlatformTw(false);
        setPlatformIg(false);
        setPlatformLn(false);
        break;
      case "twitter":
        setPlatformTw(true);
        setPlatformFb(false);
        setPlatformIg(false);
        setPlatformLn(false);
        break;
      case "instagram":
        setPlatformIg(true);
        setPlatformTw(false);
        setPlatformFb(false);
        setPlatformLn(false);
        break;
      case "linkedin":
        setPlatformLn(true);
        setPlatformIg(false);
        setPlatformTw(false);
        setPlatformFb(false);
        break;
      default:
        return;
    }
    setPlatform(e);
  };

  const showForm = (
    <>
      <form>
        <div className="select">
          <Select
            className="Select"
            placeholder="Platform"
            // value={platform}
            onChange={(e) => {
              handlePlatformChange(e);
            }}
            options={platforms}
          />
        </div>
        {platformFb ? (
          showFacebook
        ) : platformTw ? (
          showTwitter
        ) : platformIg ? (
          showInstagram
        ) : platformLn ? (
          showLinkedin
        ) : (
          <div></div>
        )}

        <hr />
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
            {pushForm.map((item, i) => (
              <div key={i}>{showForm}</div>
            ))}
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
              <div className="Buttons">
                <div className="Btn">
                  <button
                    onClick={handleBtnClick}
                    className="btn"
                    type="submit"
                  >
                    SUBMIT
                  </button>
                </div>
                <div className="Btn addMore">
                  <button onClick={addForm} className="btn" type="submit">
                    ADD MORE
                  </button>
                </div>
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

// import React, { useState, useEffect, useContext } from "react";
// import Select from "react-select";
// import { AuthContext } from "../../App";
// import Nav from "../Nav";
// import "./admin.css";
// import LoadingIndicator from "../LoadingIndicator";

// function AddAccount() {
//   const { handleAddAccount, loading, currentUser, isAdmin } = useContext(
//     AuthContext
//   );
//   const [accountName, setAccountName] = useState("");
//   const [manager, setManager] = useState("");
//   const [platform, setPlatform] = useState("");
//   const [likes, setLikes] = useState(0);
//   const [comments, setComments] = useState(0);
//   const [shares, setShares] = useState(0);
//   const [saves, setSaves] = useState(0);
//   const [leads, setLeads] = useState(0);
//   const [impressions, setImpressions] = useState(0);
//   const [views, setViews] = useState(0);
//   const [downloads, setDownloads] = useState(0);
//   const [followers, setFollowers] = useState(0);
//   const [reach, setReach] = useState(0);
//   const [formCount, setFormCount] = useState(0);
//   const [pushForm, setPushForm] = useState([formCount]);

//   const managers = [
//     { value: "Ramsey", label: "Ramsey" },
//     { value: "Ayomide", label: "Ayomide" },
//     { value: "Janelle", label: "Janelle" },
//     { value: "Chucks", label: "Chucks" },
//     { value: "Tiwa", label: "Tiwa" },
//     { value: "Gift", label: "Gift" },
//   ];
//   const platforms = [
//     { value: "facebook", label: "facebook" },
//     { value: "twitter", label: "twitter" },
//     { value: "instagram", label: "instagram" },
//     { value: "linkedin", label: "linkedin" },
//   ];

//   var date = new Date();
//   // today =
//   //   date.getFullYear() +
//   //   "-" +
//   //   (date.getMonth() + 1) +
//   //   "-" +
//   //   date.getDate() +
//   //   accountName;
//   var day =
//     date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

//   const handleBtnClick = () => {
//     if (platform !== "" || accountName !== "") {
//       switch (platform.value) {
//         case "facebook":
//           handleAddAccount({
//             id: accountName,
//             label: accountName,
//             manager: manager.value,
//             date: day,
//             facebook: {
//               likes: parseInt(likes),
//               comments: parseInt(comments),
//               reach: parseInt(reach),
//               shares: parseInt(shares),
//               leads: parseInt(leads),
//               views: parseInt(views),
//               impressions: parseInt(impressions),
//               followers: parseInt(followers),
//               downloads: parseInt(downloads),
//             },
//           });
//           break;
//         case "twitter":
//           handleAddAccount({
//             id: accountName,
//             label: accountName,
//             manager: manager.value,
//             date: day,
//             twitter: {
//               likes: parseInt(likes),
//               comments: parseInt(comments),
//               reach: parseInt(reach),
//               shares: parseInt(shares),
//               leads: parseInt(leads),
//               views: parseInt(views),
//               impressions: parseInt(impressions),
//               followers: parseInt(followers),
//               downloads: parseInt(downloads),
//             },
//           });
//           break;
//         case "instagram":
//           handleAddAccount({
//             id: accountName,
//             label: accountName,
//             manager: manager.value,
//             date: day,
//             instagram: {
//               likes: parseInt(likes),
//               comments: parseInt(comments),
//               saves: parseInt(saves),
//               reach: parseInt(reach),
//               shares: parseInt(shares),
//               leads: parseInt(leads),
//               views: parseInt(views),
//               impressions: parseInt(impressions),
//               followers: parseInt(followers),
//               downloads: parseInt(downloads),
//             },
//           });
//           break;
//         case "linkedin":
//           handleAddAccount({
//             id: accountName,
//             label: accountName,
//             manager: manager.value,
//             date: day,
//             linkedin: {
//               likes: parseInt(likes),
//               comments: parseInt(comments),
//               reach: parseInt(reach),
//               shares: parseInt(shares),
//               leads: parseInt(leads),
//               views: parseInt(views),
//               impressions: parseInt(impressions),
//               followers: parseInt(followers),
//               downloads: parseInt(downloads),
//             },
//           });
//           break;
//         default:
//           return;
//       }
//     }
//   };

//   const addForm = () => {
//     setFormCount(formCount + 1);
//     setPushForm([...pushForm, formCount]);
//     console.log(pushForm);
//   };

//   useEffect(() => {
//     // addForm()
//   }, [pushForm]);

//   const showForm = (
//     <>
//       <form>
//         <div className="select">
//           <Select
//             className="Select"
//             placeholder="Community manager"
//             value={manager}
//             onChange={setManager}
//             options={managers}
//           />
//         </div>
//         <div className="select">
//           <Select
//             className="Select"
//             placeholder="Platform"
//             value={platform}
//             onChange={setPlatform}
//             options={platforms}
//           />
//         </div>
//         <div className="input">
//           <input
//             onChange={(e) => setReach(e.target.value)}
//             placeholder="Reach"
//             type="number"
//           />
//           {platform.value === "twitter" ? (
//             <input
//               onChange={(e) => setShares(e.target.value)}
//               placeholder="Retweets"
//               type="number"
//               required
//             />
//           ) : (
//             <input
//               onChange={(e) => setShares(e.target.value)}
//               placeholder="Shares"
//               type="number"
//               required
//             />
//           )}
//           {platform.value === "instagram" ? (
//             <input
//               onChange={(e) => setSaves(e.target.value)}
//               placeholder="Saves"
//               type="number"
//               required
//             />
//           ) : (
//             ""
//           )}
//           <input
//             onChange={(e) => setLeads(e.target.value)}
//             placeholder="Leads"
//             type="number"
//           />
//           <input
//             onChange={(e) => setImpressions(e.target.value)}
//             placeholder="Impressions"
//             type="number"
//           />
//           <input
//             onChange={(e) => setComments(e.target.value)}
//             placeholder="Comments"
//             type="number"
//           />
//           <input
//             onChange={(e) => setDownloads(e.target.value)}
//             placeholder="Downloads"
//             type="number"
//           />
//           <input
//             onChange={(e) => setLikes(e.target.value)}
//             placeholder="Likes"
//             type="number"
//           />
//           <input
//             onChange={(e) => setViews(e.target.value)}
//             placeholder="Views"
//             type="number"
//           />
//           <input
//             onChange={(e) => setFollowers(e.target.value)}
//             placeholder="Followers"
//             type="number"
//           />
//         </div>
//         <hr />
//       </form>
//     </>
//   );

//   if (!currentUser || currentUser.email === null) {
//     return (
//       <div>
//         <center>
//           <LoadingIndicator type="Circles" height={100} width={100} />
//         </center>
//       </div>
//     );
//   }

//   return (
//     <div className="Cover">
//       <Nav />
//       {isAdmin ? (
//         <div className="AddAccount">
//           {/* <div className="head displayName">
//             <h3>Welcome, {currentUser.displayName}</h3>
//           </div> */}
//           <div className="wrap">
//             <div className="head">
//               <h3>New Account</h3>
//             </div>
//             <div className="Input">
//               <input
//                 onChange={(e) => setAccountName(e.target.value)}
//                 placeholder="Account name"
//                 type="text"
//               />
//             </div>
//             {pushForm.map((item, i) => (
//               <div key={i}>{showForm}</div>
//             ))}
//             {loading ? (
//               <center>
//                 <LoadingIndicator
//                   className="loader"
//                   type="Circles"
//                   height={30}
//                   width={30}
//                 />
//               </center>
//             ) : (
//               <div className="Buttons">
//                 <div className="Btn">
//                   <button
//                     onClick={handleBtnClick}
//                     className="btn"
//                     type="submit"
//                   >
//                     SUBMIT
//                   </button>
//                 </div>
//                 <div className="Btn addMore">
//                   <button onClick={addForm} className="btn" type="submit">
//                     ADD MORE
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       ) : (
//         <div>
//           <center>
//             <h2>Please you're not an Admin</h2>
//           </center>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AddAccount;
