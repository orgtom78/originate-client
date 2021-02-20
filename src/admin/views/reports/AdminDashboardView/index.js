import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
import Limits from "./Limits";
import LatestLimits from "./LatestLimits";
import TasksProgress from "./TasksProgress";
import TotalTransactions from "./TotalTransactions";
import TotalTransactionAmount from "./TotalTransactionAmount";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Limits />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalTransactions />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TasksProgress />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalTransactionAmount />
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <LatestLimits />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
