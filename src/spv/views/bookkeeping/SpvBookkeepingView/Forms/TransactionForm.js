import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import NumberFormat from "react-number-format";
import { UploadCloud as UploadIcon } from "react-feather";
import { API, graphqlOperation } from "aws-amplify";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import LoaderButton from "src/components/LoaderButton.js";
import { green } from "@mui/material/colors";
import * as queries from "src/graphql/queries.js";
import currencies from "src/components/FormLists/currencies.js";
import { addDays, subDays } from "date-fns";
import moment from "moment";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const curr = currencies;

const useStyles = makeStyles(() => ({
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
  root: {
    display: "flex",
    alignItems: "center",
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

const RequestForm = ({ className, value, ...rest }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [dynamorequestid, setDynamorequestid] = useState("");
  const [dynamobookkeepingid, setDynamobookkeepingid] = useState("");
  const [invoice_amount, setInvoice_amount] = useState("");
  const [payout_date, setPayout_date] = useState("");
  const [invoice_due_date, setInvoice_due_date] = useState("");
  const [invoice_currency, setInvoice_currency] = useState("");
  const [transaction_fee_rate, setTransaction_fee_rate] = useState("");
  const [transaction_fee_amount, setTransaction_fee_amount] = useState("");
  const [discount_fee_amount, setDiscount_fee_amount] = useState("");
  const [bookkeeping_status_spv, setBookkeeping_status_spv] = useState("");
  const [bookkeeping_status, setBookkeeping_status] = useState("");
  const [requestId, setRequestId] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const [requestloading, setRequestLoading] = useState(false);
  const [requestsuccess, setRequestSuccess] = useState(false);

  useEffect(() => {
    const id = value.value;
    getRequest({ id });
    async function getRequest(input) {
      try {
        let filter = {
          requestId: { eq: input.id },
        };
        const request = await API.graphql(
          graphqlOperation(queries.listRequests, { filter: filter })
        );
        const items = request.data.listRequests.items[0];
        const {
          id,
          requestId,
          bookkeeping_status_spv,
          bookkeeping_status,
          invoice_amount,
          invoice_currency,
          payout_date,
          invoice_due_date,
          transaction_fee_rate,
          transaction_fee_amount,
          discount_fee_amount,
        } = items;
        setDynamorequestid(id);
        setRequestId(requestId);
        setBookkeeping_status_spv(bookkeeping_status_spv);
        setBookkeeping_status(bookkeeping_status);
        setTransaction_fee_rate(transaction_fee_rate);
        const round = Number(invoice_amount).toFixed(2);
        setInvoice_amount(round);
        setInvoice_currency(invoice_currency);
        setPayout_date(payout_date);
        setInvoice_due_date(invoice_due_date);
        const round1 = Number(transaction_fee_amount).toFixed(2);
        setTransaction_fee_amount(round1);
        const round2 = Number(discount_fee_amount).toFixed(2);
        setDiscount_fee_amount(round2);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
  }, [value]);

  useEffect(() => {
    if (
      bookkeeping_status_spv === "Under Review" ||
      bookkeeping_status_spv === "Approved" ||
      bookkeeping_status === "Under Review" ||
      bookkeeping_status === "Approved"
    ) {
      const id = value.value;
      getBook({ id });
      async function getBook(input) {
        try {
          let filter = {
            requestId: { eq: input.id },
          };
          const bookkeeping = await API.graphql(
            graphqlOperation(queries.listBookkeepings, { filter: filter })
          );
          const bookitem = await bookkeeping.data.listBookkeepings.items[0];
          const idd = bookitem.id;
          const transid = bookitem.transactionId;
          setDynamobookkeepingid(idd);
          setTransactionId(transid);
        } catch (err) {
          console.log("error fetching data..", err);
        }
      }
    } else {
      async function createBook() {
        try {
          await createBookkeeping({
            requestId,
          });
        } catch (err) {
          console.log("error fetching data..", err);
        }
      }
      createBook();
    }
  }, [bookkeeping_status_spv, requestId, bookkeeping_status, value]);

  async function handleRequestSubmit() {
    setRequestSuccess(false);
    setRequestLoading(true);
    try {
      const bookkeeping_status_spv = "Approved";
      const id = dynamobookkeepingid;
      await createWavePurchase({
        invoice_amount,
        discount_fee_amount,
        id,
      });
      await createWaveSale({
        invoice_amount,
        discount_fee_amount,
        id,
      });
      await updateBookkeeping({
        id,
        bookkeeping_status_spv,
      });
      async function assignid() {
        const id = dynamorequestid;
        await updateRequest({
          id,
          bookkeeping_status_spv,
        });
      }
      assignid();
    } catch (e) {
      onError(e);
    }
    setRequestSuccess(true);
    setRequestLoading(false);
    navigate("/spv/bookkeeping");
  }

  function updateRequest(input) {
    return API.graphql(
      graphqlOperation(mutations.updateRequest, { input: input })
    );
  }

  function updateBookkeeping(input) {
    return API.graphql(
      graphqlOperation(mutations.updateBookkeeping, { input: input })
    );
  }

  async function createWavePurchase(input) {
    // Default options are marked with *
    var url = "https://gql.waveapps.com/graphql/public";
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_WAVE_API_KEY}`,
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        query: `mutation ($input: MoneyTransactionCreateInput! ) {
          moneyTransactionCreate(input: $input) {
            didSucceed
            inputErrors{
              message
            }
            transaction{
              id
            }
        }
        }`,
        variables: {
          input: {
            businessId:
              "QnVzaW5lc3M6N2Q3NjU4MDktMzVkYS00M2M5LWJhMWEtNjRkMDU0MjIwMzNh",
            date: moment().format("YYYY-MM-DD"),
            externalId: `Purchase: ${input.id}`,
            description: `RequestId: ${input.id}`,
            anchor: {
              accountId:
                "QWNjb3VudDoxNTMwMTM4ODQ0MDk4MzE0MjY4O0J1c2luZXNzOjdkNzY1ODA5LTM1ZGEtNDNjOS1iYTFhLTY0ZDA1NDIyMDMzYQ==",
              direction: "DEPOSIT",
              amount: `${input.invoice_amount - input.discount_fee_amount}`,
            },
            lineItems: {
              description: `RequestId: ${input.id}`,
              accountId:
                "QWNjb3VudDoxNTE1MTAxMzg4OTA3MDcwMzAwO0J1c2luZXNzOjdkNzY1ODA5LTM1ZGEtNDNjOS1iYTFhLTY0ZDA1NDIyMDMzYQ==",
              balance: "CREDIT",
              amount: `${input.invoice_amount - input.discount_fee_amount}`,
            },
          },
        },
      }),
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  async function createWaveSale(input) {
    // Default options are marked with *
    var url = "https://gql.waveapps.com/graphql/public";
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_WAVE_API_KEY}`,
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        query: `mutation ($input: MoneyTransactionCreateInput! ) {
          moneyTransactionCreate(input: $input) {
            didSucceed
            inputErrors{
              message
            }
            transaction{
              id
            }
        }
        }`,
        variables: {
          input: {
            businessId:
              "QnVzaW5lc3M6N2Q3NjU4MDktMzVkYS00M2M5LWJhMWEtNjRkMDU0MjIwMzNh",
            date: moment().format("YYYY-MM-DD"),
            externalId: `Sale: ${input.id}`,
            description: `RequestId: ${input.id}`,
            anchor: {
              accountId:
                "QWNjb3VudDoxNTMwMTM4ODQ0MDk4MzE0MjY4O0J1c2luZXNzOjdkNzY1ODA5LTM1ZGEtNDNjOS1iYTFhLTY0ZDA1NDIyMDMzYQ==",
              direction: "WITHDRAWAL",
              amount: `${input.invoice_amount - input.discount_fee_amount}`,
            },
            lineItems: {
              description: `RequestId: ${input.id}`,
              accountId:
                "QWNjb3VudDoxNTE1MTAxNTUxODEzODM3NjYyO0J1c2luZXNzOjdkNzY1ODA5LTM1ZGEtNDNjOS1iYTFhLTY0ZDA1NDIyMDMzYQ==",
              balance: "DEBIT",
              amount: `${input.invoice_amount - input.discount_fee_amount}`,
            },
          },
        },
      }),
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  function createBookkeeping(input) {
    return API.graphql(
      graphqlOperation(mutations.createBookkeeping, { input: input })
    );
  }

  function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  }

  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  return (
    <Container maxWidth="lg">
      <React.Fragment>
        <Accordion defaultExpanded={true}>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>
              Transaction Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form
              autoComplete="off"
              noValidate
              className={clsx(classes.root, className)}
              {...rest}
            >
              <Card>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <Select
                        fullWidth
                        name="invoice_currency"
                        label="Invoice Currency"
                        onChange={(e) => setInvoice_currency(e.target.value)}
                        required
                        value={invoice_currency || ""}
                        variant="outlined"
                      >
                        {curr.map((item, index) => (
                          <MenuItem key={index} value={item.label}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="invoice_amount"
                        label="Invoice Amount"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setInvoice_amount(e.target.value)}
                        required
                        value={invoice_amount || ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="discount_fee_amount"
                        label="Total Discount"
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        required
                        value={discount_fee_amount || ""}
                      />
                    </Grid>
                    <Grid
                      container
                      justifyContent="space-around"
                      item
                      xs={12}
                      sm={6}
                    >
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          value={payout_date || ""}
                          margin="normal"
                          variant="outlined"
                          id="payout_date"
                          name="payout_date"
                          label="Invoice Payout Date"
                          format="MM/DD/YYYY"
                          minDate={subDays(new Date(), 30)}
                          maxDate={new Date()}
                          onChange={(date) => {
                            setPayout_date(date);
                          }}
                          required
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          renderInput={(params) => (
                            <TextField fullWidth {...params} />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid
                      container
                      justifyContent="space-around"
                      item
                      xs={12}
                      sm={6}
                    >
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          value={invoice_due_date || ""}
                          margin="normal"
                          variant="outlined"
                          id="invoice_due_date"
                          name="invoice_due_date"
                          label="Invoice Due Date"
                          format="MM/DD/YYYY"
                          minDate={new Date()}
                          maxDate={addDays(new Date(), 270)}
                          onChange={(date) => {
                            setInvoice_due_date(date);
                          }}
                          required
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          renderInput={(params) => (
                            <TextField fullWidth {...params} />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <Box display="flex" justifyContent="flex-end" p={2}>
                  <LoaderButton
                    startIcon={<UploadIcon />}
                    disabled={requestloading}
                    success={requestsuccess}
                    loading={requestloading}
                    onClick={handleRequestSubmit}
                  >
                    Create Bookkeeping Entries
                  </LoaderButton>
                </Box>
              </Card>
            </form>
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    </Container>
  );
};

RequestForm.propTypes = {
  className: PropTypes.string,
};

export default RequestForm;
