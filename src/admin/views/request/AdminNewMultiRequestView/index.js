import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import {
  Field,
  FieldArray,
  Form,
  Formik,
  getIn,
  useField,
  useFormikContext,
} from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import currencies from "src/components/FormLists/currencies.js";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";
import LoaderButton from "src/components/LoaderButton.js";
import { Upload as UploadIcon } from "react-feather";
import { onError } from "src/libs/errorLib.js";

import Page from "src/components/Page";

const curr = currencies;

const validationSchema = Yup.object().shape({
  invoice: Yup.array().of(
    Yup.object().shape({
      invoice_amount: Yup.string().required("Invoice Amount is required"),
      sold_goods_description: Yup.string().required("Description is required"),
      currency: Yup.string().required("Currency is required"),
      invoice_date: Yup.string().required("Invoice Date is required"),
      invoice_due_date: Yup.string().required("Invoice Due Date is required"),
      invoice_number: Yup.string().required("Invoice Number is required"),
      invoice_attachment: Yup.string(),
    })
  ),
});

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  invoice_attachment: {
    margin: theme.spacing(1),
  },
  field: {
    margin: theme.spacing(1),
  },
}));

export default function MyForm() {
  const classes = useStyles();
  const { buyerid } = useParams();
  const { supplierid } = useParams();
  const { ident } = useParams();
  const [number_of_invoices, setNumber_of_invoices] = useState("");
  const [invoice_attachment, setInvoice_attachment] = useState("");
  const [invoiceimg, setInvoiceImg] = useState("");
  const [invoicepdf, setInvoicepdf] = useState("");
  const [invoiceloading, setInvoiceLoading] = useState(false);
  const [invoicesuccess, setInvoiceSuccess] = useState(false);

  const [esign_template_ipu, setEsign_template_ipu] = useState("");
  const [esign_template_offer, setEsign_template_offer] = useState("");
  const [esign_template_raa_offer, setEsign_template_raa_offer] = useState("");

  const initialValues = {
    invoice: [
      {
        id: uuid(),
        invoice_amount: "",
        sold_goods_description: "",
        currency: "",
        invoice_date: moment(),
        invoice_due_date: moment(),
        invoice_number: "",
        invoice_attachment: {value: "", success: false, loading: false},
      },
    ],
  };

  function handleNumberChange(e, field, values, setValues) {
    const invoice = [...values.invoice];
    const numberOfInvoices = e.target.value || 1;
    setNumber_of_invoices(e.target.value);
    const previousNumber = parseInt(field.value || 1);
    if (previousNumber < numberOfInvoices) {
      for (let i = previousNumber; i < numberOfInvoices; i++) {
        invoice.push({
          id: uuid(),
          invoice_amount: "",
          sold_goods_description: "",
          currency: "",
          invoice_date: "",
          invoice_due_date: "",
          invoice_number: "",
          invoice_attachment: "",
        });
      }
    } else {
      for (let i = previousNumber; i >= numberOfInvoices; i--) {
        invoice.splice(i, 1);
      }
    }
    console.log(invoice);
    setValues({ ...values, invoice });
    // call formik onChange method
    field.onChange(e);
  }

  const DatePickerField = ({ ...props }) => {
    const [field, , { setValue }] = useField(props);
    return (
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DesktopDatePicker
          {...field}
          {...props}
          selected={(field.value && new Date(field.value)) || null}
          onChange={(val) => {
            setValue(moment(val).utc().startOf("day").toISOString());
          }}
          renderInput={(params) => (
            <TextField className={classes.field} fullWidth {...params} />
          )}
        />
      </LocalizationProvider>
    );
  };

  useEffect(() => {
    async function getEsign() {
      try {
        let filter = {
          supplierId: { eq: supplierid },
          buyerId: { eq: buyerid },
        };
        //const {
        //  data: {
        //    listEsigns: { items: itemsPage1, nextToken },
        //  },
        // } = await API.graphql(graphqlOperation(queries.listEsigns, { filter: filter }));
        // const n = { data: { listEsigns: { items: itemsPage1, nextToken } } };
        // const items = n.data.listEsigns.items[0];
        // setEsign_template_ipu(items.esign_template_ipu);
        // setEsign_template_offer(items.esign_template_offer);
        // setEsign_template_raa_offer(items.esign_template_raa_offer);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    getEsign();
  }, [supplierid, buyerid]);

  const UploadField = ({ ...props }) => {
    const [field, meta, helper] = useField(props);
    const { touched, error } = meta;
    const { setFieldValue } = useFormikContext();
    const isError = touched && error && true;
    const { value } = field;
    const [uploadedFile, setUploadedFile] = useState("");
    const file = useState(null);
    console.log(field);
    console.log(props);

    useEffect(() => {
      console.log(value);
      if (value) {
        const { link } = value;
        setUploadedFile(value);
      }
    }, [value]);

    async function s3Up(file) {
      const userid = "test";
      const sectorid = "test";
      const name = "test";
      var fileExtension = file.name.split(".").pop();
      const filename = `${userid}${sectorid}${name}.${fileExtension}`;
      const stored = await Storage.put(filename, file, {
        level: "private",
        identityId: "us-east-2:041c4503-0acb-4e82-b5ac-443c0a3cb735",
        contentType: file.type,
      });
      return "test";
    }

    async function _onChange(event) {
      setFieldValue(props.id, {value: "", success: false, loading: true});
      file.current = event.target.files[0];
      //const newfile = file.current ? await s3Up(file.current) : null;
      setFieldValue(props.id, {value: file.current.name, success: true, loading: false});
    }

    return (
      <FormControl error={isError}>
        <input
          type="file"
          {...field}
          {...props}
          value={""}
          onChange={_onChange}
        />
      </FormControl>
    );
  };

  async function handleUpload(e, field, values, setValues) {
    console.log(e);
    console.log(field);
    console.log(values);
    console.log(setValues);
    const invoice = [...values.invoice];
    const invoice_attachment = "test";

    async function s3Up(file) {
      const userid = "userid";
      const sectorid = "sectorid";
      const name = "name";
      var fileExtension = file.name.split(".").pop();
      const filename = `${userid}${sectorid}${name}.${fileExtension}`;
      const stored = await Storage.put(filename, file, {
        level: "private",
        identityId: await "props.identityid",
        contentType: file.type,
      });
      console.log(stored.key);
      return stored.key;
    }
    setValues({ ...values, invoice });
    console.log(setValues({ ...values, invoice }));

    // call formik onChange method
    field.onChange(e);
  }

  function handleinvoiceChange(event) {
    const file = null;
    file.current = event.target.files[0];
    const newinvoicefile = file.current;
    oninvoiceChange(newinvoicefile);
    return (
      <Field name={invoice_attachment}>
        {({ field }) => (
          <>
            <input
              name={invoice_attachment}
              id={invoice_attachment}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handleinvoiceChange(event)}
            />
            <label htmlFor={invoice_attachment}>
              <LoaderButton
                id={invoice_attachment}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
              >
                {invoice_attachment}
              </LoaderButton>
            </label>
          </>
        )}
      </Field>
    );
  }

  async function oninvoiceChange(newfile) {
    setInvoiceSuccess(false);
    setInvoiceLoading(true);
    try {
      const u = newfile ? await s3Up(newfile, "invoice_attachment") : null;
      var invoice_attachment = u;
      await updateRequest({
        invoice_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setInvoiceSuccess(true);
    setInvoiceLoading(false);
  }

  function updateRequest(input) {
    return input;
  }

  async function s3Up(file, name) {
    var fileExtension = file.name.split(".").pop();
    const sub = "test";
    const requestId = "test2";
    const identityId = "test3";
    const filename = `${sub}${requestId}${name}.${fileExtension}`;

    const stored = await Storage.put(filename, file, {
      level: "private",
      identityId: identityId,
      contentType: file.type,
    });
    return stored.key;
  }

  return (
    <Page className={classes.root} title="Payout request">
      <Container maxWidth="lg">
        <br></br>
        <React.Fragment>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log("onSubmit", JSON.stringify(values, null, 2));
            }}
          >
            {({
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              setValues,
              isValid,
            }) => (
              <Form noValidate autoComplete="off">
                <Field name="numberOfInvoices">
                  {({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="numberOfInvoices">
                        Number of Invoices
                      </InputLabel>
                      <Select
                        id="numberOfInvoices"
                        name="numberOfInvoices"
                        label="Number of Invoices"
                        value={number_of_invoices || ""}
                        onChange={(e) =>
                          handleNumberChange(e, field, values, setValues)
                        }
                        required
                        variant="outlined"
                      >
                        {[1, 2, 3, 4, 5].map((k) => (
                          <MenuItem key={k} value={k}>
                            {k}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Field>
                <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                <FieldArray name="invoice">
                  {() => (
                    <div>
                      {values.invoice.map((p, index) => {
                        const invoice_amount = `invoice[${index}].invoice_amount`;
                        const touchedinvoice_amount = getIn(
                          touched,
                          invoice_amount
                        );
                        const errorinvoice_amount = getIn(
                          errors,
                          invoice_amount
                        );

                        const sold_goods_description = `invoice[${index}].sold_goods_description`;
                        const touchedsold_goods_description = getIn(
                          touched,
                          sold_goods_description
                        );
                        const errorsold_goods_description = getIn(
                          errors,
                          sold_goods_description
                        );

                        const currency = `invoice[${index}].currency`;
                        const touchedcurrency = getIn(touched, currency);
                        const errorcurrency = getIn(errors, currency);

                        const invoice_date = `invoice[${index}].invoice_date`;
                        const toucheddate = getIn(touched, invoice_date);
                        const errordate = getIn(errors, invoice_date);

                        const invoice_due_date = `invoice[${index}].invoice_due_date`;
                        const touchedduedate = getIn(touched, invoice_due_date);
                        const errorduedate = getIn(errors, invoice_due_date);

                        const invoice_number = `invoice[${index}].invoice_number`;
                        const touchedinvoice_number = getIn(
                          touched,
                          invoice_number
                        );
                        const errorinvoice_number = getIn(
                          errors,
                          invoice_number
                        );

                        const invoice_attachment = `invoice[${index}].invoice_attachment`;
                        const touchedinvoice_attachment = getIn(
                          touched,
                          invoice_attachment
                        );
                        const errorinvoice_attachment = getIn(
                          errors,
                          invoice_attachment
                        );

                        return (
                          <div key={p.id}>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={4}>
                                <TextField
                                  fullWidth
                                  className={classes.field}
                                  margin="normal"
                                  variant="outlined"
                                  label="Invoice Amount"
                                  name={invoice_amount}
                                  value={p.invoice_amount}
                                  required
                                  helperText={
                                    touchedinvoice_amount && errorinvoice_amount
                                      ? errorinvoice_amount
                                      : ""
                                  }
                                  error={Boolean(
                                    touchedinvoice_amount && errorinvoice_amount
                                  )}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <FormControl
                                  fullWidth
                                  className={classes.field}
                                >
                                  <Select
                                    id="currency"
                                    label="Currency"
                                    labelId="currency_label"
                                    name={currency}
                                    value={p.currency}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    variant="outlined"
                                    helperText={
                                      touchedcurrency && errorcurrency
                                        ? errorcurrency
                                        : ""
                                    }
                                    error={Boolean(
                                      touchedcurrency && errorcurrency
                                    )}
                                  >
                                    {curr.map((item, index) => (
                                      <MenuItem key={index} value={item.label}>
                                        {item.label}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <DatePickerField
                                  id="invoice_date"
                                  label="Invoice Date"
                                  name={invoice_date}
                                  helperText={
                                    toucheddate && errordate ? errordate : ""
                                  }
                                  error={Boolean(toucheddate && errordate)}
                                />
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <DatePickerField
                                  id="invoice_due_date"
                                  label="Invoice Due Date"
                                  name={invoice_due_date}
                                  helperText={
                                    touchedduedate && errorduedate
                                      ? errorduedate
                                      : ""
                                  }
                                  error={Boolean(
                                    touchedduedate && errorduedate
                                  )}
                                />
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <TextField
                                  fullWidth
                                  className={classes.field}
                                  margin="normal"
                                  variant="outlined"
                                  label="Invoice Number"
                                  name={invoice_number}
                                  value={p.invoice_number}
                                  required
                                  helperText={
                                    touchedinvoice_number && errorinvoice_number
                                      ? errorinvoice_number
                                      : ""
                                  }
                                  error={Boolean(
                                    touchedinvoice_number && errorinvoice_number
                                  )}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <TextField
                                  fullWidth
                                  className={classes.field}
                                  margin="normal"
                                  variant="outlined"
                                  label="Goods Description "
                                  name={sold_goods_description}
                                  value={p.sold_goods_description}
                                  required
                                  helperText={
                                    touchedsold_goods_description &&
                                    errorsold_goods_description
                                      ? errorsold_goods_description
                                      : ""
                                  }
                                  error={Boolean(
                                    touchedsold_goods_description &&
                                      errorsold_goods_description
                                  )}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <>
                                  <UploadField
                                    name={invoice_attachment}
                                    id={invoice_attachment}
                                    accept="image/*,application/pdf"
                                    style={{ display: "none" }}
                                    identityid={invoice_attachment}
                                    userid={invoice_attachment}
                                    sectorid={invoice_attachment}
                                  />
                                  <label htmlFor={invoice_attachment}>
                                    <LoaderButton
                                      id={invoice_attachment}
                                      key={invoice_attachment}
                                      fullWidth
                                      component="span"
                                      startIcon={<UploadIcon />}
                                      disabled={p.invoice_attachment.loading}
                                      success={p.invoice_attachment.success}
                                      loading={p.invoice_attachment.loading}
                                    >
                                      {" "}
                                      Invoice
                                    </LoaderButton>
                                  </label>
                                </>
                              </Grid>
                            </Grid>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </FieldArray>
                <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                <Button
                  className={classes.button}
                  type="submit"
                  color="primary"
                  variant="contained"
                  // disabled={!isValid || values.invoice.length === 0}
                >
                  submit
                </Button>
              </Form>
            )}
          </Formik>
        </React.Fragment>
      </Container>
    </Page>
  );
}
