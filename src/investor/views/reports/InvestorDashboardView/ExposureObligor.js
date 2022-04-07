import React, { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Avatar, Card, CardContent, Grid, Typography, colors } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
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

const ExposureObligor = ({ className, value, ...rest }) => {
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
      var x = request.filter((e) => e.buyer_status === "Approved");
      var fin = x.map((e) => e.buyer_loan_approved_amount);
      var b = fin.map(Number);
      var c = fin.length;
      const sum = b.reduce((partial_sum, a) => partial_sum + a, 0);
      const avg = sum / c;
      const round = Math.round(avg);
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
              MAX EXPOSURE (Avg.)
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
              <AccountBalanceWalletIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

ExposureObligor.propTypes = {
  className: PropTypes.string,
};

export default ExposureObligor;
