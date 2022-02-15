import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Button,
  Container,
  makeStyles,
  Typography,
  Tab,
  Tabs,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuid } from "uuid";
import Page from "src/components/Page";

import IDForm from "./Forms/IDForm";
import RequestForm from "./Forms/RequestForm";
import IDResult from "./IDResults";
import CreditRequestForm from "./Forms/CreditRequestForm";

import IDvalidationSchema from "./FormModel/IDvalidationSchema";
import IDFormModel from "./FormModel/IDFormModel";
import IDformInitialValues from "./FormModel/IDformInitialValues";

import RequestvalidationSchema from "./FormModel/RequestvalidationSchema";
import RequestFormModel from "./FormModel/RequestFormModel";
import RequestformInitialValues from "./FormModel/RequestformInitialValues";

import CreditRequestvalidationSchema from "./FormModel/CreditRequestvalidationSchema";
import CreditRequestFormModel from "./FormModel/CreditRequestFormModel";
import CreditRequestformInitialValues from "./FormModel/CreditRequestformInitialValues";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const { formId, formField } = IDFormModel;
const { formId2, formField2 } = RequestFormModel;
const { formId3, formField3 } = CreditRequestFormModel;

export default function NewInsuranceRequest() {
  const classes = useStyles();
  const currentValidationSchema = IDvalidationSchema[0];
  const requestValidationSchema = RequestvalidationSchema[0];
  const creditValidationSchema = CreditRequestvalidationSchema[0];
  const [token, setToken] = useState("");
  const [value, setValue] = useState(0);
  const [company, setCompany] = useState("");
  const [singleInsurance, setSingleInsurance] = useState("");

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const insuranceId = uuid() + "-insurance";

  async function _submitForm(values, actions) {
    await _sleep(1000);
    try {
      const buyername = values["buyer_name"];
      const buyercountry = values["buyer_country"];
      const buyeruuid = await getInsuranceuuidBuyer({
        buyername,
        buyercountry,
      });
      setCompany(buyeruuid.results[0].company);
    } catch (e) {
      onError(e);
    }
  }

  async function _submitForm2(values, actions) {
    await _sleep(1000);
    try {
      const buyer_eulerid = values["buyer_eulerid"];
      const supplier_eulerid = values["supplier_eulerid"];
      const invoice_amount = values["invoice_amount"];
      const invoice_currency = values["invoice_currency"];
      const invoice_number = values["invoice_number"];
      const invoice_issue_date = values["invoice_issue_date"];
      const invoice_due_date = values["invoice_due_date"];
      const insurancecover = await getBuyerSupplierLimit({
        buyer_eulerid,
        supplier_eulerid,
        invoice_amount,
        invoice_currency,
        invoice_due_date,
        invoice_issue_date,
        invoice_number,
      });
      setSingleInsurance(insurancecover);
    } catch (e) {
      onError(e);
    }
  }

  async function _submitForm3(values, actions) {
    await _sleep(1000);
    try {
      const debtor_eulerid = values["debtor_eulerid"];
      const credit_amount = values["credit_amount"];
      const credit_currency = values["credit_currency"];
      const insurancecover = await getBuyerLimit({
        debtor_eulerid,
        credit_amount,
        credit_currency,
      });
      setSingleInsurance(insurancecover);
    } catch (e) {
      onError(e);
    }
  }

  async function getInsuranceuuidBuyer(input) {
    // Default options are marked with *
    const c = await eulerauth();
    setToken(c);
    var url =
      //remove proxy for online version
      "http://localhost:8080/https://api-services.uat.1placedessaisons.com/search/uatm-v2/companies/matching";
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        authorization: `Bearer ${c.access_token}`,
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        requestedSize: 1,
        companyName: `${input.buyername}`,
        companyIdentifiers: [
          {
            idTypeCode: "string",
            idValue: "string",
          },
        ],
        countryCode: `${input.buyercountry}`,
        minimumScore: 0,
        companyIdentifierTypeCode: "EH",
      }),
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  async function getsingleinvoiceuuid(input) {
    //remove proxy for online version
    var url = `http://localhost:8080/https://api-demo.single-invoice.co/v2/transactor/eulerid/${input}`;
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        apikey: process.env.REACT_APP_EH_SINGLE_INVOICE_KEY,
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  async function getBuyerSupplierLimit(input) {
    // Default options are marked with *
    const buyeruuid = await getsingleinvoiceuuid(input.buyer_eulerid);
    const supplieruuid = await getsingleinvoiceuuid(input.supplier_eulerid);
    var url =
      //remove proxy for online version
      "http://localhost:8080/https://api-demo.single-invoice.co/v2/coverage";
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        apikey: process.env.REACT_APP_EH_SINGLE_INVOICE_KEY,
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        sellerId: `${supplieruuid.Id}`,
        buyerId: `${buyeruuid.Id}`,
        invoice: {
          amount: `${input.invoice_amount}`,
          currency: `${input.invoice_currency}`,
          dueAt: `${input.invoice_due_date}`,
          issuedAt: `${input.invoice_issue_date}`,
          number: `${input.invoice_number}`,
        },
      }),
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  async function getBuyerLimit(input) {
    // Default options are marked with *
    const c = await eulerauth();
    setToken(c);
    var url =
      //remove proxy for online version
      "http://localhost:8080/https://api-services.uat.1placedessaisons.com/uatm/riskinfo/v2/covers";
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        authorization: `Bearer ${c.access_token}`,
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        coverTypeCode: "CreditLimit",
        requestOrigin: "ExternalPlatform",
        requestData: {
          amount: input.credit_amount,
          currencyCode: input.credit_currency,
          companyId: input.buyer_eulerid,
          comment: "",
          isRequestUrgent: "true",
        },
        policy: {
          policyId: process.env.REACT_APP_EH_POLICY_ID,
          extensionId: "",
          businessUnitCode: "ACI",
        },
      }),
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  async function eulerauth() {
    // Default options are marked with *
    var url =
      "http://localhost:8080/https://api-services.uat.1placedessaisons.com/uatm/v1/idp/oauth2/authorize";

    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Accept-Encoding": "gzip, deflate, br",
        Accept: "*/*",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: process.env.REACT_APP_EH_API_KEY,
      }),
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  async function createInsurances(input) {
    try {
      await createInsurance({});
    } catch (e) {
      onError(e);
    }
  }

  function createInsurance(input) {
    return API.graphql(
      graphqlOperation(mutations.createInsurance, { input: input })
    );
  }

  function _handleSubmit(values, actions) {
    _submitForm(values, actions);
  }

  function _handleSubmit2(values, actions) {
    _submitForm2(values, actions);
  }

  function _handleSubmit3(values, actions) {
    _submitForm3(values, actions);
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Page title="Request Insurance Cover">
      <React.Fragment>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Get Company ID" {...a11yProps(0)} />
            <Tab label="Request Cover" {...a11yProps(1)} />
            <Tab label="Check Cover" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={classes.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0}>
            <Container maxWidth="lg">
              <React.Fragment>
                <Formik
                  initialValues={IDformInitialValues}
                  validationSchema={currentValidationSchema}
                  onSubmit={_handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form id={formId}>
                      <IDForm formField={formField} />
                      <br></br>
                      <div className={classes.buttons}>
                        <div className={classes.wrapper}>
                          <Button
                            disabled={isSubmitting}
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                          >
                            Submit
                          </Button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
                <br></br>
                <IDResult {...company} />
              </React.Fragment>
            </Container>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <React.Fragment>
              <Accordion>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Single Invoice Cover</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Formik
                    initialValues={RequestformInitialValues}
                    validationSchema={requestValidationSchema}
                    onSubmit={_handleSubmit2}
                  >
                    {({ isSubmitting }) => (
                      <Form id={formId2}>
                        <RequestForm formField={formField2} />
                        <br></br>
                        <div className={classes.buttons}>
                          <div className={classes.wrapper}>
                            <Button
                              disabled={isSubmitting}
                              type="submit"
                              variant="contained"
                              color="primary"
                              className={classes.button}
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </AccordionDetails>
              </Accordion>
            </React.Fragment>
            <React.Fragment>
              <Accordion>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Debtor Credit Cover</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Formik
                    initialValues={CreditRequestformInitialValues}
                    validationSchema={creditValidationSchema}
                    onSubmit={_handleSubmit3}
                  >
                    {({ isSubmitting }) => (
                      <Form id={formId3}>
                        <CreditRequestForm formField={formField3} />
                        <br></br>
                        <div className={classes.buttons}>
                          <div className={classes.wrapper}>
                            <Button
                              disabled={isSubmitting}
                              type="submit"
                              variant="contained"
                              color="primary"
                              className={classes.button}
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </AccordionDetails>
              </Accordion>
            </React.Fragment>
          </TabPanel>
        </SwipeableViews>
      </React.Fragment>
    </Page>
  );
}
