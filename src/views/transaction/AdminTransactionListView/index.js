import React, { useState,  useCallback, useEffect } from 'react';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
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
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Page from 'src/components/Page';
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import moment from 'moment';
import getInitials from 'src/utils/getInitials';
import { green, orange } from "@material-ui/core/colors";
import NumberFormat from 'react-number-format';
import AdminTransactionView from 'src/views/transaction/AdminTransactionView';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const greenTheme = createMuiTheme({
  palette: { primary: { main: green[500] }, secondary: { main: green[200] } },
});
const orangeTheme = createMuiTheme({
  palette: { primary: { main: orange[500] }, secondary: { main: orange[200] } },
});

const AdminTransactionListView = () => {
  const classes = useStyles();
  const [request, setRequest] = useState([]);
  const [isclicked, setIsclicked] = useState('');
  const [userId, setUserId] = useState('');
  const [requestId, setRequestId] = useState('');
  const [identityId, setIdentityId] = useState('');

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function getRequests() {
      let filter = { sortkey: { contains: "request-" } };
      const {
        data: {
          listsRequest: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listsRequest, { filter: filter })
      );
      const n = { data: { listsRequest: { items: itemsPage1, nextToken } } };
      const items = n.data.listsRequest.items;
      return items;
    }

    async function test() {
      const c = await getRequests();
      setRequest(c);
    }
    test();
  }, []);

  const handler = useCallback(() => {
    if (!request || !request.length) {
      console.log("test");
    } else {
      const d = request;
      return d;
    }
  }, [request]);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = request.map((request) => request.requestId);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  function checkstatus(request) {
    if (request === "Submitted") {
      return (
        <>
          <MuiThemeProvider theme={orangeTheme}>
            <Chip label={request} color="primary" />
          </MuiThemeProvider>
        </>
      );
    } else if (request === "Under Review" || request === "Documents Pending") {
      return (
        <>
          <MuiThemeProvider theme={orangeTheme}>
            <Chip label={request} color="secondary" />
          </MuiThemeProvider>
        </>
      );
    } else {
      return (
        <>
          <MuiThemeProvider theme={greenTheme}>
            <Chip label={request} color="primary" />
          </MuiThemeProvider>
        </>
      );
    }
  }

  function getidandident(requestId, userId, identityId){
    setUserId(userId);
    setRequestId(requestId);
    setIdentityId(identityId);
    setIsclicked(true)
   };

  return (
    <React.Fragment>
    {!isclicked ? (
    <Page
      className={clsx(classes.root)} 
      title="Customers"
    >
      <Container maxWidth={false}>
        
        <Box mt={3}>
        <Card>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === request.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < request.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Buyer's Name
                </TableCell>
                <TableCell>
                  Suppliers' Name
                </TableCell>
                <TableCell>
                  Amount
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Latest update
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {request.slice(0, limit).map((request) => (
                <TableRow
                  hover
                  key={request.requestId}
                  selected={selectedCustomerIds.indexOf(request.requestId) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(request.requestId) !== -1}
                      onChange={(event) => handleSelectOne(event, request.requestId)}
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
                        src={request.avatarUrl}
                        onClick={() => getidandident(request.requestId, request.userId, request.identityId)}
                      >
                        {getInitials(request.buyer_name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {request.buyer_name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {`${request.supplier_name}`}
                  </TableCell>
                  <TableCell>
                  <NumberFormat
                  color="textPrimary"
                  variant="h3"
                  value={request.invoice_amount}
                  displayType={'text'} 
                  thousandSeparator={true}
                  prefix={'$'}
                  />    
                  </TableCell>
                  <TableCell>
                    {checkstatus(request.request_status)}
                  </TableCell>
                  <TableCell>
                    {moment(request.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={request.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
        </Box>
        <Box display="flex" justifyContent="flex-end" p={2}>
                <Link to={`/admin/newtransactionlist/`}>
                  <Button
                  >
                    Add Transaction
                  </Button>
                  </Link>
                </Box>
      </Container>
    </Page>
    ) : (
      <>
      <AdminTransactionView value={{userId, requestId, identityId}} />
      </>
    )}
    </React.Fragment>
      );
};

export default AdminTransactionListView;
