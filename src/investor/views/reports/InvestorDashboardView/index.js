import React, { useState, useEffect } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";

import Page from "src/components/Page";
import ApprovedLimits from "./ApprovedLimits";
import LatestLimits from "./LatestLimits";
import TasksProgress from "./TasksProgress";
import TotalTransactions from "./TotalTransactions";
import TotalTransactionAmount from "./TotalTransactionAmount";
import CountryExposure from "./CountryExposure";
import Map from "./Map.js";
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

  useEffect(() => {
    async function getBuyers() {
      let filter = {
        sortkey: { contains: "buyer-", notContains: "financials-" },
      };
      const {
        data: {
          listsBuyer: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listsBuyer, { filter: filter })
      );
      const n = { data: { listsBuyer: { items: itemsPage1, nextToken } } };
      const items = await n.data.listsBuyer.items;
      setBuyer(items);
      return items;
    }
    getBuyers();
  }, []);

  useEffect(() => {
    async function getRequests() {
      let filter = { sortkey: { contains: "request-" } };
      const {
        data: {
          listsRequest: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listsRequest, { filter: filter })
      );
      const n = { data: { listsRequest: { items: itemsPage1, nextToken } } };
      const items = await n.data.listsRequest.items;
      setTransaction(items);
      return items;
    }
    getRequests();
  }, []);

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
