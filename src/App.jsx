import React from "react";
import { useEffect } from "react";
import Home from "./component/Pages/Home/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Layout/Navbar/Navbar";
import Footer from "./Layout/Footer/Footer";
import ScrollToTop from "./component/ScrollToTop";
import Shop from "./component/Pages/Shop/index";
import About from "./component/Pages/About/index";
import Contact from "./component/Pages/Contact/index";
import LensTryOn from "./component/TryLenses/Lens1/Lens1";
import TryPages from "./component/TryPages/TryPages";
const App = () => {
  useEffect(() => {
      document.body.style.overflowY = "hidden";
      document.documentElement.style.overflowY = "auto";
      document.body.style.scrollbarWidth = "none";
      document.body.style.msOverflowStyle = "none";
  
      const style = document.createElement("style");
      style.innerHTML = `
        ::-webkit-scrollbar {
          width: 0px;
          height: 0px;
          display: none;
        }
        html, body {
          -ms-overflow-style: none;
          scrollbar-width: none;
          overflow-x: hidden;
        }
      `;
      document.head.appendChild(style);
  
      return () => {
        document.head.removeChild(style);
        document.body.style.overflowY = "";
        document.documentElement.style.overflowY = "";
      };
    }, []);
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/LensTryOn" element={<LensTryOn />} />
          <Route path="/TryPages" element={<TryPages />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
