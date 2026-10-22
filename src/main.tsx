import "./styles.css";

import { ThemeProvider } from "@krizaka/ui/theme";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultMode="system">
      <App />
    </ThemeProvider>
  </StrictMode>,
);
