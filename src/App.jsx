import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import CursorLayout from "./assets/components/CursorLayout";
import HeaderLayout from "./assets/components/HeaderLayout";
import Home from "./assets/pages/Home";
import About from "./assets/pages/About";
import Commissions from "./assets/pages/Commissions";
import Contact from "./assets/pages/Contact";
import Carpet from "./assets/pages/Carpet";
import NotFound from "./assets/pages/NotFound";
import OpeningPage from "./assets/pages/OpeningPage";

export default function App() {
  let [isDesktop, setIsDesktop] = React.useState(window.innerWidth > 980);

  let [data, setData] = React.useState(null);

  let [strapiBaseURL, setStrapiBaseURL] = React.useState("https://strapi-production-7b09.up.railway.app");

  // Fetch the Data
  React.useEffect(() => {
    fetch(`${strapiBaseURL}/api/carpets?populate=*`)
      .then((res) => res.json())
      .then((dataArray) => {
        setData(dataArray.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  React.useEffect(() => {
    if (window.innerWidth > 1180) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  }, []);

  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 1180) {
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
    },
    []
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CursorLayout isDesktop={isDesktop} />}>
          <Route path="/" element={<OpeningPage isDesktop={isDesktop} />} />
          <Route element={<HeaderLayout isDesktop={isDesktop} />}>
            <Route path="/home" element={<Home strapiBaseURL={strapiBaseURL} isDesktop={isDesktop} data={data} />} />
            <Route path="/about" element={<About strapiBaseURL={strapiBaseURL} />} />
            <Route path="/commissions" element={<Commissions strapiBaseURL={strapiBaseURL} />} />
            <Route path="/contact" element={<Contact strapiBaseURL={strapiBaseURL} />} />
            <Route path="/:id" element={<Carpet data={data} strapiBaseURL={strapiBaseURL} isDesktop={isDesktop} />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
