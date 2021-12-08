import React, { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
  makeStyles,
  colors,
} from "@material-ui/core";
import BlurLinearIcon from "@material-ui/icons/BlurLinear";
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

const Utilization = ({ className, value, buyer, ...rest }) => {
  const classes = useStyles();
  const [request, setRequest] = useState([]);
  const [limits, setLimits] = useState([]);

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

  function payouts() {
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

  useEffect(() => {
    async function get() {
      try {
        const data = await buyer;
        setLimits(data);
        return;
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    get();
  }, [buyer]);

  const handle2 = useCallback(() => {
    if (!limits || !limits.length) {
      return;
    } else {
      const d = limits;
      return d;
    }
  }, [limits]);

  function Limits() {
    if (handle2) {
      var x = limits.filter((e) => e.buyer_status === "Approved");
      var fin = x.map((e) => e.buyer_loan_request_amount);

      var b = fin.map(Number);
      const sum = b.reduce((partial_sum, a) => partial_sum + a, 0);
      return sum;
    } else {
      return;
    }
  }

  function calcutil() {
    var a = Limits();
    var b = payouts();
    const sum = (b / a) * 100;
    if (Number.isNaN(sum)) {
      return "0";
    } else if (sum !== "NaN") {
      return sum;
    } else {
      return;
    }
  }

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              AVERAGE UTILIZATION (%)
            </Typography>
            <Typography color="textPrimary" variant="h3">
              <NumberFormat
                color="textPrimary"
                variant="h3"
                value={calcutil()}
                displayType={"text"}
                decimalScale="2"
              />
              %
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <BlurLinearIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={3}>
          <LinearProgress value={calcutil()} variant="determinate" />
        </Box>
      </CardContent>
    </Card>
  );
};

Utilization.propTypes = {
  className: PropTypes.string,
};

export default Utilization;
