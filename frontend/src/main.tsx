import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App as AntdApp } from "antd";
import AppRoutes from "./app/routes/AppRoutes";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AntdApp>
        <AppRoutes />
      </AntdApp>
    </BrowserRouter>
  </React.StrictMode>,
);
