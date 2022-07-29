import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter as Router } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "https://reqres.in/api";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("access_token") ? "Bearer " + localStorage.getItem("access_token") : null;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
    <App/>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
