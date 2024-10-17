import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Layout from "./assets/components/Layout";

import Home from "./assets/pages/Home";
import About from "./assets/pages/About";
import Commissions from "./assets/pages/Commissions";
import Contact from "./assets/pages/Contact";
import Carpet from "./assets/pages/Carpet";
import NotFound from "./assets/pages/NotFound";

export default function App() {
  const [showOpeningPage, setShowOpeningPage] = React.useState(() => {
    const hasSeenOpeningPage = localStorage.getItem("hasSeenOpeningPage");
    return !hasSeenOpeningPage;
  });

  let mobileBreakpoint = 820;

  let [isDesktop, setIsDesktop] = React.useState(window.innerWidth > mobileBreakpoint);

  const [strapiBaseURL] = React.useState("https://strapi-production-7b09.up.railway.app");

  const [data, setData] = React.useState({
    carpets: null,
    about: null,
    commissions: null,
    contact: null,
  });

  useEffect(() => {
    console.log(showOpeningPage, "showOpeningPage");
  }, [showOpeningPage]);

  // Fetch and Initialize Data
  React.useEffect(() => {
    const endpoints = [
      {
        key: "carpets",
        url: `${strapiBaseURL}/api/carpets?populate[imagegrid][populate]=*&populate[images]=*&populate[thumbnail]=*`,
      },
      { key: "about", url: `${strapiBaseURL}/api/about?populate=*` },
      { key: "commissions", url: `${strapiBaseURL}/api/commission?populate[imagegrid][populate]=*` },
      { key: "contact", url: `${strapiBaseURL}/api/contact?populate=*` },
      { key: "home", url: `${strapiBaseURL}/api/home?populate[ruggrid][populate]=*` },
    ];

    Promise.all(endpoints.map((endpoint) => fetch(endpoint.url).then((res) => res.json())))
      .then((results) => {
        const newData = {};
        results.forEach((result, index) => {
          const key = endpoints[index].key;
          newData[key] = result.data;
        });
        setData(newData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [strapiBaseURL]);

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
        <Route element={<Layout isDesktop={isDesktop} setShowOpeningPage={setShowOpeningPage} />}>
          <Route
            index
            element={
              <Home
                isDesktop={isDesktop}
                data={data.carpets}
                positiondata={data.home}
                setShowOpeningPage={setShowOpeningPage}
                showOpeningPage={showOpeningPage}
              />
            }
          />
          <Route path="about" element={<About data={data.about} />} />
          <Route path="commissions" element={<Commissions data={data.commissions} />} />
          <Route path="contact" element={<Contact data={data.contact} />} />
          <Route path="*" element={<NotFound />} />
          <Route path=":id" element={<Carpet data={data.carpets} isDesktop={isDesktop} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
