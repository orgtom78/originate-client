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
import DOMPurify from "dompurify";
import { v4 as uuid } from "uuid";

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
  const [invoice_number, setInvoice_number] = useState("");
  const [invoice_amount, setInvoice_amount] = useState("");
  const [invoice_purchase_amount, setPurchase_amount] = useState("");
  const [payout_date, setPayout_date] = useState("");
  const [invoice_date, setInvoice_date] = useState("");
  const [invoice_due_date, setInvoice_due_date] = useState("");
  const [invoice_currency, setInvoice_currency] = useState("");
  const [transaction_fee_rate, setTransaction_fee_rate] = useState("");
  const [transaction_fee_amount, setTransaction_fee_amount] = useState("");
  const [discount_fee_amount, setDiscount_fee_amount] = useState("");
  const [bookkeeping_status_spv, setBookkeeping_status_spv] = useState("");
  const [bookkeeping_status, setBookkeeping_status] = useState("");
  const [requestId, setRequestId] = useState("");
  const [investor_email, setInvestor_email] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [buyerId, setBuyerId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [esign_template_raa_offer, setEsign_template_raa_offer] = useState("");
  const [raa_offer_oc_action_id, setRaa_offer_oc_action_id] = useState("");

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
          buyerId,
          supplierId,
          bookkeeping_status_spv,
          bookkeeping_status,
          investor_email,
          invoice_number,
          invoice_amount,
          invoice_purchase_amount,
          invoice_currency,
          payout_date,
          invoice_date,
          invoice_due_date,
          transaction_fee_rate,
          transaction_fee_amount,
          discount_fee_amount,
        } = items;
        setDynamorequestid(id);
        setRequestId(requestId);
        setBuyerId(buyerId);
        setSupplierId(supplierId);
        setBookkeeping_status_spv(bookkeeping_status_spv);
        setBookkeeping_status(bookkeeping_status);
        setInvestor_email(investor_email);
        setTransaction_fee_rate(transaction_fee_rate);
        const round = Number(invoice_amount).toFixed(2);
        setInvoice_number(invoice_number);
        const round3 = Number(invoice_purchase_amount).toFixed(2);
        setPurchase_amount(round3);
        setInvoice_amount(round);
        setInvoice_currency(invoice_currency);
        setPayout_date(payout_date);
        setInvoice_date(invoice_date);
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
        const idd = await bookitem.id;
        const transid = await bookitem.transactionId;
        setDynamobookkeepingid(idd);
        setTransactionId(transid);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
  }, [bookkeeping_status_spv, bookkeeping_status, value]);

  useEffect(() => {
    async function getEsign() {
      try {
        let filter = {
          supplierId: { contains: supplierId },
          buyerId: { eq: buyerId },
        };
        const {
          data: {
            listEsigns: { items: itemsPage1, nextToken },
          },
        } = await API.graphql(
          graphqlOperation(queries.listEsigns, { filter: filter })
        );
        const n = { data: { listEsigns: { items: itemsPage1, nextToken } } };
        const items = n.data.listEsigns.items[0];
        setEsign_template_raa_offer(items.esign_template_raa_offer);
        setRaa_offer_oc_action_id(items.raa_offer_oc_action_id);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    getEsign();
  }, [supplierId, buyerId]);

  async function handleRequestSubmit() {
    setRequestSuccess(false);
    setRequestLoading(true);
    try {
      const bookkeeping_status_spv = "Approved";
      const id = dynamobookkeepingid;
      console.log(id);
      if (id) {
        await createWavePurchase({
          invoice_purchase_amount,
          id,
        });
        await createWaveSale({
          invoice_purchase_amount,
          id,
        });
        await updateBookkeeping({
          id,
          bookkeeping_status_spv,
        });
        async function assignid() {
          const id = dynamorequestid;
          const raa_offer_notice_e_signatureId = await createRAASignRequest();
          await updateRequest({
            id,
            bookkeeping_status_spv,
            raa_offer_notice_e_signatureId,
          });
        }
        assignid();
      } else {
        const id = uuid();
        const bookkeeping_status_spv = "Approved";
        await createBookkeeping({
          id,
          bookkeeping_status_spv,
        });
        await createWavePurchase({
          invoice_purchase_amount,
          id,
        });
        await createWaveSale({
          invoice_purchase_amount,
          id,
        });
        async function assignid() {
          const id = dynamorequestid;
          const raa_offer_notice_e_signatureId = await createRAASignRequest();
          await updateRequest({
            id,
            bookkeeping_status_spv,
            raa_offer_notice_e_signatureId,
          });
        }
        assignid();
        await createRAASignRequest();
      }
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
              amount: `${input.invoice_purchase_amount}`,
            },
            lineItems: {
              description: `RequestId: ${input.id}`,
              accountId:
                "QWNjb3VudDoxNTE1MTAxMzg4OTA3MDcwMzAwO0J1c2luZXNzOjdkNzY1ODA5LTM1ZGEtNDNjOS1iYTFhLTY0ZDA1NDIyMDMzYQ==",
              balance: "CREDIT",
              amount: `${input.invoice_purchase_amount}`,
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
              amount: `${input.invoice_purchase_amount}`,
            },
            lineItems: {
              description: `RequestId: ${input.id}`,
              accountId:
                "QWNjb3VudDoxNTE1MTAxNTUxODEzODM3NjYyO0J1c2luZXNzOjdkNzY1ODA5LTM1ZGEtNDNjOS1iYTFhLTY0ZDA1NDIyMDMzYQ==",
              balance: "DEBIT",
              amount: `${input.invoice_purchase_amount}`,
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

  async function createRAASignRequest() {
    const date = moment(payout_date).format("DD MMMM YYYY");
    const client = process.env.REACT_APP_ZOHO_CLIENT_ID;
    const secret = process.env.REACT_APP_ZOHO_CLIENT_SECRET;
    const token = process.env.REACT_APP_ZOHO_TOKEN;
    const auth = await fetch(
      `https://cors-anywhere-oc.herokuapp.com/https://accounts.zoho.com/oauth/v2/token?refresh_token=${token}&client_id=${client}&client_secret=${secret}&grant_type=refresh_token`,
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          Connection: "keep-alive",
        },
      }
    );
    const tokenData = await auth.json();
    const accessToken = await tokenData.access_token;
    const reqid = DOMPurify.sanitize(esign_template_raa_offer);
    console.log(reqid);
    // file deepcode ignore Ssrf: <please specify a reason of ignoring this>
    const res1 = await fetch(
      //`https://cors-anywhere-oc.herokuapp.com/https://sign.zoho.com/api/v1/templates/${reqid}/createdocument?testing=true`,
      `https://cors-anywhere-oc.herokuapp.com/https://sign.zoho.com/api/v1/templates/${reqid}/createdocument`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
        body: new URLSearchParams({
          data: `{
            "templates": {
                "field_data": {
                    "field_text_data": {
                        "Date": "${date}",
                        "Purchase-Amount": "${Number(
                          invoice_purchase_amount
                        ).toLocaleString("en-US")}",
                        "Purchase-Date": "${moment(payout_date).format(
                          "MM/DD/YYYY"
                        )}",
                        "Invoice-Curr1": "${invoice_currency}",
                        "Invoice-FV1": "${Number(invoice_amount).toLocaleString(
                          "en-US"
                        )}",
                        "Invoice-DD1": "${moment(invoice_due_date).format(
                          "MM/DD/YYYY"
                        )}",
                        "Invoice-Date1": "${moment(invoice_date).format(
                          "MM/DD/YYYY"
                        )}",
                        "Invoice-No1": "${invoice_number}",
                        "Invoice-FV2": "",
                        "Invoice-No2": "",
                        "Invoice-Curr2": "",
                        "Invoice-Date2": "",
                        "Invoice-DD2": "",
                        "Invoice-DD3": "",
                        "Invoice-FV3": "",
                        "Invoice-Curr3": "",
                        "Invoice-Date3": "",
                        "Invoice-No3": "",
                        "Invoice-Curr4": "",
                        "Invoice-FV4": "",
                        "Invoice-DD4": "",
                        "Invoice-Date4": "",
                        "Invoice-No4": "",
                        "Invoice-DD5": "",
                        "Invoice-FV5": "",
                        "Invoice-Date5": "",
                        "Invoice-Curr5": "",
                        "Invoice-No5": ""
                    },
                    "field_boolean_data": {},
                    "field_date_data": {}
                },
                "actions": [
                    {
                        "recipient_name": "tobias.pfuetze@originatecapital.co",
                        "recipient_email": "tobias.pfuetze@originatecapital.co",
                        "action_id": "${raa_offer_oc_action_id}",
                        "signing_order": 1,
                        "role": "SPV",
                        "verify_recipient": false,
                        "private_notes": ""
                    },
                    {
                        "recipient_name": "${investor_email}",
                        "recipient_email": "${investor_email}",
                        "action_id": "277418000000237024",
                        "signing_order": 2,
                        "role": "Investor",
                        "verify_recipient": false,
                        "private_notes": ""
                    }
                ],
                "notes": ""
            }
        }`,
          is_quicksend: "true",
          locale: "en",
        }),
      }
    );
    const data = await res1.json();
    console.log(data);
    const rid = data.requests.request_id;
    return rid;
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
                        name="invoice_purchase_amount"
                        label="Invoice Purchase Amount"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setPurchase_amount(e.target.value)}
                        required
                        value={invoice_purchase_amount || ""}
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
