import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  createMuiTheme,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles,
  MuiThemeProvider,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import { useUser } from "src/components/usercontext.js";
import { green, orange } from "@material-ui/core/colors";
import NumberFormat from 'react-number-format';

const greenTheme = createMuiTheme({
  palette: { primary: { main: green[500] }, secondary: { main: green[200] } },
});
const orangeTheme = createMuiTheme({
  palette: { primary: { main: orange[500] }, secondary: { main: orange[200] } },
});


const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestLimits = ({ className, ...rest }) => {
  const classes = useStyles();
  const context = useUser();
  const sub = context.sub;
  const [limitdata, setLimitdata] = useState([]);

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
    setLimitdata(items)
  }; getRequests();
}, [sub])


  const limits = useCallback(() => {
    if (!limitdata || !limitdata.length) {
      console.log("test");
    } else {
      const d = limitdata;
      return d;
    }
  }, [limitdata]);
  const l = limits;
  
  function checkstatus(status) {
    if (status === "submitted") {
      return (
        <>
          <MuiThemeProvider theme={orangeTheme}>
            <Chip label={status} color="primary" />
          </MuiThemeProvider>
        </>
      );
    } else if (status === "under review") {
      return (
        <>
          <MuiThemeProvider theme={orangeTheme}>
            <Chip label={status} color="secondary" />
          </MuiThemeProvider>
        </>
      );
    } else {
      return (
        <>
          <MuiThemeProvider theme={greenTheme}>
            <Chip label={status} color="primary" />
          </MuiThemeProvider>
        </>
      );
    }
  }


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Latest Limits" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Buyer
                </TableCell>
                <TableCell>
                  Amount
                </TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {limitdata.map((limit) => (
                <TableRow
                  hover
                  key={limit.buyerId}
                >
                  <TableCell>
                    {limit.buyer_name}
                  </TableCell>
                  <TableCell>
                  <NumberFormat
                  value={limit.buyer_loan_amount}
                  displayType={'text'} 
                  thousandSeparator={true}
                  prefix={'$'}
                  />
                  </TableCell>
                  <TableCell>
                    {moment(limit.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                  {checkstatus(limit.buyer_status)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          href="/app/buyers"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestLimits.propTypes = {
  className: PropTypes.string
};

export default LatestLimits;