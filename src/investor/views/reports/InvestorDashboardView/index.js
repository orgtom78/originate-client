import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import * as queries from "src/graphql/queries.js";
import { Auth, API, graphqlOperation } from "aws-amplify";

import Page from "src/components/Page";
import ApprovedLimits from "./ApprovedLimits";
import LatestLimits from "./LatestLimits";
import TasksProgress from "./TasksProgress";
import TotalTransactions from "./TotalTransactions";
import TotalTransactionAmount from "./TotalTransactionAmount";
import PastDue from "./PastDue";
import Utilization from "./Utilization";
import ExposureObligor from "./ExposureObligor";
import UtilizationAmount from "./UtilizationAmount";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const InvestorDashboard = () => {
  const classes = useStyles();
  const [buyer, setBuyer] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [investid, setInvestid] = useState("");

  useEffect(() => {
    async function getBuyers() {
      let user = await Auth.currentAuthenticatedUser();
      let id = user.attributes["custom:groupid"];
      setInvestid(id);
      let filter = { investorId: { eq: id } };
      const {
        data: {
          listBuyers: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listBuyers, { filter: filter })
      );
      const n = { data: { listBuyers: { items: itemsPage1, nextToken } } };
      const items = await n.data.listBuyers.items;
      setBuyer(items);
      return items;
    }
    getBuyers();
  }, []);

  useEffect(() => {
    async function getRequests() {
      let filter = { investorId: { eq: investid } };
      const {
        data: {
          listRequests: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listRequests, { filter: filter })
      );
      const n = { data: { listRequests: { items: itemsPage1, nextToken } } };
      const items = await n.data.listRequests.items;
      setTransaction(items);
      return items;
    }
    getRequests();
  }, [investid]);

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <ApprovedLimits value={buyer} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalTransactions value={transaction} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TasksProgress value={buyer} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalTransactionAmount value={transaction} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <PastDue value={transaction} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <ExposureObligor value={buyer} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Utilization value={transaction} buyer={buyer} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <UtilizationAmount value={transaction} />
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}></Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <LatestLimits />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default InvestorDashboard;
