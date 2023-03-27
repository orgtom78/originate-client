import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import {
  AppBar,
  Avatar,
  Box,
  Card,
  Chip,
  Container,
  Checkbox,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import PerfectScrollbar from "react-perfect-scrollbar";
import Page from "src/components/Page";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import moment from "moment";
import getInitials from "src/utils/getInitials";
import { green, orange } from "@mui/material/colors";
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

const greenTheme = createTheme((theme) => ({
  palette: { primary: { main: green[500] }, secondary: { main: green[200] } },
}));
const orangeTheme = createTheme((theme) => ({
  palette: { primary: { main: orange[500] }, secondary: { main: orange[200] } },
}));

const AdminTransactionListView = () => {
  const classes = useStyles();
  const [request, setRequest] = useState([]);
  const [reviewbook, setReviewbook] = useState([]);
  const [approvebook, setApprovebook] = useState([]);

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("status");

  useEffect(() => {
    async function getRequests() {
      let filter = {
        bookkeeping_status_admin: { eq: "Open" },
      };
      const {
        data: {
          listRequests: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listRequests, { filter: filter, limit: 10000 })
      );
      const n = { data: { listRequests: { items: itemsPage1, nextToken } } };
      const items = n.data.listRequests.items;
      return items;
    }

    async function test() {
      const c = await getRequests();
      const d = c.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setRequest(d);
    }
    test();
  }, []);

  useEffect(() => {
    async function getBook() {
      const {
        data: {
          listBookkeepings: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(graphqlOperation(queries.listBookkeepings, {limit: 10000}));
      const n = {
        data: { listBookkeepings: { items: itemsPage1, nextToken } },
      };
      const items = n.data.listBookkeepings.items;
      return items;
    }

    async function test() {
      const a = await getBook();
      var b = a.filter((e) => e.bookkeeping_status_admin === "Under Review");
      const c = b.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setReviewbook(c);
      var d = a.filter((e) => e.bookkeeping_status_admin === "Approved");
      const e = d.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setApprovebook(e);
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
              align={"left"}
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
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={orangeTheme}>
              <Chip label={request} color="primary" />
            </ThemeProvider>
          </StyledEngineProvider>
        </>
      );
    } else if (request === "Under Review" || request === "Documents Pending") {
      return (
        <>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={orangeTheme}>
              <Chip label={request} color="secondary" />
            </ThemeProvider>
          </StyledEngineProvider>
        </>
      );
    } else {
      return (
        <>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={greenTheme}>
              <Chip label={request} color="primary" />
            </ThemeProvider>
          </StyledEngineProvider>
        </>
      );
    }
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Page title="Bookkeeping">
      <React.Fragment>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Open" {...a11yProps(0)} />
            <Tab label="Review" {...a11yProps(1)} />
            <Tab label="Approved" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={classes.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0}>
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
                                          handleSelectOne(
                                            event,
                                            request.requestId
                                          )
                                        }
                                        value="true"
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Box alignItems="center" display="flex">
                                        <Link
                                          to={`/admin/bookkeeping/${request.requestId}/`}
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
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                  />
                </Card>
              </Box>
            </Container>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Container maxWidth={false}>
              <Box mt={3}>
                <Card>
                  <PerfectScrollbar>
                    <Box minWidth={1050}>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={
                                    selectedCustomerIds.length ===
                                    reviewbook.length
                                  }
                                  color="primary"
                                  indeterminate={
                                    selectedCustomerIds.length > 0 &&
                                    selectedCustomerIds.length <
                                      reviewbook.length
                                  }
                                  onChange={handleSelectAll}
                                />
                              </TableCell>
                              <TableCell>Buyer's Name</TableCell>
                              <TableCell>Invoice PDF</TableCell>
                              <TableCell>Invoice URL</TableCell>
                              <TableCell>Latest update</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {reviewbook
                              .slice(page * limit, page * limit + limit)
                              .map((book, index) => {
                                return (
                                  <TableRow
                                    hover
                                    key={book.id}
                                    selected={
                                      selectedCustomerIds.indexOf(book.id) !==
                                      -1
                                    }
                                    tabIndex={-1}
                                  >
                                    <TableCell padding="checkbox">
                                      <Checkbox
                                        checked={
                                          selectedCustomerIds.indexOf(
                                            book.id
                                          ) !== -1
                                        }
                                        onChange={(event) =>
                                          handleSelectOne(event, book.id)
                                        }
                                        value="true"
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Box alignItems="center" display="flex">
                                        <Link
                                          to={`/admin/bookkeeping/${book.requestId}/`}
                                        >
                                          <Avatar
                                            className={classes.avatar}
                                            src={`${book.buyer_name}`}
                                          >
                                            {getInitials(book.buyer_name)}
                                          </Avatar>
                                        </Link>
                                        <Typography
                                          color="textPrimary"
                                          variant="body1"
                                        >
                                          {book.buyerId}
                                        </Typography>
                                      </Box>
                                    </TableCell>
                                    <TableCell>{`${book.invoiceurl_3party}`}</TableCell>
                                    <TableCell>{`${book.invoicepdfurl_3party}`}</TableCell>
                                    <TableCell>
                                      {moment(book.createdAt).format(
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
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                  />
                </Card>
              </Box>
            </Container>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Container maxWidth={false}>
              <Box mt={3}>
                <Card>
                  <PerfectScrollbar>
                    <Box minWidth={1050}>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={
                                    selectedCustomerIds.length ===
                                    approvebook.length
                                  }
                                  color="primary"
                                  indeterminate={
                                    selectedCustomerIds.length > 0 &&
                                    selectedCustomerIds.length <
                                      approvebook.length
                                  }
                                  onChange={handleSelectAll}
                                />
                              </TableCell>
                              <TableCell>Buyer's Name</TableCell>
                              <TableCell>Invoice PDF</TableCell>
                              <TableCell>Invoice URL</TableCell>
                              <TableCell>Latest update</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {approvebook
                              .slice(page * limit, page * limit + limit)
                              .map((book, index) => {
                                return (
                                  <TableRow
                                    hover
                                    key={book.id}
                                    selected={
                                      selectedCustomerIds.indexOf(
                                        book.requestId
                                      ) !== -1
                                    }
                                    tabIndex={-1}
                                  >
                                    <TableCell padding="checkbox">
                                      <Checkbox
                                        checked={
                                          selectedCustomerIds.indexOf(
                                            book.id
                                          ) !== -1
                                        }
                                        onChange={(event) =>
                                          handleSelectOne(event, book.id)
                                        }
                                        value="true"
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Box alignItems="center" display="flex">
                                        <Link
                                          to={`/admin/bookkeeping/${book.requestId}/`}
                                        >
                                          <Avatar
                                            className={classes.avatar}
                                            src={`${book.buyer_name}`}
                                          >
                                            {getInitials(book.buyer_name)}
                                          </Avatar>
                                        </Link>
                                        <Typography
                                          color="textPrimary"
                                          variant="body1"
                                        >
                                          {book.buyerId}
                                        </Typography>
                                      </Box>
                                    </TableCell>
                                    <TableCell>{`${book.invoiceurl_3party}`}</TableCell>
                                    <TableCell>{`${book.invoicepdfurl_3party}`}</TableCell>
                                    <TableCell>
                                      {moment(book.createdAt).format(
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
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                  />
                </Card>
              </Box>
            </Container>
          </TabPanel>
        </SwipeableViews>
      </React.Fragment>
    </Page>
  );
};

export default AdminTransactionListView;
