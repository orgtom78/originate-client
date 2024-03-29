import React, { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Avatar, Box, Card, CardContent, Grid, Typography, colors } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import MoneyIcon from "@mui/icons-material/Money";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import { useUser } from "src/components/context/usercontext.js";
import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.red[600],
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

const Limits = ({ className, ...rest }) => {
  const classes = useStyles();
  const context = useUser();
  const sub = context.sub;
  const [request, setRequest] = useState([]);

  useEffect(() => {
    async function loadRequest() {
      const a = await sub;
      return a;
    }
    loadRequest();
  }, [sub]);

  useEffect(() => {
    const getRequests = async () => {
      const id = sub;
      let filter = {
        userId: { eq: id },
      };
      const {
        data: {
          listBuyers: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listBuyers, { filter: filter })
      );
      const n = { data: { listBuyers: { items: itemsPage1, nextToken } } };
      const items = await n.data.listBuyers.items;
      setRequest(items);
    };
    getRequests();
  }, [sub]);

  const handle = useCallback(() => {
    if (!request || !request.length) {
      return;
    } else {
      const d = request;
      return d;
    }
  }, [request]);

  function addamounts() {
    if (handle) {
      var x = request.filter((e) => e.buyer_status === "Approved");
      var fin = x.map((e) => e.buyer_loan_request_amount);

      var b = fin.map(Number);
      const sum = b.reduce((partial_sum, a) => partial_sum + a, 0);
      return sum;
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
              AVAILABLE LIMITS
            </Typography>
            <Typography color="textPrimary" variant="h3">
              <NumberFormat
                color="textPrimary"
                variant="h3"
                value={addamounts()}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon />
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

Limits.propTypes = {
  className: PropTypes.string,
};

export default Limits;
