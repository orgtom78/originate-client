import React, { useState,  useCallback, useEffect } from 'react';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  Container,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Page from 'src/components/Page';
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import moment from 'moment';
import getInitials from 'src/utils/getInitials';
import AdminUpdateFinancialsView from 'src/views/financials/AdminUpdateFinancialsView';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    maxHeight: '100%',
    maxWidth: "100%",
    margin: "auto",
    display: "block",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  table: {
    width: 650,
  },
}));

const FinancialsListView = (value) => {
  const classes = useStyles();
  const sub = value.value.value.value.userId;
  const bid = value.value.value.value.buyerId;
  const [financials, setFinancials] = useState([]);
  const [userId, setUserId] = useState('');
  const [financialsId, setFinancialsId] = useState('');
  const [isclicked, setIsclicked] = useState('');

  const [selectedFinancialsIds, setSelectedFinancialsIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function getFinancials() {
      const id = await sub;
      let filter = { userId: { eq: id }, sortkey: { beginsWith: "financials-", contains: bid } };
      const {
        data: {
          listsFinancials: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listsFinancials, { filter: filter })
      );
      const n = { data: { listsFinancials: { items: itemsPage1, nextToken } } };
      const items = n.data.listsFinancials.items;
      setFinancials(items);
    };getFinancials();
  }, [sub]);

  const handler = useCallback(() => {
    if (!financials || !financials.length) {
      return;
    } else {
      const d = financials;
      return d;
    }
  }, [financials]);

  const handleSelectAll = (event) => {
    let newSelectedFinancialsIds;

    if (event.target.checked) {
      newSelectedFinancialsIds = financials.map((financials) => financials.financialsId);
    } else {
      newSelectedFinancialsIds = [];
    }

    setSelectedFinancialsIds(newSelectedFinancialsIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedFinancialsIds.indexOf(id);
    let newSelectedFinancialsIds = [];

    if (selectedIndex === -1) {
      newSelectedFinancialsIds = newSelectedFinancialsIds.concat(selectedFinancialsIds, id);
    } else if (selectedIndex === 0) {
      newSelectedFinancialsIds = newSelectedFinancialsIds.concat(selectedFinancialsIds.slice(1));
    } else if (selectedIndex === selectedFinancialsIds.length - 1) {
      newSelectedFinancialsIds = newSelectedFinancialsIds.concat(selectedFinancialsIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedFinancialsIds = newSelectedFinancialsIds.concat(
        selectedFinancialsIds.slice(0, selectedIndex),
        selectedFinancialsIds.slice(selectedIndex + 1)
      );
    }

    setSelectedFinancialsIds(newSelectedFinancialsIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  function getidandident(sortkey, userId){
    setUserId(userId);
    setFinancialsId(sortkey);
    setIsclicked(true)
   };

  return (
    <React.Fragment>
    {!isclicked ? (
    <Page
      className={clsx(classes.root)} 
      title="Financials"
    >
      <Container maxWidth="lg" >
        
        <Box mt={3}>
        <Card>
      <PerfectScrollbar>
        <Box maxWidth="100%" maxHeight="100%">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedFinancialsIds.length === financials.length}
                    color="primary"
                    indeterminate={
                      selectedFinancialsIds.length > 0
                      && selectedFinancialsIds.length < financials.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Year
                </TableCell>
                <TableCell>
                  Revenue
                </TableCell>
                <TableCell>
                  Profit
                </TableCell>
                <TableCell>
                  Accounts Receivable
                </TableCell>
                <TableCell>
                  Accounts Payable
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {financials.slice(0, limit).map((financials) => (
                <TableRow
                  hover
                  key={financials.financialsId}
                  selected={selectedFinancialsIds.indexOf(financials.financialsId) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedFinancialsIds.indexOf(financials.financialsId) !== -1}
                      onChange={(event) => handleSelectOne(event, financials.financialsId)}
                      value="true"
                    />
                    
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Avatar
                        className={classes.avatar}
                        src={financials.avatarUrl}
                        onClick={() => getidandident(financials.sortkey, financials.userId)}
                      >
                        {getInitials(financials.financials_name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {moment(financials.financials_reporting_period).format('YYYY')}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                  <NumberFormat
                  value={`${financials.sales}`}
                  displayType={'text'} 
                  thousandSeparator={true}
                  prefix={'$'}
                  />
                  </TableCell>
                  <TableCell>
                  <NumberFormat
                  value={`${financials.net_profit}`}
                  displayType={'text'} 
                  thousandSeparator={true}
                  prefix={'$'}
                  />
                  </TableCell>
                  <TableCell>
                  <NumberFormat
                  value={`${financials.accounts_receivable}`}
                  displayType={'text'} 
                  thousandSeparator={true}
                  prefix={'$'}
                  />
                  </TableCell>
                  <TableCell>
                  <NumberFormat
                  value={`${financials.accounts_payable}`}
                  displayType={'text'} 
                  thousandSeparator={true}
                  prefix={'$'}
                  />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={financials.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
        </Box>
      </Container>
    </Page>
  ) : (
    <>
    <AdminUpdateFinancialsView value={{userId, financialsId}} />
    </>
  )}
  </React.Fragment>
    )
};

export default FinancialsListView;
