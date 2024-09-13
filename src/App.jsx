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

  const [data, setData] = React.useState({
    carpets: null,
    about: null,
    commissions: null,
    contact: null,
  });
  const [strapiBaseURL] = React.useState("https://strapi-production-7b09.up.railway.app");

  React.useEffect(() => {
    const endpoints = [
      { key: "carpets", url: `${strapiBaseURL}/api/carpets?populate=*` },
      { key: "about", url: `${strapiBaseURL}/api/about?populate=*` },
      { key: "commissions", url: `${strapiBaseURL}/api/commission?populate=*` },
      { key: "contact", url: `${strapiBaseURL}/api/contact?populate=*` },
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
        <Route element={<CursorLayout />}>
          <Route index element={<OpeningPage isDesktop={isDesktop} />} />
          <Route element={<HeaderLayout isDesktop={isDesktop} />}>
            <Route path="home" element={<Home isDesktop={isDesktop} data={data.carpets} />} />
            <Route path="about" element={<About data={data.about} />} />
            <Route path="commissions" element={<Commissions data={data.commissions} />} />
            <Route path="contact" element={<Contact data={data.contact} />} />
            <Route path="*" element={<NotFound />} />
            <Route path=":id" element={<Carpet data={data.carpets} isDesktop={isDesktop} />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
