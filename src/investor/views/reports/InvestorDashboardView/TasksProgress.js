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
import InsertChartIcon from "@material-ui/icons/InsertChartOutlined";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56,
  },
}));

const TasksProgress = ({ className, value, ...rest }) => {
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

  function calculateprogress() {
    const t = request.map((request) => request.buyer_status);
    const count = {};
    t.forEach(function(i) {
      count[i] = (count[i] || 0) + 1;
    });
    return count;
  }

  function calcperecentage() {
    if (handle) {
      const p = calculateprogress();
      const app = p["Approved"];
      const rev = p["Under Review"];
      const sum = app + rev || 1;
      const perc = (app / sum) * 100;
      if (isNaN(perc)) {
        return "0";
      } else if (perc !== "NaN") {
        return perc;
      }
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
              APPROVAL PROGRESS
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {calcperecentage()}%
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={3}>
          <LinearProgress value={calcperecentage()} variant="determinate" />
        </Box>
      </CardContent>
    </Card>
  );
};

TasksProgress.propTypes = {
  className: PropTypes.string,
};

export default TasksProgress;
