// client/src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./App.scss";

function Home() {
  return (
    <div className="home">
      <div className="splash-container">
        <img src="/assets/splash.png" alt="Love Quest" className="splash-image" />
        <h1>Love Quest</h1>
      </div>
      <div className="menu">
        <Link to="/select-model">
          <button>Start</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;