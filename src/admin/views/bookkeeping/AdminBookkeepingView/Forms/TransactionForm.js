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
  makeStyles,
  MenuItem,
} from "@material-ui/core";
import NumberFormat from "react-number-format";
import { UploadCloud as UploadIcon } from "react-feather";
import { API, graphqlOperation } from "aws-amplify";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import LoaderButton from "src/components/LoaderButton.js";
import { green } from "@material-ui/core/colors";
import * as queries from "src/graphql/queries.js";
import currencies from "src/components/FormLists/currencies.js";
import { addDays, subDays } from "date-fns";
import moment from "moment";

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

const status = [
  {
    value: "Open",
    label: "Open",
  },
  {
    value: "Under Review",
    label: "Under Review",
  },
  {
    value: "Approved",
    label: "Approved",
  },
];

const RequestForm = ({ className, value, ...rest }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [dynamorequestid, setDynamorequestid] = useState("");
  const [dynamobookkeepingid, setDynamobookkeepingid] = useState("");
  const [investorId, setInvestorId] = useState("");
  const [buyer_name, setBuyer_name] = useState("");
  const [supplier_name, setSupplier_name] = useState("");
  const [invoice_amount, setInvoice_amount] = useState("");
  const [invoice_payout_date, setInvoice_payout_date] = useState("");
  const [invoice_due_date, setInvoice_due_date] = useState("");
  const [invoice_currency, setInvoice_currency] = useState("");
  const [transaction_fee_rate, setTransaction_fee_rate] = useState("");
  const [transaction_fee_amount, setTransaction_fee_amount] = useState("");
  const [bookkeeping_status, setBookkeeping_status] = useState("");
  const [invoiceId_3party, setInvoiceId_3party] = useState("");
  const [requestId, setRequestId] = useState("");

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
          bookkeeping_status,
          investorId,
          buyer_name,
          supplier_name,
          invoice_amount,
          invoice_currency,
          invoice_payout_date,
          invoice_due_date,
          transaction_fee_rate,
        } = items;
        setDynamorequestid(id);
        setRequestId(requestId);
        setBookkeeping_status(bookkeeping_status);
        setInvestorId(investorId);
        setTransaction_fee_rate(transaction_fee_rate);
        setBuyer_name(buyer_name);
        setSupplier_name(supplier_name);
        setInvoice_amount(invoice_amount);
        setInvoice_currency(invoice_currency);
        setInvoice_payout_date(invoice_payout_date);
        setInvoice_due_date(invoice_due_date);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
  }, [value]);

  useEffect(() => {
    if (
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
          const partid = bookitem.invoiceId_3party;
          console.log(partid);
          setDynamobookkeepingid(idd);
          setInvoiceId_3party(partid);
        } catch (err) {
          console.log("error fetching data..", err);
        }
      }
    }
  }, [bookkeeping_status, value]);

  async function handleRequestSubmit() {
    setRequestSuccess(false);
    setRequestLoading(true);
    try {
      if (bookkeeping_status === "" || bookkeeping_status === "Open") {
        const id = dynamorequestid;
        await updateRequest({
          id,
          transaction_fee_amount,
          transaction_fee_rate,
          invoice_payout_date,
          bookkeeping_status,
        });
      } else if (bookkeeping_status === "Under Review") {
        const id = dynamorequestid;
        const result = await createWave({
          transaction_fee_amount,
          id,
        });
        const invoice = result.data.invoiceCreate.invoice;
        const invoiceId_3party = invoice.id;
        var invoiceurl_3party = invoice.pdfUrl;
        var invoicepdfurl_3party = invoice.viewUrl;
        await createBookkeeping({
          bookkeeping_status,
          requestId,
          invoiceId_3party,
          invoiceurl_3party,
          invoicepdfurl_3party,
        });
        await updateRequest({
          id,
          transaction_fee_amount,
          transaction_fee_rate,
          invoice_payout_date,
          bookkeeping_status,
        });
      } else if (bookkeeping_status === "Approved") {
        const id = dynamobookkeepingid;
        await updateBookkeeping({
          id,
          bookkeeping_status,
        });
        console.log(invoiceId_3party);
        await approveInvoice({
          invoiceId_3party,
        });
        async function assignid() {
          const id = dynamorequestid;
          await updateRequest({
            id,
            bookkeeping_status,
          });
        }
        assignid();
      }
    } catch (e) {
      onError(e);
    }
    setRequestSuccess(true);
    setRequestLoading(false);
    navigate("/admin/bookkeeping");
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

  async function createWave(input) {
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
        query: `mutation ($input: InvoiceCreateInput!) {
          invoiceCreate(input: $input) {
            didSucceed
            inputErrors {
              message
              code
              path
            }
            invoice {
              id
              createdAt
              modifiedAt
              pdfUrl
              viewUrl
              status
              title
              subhead
              invoiceNumber
              invoiceDate
              poNumber
              customer {
                id
                name
                # Can add additional customer fields here
              }
              currency {
                code
              }
              dueDate
              amountDue {
                value
                currency {
                  symbol
                }
              }
              amountPaid {
                value
                currency {
                  symbol
                }
              }
              taxTotal {
                value
                currency {
                  symbol
                }
              }
              total {
                value
                currency {
                  symbol
                }
              }
              exchangeRate
              footer
              memo
              disableCreditCardPayments
              disableBankPayments
              itemTitle
              unitTitle
              priceTitle
              amountTitle
              hideName
              hideDescription
              hideUnit
              hidePrice
              hideAmount
              items {
                product {
                  id
                  name
                  # Can add additional product fields here
                }
                description
                quantity
                price
                subtotal {
                  value
                  currency {
                    symbol
                  }
                }
                total {
                  value
                  currency {
                    symbol
                  }
                }
                account {
                  id
                  name
                  subtype {
                    name
                    value
                  }
                  # Can add additional account fields here
                }
                taxes {
                  amount {
                    value
                  }
                  salesTax {
                    id
                    name
                    # Can add additional sales tax fields here
                  }
                }
              }
              lastSentAt
              lastSentVia
              lastViewedAt
            }
          }
        }`,
        variables: {
          input: {
            businessId:
              "QnVzaW5lc3M6NGUyMmMxN2QtYjY5Yy00ZjA1LWE5ZWYtZTg5YWQ2ZmFlNTU1",
            customerId:
              "QnVzaW5lc3M6NGUyMmMxN2QtYjY5Yy00ZjA1LWE5ZWYtZTg5YWQ2ZmFlNTU1O0N1c3RvbWVyOjU4OTAxNjI2",
            items: [
              {
                productId:
                  "QnVzaW5lc3M6NGUyMmMxN2QtYjY5Yy00ZjA1LWE5ZWYtZTg5YWQ2ZmFlNTU1O1Byb2R1Y3Q6Njk1MTExMDU=",
                quantity: 1,
                unitPrice: input.transaction_fee_amount,
                description: `Transaction ID: ${input.id}`,
              },
            ],
          },
        },
      }),
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  async function approveInvoice(input) {
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
        query: `mutation ($input: InvoiceApproveInput!) {
          invoiceApprove(input: $input) {
            didSucceed
            inputErrors {
              message
              code
              path
            }
          }
        }`,
        variables: {
          input: {
            invoiceId: `${input.invoiceId_3party}`,
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

  async function calculateFee(input) {
    if (input) {
      var year = 360;
      var due_date = moment(input.invoice_due_date);
      var payout_date = moment(input.invoice_payout_date);
      var days = due_date.diff(payout_date, "days");
      var fee_rate = Number(input.transaction_fee_rate) / 100;
      var fee = Number(input.invoice_amount) * (days / year) * fee_rate;
      const round = fee.toFixed(2);
      setTransaction_fee_amount(round);
    }
  }

  useEffect(() => {
    if (
      invoice_amount &&
      invoice_payout_date &&
      invoice_due_date &&
      transaction_fee_rate
    ) {
      try {
        const round = calculateFee({
          invoice_amount,
          invoice_payout_date,
          invoice_due_date,
          transaction_fee_rate,
        });
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
  }, [
    invoice_amount,
    invoice_payout_date,
    invoice_due_date,
    transaction_fee_rate,
  ]);

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
                        name="bookkeeping_status"
                        label="Bookkeeping Status"
                        onChange={(e) => setBookkeeping_status(e.target.value)}
                        required
                        value={bookkeeping_status || ""}
                        variant="outlined"
                      >
                        {status.map((item, index) => (
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
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid
                        container
                        justify="space-around"
                        item
                        xs={12}
                        sm={6}
                      >
                        <KeyboardDatePicker
                          fullWidth
                          value={invoice_payout_date || ""}
                          margin="normal"
                          variant="outlined"
                          id="invoice_payout_date"
                          name="invoice_payout_date"
                          label="Invoice Financing Payout Date"
                          format="dd/MM/yyyy"
                          minDate={subDays(new Date(), 30)}
                          maxDate={new Date()}
                          onChange={(date) => {
                            setInvoice_payout_date(date);
                          }}
                          required
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid
                        container
                        justify="space-around"
                        item
                        xs={12}
                        sm={6}
                      >
                        <KeyboardDatePicker
                          fullWidth
                          value={invoice_due_date || ""}
                          margin="normal"
                          variant="outlined"
                          id="invoice_due_date"
                          name="invoice_due_date"
                          label="Invoice Due Date"
                          format="dd/MM/yyyy"
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
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="transaction_fee_rate"
                        label="Transaction Fee Rate in %"
                        fullWidth
                        variant="outlined"
                        onChange={(e) =>
                          setTransaction_fee_rate(e.target.value)
                        }
                        required
                        value={transaction_fee_rate || ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="transaction_fee_amounnt"
                        label="Originate Transaction Fee Amount"
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        required
                        value={transaction_fee_amount || ""}
                      />
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
                    Create/Approve Invoice
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
