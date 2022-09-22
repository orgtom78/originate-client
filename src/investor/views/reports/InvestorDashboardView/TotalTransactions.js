import React, { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import * as queries from "src/graphql/queries.js";
import { Auth, API, graphqlOperation } from "aws-amplify";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56,
  },
  differenceIcon: {
    color: colors.green[900],
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1),
  },
}));

const TotalTransactions = ({ className, ...rest }) => {
  const classes = useStyles();
  const [request, setRequest] = useState([]);

  useEffect(() => {
    const getRequests = async () => {
      let user = await Auth.currentAuthenticatedUser();
      let id = user.attributes["custom:groupid"];
      const filter = { investorId: { eq: id } };
      const {
        data: {
          searchRequests: { total },
        },
      } = await API.graphql(
        graphqlOperation(queries.searchRequests, { filter: filter, limit: 10000 })
      );
      setRequest(total);
    };
    getRequests();
  }, []);

  const handle = useCallback(() => {
    if (!request || !request.length) {
      return;
    } else {
      const d = request;
      return d;
    }
  }, [request]);

  function addarrays() {
    if (handle) {
      var x = request.filter((e) => e.request_status === "Approved");
      const count = x.length;
      return count;
    } else {
      return;
    }
  }

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justifyContent="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              TOTAL TRANSACTIONS
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {addarrays()}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <TrendingUpIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" alignItems="center">
          <ArrowUpwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant="body2">
            0%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

TotalTransactions.propTypes = {
  className: PropTypes.string,
};

export default TotalTransactions;
