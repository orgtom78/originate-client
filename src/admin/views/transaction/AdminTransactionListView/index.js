import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import clsx from "clsx";
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
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  makeStyles,
  MuiThemeProvider,
  createTheme,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import Page from "src/components/Page";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import moment from "moment";
import getInitials from "src/utils/getInitials";
import { green, orange } from "@material-ui/core/colors";
import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const greenTheme = createTheme({
  palette: { primary: { main: green[500] }, secondary: { main: green[200] } },
});
const orangeTheme = createTheme({
  palette: { primary: { main: orange[500] }, secondary: { main: orange[200] } },
});

const AdminTransactionListView = () => {
  const classes = useStyles();
  const [request, setRequest] = useState([]);

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("status");

  useEffect(() => {
    async function getRequests() {
      const {
        data: {
          listRequests: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(graphqlOperation(queries.listRequests));
      const n = { data: { listRequests: { items: itemsPage1, nextToken } } };
      const items = n.data.listRequests.items;
      return items;
    }

    async function test() {
      const c = await getRequests();
      const d = c.sort(function(a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setRequest(d);
    }
    test();
  }, []);

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
    {
      id: "buyers_name",
      numeric: false,
      disablePadding: false,
      label: "Buyers  Name",
    },
    {
      id: "suppliers_name",
      numeric: false,
      disablePadding: false,
      label: "Suppliers Name",
    },
    { id: "amount", numeric: true, disablePadding: false, label: "Amount" },
    { id: "status", numeric: false, disablePadding: false, label: "Status" },
    {
      id: "latest_update",
      numeric: false,
      disablePadding: false,
      label: "Latest update",
    },
  ];

  function EnhancedTableHead(props) {
    const {
      classes,
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all desserts" }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
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
      async function postData(
        url = "https://api.waveapps.com/businesses/4e22c17d-b69c-4f05-a9ef-e89ad6fae555/invoices/"
      ) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            authorization: "Bearer p2VwR2YuCXziUgL0tazMExdJM8joKG",
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify({
            amount_title: "Amount",
            customer: {
              postal_code: "10118",
              __typename: "Customer",
              mobile_number: "",
              city: "New York",
              name: "BroadRiver Asset Management, L.P.",
              fax_number: "",
              province: {
                name: "New York",
                slug: "new-york",
                __typename: "Province",
              },
              currency: {
                code: "USD",
                symbol: "$",
                name: "United States dollar",
                __typename: "Currency",
              },
              shipping_details: null,
              last_name: "",
              address: {
                address1: "Empire State Building",
                address2: "350 5th Avenue, Suite 3100",
                city: "New York",
                province: {
                  name: "New York",
                  slug: "new-york",
                  __typename: "Province",
                },
                country: {
                  name: "United States",
                  country_code: "US",
                  __typename: "Country",
                },
                postal_code: "10118",
                __typename: "Address",
              },
              country: {
                name: "United States",
                country_code: "US",
                __typename: "Country",
              },
              date_created: "2021-11-12T09:27:58.000Z",
              toll_free_number: "",
              date_modified: "2021-11-12T09:27:58.000Z",
              first_name: "",
              phone_number: "",
              website: "",
              id: 58901626,
              account_number: "",
              email: "",
              address1: "Empire State Building",
              address2: "350 5th Avenue, Suite 3100",
              internal_notes: "",
            },
            discounts: [],
            due_date: "2021-11-12",
            exchange_rate: "1.0000000000",
            footer: "",
            hide_amount: false,
            hide_description: false,
            hide_item: false,
            hide_price: false,
            hide_quantity: false,
            invoice_currency: {
              code: "USD",
              symbol: "$",
              name: "United States dollar",
              __typename: "Currency",
            },
            invoice_date: "2021-11-12",
            invoice_number: "4",
            invoice_number_label: "Invoice",
            item_title: "Items",
            items: [
              {
                description: "Transaction Fee",
                price: "100.00",
                product: {
                  id: null,
                  income_account: { id: 661393781 },
                  name: "Origination",
                },
                quantity: "1",
                taxes: [],
              },
            ],
            memo: "",
            po_so_number: "",
            price_title: "Price",
            quantity_title: "Quantity",
            require_terms_of_service_agreement: false,
            status: "draft",
            subhead: "",
          }), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
      }

      return (
        <>
          <MuiThemeProvider theme={greenTheme}>
            <Chip label={request} color="primary" />
          </MuiThemeProvider>
        </>
      );
    }
  }

  return (
    <React.Fragment>
      <Page className={clsx(classes.root)} title="Customers">
        <Container maxWidth={false}>
          <Box mt={3}>
            <Card>
              <PerfectScrollbar>
                <Box minWidth={1050}>
                  <TableContainer>
                    <Table>
                      <EnhancedTableHead
                        classes={classes}
                        numSelected={selectedCustomerIds.length}
                        onSelectAllClick={handleSelectAll}
                        onRequestSort={handleRequestSort}
                        rowCount={request.length}
                      />
                      <TableBody>
                        {request
                          .slice(page * limit, page * limit + limit)
                          .map((request, index) => {
                            return (
                              <TableRow
                                hover
                                key={request.requestId}
                                selected={
                                  selectedCustomerIds.indexOf(
                                    request.requestId
                                  ) !== -1
                                }
                                tabIndex={-1}
                              >
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    checked={
                                      selectedCustomerIds.indexOf(
                                        request.requestId
                                      ) !== -1
                                    }
                                    onChange={(event) =>
                                      handleSelectOne(event, request.requestId)
                                    }
                                    value="true"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Box alignItems="center" display="flex">
                                    <Link
                                      to={`/admin/transaction/${request.id}/`}
                                    >
                                      <Avatar
                                        className={classes.avatar}
                                        src={`${request.buyer_logo}`}
                                      >
                                        {getInitials(request.buyer_name)}
                                      </Avatar>
                                    </Link>
                                    <Typography
                                      color="textPrimary"
                                      variant="body1"
                                    >
                                      {request.buyer_name}
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>{`${request.supplier_name}`}</TableCell>
                                <TableCell>
                                  <NumberFormat
                                    color="textPrimary"
                                    variant="h3"
                                    value={request.invoice_amount}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                  />
                                </TableCell>
                                <TableCell>
                                  {checkstatus(request.request_status)}
                                </TableCell>
                                <TableCell>
                                  {moment(request.createdAt).format(
                                    "DD/MM/YYYY"
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </PerfectScrollbar>
              <TablePagination
                component="div"
                count={request.length}
                onPageChange={handleChangePage}
                onChangeRowsPerPage={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25, 50]}
              />
            </Card>
          </Box>
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Link to={`/admin/newtransactionlist/`}>
              <Button>Add Transaction</Button>
            </Link>
          </Box>
        </Container>
      </Page>
    </React.Fragment>
  );
};

export default AdminTransactionListView;
