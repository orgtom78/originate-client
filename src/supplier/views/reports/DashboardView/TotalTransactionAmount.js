import React, { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Avatar, Card, CardContent, Grid, Typography, colors } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import { useUser } from "src/components/context/usercontext.js";
import NumberFormat from "react-number-format";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56,
  },
}));

const TotalTransactionAmount = ({ className, ...rest }) => {
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
      let filter = { userId: { eq: id } };
      const {
        data: {
          listRequests: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listRequests, { filter: filter })
      );
      const n = { data: { listRequests: { items: itemsPage1, nextToken } } };
      const items = await n.data.listRequests.items;
      setRequest(items);
    };
    getRequests();
  }, [sub]);

  const handle = useCallback(() => {
    if (!request || !request.length) {
      console.log("test");
    } else {
      const d = request;
      return d;
    }
  }, [request]);

  function addamounts() {
    if (handle) {
      var x = request.filter((e) => e.request_status === "Approved");
      var fin = x.map((e) => e.invoice_amount);
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
              TOTAL TRANSACTIONS
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
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalTransactionAmount.propTypes = {
  className: PropTypes.string,
};

export default TotalTransactionAmount;
