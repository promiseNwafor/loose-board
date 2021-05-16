import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner"

function LoadingIndicator({height, width, type}) {
    return (
        <Loader
          type={type}
          color="#0c63e6"
          height={height}
          width={width}
          timeout={3000} //3 secs
        />
      );  
}

export default LoadingIndicator
