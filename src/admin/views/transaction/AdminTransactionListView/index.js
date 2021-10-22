import React, { useState, useCallback, useEffect } from "react";
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
import AdminTransactionView from "src/admin/views/transaction/AdminTransactionView";

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
  const [isclicked, setIsclicked] = useState("");
  const [userId, setUserId] = useState("");
  const [requestId, setRequestId] = useState("");
  const [identityId, setIdentityId] = useState("");

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("status");

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
      const d = c.sort(function(a,b){
        return new Date(b.createdAt) - new Date(a.createdAt)});
      setRequest(d);
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
      return (
        <>
          <MuiThemeProvider theme={greenTheme}>
            <Chip label={request} color="primary" />
          </MuiThemeProvider>
        </>
      );
    }
  }

  function getidandident(requestId, userId, identityId) {
    setUserId(userId);
    setRequestId(requestId);
    setIdentityId(identityId);
    setIsclicked(true);
  }

  return (
    <React.Fragment>
      {!isclicked ? (
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
                                      <Avatar
                                        className={classes.avatar}
                                        src={request.avatarUrl}
                                        onClick={() =>
                                          getidandident(
                                            request.requestId,
                                            request.userId,
                                            request.identityId
                                          )
                                        }
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
      ) : (
        <>
          <AdminTransactionView value={{ userId, requestId, identityId }} />
        </>
      )}
    </React.Fragment>
  );
};

export default AdminTransactionListView;
