import React from "react";
import { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<Home />}>
              {/* <Home /> */}
            </Route>
          </>
        ) : (
          <Route exact path="/" element={<Auth />}>
            {/* <Auth /> */}
          </Route>
        )}
      </Routes>
    </Router>
  );
};
export default AppRouter;
