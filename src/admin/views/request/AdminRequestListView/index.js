import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Grid,
  TextField,
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import PerfectScrollbar from "react-perfect-scrollbar";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import * as queries from "src/graphql/queries.js";
import Page from "src/components/Page";
import { API, graphqlOperation } from "aws-amplify";
import moment from "moment";
import { green, orange } from "@mui/material/colors";
import LoaderButton from "src/components/LoaderButton.js";
import { Search as SearchIcon } from "react-feather";
import { onError } from "src/libs/errorLib.js";
import { subDays } from "date-fns";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

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
  const [searchterm, setSearchterm] = useState("");
  const [invoicestart, setInvoicestart] = useState(subDays(new Date(), 7));
  const [invoiceend, setInvoiceend] = useState(new Date());
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const c = await getRequests();
      const d = c.sort(function (a, b) {
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
    if (input === "" || input === undefined || input === null) {
      const c = await getRequests();
      const d = c.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setRequest(d);
    } else {
      const resterm = searchterm.toLowerCase() + "*";
      // search
      const filter = {
        invoice_number: {
          wildcard: resterm,
        },
        or: { requestId: { eq: searchterm } },
      };
      const result = await API.graphql(
        graphqlOperation(queries.searchRequests, { filter: filter })
      );
      if (result.data.searchRequests.items.length > 0) {
        let array = await result.data.searchRequests.items;
        const d = array.sort(function (a, b) {
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
      invoice_due_date: { between: [startDate, endDate] },
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
    const d = items.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setRequest(d);
  }

  const columns = [
    {
      field: "buyer_name",
      headerName: "Buyers name",
      minWidth: 150,
      editable: false,
      renderCell: (cellValues) => {
        return (
          <Link to={`/admin/request/${cellValues.row.id}`}>
            {cellValues.row.buyer_name}
          </Link>
        );
      },
    },
    {
      field: "supplier_name",
      headerName: "Suppliers name",
      minWidth: 150,
      editable: false,
    },
    {
      field: "invoice_number",
      headerName: "Invoice Number",
      minWidth: 150,
      editable: false,
    },
    {
      field: "invoice_amount",
      headerName: "Invoice Amount",
      type: "number",
      minWidth: 150,
      editable: false,
      valueFormatter: (params) => {
        if (params.value == null) {
          return "";
        }

        const valueFormatted = Number(params.value).toLocaleString();
        return `${valueFormatted}`;
      },
    },
    {
      field: "invoice_status",
      headerName: "Status",
      minWidth: 150,
      editable: false,
      renderCell: (cellValues) => {
        if (cellValues.row.invoice_status === "Submitted") {
          return (
            <>
              <StyledEngineProvider injectFirst>
                <ThemeProvider theme={orangeTheme}>
                  <Chip label={cellValues.row.invoice_status} color="primary" />
                </ThemeProvider>
              </StyledEngineProvider>
            </>
          );
        } else if (
          cellValues.row.invoice_status === "Under Review" ||
          cellValues.row.invoice_status === "Documents Pending"
        ) {
          return (
            <>
              <StyledEngineProvider injectFirst>
                <ThemeProvider theme={orangeTheme}>
                  <Chip
                    label={cellValues.row.invoice_status}
                    color="secondary"
                  />
                </ThemeProvider>
              </StyledEngineProvider>
            </>
          );
        } else {
          return (
            <>
              <StyledEngineProvider injectFirst>
                <ThemeProvider theme={greenTheme}>
                  <Chip label={cellValues.row.invoice_status} color="primary" />
                </ThemeProvider>
              </StyledEngineProvider>
            </>
          );
        }
      },
    },
    {
      field: "invoice_ipu_signed",
      headerName: "IPU Date",
      minWidth: 150,
      editable: false,
    },
    {
      field: "invoice_due_date",
      headerName: "Due Date",
      minWidth: 150,
      editable: false,
    },
    {
      field: "invoice_purchase_duration",
      headerName: "Duration",
      minWidth: 150,
      editable: false,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      minWidth: 150,
      editable: false,
    },
  ];

  const rows = request.map((request) => ({
    id: request.id,
    buyer_name: request.buyer_name,
    supplier_name: request.supplier_name,
    invoice_number: request.invoice_number,
    invoice_amount: request.invoice_amount,
    invoice_status: request.request_status,
    invoice_ipu_signed: moment(request.invoice_ipu_signed).format("MM/DD/YYYY"),
    invoice_due_date: moment(request.invoice_due_date).format("MM/DD/YYYY"),
    invoice_purchase_duration: moment(request.invoice_due_date).diff(
      moment(request.invoice_date),
      "days"
    ),
    createdAt: moment(request.createdAt).format("MM/DD/YYYY"),
  }));

  return (
    <React.Fragment>
      <Page className={clsx(classes.root)} title="Invoices">
        <Container maxWidth={false}>
          <Divider />
          <br></br>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
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
                  label="Due Date From"
                  onChange={(e) => setInvoicestart(e)}
                  onAccept={(e) => filterRequests({ invoicestart, invoiceend })}
                  required
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  value={invoiceend}
                  label="Due Date To"
                  onChange={(e) => setInvoiceend(e)}
                  onAccept={(e) => filterRequests({ invoicestart, invoiceend })}
                  required
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <br></br>
          <Divider />
          <Box mt={3}>
            <Card>
              <PerfectScrollbar>
                <Grid item>
                  <Box sx={{ height: 800, width: "100%" }}>
                    <div style={{ display: "flex", height: "100%" }}>
                      <div style={{ flexGrow: 1 }}>
                        <DataGrid
                          components={{
                            Toolbar: GridToolbar,
                          }}
                          componentsProps={{
                            toolbar: { showQuickFilter: true },
                          }}
                          rows={rows}
                          columns={columns}
                          pageSize={40}
                          rowsPerPageOptions={[20]}
                          checkboxSelection
                          disableSelectionOnClick
                        />
                      </div>
                    </div>
                  </Box>
                </Grid>
              </PerfectScrollbar>
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
