import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";

const container = document.getElementById("root")!;
const page = (
  <React.StrictMode>
    <App pathname={window.location.pathname} />
  </React.StrictMode>
);
if (container.hasChildNodes()) hydrateRoot(container, page);
else createRoot(container).render(page);
