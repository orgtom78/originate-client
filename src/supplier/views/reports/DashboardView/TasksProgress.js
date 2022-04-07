import React, { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography, colors } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import { useUser } from "src/components/context/usercontext.js";

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

const TasksProgress = ({ className, ...rest }) => {
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
      const sum = app + rev;
      const perc = (app / sum) * 100;
      if (Number.isNaN(perc)) {
        return "100";
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
        <Grid container justifyContent="space-between" spacing={3}>
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
