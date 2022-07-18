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
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
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
  const [sold_goods_description, setSold_goods_description] = useState("");
  const [invoice_currency, setInvoice_currency] = useState("");
  const [request_status, setRequest_status] = useState("");
  const [base_rate, setBase_rate] = useState("");
  const [discount_fee_rate, setDiscount_fee_rate] = useState("");
  const [discount_fee_amount, setDiscount_fee_amount] = useState("");
  const [transaction_fee_rate, setTransaction_fee_rate] = useState("");
  const [transaction_fee_amount, setTransaction_fee_amount] = useState("");
  const [payout_date, setPayout_date] = useState("");
  const [payback_date, setPayback_date] = useState("");
  const [broker_fee_rate, setBroker_fee_rate] = useState("");
  const [broker_fee_amount, setBroker_fee_amount] = useState("");
  const [dynamic_discount, setDynamic_discount] = useState("");
  const [_version, setVersion] = useState("");
  const [match, setMatch] = useState("");
  const [sofr, setSofr] = useState([]);
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
              base_rate,
              transaction_fee_rate,
              transaction_fee_amount,
              discount_fee_rate,
              discount_fee_amount,
              broker_fee_rate,
              broker_fee_amount,
              payout_date,
              payback_date,
              _version,
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
        setInvoice_date(invoice_date);
        setInvoice_due_date(invoice_due_date);
        setBase_rate(base_rate);
        setDiscount_fee_rate(discount_fee_rate);
        setDiscount_fee_amount(discount_fee_amount);
        setTransaction_fee_rate(transaction_fee_rate);
        setTransaction_fee_amount(transaction_fee_amount);
        setBroker_fee_rate(broker_fee_rate);
        setBroker_fee_amount(broker_fee_amount);
        setPayout_date(payout_date);
        setPayback_date(payback_date);
        setVersion(_version);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    getRequest();
  }, [id]);

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
      const today = moment().startOf("day");
      setPayout_date(today);
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
  }, [sofr]);

  React.useEffect(() => {
    async function checkifmatch() {
      if (match === null || match === undefined || match.length <= 0) {
        return 0;
      } else {
        const sofrterm = base_rate;
        if (sofrterm === "SOFR(1M)") {
          const dyndisc = Number(match[0].SOFRM1) + Number(discount_fee_rate);
          setDynamic_discount(dyndisc);
        } else if (sofrterm === "SOFR(3M)") {
          const dyndisc = Number(match[0].SOFRM3) + Number(discount_fee_rate);
          setDynamic_discount(dyndisc);
        } else if (sofrterm === "SOFR(Daily)") {
          const dyndisc = Number(match[0].SOFR) + Number(discount_fee_rate);
          setDynamic_discount(dyndisc);
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

  async function handleRequestSubmit() {
    setRequestSuccess(false);
    setRequestLoading(true);
    try {
      const invoicedue = moment(invoice_due_date).startOf("day");
      const payoutd = moment(payout_date).startOf("day");
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
          (((Number(spread) * Number(transaction_fee_rate)) / 100) *
            Number(broker_fee_rate)) /
          100;
        setBroker_fee_amount(broker_fee_amount);
      }
      const transaction_fee_amount =
        Number(spread) * (Number(transaction_fee_rate) / 100);
      const discount_fee_amount =
        invoice_amount * (dynamic_discount / 100) * (period / 360);
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
        base_rate,
        discount_fee_rate,
        discount_fee_amount,
        transaction_fee_rate,
        transaction_fee_amount,
        broker_fee_amount,
        bookkeeping_status_admin,
        bookkeeping_status_spv,
        payout_date,
        payback_date,
        _version,
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
                    <Grid item xs={12} sm={12}>
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
                            setPayback_date(date);
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
                          minDate={subDays(new Date(), 30)}
                          maxDate={new Date()}
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
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="investorId"
                        label="Investor ID"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setInvestorId(e.target.value)}
                        required
                        value={investorId || ""}
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
