import React, { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import moment from 'moment';
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
  const [limitdata, setLimitdata] = useState([]);


  useEffect(() => {
  const getRequests = async () => {
    let filter = { sortkey: { contains: "buyer-", notContains: "financials-" } };
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
}, [])


  const limits = useCallback(() => {
    if (!limitdata || !limitdata.length) {
      return
    } else {
      const d = limitdata;
      return d;
    }
  }, [limitdata]);
  
  function checkstatus(status) {
    if (status === "submitted") {
      return (
        <>
          <MuiThemeProvider theme={orangeTheme}>
            <Chip label={status} color="primary" />
          </MuiThemeProvider>
        </>
      );
    } else if (status === "Under Review") {
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
      <CardHeader title="Latest Limit Requests" />
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
                  Requested Limit
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
                    <Link to={`/investor/buyer/${limit.userId}/${limit.buyerId}/${limit.identityId}`}>
                    {limit.buyer_name}
                    </Link>
                  </TableCell>
                  <TableCell>
                  <NumberFormat
                  value={limit.buyer_loan_request_amount}
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
        <Link to={`/investor/requests`}>
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
        </Link>
      </Box>
    </Card>
  );
};

LatestLimits.propTypes = {
  className: PropTypes.string
};

export default LatestLimits;
