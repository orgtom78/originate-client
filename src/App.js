import React, { useState, useEffect, Suspense } from "react";
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";
import { useRoutes } from "react-router-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material";
import GlobalStyles from "src/components/GlobalStyles";
import theme from "src/theme";
import routes from "src/routes";
import { AppContext } from "./libs/contextLib";
import "react-perfect-scrollbar/dist/css/styles.css";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState();
  const [isAdmin, userisAdmin] = useState();
  const [isInvestor, userisInvestor] = useState();
  const [isSpv, userisSpv] = useState();
  const [isBroker, userisBroker] = useState();
  const routing = useRoutes(
    routes(isAuthenticated, isAdmin, isInvestor, isSpv, isBroker)
  );

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      const user = await Auth.currentAuthenticatedUser();
      userHasAuthenticated(true);
      return user;
    } catch (e) {
      if (e !== "No current user") {
        onError(e);
      }
    }
  }

  useEffect(() => {
    async function settinggroup() {
      const z = await onLoad();
      if (
        z === undefined ||
        z === 0 ||
        z.signInUserSession.accessToken.payload["cognito:groups"] ===
          undefined ||
        z.signInUserSession.accessToken.payload["cognito:groups"] === 0
      ) {
        return;
      } else if (
        z.signInUserSession.accessToken.payload["cognito:groups"][0] === "Admin"
      ) {
        userisAdmin(true);
      } else if (
        z.signInUserSession.accessToken.payload["cognito:groups"][0] ===
        "Investor"
      ) {
        userisInvestor(true);
      } else if (
        z.signInUserSession.accessToken.payload["cognito:groups"][0] === "Spv"
      ) {
        userisSpv(true);
      } else if (
        z.signInUserSession.accessToken.payload["cognito:groups"][0] ===
        "Broker"
      ) {
        userisBroker(true);
      }
    }
    settinggroup();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        userHasAuthenticated,
        isAdmin,
        userisAdmin,
        isInvestor,
        userisInvestor,
        isSpv,
        userisSpv,
      }}
    >
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Suspense fallback={<div>Loading...</div>}>{routing}</Suspense>
        </ThemeProvider>
      </StyledEngineProvider>
    </AppContext.Provider>
  );
}

export default App;
