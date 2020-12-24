import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useState, useEffect } from 'react';
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { AppContext } from "./libs/contextLib";


function App() {
  const [isAuthenticated, userHasAuthenticated] = useState();
  const [isAdmin, userisAdmin] = useState();
  const [group, setGroup] = useState();
  const routing = useRoutes(routes(isAuthenticated, isAdmin));


  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      const user = await Auth.currentAuthenticatedUser();
      setGroup(user)
      userHasAuthenticated(true);
      return user
    }
    catch(e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }
  }

  useEffect(() => {
  async function settinggroup(){
    const z = await onLoad();
    if ( z === undefined || z === 0){
    return
  }  else if ( z.signInUserSession.accessToken.payload["cognito:groups"] === undefined || z.signInUserSession.accessToken.payload["cognito:groups"] === 0) {
    return
  }
  else {
    let user = z.signInUserSession.accessToken.payload["cognito:groups"][0]
    userisAdmin(true)
  }
  }settinggroup();
  }, []);

  return (
    <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, isAdmin, userisAdmin }}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
    </AppContext.Provider>
  );
};

export default App;
