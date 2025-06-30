// client/src/PageRoutes.jsx
import React from "react";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import { history } from "./redux/store";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Introduction from "./pages/Introduction";
import Conversation from "./pages/Conversation";

const PageRoutes = () => {
  return (
    <Router history={history}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/result" element={<Result />} />
        <Route path="/conversation" element={<Conversation />} />
      </Routes>
    </Router>
  );
};

export default PageRoutes;