import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as queries from "src/graphql/queries.js";
import * as mutations from "src/graphql/mutations.js";
import { API, graphqlOperation } from "aws-amplify";
import {
  AppBar,
  Box,
  Card,
  Container,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import PerfectScrollbar from "react-perfect-scrollbar";
import Page from "src/components/Page";
import moment from "moment";
import NumberFormat from "react-number-format";
import LoaderButton from "src/components/LoaderButton.js";
import { Search as SearchIcon } from "react-feather";
import { onError } from "src/libs/errorLib.js";
import { subDays } from "date-fns";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

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
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  wrapper: {
    margin: "auto",
    position: "relative",
  },
}));

const AdminAccountTransactionView = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [trans, setTrans] = useState(["1"]);
  const [value, setValue] = useState(0);
  const [searchterm, setSearchterm] = useState("");
  const [transactionstart, setTransactionstart] = useState(
    subDays(new Date(), 7)
  );
  const [transactionend, setTransactionend] = useState(new Date());
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getDynamoTransactions() {
      let filter = { senderaccountId: { eq: id } };
      const {
        data: {
          listTransactions: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listTransactions, {
          limit: 10000,
          filter: filter,
        })
      );
      const n = {
        data: { listTransactions: { items: itemsPage1, nextToken } },
      };
      const items = n.data.listTransactions.items;
      const d = items.sort(function(a, b) {
        return new Date(b.transaction_date) - new Date(a.transaction_date);
      });
      setTrans(d);
    }
    getDynamoTransactions();
  }, [id]);

  async function handleSearch() {
    setSuccess(false);
    setLoading(true);
    try {
      const term = searchterm;
      await searchTransactions(term);
    } catch (e) {
      onError(e);
    }
    setSuccess(false);
    setLoading(false);
  }

  async function searchTransactions(input) {
    if (input === "" || input === undefined) {
      const c = await trans;
      const d = c.sort(function(a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setTrans(d);
    } else {
      const resterm = input.toLowerCase() + "*";
      // search
      const filter = {
        transaction_description: {
          wildcard: resterm,
        },
      };
      const result = await API.graphql(
        graphqlOperation(queries.searchTransactions, { filter: filter })
      );
      if (result.data.searchTransactions.items.length > 0) {
        let array = await result.data.searchTransactions.items;
        const d = array.sort(function(a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setTrans(d);
      } else {
        setTrans([]);
      }
    }
  }

  async function filterTransactions(input) {
    const startDate = moment(input.transactionstart).format("YYYY-MM-DD");
    const endDate = moment(input.transactionend).format("YYYY-MM-DD");
    let filter = {
      transaction_date: { between: [startDate, endDate] },
    };
    const {
      data: {
        listTransactions: { items: itemsPage1, nextToken },
      },
    } = await API.graphql(
      graphqlOperation(queries.listTransactions, { filter: filter })
    );
    const n = { data: { listTransactions: { items: itemsPage1, nextToken } } };
    const items = n.data.listTransactions.items;
    const d = items.sort(function(a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setTrans(d);
  }

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Page title="Bank Accounts">
      <React.Fragment>
        <Container maxWidth="lg">
          <React.Fragment>
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
                    label="Search Transaction Description"
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
                      value={transactionstart}
                      label="Transaction Date From"
                      onChange={(e) => setTransactionstart(e)}
                      onAccept={(e) =>
                        filterTransactions({ transactionstart, transactionend })
                      }
                      required
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={3}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      value={transactionend}
                      label="Transaction Date To"
                      onChange={(e) => setTransactionend(e)}
                      onAccept={(e) =>
                        filterTransactions({ transactionstart, transactionend })
                      }
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
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Transaction Name</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {trans
                          .slice(page * limit, page * limit + limit)
                          .map((dynamotrans) => (
                            <TableRow hover key={dynamotrans.id}>
                              <TableCell>
                                <Typography color="textPrimary" variant="body1">
                                  {`${dynamotrans.transaction_description}`}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <NumberFormat
                                  color="textPrimary"
                                  variant="h3"
                                  value={`${dynamotrans.transaction_source_amount}`}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"$"}
                                />
                              </TableCell>
                              <TableCell>
                                <Typography color="textPrimary" variant="body1">
                                  {moment(dynamotrans.transaction_date).format(
                                    "YYYY-MM-DD"
                                  )}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </PerfectScrollbar>
                  <TablePagination
                    component="div"
                    count={Object.keys(trans).length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25]}
                  />
                </Card>
              </Box>
            </Container>
          </React.Fragment>
        </Container>
      </React.Fragment>
    </Page>
  );
};

export default AdminAccountTransactionView;
