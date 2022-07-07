import React from "react";
import ReactDOM from "react-dom";
import { Amplify } from "aws-amplify";
import { Auth } from "aws-amplify";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { initSentry } from "./libs/errorLib";
import App from "./App";
import { UserProvider } from "src/components/context/usercontext.js";
import { InvestorProvider } from "src/components/context/investorcontext.js";
import awsconfig from "./aws-exports";

initSentry();
Amplify.configure(awsconfig);
Amplify.configure({
  API: {
    graphql_headers: async () => {
      const session = await Auth.currentSession();
      return {
        Authorization: session.getIdToken().getJwtToken(),
      };
    },
  },
});

ReactDOM.render(
  <InvestorProvider>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </InvestorProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
