import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
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
import makeStyles from '@mui/styles/makeStyles';
import NumberFormat from "react-number-format";
import { UploadCloud as UploadIcon } from "react-feather";
import { API, graphqlOperation } from "aws-amplify";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import LoaderButton from "src/components/LoaderButton.js";
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

  const [requestloading, setRequestLoading] = useState(false);
  const [requestsuccess, setRequestSuccess] = useState(false);

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
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
  }, [value]);

  async function handleRequestSubmit() {
    setRequestSuccess(false);
    setRequestLoading(true);
    try {
      if (request_status === "Approved") {
        var now = new Date();
        const payout_date = now.toISOString();
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
          payout_date,
        });
      } else {
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
        });
      }
    } catch (e) {
      onError(e);
    }
    setRequestSuccess(true);
    setRequestLoading(false);
    navigate("/spv/requests");
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
                <Box display="flex" justifyContent="flex-end" p={2}>
                  <LoaderButton
                    startIcon={<UploadIcon />}
                    disabled={requestloading}
                    success={requestsuccess}
                    loading={requestloading}
                    onClick={handleRequestSubmit}
                  >
                    Update Status
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
