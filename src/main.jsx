import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/index.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
