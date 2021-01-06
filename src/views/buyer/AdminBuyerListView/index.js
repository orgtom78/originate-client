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
  Divider,
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
import AdminBuyerView from 'src/views/buyer/AdminBuyerView';

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

const AdminBuyerListView = () => {
  const classes = useStyles();
  const [buyer, setBuyer] = useState([]);
  const [isclicked, setIsclicked] = useState('');
  const [userId, setUserId] = useState('');
  const [buyerId, setBuyerId] = useState('');
  const [identityId, setIdentityId] = useState('');

  const [selectedBuyerIds, setSelectedBuyerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);


  useEffect(() => {
    async function getBuyers() {
      let filter = { sortkey: { contains: "buyer-", notContains: "financials-" } };
      const {
        data: {
          listsBuyer: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listsBuyer, { filter: filter })
      );
      const n = { data: { listsBuyer: { items: itemsPage1, nextToken } } };
      const items = n.data.listsBuyer.items;
      setBuyer(items);
    }getBuyers();
  }, []);

  const handler = useCallback(() => {
    if (!buyer || !buyer.length) {
      console.log("test");
    } else {
      const d = buyer;
      return d;
    }
  }, [buyer]);

  const handleSelectAll = (event) => {
    let newSelectedBuyerIds;

    if (event.target.checked) {
      newSelectedBuyerIds = buyer.map((buyer) => buyer.buyerId);
    } else {
      newSelectedBuyerIds = [];
    }

    setSelectedBuyerIds(newSelectedBuyerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedBuyerIds.indexOf(id);
    let newSelectedBuyerIds = [];

    if (selectedIndex === -1) {
      newSelectedBuyerIds = newSelectedBuyerIds.concat(selectedBuyerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedBuyerIds = newSelectedBuyerIds.concat(selectedBuyerIds.slice(1));
    } else if (selectedIndex === selectedBuyerIds.length - 1) {
      newSelectedBuyerIds = newSelectedBuyerIds.concat(selectedBuyerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedBuyerIds = newSelectedBuyerIds.concat(
        selectedBuyerIds.slice(0, selectedIndex),
        selectedBuyerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedBuyerIds(newSelectedBuyerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  function checkstatus(buyer) {
    if (buyer === "Submitted") {
      return (
        <>
          <MuiThemeProvider theme={orangeTheme}>
            <Chip label={buyer} color="primary" />
          </MuiThemeProvider>
        </>
      );
    } else if (buyer === "Under Review") {
      return (
        <>
          <MuiThemeProvider theme={orangeTheme}>
            <Chip label={buyer} color="secondary" />
          </MuiThemeProvider>
        </>
      );
    } else {
      return (
        <>
          <MuiThemeProvider theme={greenTheme}>
            <Chip label={buyer} color="primary" />
          </MuiThemeProvider>
        </>
      );
    }
  }

  function getidandident(buyerId, userId, identityId){
   setUserId(userId);
   setBuyerId(buyerId);
   setIdentityId(identityId);
   setIsclicked(true)
  };

  return (
    <React.Fragment>
    {!isclicked ? (
    <Page
      className={clsx(classes.root)} 
      title="Buyers"
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
                    checked={selectedBuyerIds.length === buyer.length}
                    color="primary"
                    indeterminate={
                      selectedBuyerIds.length > 0
                      && selectedBuyerIds.length < buyer.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Buyer's Name
                </TableCell>
                <TableCell>
                  Country
                </TableCell>
                <TableCell>
                  Website
                </TableCell>
                <TableCell>
                  Loan Request
                </TableCell>
                <TableCell>
                  Latest update
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {buyer.slice(0, limit).map((buyer) => (
                <TableRow
                  hover
                  key={buyer.buyerId}
                  selected={selectedBuyerIds.indexOf(buyer.buyerId) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedBuyerIds.indexOf(buyer.buyerId) !== -1}
                      onChange={(event) => handleSelectOne(event, buyer.buyerId)}
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
                        src={`${buyer.buyer_logo}`}
                        onClick={() => getidandident(buyer.buyerId, buyer.userId, buyer.identityId)}
                      >
                        {getInitials(buyer.buyer_name)}
                      </Avatar>
                    
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {buyer.buyer_name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                  {`${buyer.buyer_country}`}
                  </TableCell>
                  <TableCell>
                    {`${buyer.buyer_website}`}
                  </TableCell>
                  <TableCell>
                  <NumberFormat
                  value={`${buyer.buyer_loan_request_amount}`}
                  displayType={'text'} 
                  thousandSeparator={true}
                  prefix={'$'}
                  />
                  </TableCell>
                  <TableCell>
                    {moment(buyer.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={buyer.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
        </Box>
        <Divider />
                <Box display="flex" justifyContent="flex-end" p={2}>
                <Link to={`/admin/newbuyer/${userId}`}>
                  <Button
                  >
                    Add Buyer
                  </Button>
                  </Link>
                </Box>
      </Container>
    </Page>
) : (
  <>
  <AdminBuyerView value={{userId, buyerId, identityId}} />
  </>
)}
</React.Fragment>
  )
};

export default AdminBuyerListView;
