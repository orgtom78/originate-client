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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import LoaderButton from "src/components/LoaderButton.js";
import { green } from "@mui/material/colors";
import * as queries from "src/graphql/queries.js";
import currencies from "src/components/FormLists/currencies.js";
import { addDays, subDays } from "date-fns";
import moment from "moment";

const curr = currencies;

const rate = [
  {
    value: "SOFR(Daily)",
    label: "SOFR Daily",
  },
  {
    value: "SOFR(1M)",
    label: "SOFR 1M",
  },
  {
    value: "SOFR(3M)",
    label: "SOFR 3M",
  },
];

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
    value: "Approved",
    label: "Approved",
  },
  {
    value: "Settled",
    label: "Settled",
  },
];

const RequestForm = ({ className, value, ...rest }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [investorId, setInvestorId] = useState("");
  const [buyer_name, setBuyer_name] = useState("");
  const [supplier_name, setSupplier_name] = useState("");
  const [invoice_amount, setInvoice_amount] = useState("");
  const [invoice_date, setInvoice_date] = useState("");
  const [invoice_due_date, setInvoice_due_date] = useState("");
  const [invoice_ipu_signed, setInvoice_ipu_signed] = useState("");
  const [invoice_purchase_duration, setInvoice_purchase_duration] =
    useState("");
  const [invoice_number, setInvoice_number] = useState("");
  const [sold_goods_description, setSold_goods_description] = useState("");
  const [invoice_currency, setInvoice_currency] = useState("");
  const [request_status, setRequest_status] = useState("");
  const [base_rate, setBase_rate] = useState("");
  const [base_rate_amount, setBase_rate_amount] = useState("");
  const [advance_rate, setAdvance_rate] = useState("");
  const [invoice_purchase_amount, setInvoice_purchase_amount] = useState("");
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
  const [sofr, setSofr] = useState([]);
  const [sofr_rate, setSofr_rate] = useState("");
  const [bookkeeping_status_admin, setBookkeeping_status_admin] = useState("");
  const [bookkeeping_status_spv, setBookkeeping_status_spv] = useState("");

  const [requestloading, setRequestLoading] = useState(false);
  const [requestsuccess, setRequestSuccess] = useState(false);
  const id = value.value;

  useEffect(() => {
    async function getRequest() {
      try {
        const request = await API.graphql(
          graphqlOperation(queries.getRequest, { id })
        );
        const {
          data: {
            getRequest: {
              investorId,
              request_status,
              buyer_name,
              supplier_name,
              sold_goods_description,
              invoice_amount,
              invoice_currency,
              invoice_date,
              invoice_due_date,
              invoice_ipu_signed,
              invoice_purchase_duration,
              invoice_number,
              base_rate,
              base_rate_amount,
              transaction_fee_rate,
              transaction_fee_amount,
              discount_fee_rate,
              discount_fee_rate_adjusted,
              discount_fee_amount,
              broker_fee_rate,
              broker_fee_amount,
              payout_date,
              payback_date,
              advance_rate,
              invoice_purchase_amount,
            },
          },
        } = request;
        setInvestorId(investorId);
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
        const momentipusigned = moment(invoice_ipu_signed).utc().startOf("day");
        setInvoice_ipu_signed(momentipusigned);
        const purchaseduration = moment(invoice_due_date).diff(
          moment(invoice_ipu_signed),
          "days"
        );
        setInvoice_purchase_duration(purchaseduration);
        setInvoice_number(invoice_number);
        setBase_rate(base_rate);
        setBase_rate_amount(base_rate_amount);
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
        setAdvance_rate(advance_rate);
        setInvoice_purchase_amount(invoice_purchase_amount);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    getRequest();
  }, [id]);

  useEffect(() => {
    async function listSOFR() {
      if (payout_date) {
        const queryenddate = moment(payout_date)
          .utc()
          .startOf("day")
          .format("MM/DD/YYYY");
        const querystartdate = moment(queryenddate)
          .subtract(10, "days")
          .format("MM/DD/YYYY");
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
          const filteredarray = items.filter(
            (e) => moment(queryenddate).diff(moment(e.id), "days") >= 2
          );
          const d = filteredarray.sort(function (a, b) {
            return new Date(b.id) - new Date(a.id);
          });
          setSofr(d[0]);
        }
      } else {
        const queryenddate = moment().utc().startOf("day").format("MM/DD/YYYY");
        const querystartdate = moment(queryenddate)
          .subtract(10, "days")
          .format("MM/DD/YYYY");
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
          const filteredarray = items.filter(
            (e) => moment(queryenddate).diff(moment(e.id), "days") >= 2
          );
          const d = filteredarray.sort(function (a, b) {
            return new Date(b.id) - new Date(a.id);
          });
          setSofr(d[0]);
        }
      }
    }
    listSOFR();
  }, [payout_date]);

  useEffect(() => {
    async function checkifmatch() {
      if (sofr === null || sofr === undefined || sofr.length <= 0) {
        return 0;
      } else {
        const sofrterm = base_rate;
        if (sofrterm === "SOFR(1M)") {
          const dyndisc = Number(sofr.SOFRM1) + Number(discount_fee_rate);
          setBase_rate_amount(Number(sofr.SOFRM1));
          setDynamic_discount(dyndisc);
        } else if (sofrterm === "SOFR(3M)") {
          const dyndisc = Number(sofr.SOFRM3) + Number(discount_fee_rate);
          setBase_rate_amount(Number(sofr.SOFRM3));
          setDynamic_discount(dyndisc);
        } else if (sofrterm === "SOFR(Daily)") {
          const dyndisc = Number(sofr.SOFR) + Number(discount_fee_rate);
          setBase_rate_amount(Number(sofr.SOFR));
          setDynamic_discount(dyndisc);
        }
      }
    }
    checkifmatch();
  }, [sofr, discount_fee_rate, base_rate]);

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

  useEffect(() => {
    async function checkBrokerStatus() {
      const invoicedue = moment(invoice_due_date).utc().startOf("day");
      const payoutd = moment(payout_date).utc().startOf("day");
      const period = moment(invoicedue).diff(payoutd, "days") + 1;
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
      const oldperiod = moment(standduedate).diff(standardpayout, "days") + 1;
      const newperiod =
        moment(standardizedinput).diff(standardpayout, "days") + 1;
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

  function handleAdvanceRateChange(input) {
    setAdvance_rate(input);
    var newpurchaseamount =
      (Number(invoice_amount) * Number(input)) / 100 -
      Number(discount_fee_amount);
    setInvoice_purchase_amount(newpurchaseamount);
  }

  async function handleRequestSubmit() {
    setRequestSuccess(false);
    setRequestLoading(true);
    try {
      const id = value.value;
      await updateRequest({
        id,
        investorId,
        request_status,
        buyer_name,
        supplier_name,
        sold_goods_description,
        invoice_amount,
        invoice_currency,
        invoice_date,
        invoice_due_date,
        invoice_ipu_signed,
        invoice_purchase_duration,
        invoice_number,
        base_rate,
        discount_fee_rate,
        discount_fee_rate_adjusted,
        discount_fee_amount,
        transaction_fee_rate,
        transaction_fee_amount,
        broker_fee_rate,
        broker_fee_amount,
        bookkeeping_status_admin,
        bookkeeping_status_spv,
        payout_date,
        payback_date,
        advance_rate,
        invoice_purchase_amount,
      });
    } catch (e) {
      onError(e);
    }
    setRequestSuccess(true);
    setRequestLoading(false);
    navigate("/admin/requests");
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
                        onChange={(e) => setRequest_status(e.target.value)}
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
                      <Select
                        fullWidth
                        label="Base Rate"
                        name="base_rate"
                        onChange={(e) => setBase_rate(e.target.value)}
                        required
                        value={base_rate || ""}
                        variant="outlined"
                      >
                        {rate.map((item, index) => (
                          <MenuItem key={index} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="invoice_number"
                        label="Invoice Number"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setInvoice_number(e.target.value)}
                        required
                        value={invoice_number || ""}
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
                    <Grid
                      container
                      justifyContent="space-around"
                      item
                      xs={12}
                      sm={6}
                    >
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          value={invoice_date || ""}
                          margin="normal"
                          variant="outlined"
                          id="invoice_date"
                          name="invoice_date"
                          label="Invoice Date"
                          format="MM/DD/YYYY"
                          onChange={(date) => {
                            setInvoice_date(date);
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
                    <Grid
                      container
                      justifyContent="space-around"
                      item
                      xs={12}
                      sm={6}
                    >
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          value={invoice_ipu_signed || ""}
                          margin="normal"
                          variant="outlined"
                          id="invoice_ipu_signed"
                          name="invoice_ipu_signed"
                          label="IPU Signed Date"
                          format="MM/DD/YYYY"
                          onChange={(date) => {
                            setInvoice_ipu_signed(date);
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
                        name="invoice_purchase_duration"
                        label="Discount Duration (days)"
                        fullWidth
                        variant="outlined"
                        value={invoice_purchase_duration || ""}
                        inputProps={{ readOnly: true }}
                      />
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
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="transaction_fee_rate"
                        label="Transaction Fee in % of Spread"
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
                        name="transaction_fee_amount"
                        label="Transaction Fee Amount"
                        fullWidth
                        variant="outlined"
                        onChange={(e) =>
                          setTransaction_fee_amount(e.target.value)
                        }
                        value={transaction_fee_amount || ""}
                        inputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="broker_fee_rate"
                        label="Broker Fee in % of Transaction Fee"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setBroker_fee_rate(e.target.value)}
                        required
                        value={broker_fee_rate || ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="broker_fee_amount"
                        label="Broker Fee Amount"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setBroker_fee_amount(e.target.value)}
                        value={broker_fee_amount || ""}
                        inputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="discount_fee_rate"
                        label="Discount Fee / Spread"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setDiscount_fee_rate(e.target.value)}
                        value={discount_fee_rate || ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="discount_fee_amount"
                        label="Discount Amount"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setDiscount_fee_amount(e.target.value)}
                        required
                        value={discount_fee_amount || ""}
                        inputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="advance_rate"
                        label="Advance Rate in %"
                        fullWidth
                        variant="outlined"
                        onChange={(e) =>
                          handleAdvanceRateChange(e.target.value)
                        }
                        value={advance_rate || ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="invoice_purchase_amount"
                        label="Invoice Purchase Amount"
                        fullWidth
                        variant="outlined"
                        value={invoice_purchase_amount || ""}
                        inputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="base_rate_amount"
                        label="SOFR Base Rate"
                        fullWidth
                        variant="outlined"
                        value={base_rate_amount || ""}
                        inputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="discount_fee_rate_adjusted"
                        label="Discount/ Spread adjusted for Payback Date"
                        fullWidth
                        variant="outlined"
                        value={discount_fee_rate_adjusted || ""}
                        inputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="sold_goods_description"
                        label="Sold Goods Description"
                        fullWidth
                        variant="outlined"
                        onChange={(e) =>
                          setSold_goods_description(e.target.value)
                        }
                        required
                        value={sold_goods_description || ""}
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
                    Update details
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
