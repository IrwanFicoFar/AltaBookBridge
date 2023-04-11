import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./routes";
import "./style/index.css";
import "preline";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
