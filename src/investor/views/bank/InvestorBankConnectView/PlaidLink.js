import React, { useState }from "react";
import { usePlaidLink } from "react-plaid-link";
import clsx from "clsx";
import { API, Auth } from "aws-amplify";
import {
  Button,
  Container,
  makeStyles,
} from "@material-ui/core";
import Page from "src/components/Page";

import BankTransactions from "./BankTransactions";

const apiName = "plaidapi";

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
const [trans, setTrans] = useState([]);
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

  async function getTransactions() {
    const user = await Auth.currentAuthenticatedUser();
    const { attributes = {} } = user;
    const sub = attributes["custom:groupid"];
    const myInit = {
      queryStringParameters: {
        id: sub,
      },
    };
    const data = await API.get(apiName, "/api/transactions1", myInit);
    setTrans(data.transactions);
  }

  const config = {
    token: props.token,
    onSuccess,
    // ...
  };

  const { open, ready, error } = usePlaidLink(config);

  return (
    <React.Fragment>
      <Page className={clsx(classes.root)} title="Bank Transactions">
        <Container maxWidth={false}>
          <Button onClick={open()} disabled={!ready}>
            Reconnect bank account
          </Button>
          <Button onClick={getTransactions}>Get Transactions</Button>
          <BankTransactions {...trans} />
        </Container>
      </Page>
    </React.Fragment>
  );
};
export default PlaidLink;
