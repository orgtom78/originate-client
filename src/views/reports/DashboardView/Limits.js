import React, { useState,  useEffect, useCallback } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import { useUser } from "src/components/usercontext.js";
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
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
    }loadRequest();
  }, [sub]);

  useEffect(() => {
  const getRequests = async () => {
    const id = sub;
    let filter = { userId: { eq: id }, sortkey: { contains: "buyer-" } };
    const {
      data: {
        listsBuyer: { items: itemsPage1, nextToken },
      },
    } = await API.graphql(
      graphqlOperation(queries.listsBuyer, { filter: filter })
    );
    const n = { data: { listsBuyer: { items: itemsPage1, nextToken } } };
    const items = await n.data.listsBuyer.items;
    setRequest(items)
  }; getRequests();
  }, [sub])


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
      const t = request.map((request) => request.buyer_loan_amount)
      var b = t.map(Number);
      const sum = b.reduce((partial_sum, a) => partial_sum + a,0); 
      return(
        sum
          )
    } else {
      console.log("wait");
    }
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              AVAILABLE LIMITS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
            <NumberFormat
                  color="textPrimary"
                  variant="h3"
                  value={addamounts()}
                  displayType={'text'} 
                  thousandSeparator={true}
                  prefix={'$'}
                  />
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <ArrowDownwardIcon className={classes.differenceIcon} />
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            0%
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

Limits.propTypes = {
  className: PropTypes.string
};

export default Limits;
