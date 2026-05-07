import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import App from "./App";
import "./index.css";
import "@/i18n";
import { AppProvider } from "@/store/app-context";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
        <Toaster richColors position="top-center" />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
