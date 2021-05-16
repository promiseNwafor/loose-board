import React, { useState, useContext } from "react";
import { send } from "emailjs-com";
import { AuthContext } from "../App";

export const EmailContext = React.createContext();

function Email() {
  const { currentUser, isAdmin } = useContext(AuthContext);
  const [toSend, setToSend] = useState({
    from_name: "Loosebot",
    to_name: currentUser.displayName,
    to_email: currentUser.email,
    message: "It's time for your daily report",
    reply_to: "",
  });

  const sendEmail = (time) => {
    if (time === "17:42:00") {
      /* --- METHOD TO SEND THE MAIL --- */
      send(
        "service_leolhdo",
        "template_dqdqsfn",
        toSend,
        "user_TcK80igUFauKfN3Gqb1QS"
      )
        .then((response) => {
          console.log("SUCCESS!", response.status, response.text);
        })
        .catch((err) => {
          console.log("FAILED...", err);
        });
    }
  };

  return <EmailContext.Provider value={sendEmail}></EmailContext.Provider>;
}

export default Email;
