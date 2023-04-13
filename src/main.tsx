import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes";
import "./style/index.css";
import "preline";
import store from "./utils/redux/store/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
