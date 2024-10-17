import { Link } from "react-router-dom";
import React from "react";

export default function NotFound() {
  return (
    <main className="pageContainer">
      <div>
        Please wait, knitting the last threads... 🧵🪡 . <br />
        Nothing happening? If you're lost, find your way <Link to="/">Home</Link> here.
      </div>
    </main>
  );
}
