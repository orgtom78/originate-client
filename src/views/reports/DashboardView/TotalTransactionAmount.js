import React, { useState,  useEffect, useCallback} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import { useUser } from "src/components/usercontext.js";
import NumberFormat from 'react-number-format';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56
  }
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
    }loadRequest();
  }, [sub]);

  useEffect(() => {
  const getRequests = async () => {
    const id = sub;
    let filter = { userId: { eq: id }, sortkey: { contains: "request-" } };
    const {
      data: {
        listsRequest: { items: itemsPage1, nextToken },
      },
    } = await API.graphql(
      graphqlOperation(queries.listsRequest, { filter: filter })
    );
    const n = { data: { listsRequest: { items: itemsPage1, nextToken } } };
    const items = await n.data.listsRequest.items;
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
      const t = request.map((request) => request.invoice_amount)
      var b = t.map(Number);
      const sum = b.reduce((partial_sum, a) => partial_sum + a,0); 
      return(
        sum
          )
    } else {
      return
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
              TOTAL TRANSACTIONS
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
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalTransactionAmount.propTypes = {
  className: PropTypes.string
};

export default TotalTransactionAmount;
