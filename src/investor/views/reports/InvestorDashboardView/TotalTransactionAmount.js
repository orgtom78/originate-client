import React, { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Avatar, Card, CardContent, Grid, Typography, colors } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
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

const TotalTransactionAmount = ({ className, value, ...rest }) => {
  const classes = useStyles();
  const [request, setRequest] = useState([]);

  useEffect(() => {
    async function get() {
      try {
        const data = await value;
        setRequest(data);
        return;
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    get();
  }, [value]);

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
      var x = request.filter((e) => e.request_status === "Approved");
      var fin = x.map((e) => e.invoice_amount);
      var b = fin.map(Number);
      const sum = b.reduce((partial_sum, a) => partial_sum + a, 0);
      const round = Math.round(sum);
      return round;
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
