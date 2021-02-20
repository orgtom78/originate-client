import React from "react";
import ReactDOM from "react-dom";
import { Amplify } from "aws-amplify";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { initSentry } from "./libs/errorLib";
import App from "./App";
import { UserProvider } from "src/components/context/usercontext.js";
import awsconfig from "./aws-exports";

initSentry();
Amplify.configure(awsconfig);

ReactDOM.render(
  <UserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
