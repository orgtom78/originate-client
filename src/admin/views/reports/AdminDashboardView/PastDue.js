import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Avatar, Card, CardContent, Grid, Typography, colors } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import AlarmIcon from "@mui/icons-material/Alarm";
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

const PastDue = ({ className, value, ...rest }) => {
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
      var due = x.map((e) => e.invoice_due_date);
      var actual = x.map((e) => e.payback_date);
      var actualdatearr = actual.map((t) => moment(t));
      var createdatearr = due.map((t) => moment(t));

      var i;
      var num = 0;
      for (i = 0; i < actualdatearr.length; i++) {
        var ne = (actualdatearr[i] - createdatearr[i]) / 1000 / 60 / 60 / 24;
        if (Number.isNaN(ne)) {
          return 0;
        } else if (ne) {
          num += +ne;
          const average = num / actualdatearr.length;
          return average;
        }
      }
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
              PAST DUE DAYS (Avg.)
            </Typography>
            <Typography color="textPrimary" variant="h3">
              <NumberFormat
                color="textPrimary"
                variant="h3"
                value={addamounts()}
                displayType={"text"}
                decimalScale="2"
              />
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AlarmIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

PastDue.propTypes = {
  className: PropTypes.string,
};

export default PastDue;
