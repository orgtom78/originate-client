import React, { useState } from "react";
import clsx from "clsx";
import {
  Box,
  Card,
  Chip,
  Container,
  Grid,
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import makeStyles from "@mui/styles/makeStyles";
import PerfectScrollbar from "react-perfect-scrollbar";
import Page from "src/components/Page";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import { useUser } from "src/components/context/usercontext.js";
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
  palette: { primary: { main: orange[500] }, secondary: { main: orange[300] } },
});

const TransactionListView = () => {
  const classes = useStyles();
  const context = useUser();
  const sub = context.sub;
  const [request, setRequest] = useState([]);
  const [pageSize, setPageSize] = useState(40);

  React.useEffect(() => {
    async function loadRequest() {
      const a = await sub;
      return a;
    }

    async function getRequests() {
      const id = await loadRequest();
      let filter = { userId: { eq: id } };
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
  }, [sub]);

  const columns = [
    {
      field: "buyer_name",
      headerName: "Buyer's Name",
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
      field: "discount_fee_amount",
      headerName: "Total Discount",
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
      field: "transaction_fee_amount",
      headerName: "Platform Fee",
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
      field: "interest_fee_amount",
      headerName: "Interest Fee",
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
      field: "request_status",
      headerName: "Status",
      minWidth: 150,
      editable: false,
      renderCell: (cellValues) => {
        if (cellValues.row.request_status === "Submitted") {
          return (
            <>
              <StyledEngineProvider injectFirst>
                <ThemeProvider theme={orangeTheme}>
                  <Chip label={cellValues.row.request_status} color="primary" />
                </ThemeProvider>
              </StyledEngineProvider>
            </>
          );
        } else if (
          cellValues.row.request_status === "Under Review" ||
          cellValues.row.request_status === "Documents Pending"
        ) {
          return (
            <>
              <StyledEngineProvider injectFirst>
                <ThemeProvider theme={orangeTheme}>
                  <Chip
                    label={cellValues.row.request_status}
                    color="secondary"
                  />
                </ThemeProvider>
              </StyledEngineProvider>
            </>
          );
        } else if (cellValues.row.request_status === "Approved") {
          return (
            <>
              <StyledEngineProvider injectFirst>
                <ThemeProvider theme={greenTheme}>
                  <Chip
                    label={cellValues.row.request_status}
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
                  <Chip label={cellValues.row.request_status} color="primary" />
                </ThemeProvider>
              </StyledEngineProvider>
            </>
          );
        }
      },
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
      field: "payback_date",
      headerName: "Actual Payback Date",
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
    discount_fee_amount: request.discount_fee_amount,
    transaction_fee_amount: request.transaction_fee_amount,
    interest_fee_amount:
      Number(request.discount_fee_amount) -
      Number(request.transaction_fee_amount),
    request_status: request.request_status,
    payout_date: moment(request.payout_date).format("MM/DD/YYYY"),
    invoice_due_date: moment(request.invoice_due_date).format("MM/DD/YYYY"),
    payback_date: moment(request.payback_date).format("MM/DD/YYYY"),
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
                          onPageSizeChange={(newPageSize) =>
                            setPageSize(newPageSize)
                          }
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
        </Container>
      </Page>
    </React.Fragment>
  );
};

export default TransactionListView;
