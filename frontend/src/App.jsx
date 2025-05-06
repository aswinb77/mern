import React from "react";
import Home from "./pages/home/home";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Routes, Route, useLocation } from "react-router-dom";
import LogIn from "./pages/home/login";
import SignUp from "./pages/home/signup";
import Dashboard from "./components/dash";
import Check from "./components/check";
import Market from "./components/market";
import Order from "./components/order";
import Support from "./components/support";

const App = () => {
  const location = useLocation();
  const hideNavbarFooter = location.pathname === "/dashboard" || location.pathname === "/check" || location.pathname === "/market" ||location.pathname === "/order" || location.pathname === "/support" ;  

  return (
    <>
      {!hideNavbarFooter && <Navbar />} 

      <Routes>
        <Route exact path="/" element={<Home />} />      
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Check" element={<Check />} />
        <Route path="/Market" element={<Market/>} />
        <Route path="/Order" element={<Order />} />
        <Route path="/Support" element={<Support />} />
      </Routes>

      {!hideNavbarFooter && <Footer />} 
    </>
  );
};

export default App;