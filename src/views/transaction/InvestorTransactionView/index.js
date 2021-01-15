import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import Page from 'src/components/Page';
import TransactionForm from "./Forms/TransactionForm";
import TransactionUploads from "./Forms/TransactionUploads";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Transaction = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { reqId } = useParams();
  const [req, setReq] = useState([]);

  useEffect(() => {
      const userId = id;
      const sortkey = reqId;
      getRequest({ userId, sortkey });
      async function getRequest(input) {
        try {
          const request = await API.graphql(
            graphqlOperation(queries.getRequest, input)
          );
          const { data: { getRequest: { items }, }, } = request;
          const n = request.data.getRequest
      setReq(n);
      return request;
    } catch (err) {
      console.log("error fetching data..", err);
    }
  }
  }, [reqId, id]);
  
  return (
  <React.Fragment>
    <Page
      className={classes.root}
      title="Offer / Payout Request"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={12}
            md={6}
            xs={12}
          >
          <TransactionForm value={req}/>
            <br></br>
          <TransactionUploads value={req}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
    </React.Fragment>
  );
};

export default Transaction;
