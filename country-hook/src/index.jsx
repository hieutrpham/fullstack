import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StrictMode } from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Theme
      accentColor="sky"
      grayColor="sand"
      panelBackground="solid"
      radius="large"
      scaling="110%"
      appearance="dark"
    >
      <App />
    </Theme>
  </StrictMode>
);
