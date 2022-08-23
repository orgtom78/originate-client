import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Grid,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import PerfectScrollbar from "react-perfect-scrollbar";
import * as queries from "src/graphql/queries.js";
import Page from "src/components/Page";
import { API, graphqlOperation } from "aws-amplify";
import moment from "moment";
import getInitials from "src/utils/getInitials";
import { green, orange } from "@mui/material/colors";
import NumberFormat from "react-number-format";
import LoaderButton from "src/components/LoaderButton.js";
import { Search as SearchIcon } from "react-feather";
import { onError } from "src/libs/errorLib.js";
import { subDays } from "date-fns";

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

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
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [searchterm, setSearchterm] = useState("");
  const [invoicestart, setInvoicestart] = useState(subDays(new Date(), 7));
  const [invoiceend, setInvoiceend] = useState(new Date());
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const c = await getRequests();
      const d = c.sort(function(a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setRequest(d);
    }
    fetchData();
  }, []);

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

  async function handleSearch() {
    setSuccess(false);
    setLoading(true);
    try {
      const term = searchterm;
      await searchRequest(term);
    } catch (e) {
      onError(e);
    }
    setSuccess(false);
    setLoading(false);
  }

  async function searchRequest(input) {
    if (input === "" || input === undefined) {
      const c = await getRequests();
      const d = c.sort(function(a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setRequest(d);
    } else {
      const resterm = input.toLowerCase() + "*";
      // search
      const filter = {
        invoice_number: {
          wildcard: resterm,
        },
      };
      const result = await API.graphql(
        graphqlOperation(queries.searchRequests, { filter: filter })
      );
      if (result.data.searchRequests.items.length > 0) {
        let array = await result.data.searchRequests.items;
        const d = array.sort(function(a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setRequest(d);
      } else {
        setRequest([]);
      }
    }
  }

  async function filterRequests(input) {
    const startDate = moment(input.invoicestart).format("YYYY-MM-DD");
    const endDate = moment(input.invoiceend).format("YYYY-MM-DD");
    let filter = {
      invoice_date: { between: [startDate, endDate] },
    };
    const {
      data: {
        listRequests: { items: itemsPage1, nextToken },
      },
    } = await API.graphql(
      graphqlOperation(queries.listRequests, { filter: filter })
    );
    const n = { data: { listRequests: { items: itemsPage1, nextToken } } };
    const items = n.data.listRequests.items;
    const d = items.sort(function(a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setRequest(d);
  }

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

  return (
    <React.Fragment>
      <Page className={clsx(classes.root)} title="Invoices">
        <Container maxWidth={false}>
          <Divider />
          <br></br>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Search Invoice Number"
                name="Search"
                onChange={(e) => setSearchterm(e.target.value)}
                required
                value={searchterm || ""}
                variant="outlined"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(e.target.value);
                  }
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <LoaderButton
                startIcon={<SearchIcon />}
                disabled={loading}
                success={success}
                loading={loading}
                onClick={handleSearch}
              >
                Search
              </LoaderButton>
            </Grid>
            <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  value={invoicestart}
                  label="Invoice Date From"
                  onChange={(e) => setInvoicestart(e)}
                  onAccept={(e) => filterRequests({ invoicestart, invoiceend })}
                  required
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  value={invoiceend}
                  label="Invoice Date To"
                  onChange={(e) => setInvoiceend(e)}
                  onAccept={(e) => filterRequests({ invoicestart, invoiceend })}
                  required
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <br></br>
          <Divider />
          <Box mt={3}>
            <Card>
              <PerfectScrollbar>
                <Box minWidth={1050}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Buyer's Name</TableCell>
                          <TableCell>Suppliers' Name</TableCell>
                          <TableCell>Invoice Number</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Currency</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Invoice Date</TableCell>
                          <TableCell>Invoice Due Date</TableCell>
                          <TableCell>Created At</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {request
                          .slice(page * limit, page * limit + limit)
                          .map((request, index) => {
                            return (
                              <TableRow hover key={request.requestId}>
                                <TableCell>
                                  <Box alignItems="center" display="flex">
                                    <Link to={`/admin/request/${request.id}/`}>
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
                                <TableCell>{`${request.invoice_number}`}</TableCell>
                                <TableCell>
                                  <NumberFormat
                                    color="textPrimary"
                                    variant="body1"
                                    value={request.invoice_amount}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                  />
                                </TableCell>
                                <TableCell>{`${request.invoice_currency}`}</TableCell>
                                <TableCell>
                                  {checkstatus(request.request_status)}
                                </TableCell>
                                <TableCell>
                                  {moment(request.invoice_date).format(
                                    "DD/MM/YYYY"
                                  )}
                                </TableCell>
                                <TableCell>
                                  {moment(request.invoice_due_date).format(
                                    "DD/MM/YYYY"
                                  )}
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
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25, 50]}
              />
            </Card>
          </Box>
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Link to={`/admin/newrequestsupplierlist`}>
              <Button>New Invoice</Button>
            </Link>
          </Box>
        </Container>
      </Page>
    </React.Fragment>
  );
};

export default AdminTransactionListView;
