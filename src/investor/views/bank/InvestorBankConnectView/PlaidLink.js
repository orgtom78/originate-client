import React, { useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import clsx from "clsx";
import { Auth, API } from "aws-amplify";
import { Button, Container, makeStyles } from "@material-ui/core";
import Page from "src/components/Page";

import BankAccounts from "./BankAccounts";

const apiName = "plaid";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const PlaidLink = (props) => {
  const [accounts, setAccounts] = useState([]);
  const classes = useStyles();

  const onSuccess = async function(token, metadata) {
    const user = await Auth.currentAuthenticatedUser();
    const { attributes = {} } = user;
    const sub = attributes["custom:groupid"];
    const myInit = {
      queryStringParameters: {
        token: token,
        id: sub,
      },
    };
    API.get(apiName, "/api/exchange_public_token1", myInit);
  };

  useEffect(() => {
    if (props.token !== null && props.token !== undefined) {
      async function getBankaccounts() {
        const user = await Auth.currentAuthenticatedUser();
        const { attributes = {} } = user;
        const sub = attributes["custom:groupid"];
        const myInit = {
          queryStringParameters: {
            id: sub,
          },
        };
        const data = await API.get(apiName, "/api/accounts1", myInit);
        setAccounts(data.accounts);
      }
      getBankaccounts();
    } else {
      setAccounts([]);
    }
  }, [props.token]);

  const config = {
    token: props.token,
    onSuccess,
    // ...
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <React.Fragment>
      <Page className={clsx(classes.root)} title="Bank Transactions">
        <Container maxWidth={false}>
          <Button onClick={open()} disabled={!ready}>
            Reconnect bank account
          </Button>
          <BankAccounts {...accounts} />
        </Container>
      </Page>
    </React.Fragment>
  );
};
export default PlaidLink;
