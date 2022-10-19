import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Grid,
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
  const [pageSize, setPageSize] = useState(40);

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
    } = await API.graphql(
      graphqlOperation(queries.listRequests, { limit: 10000 })
    );
    const n = { data: { listRequests: { items: itemsPage1, nextToken } } };
    const items = n.data.listRequests.items;
    return items;
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
      field: "payout_date",
      headerName: "Payout Date",
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
      minWidth: 100,
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
    payout_date: moment(request.payout_date).format("MM/DD/YYYY"),
    invoice_due_date: moment(request.invoice_due_date).format("MM/DD/YYYY"),
    invoice_purchase_duration: moment(request.invoice_due_date).diff(
      moment(request.payout_date),
      "days"
    ),
    createdAt: moment(request.createdAt).format("MM/DD/YYYY"),
  }));

  return (
    <React.Fragment>
      <Page className={clsx(classes.root)} title="Invoices">
        <Container maxWidth={false}>
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
                          pageSize={pageSize}
                          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                          rowsPerPageOptions={[5, 10, 20, 40]}
                          pagination
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
