import "core-js/stable";
import React from "react";
import ReactDOM from "react-dom";
import { Amplify, Analytics } from "aws-amplify";
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

Analytics.autoTrack('pageView', {
  // REQUIRED, turn on/off the auto tracking
  enable: true,
  // OPTIONAL, the event name, by default is 'pageView'
  eventName: 'pageView',
  // OPTIONAL, the attributes of the event, you can either pass an object or a function 
  // which allows you to define dynamic attributes
  attributes: {
      attr: 'attr'
  },
  // when using function
  // attributes: () => {
  //    const attr = somewhere();
  //    return {
  //        myAttr: attr
  //    }
  // },
  // OPTIONAL, by default is 'multiPageApp'
  // you need to change it to 'SPA' if your app is a single-page app like React
  type: 'multiPageApp',
  // OPTIONAL, the service provider, by default is the Amazon Pinpoint
  provider: 'AWSPinpoint',
  // OPTIONAL, to get the current page url
  getUrl: () => {
      // the default function
      return window.location.origin + window.location.pathname;
  }
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
