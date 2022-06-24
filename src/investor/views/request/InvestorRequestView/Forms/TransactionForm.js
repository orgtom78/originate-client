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
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import LoaderButton from "src/components/LoaderButton.js";
import LoaderButtonRed from "src/components/LoaderButtonRed.js";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BlockIcon from "@mui/icons-material/Block";
import { green } from "@mui/material/colors";

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
  const [sold_goods_description, setSold_goods_description] = useState("");
  const [invoice_currency, setInvoice_currency] = useState("");
  const [invoice_number, setInvoice_number] = useState("");
  const [request_status, setRequest_status] = useState("");

  const [broker_fee_rate, setBroker_fee_rate] = useState("");
  const [transaction_fee_rate, setTransaction_fee_rate] = useState("");
  const [discount_fee_rate, setDiscount_fee_rate] = useState("");
  const [transaction_fee_amount, setTransaction_fee_amount] = useState("");
  const [discount_fee_amount, setDiscount_fee_amount] = useState("");
  const [broker_fee_amount, setBroker_fee_amount] = useState("");

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
          broker_fee_rate,
          transaction_fee_rate,
          discount_fee_rate,
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
        } = request;
        setId(id);
        setRequest_status(request_status);
        setBuyer_name(buyer_name);
        setSupplier_name(supplier_name);
        setSold_goods_description(sold_goods_description);
        setInvoice_amount(invoice_amount);
        setInvoice_currency(invoice_currency);
        setInvoice_date(invoice_date);
        setInvoice_due_date(invoice_due_date);
        setInvoice_number(invoice_number);
        setBroker_fee_rate(broker_fee_rate);
        setTransaction_fee_rate(transaction_fee_rate);
        setDiscount_fee_rate(discount_fee_rate);
        setTransaction_fee_amount(transaction_fee_amount);
        setDiscount_fee_amount(discount_fee_amount);
        setBroker_fee_amount(broker_fee_amount);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
  }, [value]);

  async function handleRequestSubmit() {
    setRequestSuccess(false);
    setRequestLoading(true);
    try {
      const request_status = "Approved";
      const payout_date = moment();
      const period = moment(invoice_due_date).diff(payout_date, "days");
      const transaction_fee_amount =
        (((Number(invoice_amount) * Number(transaction_fee_rate)) / 100) *
          period) /
        360;
      const discount_fee_amount =
        (((Number(invoice_amount) * Number(discount_fee_rate)) / 100) *
          period) /
        360;
      const broker_fee_amount =
        (((Number(invoice_amount) * Number(broker_fee_rate)) / 100) * period) /
        360;
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
        payout_date,
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
                        value={moment(invoice_date).format("DD/MM/YYYY") || ""}
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
                          moment(invoice_due_date).format("DD/MM/YYYY") || ""
                        }
                        InputProps={{
                          readOnly: true,
                        }}
                      />
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
