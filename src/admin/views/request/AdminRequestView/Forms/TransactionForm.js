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
  const [broker_fee_rate, setBroker_fee_rate] = useState("");
  const [dynamic_discount, setDynamic_discount] = useState("");
  const [_version, setVersion] = useState("");

  const [requestloading, setRequestLoading] = useState(false);
  const [requestsuccess, setRequestSuccess] = useState(false);

  useEffect(() => {
    const id = value.value;
    getRequest({ id });
    async function getRequest(input) {
      try {
        const request = await API.graphql(
          graphqlOperation(queries.getRequest, input)
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
              payout_date,
              base_rate,
              transaction_fee_rate,
              transaction_fee_amount,
              discount_fee_rate,
              discount_fee_amount,
              broker_fee_rate,
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
        setPayout_date(payout_date);
        setBase_rate(base_rate);
        setDiscount_fee_rate(discount_fee_rate);
        setDiscount_fee_amount(discount_fee_amount);
        setTransaction_fee_rate(transaction_fee_rate);
        setTransaction_fee_amount(transaction_fee_amount);
        setBroker_fee_rate(broker_fee_rate);
        setVersion(_version);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
  }, [value]);

  React.useEffect(() => {
    async function checkdayssofr() {
      const relevantday = moment(payout_date);
      const querystartdate = moment(relevantday)
        .subtract(10, "days")
        .format("MM/DD/YYYY");
      const queryenddate = moment(relevantday).format("MM/DD/YYYY");
      const {
        data: {
          listSOFRs: { items },
        },
      } = await listSOFR(querystartdate, queryenddate);
      console.log(items);
      const weekday = relevantday.getDay();
      if (
        weekday === 1 ||
        weekday === 2 ||
        weekday === 3 ||
        weekday === 4 ||
        weekday === 5
      ) {
        const date = moment(relevantday)
          .subtract(2, "days")
          .format("MM/DD/YYYY");
        const match = items.filter((item) => item.id === date);
        if (match === null || match === undefined || match.length <= 0) {
          return 0;
        } else {
          return match;
        }
      } else if (weekday === 6) {
        const date = moment(relevantday)
          .subtract(3, "days")
          .format("MM/DD/YYYY");
        const match = items.filter((item) => item.id === date);
        if (match === null || match === undefined || match.length <= 0) {
          return 0;
        } else {
          return match;
        }
      } else if (weekday === 0) {
        const date = moment(relevantday)
          .subtract(4, "days")
          .format("MM/DD/YYYY");
        const match = items.filter((item) => item.id === date);
        if (match === null || match === undefined || match.length <= 0) {
          return 0;
        } else {
          return match;
        }
      }
    }
    async function sofrresult() {
      const res = await checkdayssofr();
      if (res === null || res === undefined || res.length <= 0) {
        return 0;
      } else {
        const sofrterm = base_rate;
        if (sofrterm === "SOFR(1M)") {
          const dyndisc = Number(res[0].SOFRM1) + Number(discount_fee_rate);
          setDynamic_discount(dyndisc);
        } else if (sofrterm === "SOFR(3M)") {
          const dyndisc = Number(res[0].SOFRM3) + Number(discount_fee_rate);
          console.log(dyndisc);
          setDynamic_discount(dyndisc);
        } else if (sofrterm === "SOFR(Daily)") {
          const dyndisc = Number(res[0].SOFR) + Number(discount_fee_rate);
          setDynamic_discount(dyndisc);
        }
      }
    }
    sofrresult();
  }, [base_rate, discount_fee_rate, payout_date]);

  async function listSOFR(start, end) {
    let filter = { id: { between: [start, end] } };
    const result = await API.graphql(
      graphqlOperation(queries.listSOFRs, { filter: filter })
    );
    if (result === null || result === undefined || result.length <= 0) {
      return 0;
    } else {
      return result;
    }
  }

  async function handleRequestSubmit() {
    setRequestSuccess(false);
    setRequestLoading(true);
    try {
      const dd = moment(invoice_due_date);
      const pd = moment(payout_date);
      const period = moment(dd.diff(pd, "days"));
      const transaction_fee_amount =
        invoice_amount *
        (discount_fee_rate / 100) *
        (transaction_fee_rate / 100) *
        (period / 360);
      const discount_fee_amount =
        invoice_amount * (dynamic_discount / 100) * (period / 360);
      const broker_fee_amount =
        transaction_fee_amount * (broker_fee_rate / 100);
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
        payout_date,
        base_rate,
        discount_fee_rate,
        discount_fee_amount,
        transaction_fee_rate,
        transaction_fee_amount,
        broker_fee_amount,
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
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          value={payout_date || ""}
                          margin="normal"
                          variant="outlined"
                          id="payout_date"
                          name="payout_date"
                          label="Payout Date"
                          format="dd/MM/yyyy"
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
                          format="dd/MM/yyyy"
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
