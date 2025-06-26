// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./App.scss";

function Home() {
  return (
    <div className="home">
      <h1>Visual Novel</h1>
      <div className="menu">
        <Link to="/introduction">
          <button>Start</button>
        </Link>
        <Link to="/game">
          <button>Continue</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;