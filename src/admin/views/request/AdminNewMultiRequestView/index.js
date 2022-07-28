import React, { useState } from "react";
import {
  Container,
  Divider,
  FormControl,
  InputLabel,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Field, FieldArray, Form, Formik, getIn } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import currencies from "src/components/FormLists/currencies.js";

import Page from "src/components/Page";

const curr = currencies;
console.log(curr);

const validationSchema = Yup.object().shape({
  invoice: Yup.array().of(
    Yup.object().shape({
      invoice_amount: Yup.string().required("Invoice Amount is required"),
      sold_goods_description: Yup.string().required("Description is required"),
      currency: Yup.string().required("Currency is required"),
      invoice_date: Yup.string().required("Invoice Date is required"),
      button: Yup.string(),
    })
  ),
});

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  button: {
    margin: theme.spacing(1),
  },
  field: {
    margin: theme.spacing(1),
  },
}));

export default function MyForm() {
  const classes = useStyles();
  const [number_of_invoices, setNumber_of_invoices] = useState("");
  const initialValues = {
    invoice: [
      {
        id: uuid(),
        invoice_amount: "",
        sold_goods_description: "",
        currency: "",
        button: "",
      },
    ],
  };

  function handleNumberChange(e, field, values, setValues) {
    const invoice = [...values.invoice];
    const numberOfInvoices = e.target.value || 1;
    setNumber_of_invoices(e.target.value);
    const previousNumber = parseInt(field.value || 1);
    console.log(field);
    console.log(values);
    if (previousNumber < numberOfInvoices) {
      for (let i = previousNumber; i < numberOfInvoices; i++) {
        invoice.push({
          id: uuid(),
          invoice_amount: "",
          sold_goods_description: "",
          button: "",
        });
      }
    } else {
      for (let i = previousNumber; i >= numberOfInvoices; i--) {
        invoice.splice(i, 1);
      }
    }
    setValues({ ...values, invoice });

    // call formik onChange method
    field.onChange(e);
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

                        const button = `invoice[${index}].button`;
                        const touchedbutton = getIn(touched, button);
                        const errorbutton = getIn(errors, button);

                        return (
                          <div key={p.id}>
                            <TextField
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
                            <FormControl>
                              <Select
                                id="currency"
                                label="Currency"
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

                            <TextField
                              className={classes.field}
                              margin="normal"
                              variant="outlined"
                              label="sold_goods_description "
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
                            <Button
                              className={classes.button}
                              type="button"
                              variant="outlined"
                              onClick={""}
                              name={button}
                              value={p.button}
                              required
                              helperText={
                                touchedbutton && errorbutton ? errorbutton : ""
                              }
                              error={Boolean(touchedbutton && errorbutton)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              Add
                            </Button>
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
