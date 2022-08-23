import React, { useState } from "react";
import clsx from "clsx";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
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
import { useUser } from "src/components/context/usercontext.js";
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

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

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
        graphqlOperation(queries.listRequests, { filter: filter })
      );
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
  }, [sub]);

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

  function checkpayout(date) {
    if (date !== null) {
      return (
        <>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={orangeTheme}>
              <Chip
                label={moment(date).format("DD/MM/YYYY")}
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
            <ThemeProvider theme={orangeTheme}>
              <Chip label="N/A" color="secondary" />
            </ThemeProvider>
          </StyledEngineProvider>
        </>
      );
    }
  }

  return (
    <Page className={clsx(classes.root)} title="Customers">
      <Container maxWidth={false}>
        <Box mt={3}>
          <Card>
            <PerfectScrollbar>
              <Box minWidth={1050}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Buyer's Name</TableCell>
                      <TableCell>Invoice Number</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Total Discount</TableCell>
                      <TableCell>Platfrom Fee</TableCell>
                      <TableCell>Discount Fee</TableCell>
                      <TableCell>Currency</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Invoice Date</TableCell>
                      <TableCell>Invoice Due Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {request
                      .slice(page * limit, page * limit + limit)
                      .map((request) => (
                        <TableRow hover key={request.requestId}>
                          <TableCell>
                            <Box alignItems="center" display="flex">
                              <Avatar
                                className={classes.avatar}
                                src={request.avatarUrl}
                              >
                                {getInitials(request.buyer_name)}
                              </Avatar>
                              <Typography color="textPrimary" variant="body1">
                                {request.buyer_name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{`${request.invoice_number}`}</TableCell>
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
                            <NumberFormat
                              color="textPrimary"
                              variant="h3"
                              value={request.discount_fee_amount}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          </TableCell>
                          <TableCell>
                              <NumberFormat
                                color="textPrimary"
                                variant="h3"
                                value={request.transaction_fee_amount}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                                decimalScale="2"
                              />
                            </TableCell>
                            <TableCell>
                              <NumberFormat
                                color="textPrimary"
                                variant="h3"
                                value={Number(request.discount_fee_amount) - Number(request.transaction_fee_amount)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                                decimalScale="2"
                              />
                            </TableCell>
                            <TableCell>{`${request.invoice_currency}`}</TableCell>
                          <TableCell>
                            {checkstatus(request.request_status)}
                          </TableCell>
                          <TableCell>
                            {checkpayout(request.invoice_date)}
                          </TableCell>
                          <TableCell>
                            {checkpayout(request.invoice_due_date)}
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
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Box>
      </Container>
    </Page>
  );
};

export default TransactionListView;
