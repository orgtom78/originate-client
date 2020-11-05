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

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState();
  const routing = useRoutes(routes(isAuthenticated));

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
