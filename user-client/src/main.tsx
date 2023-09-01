import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App";
import "./index.css";
import ThemedApp from "./theme/ThemedApp";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemedApp>
        <App />
      </ThemedApp>
    </RecoilRoot>
  </React.StrictMode>
);
