import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Layout from "./assets/components/Layout";
import Home from "./assets/pages/Home";
import About from "./assets/pages/About";
import Commissions from "./assets/pages/Commissions";
import Contact from "./assets/pages/Contact";
import Carpet from "./assets/pages/Carpet";
import NotFound from "./assets/pages/NotFound";

export default function App() {
  let [isDesktop, setIsDesktop] = React.useState(window.innerWidth > 980);

  let [data, setData] = React.useState(null);

  let [isFirstLoad, setIsFirstload] = React.useState(true);

  let [strapiBaseURL, setStrapiBaseURL] = React.useState("https://enduring-agreement-73590bea84.strapiapp.com");

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

  function toggleIsFirstLoad(newState) {
    setIsFirstload(newState);
  }

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
    console.log(isFirstLoad, "isFirstLoad");
  }, [isFirstLoad]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout isDesktop={isDesktop} />}>
          <Route
            path="/"
            element={
              <Home
                data={data}
                strapiBaseURL={strapiBaseURL}
                isDesktop={isDesktop}
                isFirstLoad={isFirstLoad}
                toggleIsFirstLoad={toggleIsFirstLoad}
              />
            }
          />
          <Route path="/about" element={<About strapiBaseURL={strapiBaseURL} />} />
          <Route path="/commissions" element={<Commissions strapiBaseURL={strapiBaseURL} />} />
          <Route path="/contact" element={<Contact strapiBaseURL={strapiBaseURL} />} />
          <Route path="/:id" element={<Carpet data={data} strapiBaseURL={strapiBaseURL} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
