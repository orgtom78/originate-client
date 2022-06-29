import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as queries from "src/graphql/queries.js";
import * as mutations from "src/graphql/mutations.js";
import { Auth, API, graphqlOperation } from "aws-amplify";
import {
  AppBar,
  Box,
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Tab,
  Tabs,
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import PerfectScrollbar from "react-perfect-scrollbar";
import Page from "src/components/Page";
import moment from "moment";
import NumberFormat from "react-number-format";
import SwipeableViews from "react-swipeable-views";
import PropTypes from "prop-types";
import { green } from "@mui/material/colors";

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
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const apiName = "plaid";

const SpvBankTransactionListView = (input) => {
  const classes = useStyles();
  const { id } = useParams();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [trans, setTrans] = useState(["1"]);
  const [value, setValue] = useState(0);

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

  useEffect(() => {
    async function getplaid() {
      if (trans === undefined || trans.length <= 0 || trans === null) {
        async function getPlaidTransactions() {
          const user = await Auth.currentAuthenticatedUser();
          const { attributes = {} } = user;
          const sub = attributes["custom:groupid"];
          const acc = id;
          const format = "YYYY-MM-DD";
          const start = moment()
            .subtract(2, "year")
            .format(format);
          const end = moment().format(format);
          const myInit = {
            queryStringParameters: {
              id: sub,
              bankid: acc,
              startDate: start,
              endDate: end,
            },
          };
          return await API.get(apiName, "/api/transactions1", myInit);
        }
        async function createDynamoTransactions() {
          const user = await Auth.currentAuthenticatedUser();
          const { attributes = {} } = user;
          const sub = attributes["custom:groupid"];
          const plaidresponse = await getPlaidTransactions();
          const array = plaidresponse.transactions;
          const n = array.map((item) => {
            const userId = sub;
            const transactionId = item.transaction_id;
            const spvId = sub;
            const authorized_date = item.authorized_date;
            const category = item.category[0];
            const iso_currency_code = item.iso_currency_code;
            const location = JSON.stringify(item.location);
            const merchant_name = item.merchant_name;
            const payment_channel = item.payment_channel;
            const pending = item.pending;
            const recipient_account_name = item.payment_meta.payee;
            const senderaccountId = item.account_id;
            const transaction_code = item.transaction_code;
            const transaction_date = item.authorized_date;
            const transaction_description = item.name;
            const transaction_source_amount = item.amount;
            const transaction_source_currency = item.iso_currency_code;
            const response = API.graphql(
              graphqlOperation(mutations.createTransaction, {
                input: {
                  userId,
                  transactionId,
                  spvId,
                  authorized_date,
                  category,
                  iso_currency_code,
                  location,
                  merchant_name,
                  payment_channel,
                  pending,
                  recipient_account_name,
                  senderaccountId,
                  transaction_code,
                  transaction_date,
                  transaction_description,
                  transaction_source_amount,
                  transaction_source_currency,
                },
              })
            );
            return response;
          });
          await Promise.all(n);
          window.location.reload();
        }
        createDynamoTransactions();
      } else {
        return;
      }
    }
    getplaid();
  }, [id, trans]);

  useEffect(() => {
    async function checkDynDates() {
      const format = "YYYY-MM-DD";
      const start = moment()
        .subtract(1, "year")
        .format(format);
      const end = moment().format(format);
      let filter = {
        senderaccountId: { eq: id },
        transaction_date: { between: [start, end] },
      };
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
      return d;
    }

    async function checkPlaidDates() {
      const user = await Auth.currentAuthenticatedUser();
      const { attributes = {} } = user;
      const sub = attributes["custom:groupid"];
      const acc = id;
      const format = "YYYY-MM-DD";
      const start = moment()
        .subtract(1, "year")
        .format(format);
      const end = moment().format(format);
      const myInit = {
        queryStringParameters: {
          id: sub,
          bankid: acc,
          startDate: start,
          endDate: end,
        },
      };
      const array = await API.get(apiName, "/api/transactions1", myInit);
      const e = array.transactions.sort(function(a, b) {
        return new Date(b.authorized_date) - new Date(a.authorized_date);
      });
      return e;
    }
    async function compareArrays() {
      const dynarray = await checkDynDates();
      const plaidarray = await checkPlaidDates();
      const dynarrayrecentdate = dynarray[0].transaction_date;
      var y = plaidarray.filter(
        (e) => moment(e.authorized_date) - moment(dynarrayrecentdate) === 0
      );
      let index = plaidarray.indexOf(y[0]);
      const sliced = plaidarray.slice(0, index);
      if (sliced === undefined || sliced.length <= 0 || sliced === null) {
        return;
      } else {
        const user = await Auth.currentAuthenticatedUser();
        const { attributes = {} } = user;
        const sub = attributes["custom:groupid"];
        const n = sliced.map((item) => {
          const userId = sub;
          const transactionId = item.transaction_id;
          const spvId = sub;
          const authorized_date = item.authorized_date;
          const category = item.category[0];
          const iso_currency_code = item.iso_currency_code;
          const location = JSON.stringify(item.location);
          const merchant_name = item.merchant_name;
          const payment_channel = item.payment_channel;
          const pending = item.pending;
          const recipient_account_name = item.payment_meta.payee;
          const senderaccountId = item.account_id;
          const transaction_code = item.transaction_code;
          const transaction_date = item.authorized_date;
          const transaction_description = item.name;
          const transaction_source_amount = item.amount;
          const transaction_source_currency = item.iso_currency_code;
          const response = API.graphql(
            graphqlOperation(mutations.createTransaction, {
              input: {
                userId,
                transactionId,
                spvId,
                authorized_date,
                category,
                iso_currency_code,
                location,
                merchant_name,
                payment_channel,
                pending,
                recipient_account_name,
                senderaccountId,
                transaction_code,
                transaction_date,
                transaction_description,
                transaction_source_amount,
                transaction_source_currency,
              },
            })
          );
          return response;
        });
        await Promise.all(n);
        window.location.reload();
      }
    }
    compareArrays();
  }, [trans, id]);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Page title="Bank Accounts">
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
            <Tab label="Remittance Account" href={`/spv/bank/collection/${id}`} {...a11yProps(0)} />
            <Tab label="Collection Account" href={`/spv/bank/collection`} {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={classes.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0}>
            <Container maxWidth="lg">
              <React.Fragment>
                <Container maxWidth={false}>
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
                                    <Typography
                                      color="textPrimary"
                                      variant="body1"
                                    >
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
                                    <Typography
                                      color="textPrimary"
                                      variant="body1"
                                    >
                                      {moment(
                                        dynamotrans.transaction_date
                                      ).format("YYYY-MM-DD")}
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
          </TabPanel>
        </SwipeableViews>
      </React.Fragment>
    </Page>
  );
};

export default SpvBankTransactionListView;
