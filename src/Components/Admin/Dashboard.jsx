import React, { useState, useEffect } from "react";
// import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import firebase from "../../lib/firebase";
import Popup from "./Popup";

function Dashboard() {
  const database = firebase.firestore();
  const [isOpen, setIsOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [data, setData] = useState([]);
  const [targetAccount, setTargetAccount] = useState({});
  const [facebookData, setFacebookData] = useState({});
  const [selectedAccount, setSelectedAccount] = useState(false);
  const [error, setError] = useState();

  const getData = (data, collection) => {
    // setSelectedAccount(!selectedAccount);
    database
      .collection("account")
      .doc(data.id)
      .collection(collection)
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
        setData(items);
        // console.log(facebook);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleFacebook = (account) => {
    //   setAccount == account
    togglePopup();
    setSelectedAccount(true);
    getData(account, 'facebook');
    displayFacebook(account.label);
  };

  const handleTwitter = (account) => {
    //   setAccount == account
    togglePopup();
    setSelectedAccount(true);
    getData(account);
    displayTwitter(account.label);
  };

  const handleInstagram = (account) => {
    //   setAccount == account
    togglePopup();
    setSelectedAccount(true);
    getData(account);
    displayInstagram(account.label);
  };

  const handleLinkedin = (account) => {
    //   setAccount == account
    togglePopup();
    setSelectedAccount(true);
    getData(account);
    displayLinkedin(account.label);
  };

  const displayFacebook = (label) => {
    //   get account assigned kpi of current account to calculate percentage
    //   select facebook where label == account.label
    database
      .collection("account")
      .where("label", "==", label)
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
        // set the kpi account
        setTargetAccount(items[0].facebook);
        console.log(targetAccount);
      })
      .catch((err) => {
        setError(err);
      });
    const data = [];
    data.forEach((fb) => {
      data.push(fb);
    });
    var likes = 0;
    var comments = 0;
    data.map((acc) => {
      likes += acc.likes;
      comments += acc.comments;
    });
    setFacebookData({ likes: (likes / targetAccount.likes) * 100, comments });
  };

  const displayTwitter = (label) => {
    //   get account assigned kpi of current account to calculate percentage
    //   select facebook where label == account.label
    database
      .collection("account")
      .where("label", "==", label)
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
        // set the kpi account
        setTargetAccount(items[0].facebook);
        console.log(targetAccount);
      })
      .catch((err) => {
        setError(err);
      });
    const data = [];
    data.forEach((fb) => {
      data.push(fb);
    });
    var likes = 0;
    var comments = 0;
    data.map((acc) => {
      likes += acc.likes;
      comments += acc.comments;
    });
    setData({ likes: (likes / targetAccount.likes) * 100, comments });
  };

  const displayInstagram = (label) => {
    //   get account assigned kpi of current account to calculate percentage
    //   select facebook where label == account.label
    database
      .collection("account")
      .where("label", "==", label)
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
        // set the kpi account
        setTargetAccount(items[0].facebook);
        console.log(targetAccount);
      })
      .catch((err) => {
        setError(err);
      });
    const data = [];
    data.forEach((fb) => {
      data.push(fb);
    });
    var likes = 0;
    var comments = 0;
    data.map((acc) => {
      likes += acc.likes;
      comments += acc.comments;
    });
    setData({ likes: (likes / targetAccount.likes) * 100, comments });
  };

  const displayLinkedin = (label) => {
    //   get account assigned kpi of current account to calculate percentage
    //   select facebook where label == account.label
    database
      .collection("account")
      .where("label", "==", label)
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
        // set the kpi account
        setTargetAccount(items[0].facebook);
        console.log(targetAccount);
      })
      .catch((err) => {
        setError(err);
      });
    const data = [];
    data.forEach((fb) => {
      data.push(fb);
    });
    var likes = 0;
    var comments = 0;
    data.map((acc) => {
      likes += acc.likes;
      comments += acc.comments;
    });
    setData({ likes: (likes / targetAccount.likes) * 100, comments });
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    database
      .collection("account")
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
        console.log(accounts);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        {error ? <p>Ops, there is an error : </p> : null}
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
          {accounts.map((account) => (
            <tbody key={account.id}>
              <tr>
                <td>{account.label}</td>
                <td>{account.manager}</td>
                <td>
                  <a onClick={() => handleFacebook(account)}>View</a>
                </td>
                <td>
                  <a onClick={() => handleTwitter(account)}>View</a>
                </td>
                <td>
                  <a onClick={() => handleInstagram(account)}>View</a>
                </td>
                <td>
                  <a onClick={() => handleLinkedin(account)}>View</a>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        {isOpen && (
          <Popup
            content={
              <div>
                <p>{facebookData.likes}% likes</p>
                <p>{facebookData.comments}% comments</p>
                <a onClick={() => setSelectedAccount(false)}>Close</a>
              </div>
            }
            handleClose={togglePopup}
          />
        )}
        {/* {selectedAccount ? (
          <div>
            <p>{facebookData.likes}% likes</p>
            <p>{facebookData.comments}% comments</p>
            <a onClick={() => setSelectedAccount(false)}>Close</a>
          </div>
        ) : null} */}
      </div>
    </div>
  );
}

export default Dashboard;

const popup = () => {
  return (
    <Popup trigger={<button>Trigger</button>} position="top left">
      {(close) => (
        <div>
          Content here
          <a className="close" onClick={close}>
            &times;
          </a>
        </div>
      )}
    </Popup>
  );
};

// import React, { useState, useEffect } from 'react';

// import firebase from 'firebase';

// const firebaseConfig = {
//   apiKey: "AIzaSyDQXMsyejsUgPj-1ZPIyL9YMKdhZ280Mwo",
//   authDomain: "cinema-schedule-7bfa4.firebaseapp.com",
//   databaseURL: "https://cinema-schedule-7bfa4.firebaseio.com",
//   projectId: "cinema-schedule-7bfa4",
//   storageBucket: "cinema-schedule-7bfa4.appspot.com",
//   messagingSenderId: "215540682675",
//   appId: "1:215540682675:web:6e6e792cb9f041ae8e05c6"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const database = firebase.firestore();

// const Dashboard = () => {
//   const [cinemas, setCinemas] = useState([]);
//   const [selectedCinema, setSelectedCinema] = useState();
//   const [movies, setMovies] = useState([]);
//   const [error, setError] = useState();

//   const selectCinema = (cinema) => {
//     setSelectedCinema(cinema);
//     database.collection('cinemas').doc(cinema.id).collection('movies').get()
//       .then(response => {
//         const fetchedMovies = [];
//         response.forEach(document => {
//           const fetchedMovie = {
//             id: document.id,
//             ...document.data()
//           };
//           fetchedMovies.push(fetchedMovie);
//         });
//         setMovies(fetchedMovies);
//       })
//       .catch(error => {
//         setError(error);
//       });
//   }

//   const timestampToString = (timestamp) => {
//     return Date(timestamp).toString();
//   }

//   useEffect(() => {
//     database.collection('cinemas').get()
//       .then(response => {
//         const fetchedCinemas = [];
//         response.docs.forEach(document => {
//           const fetchedCinema = {
//             id: document.id,
//             ...document.data()
//           };
//           fetchedCinemas.push(fetchedCinema);
//         });
//         setCinemas(fetchedCinemas);
//       })
//       .catch(error => {
//         setError(error);
//       });
//   }, []);

//   return (
//     <div>
//       {error ? (
//         <p>Ops, there is an error :(</p>
//       ) : null}
//       <ul>
//         {cinemas.map(cinema => (
//           <li key={cinema.id} onClick={() => selectCinema(cinema)}>
//             <b>{cinema.name}</b> in {cinema.city} has {cinema.total_seats} total seats
//           </li>
//         ))}
//       </ul>
//       {selectedCinema ? (
//         <ul>
//           {movies.map(movie => (
//             <li key={movie.id}>
//               <b>{movie.name}</b> | {movie.genre} | {movie.runtime} | {timestampToString(movie.release_date)}
//             </li>
//           ))}
//         </ul>
//       ) : null}
//     </div>
//   );
// }

// export default Dashboard;
