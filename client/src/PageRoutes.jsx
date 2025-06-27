// client/src/PageRoutes.jsx
import React from "react";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import { history } from "./redux/store";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ModelSelection from "./pages/ModelSelection";
import Introduction from "./pages/Introduction";
import Conversation from "./pages/Conversation";

const PageRoutes = () => {
  return (
    <Router history={history}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select-model" element={<ModelSelection />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/conversation" element={<Conversation />} />
      </Routes>
    </Router>
  );
};

export default PageRoutes;