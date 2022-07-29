import React from "react";
import { Link, Navigate } from "react-router-dom";
import Auth from "./core/auth";
import mmLandingImage from "./images/mm-landing-image.png";


const LandingPage = () => {

  const auth = Auth.isAuthenticated();

  if(auth) {
    return(
      <Navigate to={"/main/dashboard"}/>
    )
  } 

  const landingPageBackground = {
    height: "calc(100vh - 60px)",
    backgroundImage: "linear-gradient(to right bottom, #d0e1ff, #d0e1ff, #d0e1ff, #d0e1ff, #d0e1ff, #cddffe, #caddfd, #c7dbfc, #c0d7fa, #b8d2f7, #b1cef5, #a9caf2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }

  const landingPageContent = {
    height: "500px",
    width: "400px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "column",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    background: "white"
  }

  return (
    <div style={landingPageBackground} className="landingPageContent">
      <div style={landingPageContent}>
        <h1 style={{margin: "0"}} className="text-center"> Welcome to Matchmove Pay! </h1>
        <img src={mmLandingImage} alt="landingPageImage" style={{width: "200px"}}/>
        <Link to={"/auth/login"}> Let's Get Started </Link>
      </div>
    </div>
  );
};

export default LandingPage;