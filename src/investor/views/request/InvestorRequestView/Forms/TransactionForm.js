import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
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
import { API, graphqlOperation } from "aws-amplify";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import LoaderButton from "src/components/LoaderButton.js";
import LoaderButtonRed from "src/components/LoaderButtonRed.js";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BlockIcon from "@mui/icons-material/Block";
import { green } from "@mui/material/colors";
import * as queries from "src/graphql/queries.js";

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
    value: "Declined",
    label: "Declined",
  },
  {
    value: "Under Review",
    label: "Under Review",
  },
  {
    value: "Documents Pending",
    label: "Documents Pending",
  },
  {
    value: "Approved",
    label: "Approved",
  },
];

const RequestForm = ({ className, value, ...rest }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [id, setId] = useState("");
  const [buyer_name, setBuyer_name] = useState("");
  const [supplier_name, setSupplier_name] = useState("");
  const [invoice_amount, setInvoice_amount] = useState("");
  const [invoice_date, setInvoice_date] = useState("");
  const [invoice_due_date, setInvoice_due_date] = useState("");
  const [invoice_number, setInvoice_number] = useState("");
  const [sold_goods_description, setSold_goods_description] = useState("");
  const [invoice_currency, setInvoice_currency] = useState("");
  const [request_status, setRequest_status] = useState("");
  const [base_rate, setBase_rate] = useState("");
  const [discount_fee_rate, setDiscount_fee_rate] = useState("");
  const [discount_fee_rate_adjusted, setDiscount_fee_rate_adjusted] =
    useState("");
  const [discount_fee_amount, setDiscount_fee_amount] = useState("");
  const [transaction_fee_rate, setTransaction_fee_rate] = useState("");
  const [transaction_fee_amount, setTransaction_fee_amount] = useState("");
  const [payout_date, setPayout_date] = useState("");
  const [payback_date, setPayback_date] = useState("");
  const [broker_fee_rate, setBroker_fee_rate] = useState("");
  const [broker_fee_amount, setBroker_fee_amount] = useState("");
  const [dynamic_discount, setDynamic_discount] = useState("");
  const [match, setMatch] = useState("");
  const [sofr, setSofr] = useState([]);
  const [sofr_rate, setSofr_rate] = useState("");
  const [bookkeeping_status_admin, setBookkeeping_status_admin] = useState("");
  const [bookkeeping_status_spv, setBookkeeping_status_spv] = useState("");

  const [requestloading, setRequestLoading] = useState(false);
  const [requestsuccess, setRequestSuccess] = useState(false);
  const [declineloading, setDeclineLoading] = useState(false);
  const [declinesuccess, setDeclineSuccess] = useState(false);

  useEffect(() => {
    getRequest();
    async function getRequest() {
      try {
        const request = value;
        const {
          id,
          request_status,
          buyer_name,
          supplier_name,
          sold_goods_description,
          invoice_amount,
          invoice_currency,
          invoice_date,
          invoice_due_date,
          invoice_number,
          base_rate,
          transaction_fee_rate,
          transaction_fee_amount,
          discount_fee_rate,
          discount_fee_rate_adjusted,
          discount_fee_amount,
          broker_fee_rate,
          broker_fee_amount,
          payout_date,
          payback_date,
        } = request;
        setId(id);
        setRequest_status(request_status);
        setBuyer_name(buyer_name);
        setSupplier_name(supplier_name);
        setSold_goods_description(sold_goods_description);
        setInvoice_amount(invoice_amount);
        setInvoice_currency(invoice_currency);
        const momentinvoice = moment(invoice_date).utc().startOf("day");
        setInvoice_date(momentinvoice);
        const momentinvoicedue = moment(invoice_due_date).utc().startOf("day");
        setInvoice_due_date(momentinvoicedue);
        setInvoice_number(invoice_number);
        setBase_rate(base_rate);
        setDiscount_fee_rate(discount_fee_rate);
        setDiscount_fee_rate_adjusted(discount_fee_rate_adjusted);
        setDiscount_fee_amount(discount_fee_amount);
        setTransaction_fee_rate(transaction_fee_rate);
        setTransaction_fee_amount(transaction_fee_amount);
        setBroker_fee_rate(broker_fee_rate);
        setBroker_fee_amount(broker_fee_amount);
        const momentpayout = moment(payout_date).utc().startOf("day");
        setPayout_date(momentpayout);
        const momentpayback = moment(payback_date).utc().startOf("day");
        setPayback_date(momentpayback);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
  }, [value]);

  React.useEffect(() => {
    async function listSOFR() {
      const today = moment().startOf("day");
      const querystartdate = moment(today)
        .subtract(10, "days")
        .format("MM/DD/YYYY");
      const queryenddate = moment(today).format("MM/DD/YYYY");
      let filter = { id: { between: [querystartdate, queryenddate] } };
      const {
        data: {
          listSOFRs: { items },
        },
      } = await API.graphql(
        graphqlOperation(queries.listSOFRs, { filter: filter })
      );
      if (items === null || items === undefined || items.length <= 0) {
        return 0;
      } else {
        setSofr(items);
      }
    }
    listSOFR();
  }, []);

  React.useEffect(() => {
    async function checkdayssofr() {
      const today = moment(payout_date).startOf("day");
      const weekday = moment(today).day();
      if (weekday === 3 || weekday === 4 || weekday === 5) {
        const date = moment(today).subtract(2, "days").format("MM/DD/YYYY");
        const match = sofr.filter((item) => item.id === date);
        if (match === null || match === undefined || match.length <= 0) {
          return 0;
        } else {
          setMatch(match);
        }
      } else if (weekday === 6) {
        const date = moment(today).subtract(3, "days").format("MM/DD/YYYY");
        const match = sofr.filter((item) => item.id === date);
        if (match === null || match === undefined || match.length <= 0) {
          return 0;
        } else {
          setMatch(match);
        }
      } else if (weekday === 0) {
        const date = moment(today).subtract(4, "days").format("MM/DD/YYYY");
        const match = sofr.filter((item) => item.id === date);
        if (match === null || match === undefined || match.length <= 0) {
          return 0;
        } else {
          setMatch(match);
        }
      } else if (weekday === 1) {
        const date = moment(today).subtract(5, "days").format("MM/DD/YYYY");
        const match = sofr.filter((item) => item.id === date);
        if (match === null || match === undefined || match.length <= 0) {
          return 0;
        } else {
          setMatch(match);
        }
      } else if (weekday === 2) {
        const date = moment(today).subtract(6, "days").format("MM/DD/YYYY");
        const match = sofr.filter((item) => item.id === date);
        if (match === null || match === undefined || match.length <= 0) {
          return 0;
        } else {
          setMatch(match);
        }
      }
    }
    checkdayssofr();
  }, [sofr, payout_date]);

  React.useEffect(() => {
    async function checkifmatch() {
      if (match === null || match === undefined || match.length <= 0) {
        return 0;
      } else {
        const sofrterm = base_rate;
        if (sofrterm === "SOFR(1M)") {
          const dyndisc = Number(match[0].SOFRM1) + Number(discount_fee_rate);
          const sofrrate = Number(match[0].SOFRM1);
          setDynamic_discount(dyndisc);
          setSofr_rate(sofrrate);
        } else if (sofrterm === "SOFR(3M)") {
          const dyndisc = Number(match[0].SOFRM3) + Number(discount_fee_rate);
          const sofrrate = Number(match[0].SOFRM3);
          setDynamic_discount(dyndisc);
          setSofr_rate(sofrrate);
        } else if (sofrterm === "SOFR(Daily)") {
          const dyndisc = Number(match[0].SOFR) + Number(discount_fee_rate);
          const sofrrate = Number(match[0].SOFR);
          setDynamic_discount(dyndisc);
          setSofr_rate(sofrrate);
        }
      }
    }
    checkifmatch();
  }, [match, discount_fee_rate, base_rate]);

  useEffect(() => {
    function checkstatus() {
      if (request_status === "Approved") {
        setBookkeeping_status_admin("Open");
        setBookkeeping_status_spv("Open");
      } else {
        setBookkeeping_status_admin("");
        setBookkeeping_status_spv("");
      }
    }
    checkstatus();
  }, [request_status]);

  React.useEffect(() => {
    async function checkBrokerStatus() {
      const invoicedue = moment(invoice_due_date).utc().startOf("day");
      const payoutd = moment(payout_date).utc().startOf("day");
      const period = moment(invoicedue).diff(payoutd, "days");
      const spread =
        (((Number(invoice_amount) * Number(discount_fee_rate)) / 100) *
          Number(period)) /
        360;
      if (
        broker_fee_rate === "" ||
        broker_fee_rate === null ||
        broker_fee_rate === undefined ||
        broker_fee_rate.length <= 0
      ) {
        setBroker_fee_amount(0);
      } else {
        const broker_fee_amount =
          Number(spread) *
          (((Number(transaction_fee_rate) / 100) * Number(broker_fee_rate)) /
            100);
        setBroker_fee_amount(broker_fee_amount);
      }
      const transaction_fee_amount =
        (Number(spread) * Number(transaction_fee_rate)) / 100;
      setTransaction_fee_amount(transaction_fee_amount);
      const discount_fee_amount =
        (((Number(invoice_amount) * Number(dynamic_discount)) / 100) *
          Number(period)) /
        360;
      setDiscount_fee_amount(discount_fee_amount);
    }
    checkBrokerStatus();
  }, [
    broker_fee_rate,
    discount_fee_rate,
    dynamic_discount,
    invoice_amount,
    invoice_due_date,
    payout_date,
    transaction_fee_rate,
  ]);

  function handleLatePayback(input) {
    setPayback_date(input);
    const standardizedinput = moment(input).utc().startOf("day").toISOString();
    console.log(standardizedinput);
    const standardpayout = moment(payout_date)
      .utc()
      .startOf("day")
      .toISOString();
    console.log(payout_date);
    console.log(standardpayout);
    const standduedate = moment(invoice_due_date)
      .utc()
      .startOf("day")
      .toISOString();
    console.log(standduedate);
    if (standardizedinput !== standduedate) {
      console.log("not equal calculate new discount");
      const oldperiod = moment(standduedate).diff(standardpayout, "days");
      const newperiod = moment(standardizedinput).diff(standardpayout, "days");
      console.log(newperiod);
      const periodratio = Number(newperiod) / Number(oldperiod);
      const newtotaldiscount =
        (Number(sofr_rate) + Number(discount_fee_rate)) / periodratio;
      const newdiscountspread = newtotaldiscount - sofr_rate;
      console.log(newtotaldiscount);
      console.log(newdiscountspread);
      setDiscount_fee_rate_adjusted(newdiscountspread);
    } else if (standardizedinput === standduedate) {
      console.log("equal dont do anything");
      setDiscount_fee_rate_adjusted(0);
    }
  }

  async function handleRequestSubmit() {
    setRequestSuccess(false);
    setRequestLoading(true);
    try {
      const request_status = "Approved";
      await updateRequest({
        id,
        request_status,
        buyer_name,
        supplier_name,
        sold_goods_description,
        invoice_amount,
        invoice_currency,
        invoice_date,
        invoice_due_date,
        invoice_number,
        base_rate,
        discount_fee_rate,
        discount_fee_rate_adjusted,
        discount_fee_amount,
        transaction_fee_rate,
        transaction_fee_amount,
        broker_fee_amount,
        bookkeeping_status_admin,
        bookkeeping_status_spv,
        payout_date,
        payback_date,
      });
    } catch (e) {
      onError(e);
    }
    setRequestSuccess(true);
    setRequestLoading(false);
    navigate("/investor/requests");
  }

  async function handleDeclineSubmit() {
    setDeclineSuccess(false);
    setDeclineLoading(true);
    try {
      const request_status = "Declined";
      const transaction_fee_amount = 0;
      const discount_fee_amount = 0;
      const broker_fee_amount = 0;
      await updateRequest({
        id,
        transaction_fee_rate,
        discount_fee_rate,
        broker_fee_rate,
        transaction_fee_amount,
        discount_fee_amount,
        broker_fee_amount,
        buyer_name,
        supplier_name,
        sold_goods_description,
        invoice_amount,
        invoice_currency,
        invoice_date,
        invoice_due_date,
        invoice_number,
        request_status,
      });
    } catch (e) {
      onError(e);
    }
    setDeclineSuccess(true);
    setDeclineLoading(false);
    navigate("/investor/requests");
  }

  function updateRequest(input) {
    return API.graphql(
      graphqlOperation(mutations.updateRequest, { input: input })
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
                        name="request_status"
                        label="Transaction Status"
                        inputProps={{ readOnly: true }}
                        required
                        value={request_status || ""}
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
                        value={invoice_amount || ""}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="invoice_currency"
                        label="Invoice Currency"
                        fullWidth
                        variant="outlined"
                        required
                        value={invoice_currency || ""}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="invoice_date"
                        label="Invoice Date"
                        fullWidth
                        variant="outlined"
                        required
                        value={moment(invoice_date).format("MM/DD/YYYY") || ""}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="invoice_due_date"
                        label="Invoice Due Date"
                        fullWidth
                        variant="outlined"
                        required
                        value={
                          moment(invoice_due_date).format("MM/DD/YYYY") || ""
                        }
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          value={payout_date || ""}
                          margin="normal"
                          variant="outlined"
                          id="payout_date"
                          name="payout_date"
                          label="Payout Date"
                          format="MM/DD/YYYY"
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
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          value={payback_date || ""}
                          margin="normal"
                          variant="outlined"
                          id="payback_date"
                          name="payback_date"
                          label="Payback Date"
                          format="MM/DD/YYYY"
                          onChange={(date) => {
                            handleLatePayback(date);
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
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="sold_goods_description"
                        label="Sold Goods Description"
                        fullWidth
                        variant="outlined"
                        value={sold_goods_description || ""}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="invoice_number"
                        label="Invoice Number"
                        fullWidth
                        variant="outlined"
                        value={invoice_number || ""}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <Stack spacing={2} direction="row">
                  <LoaderButtonRed
                    startIcon={<BlockIcon />}
                    disabled={declineloading}
                    success={declinesuccess}
                    loading={declineloading}
                    onClick={handleDeclineSubmit}
                  >
                    Decline Invoice
                  </LoaderButtonRed>
                  <LoaderButton
                    startIcon={<CheckCircleOutlineIcon />}
                    disabled={requestloading}
                    success={requestsuccess}
                    loading={requestloading}
                    onClick={handleRequestSubmit}
                  >
                    Approve Invoice
                  </LoaderButton>
                </Stack>
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
