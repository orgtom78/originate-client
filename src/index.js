import React from 'react';
import ReactDOM from 'react-dom';
import { Amplify } from 'aws-amplify';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { initSentry } from './libs/errorLib';
import App from './App';
import config from './config';

initSentry();

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    aws_appsync_graphqlEndpoint: config.graphql.URL,
    aws_appsync_region: config.graphql.REGION,
    aws_appsync_authenticationType: config.graphql.AUTHENTICATION_TYPE
  }
});

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
