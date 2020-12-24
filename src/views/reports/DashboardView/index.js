import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Limits from './Limits';
import LatestLimits from './LatestLimits';
import TasksProgress from './TasksProgress';
import TotalTransactions from './TotalTransactions';
import TotalTransactionAmount from './TotalTransactionAmount';
import TrafficByDevice from './TrafficByDevice';
import LatestProducts from './LatestProducts';
import Sales from './Sales';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();


  /*
var AWS = require('aws-sdk');

function getUsers(){
var params = {
  UserPoolId: 'us-east-2_5NVnP7Wpx',
  Limit: '60',
};

return new Promise((resolve, reject) => {
  AWS.config.update({ region: 'us-east-2', 'accessKeyId': 'AKIAYWUJXSYAMBKJYX6T', 'secretAccessKey': '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' });
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
    cognitoidentityserviceprovider.listUsers(params, (err, data) => {
        if (err) {
            console.log(err);
            reject(err)
        }
        else {
            console.log("data", data);
            resolve(data)
        }
    })
});
} console.log(getUsers())
*/


  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Limits />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalTransactions />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TasksProgress />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalTransactionAmount />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <LatestLimits />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
