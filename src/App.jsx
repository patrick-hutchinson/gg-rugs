import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Layout from "./assets/components/Layout";

import Home from "./assets/pages/Home";
import About from "./assets/pages/About";
import Commissions from "./assets/pages/Commissions/Commissions";
import Contact from "./assets/pages/Contact";
import Carpet from "./assets/pages/Carpet";
import NotFound from "./assets/pages/NotFound";

export default function App() {
  const [showOpeningPage, setShowOpeningPage] = useState(true);

  let mobileBreakpoint = 820;

  let [isDesktop, setIsDesktop] = React.useState(window.innerWidth > mobileBreakpoint);

  // Initialize App
  React.useEffect(() => {
    // Update isDesktop on Window Resize
    const handleResize = () => {
      if (window.innerWidth > mobileBreakpoint) {
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout isDesktop={isDesktop} setShowOpeningPage={setShowOpeningPage} showOpeningPage={showOpeningPage} />
          }
        >
          <Route
            index
            element={
              <Home isDesktop={isDesktop} setShowOpeningPage={setShowOpeningPage} showOpeningPage={showOpeningPage} />
            }
          />
          <Route path="about" element={<About />} />
          <Route path="commissions" element={<Commissions />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
          <Route path=":id" element={<Carpet isDesktop={isDesktop} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
