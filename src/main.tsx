import React from "react";

import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // garante que Tailwind seja processado

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
