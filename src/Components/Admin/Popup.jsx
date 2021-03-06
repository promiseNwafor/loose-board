import React from 'react'
import './popup.css'

function Popup(props) {
    
    return (
        <div className="popup-box" onMouseUp={props.handleClose}>
        <div className="box">
          {/* <span className="close-icon" onClick={props.handleClose}>x</span> */}
          {props.content}
        </div>
      </div>
    )
}

export default Popup
