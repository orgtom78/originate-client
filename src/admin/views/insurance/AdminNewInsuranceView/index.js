import React, { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import PropTypes from "prop-types";
import {
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

import IDvalidationSchema from "./FormModel/IDvalidationSchema";
import IDFormModel from "./FormModel/IDFormModel";
import IDformInitialValues from "./FormModel/IDformInitialValues";

import RequestvalidationSchema from "./FormModel/RequestvalidationSchema";
import RequestFormModel from "./FormModel/RequestFormModel";
import RequestformInitialValues from "./FormModel/RequestformInitialValues";

import exresults from "./exresults";

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

export default function NewInsuranceRequest() {
  const classes = useStyles();
  const currentValidationSchema = IDvalidationSchema[0];
  const requestValidationSchema = RequestvalidationSchema[0];
  const [token, setToken] = useState("");
  const [value, setValue] = useState(0);
  const [company, setCompany] = useState("");
  const [singleInsurance, setSingleInsurance] = useState("");

  const testcompany = exresults;

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
      const insurancecover = await getBuyerSupplierLimit({
        buyer_eulerid,
        supplier_eulerid,
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
    console.log(input);
    var url = `http://localhost:8080/https://api-demo.single-invoice.co/v2/transactor/eulerid/${input}`;
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        apikey:
          "Kn17xpP4e7qVLAxNOsofitGXBz1XEpirO1y479jfczyS8IuOtNGDWymcVKoHmbK",
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  async function getBuyerSupplierLimit(input) {
    // Default options are marked with *
    const eulercompid = "99184313";
    const eulercompid2 = "127805632";
    const buyeruuid = await getsingleinvoiceuuid(input.buyer_eulerid);
    const supplieruuid = await getsingleinvoiceuuid(input.supplier_eulerid);
    console.log(buyeruuid.Id);
    console.log(supplieruuid.Id);
    var url =
      "http://localhost:8080/https://api-demo.single-invoice.co/v2/coverage";
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        apikey:
          "Kn17xpP4e7qVLAxNOsofitGXBz1XEpirO1y479jfczyS8IuOtNGDWymcVKoHmbK",
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        sellerId: `${supplieruuid.Id}`,
        buyerId: `${buyeruuid.Id}`,
        invoice: {
          amount: 10000,
          currency: "usd",
          dueAt: "2022-03-25T14:23:21.811Z",
          issuedAt: "2022-01-03T15:23:21.811Z",
          number: "001",
        },
      }),
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  async function getBuyerLimit(input) {
    // Default options are marked with *
    const c = await eulerauth();
    setToken(c);
    const eulercompid = "99184313";
    var url =
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
          amount: 100000,
          currencyCode: "USD",
          companyId: eulercompid,
          comment: "",
          isRequestUrgent: "true",
        },
        policy: {
          policyId: "P1000932",
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
            <Container maxWidth="lg">
              <React.Fragment>
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
              </React.Fragment>
            </Container>
          </TabPanel>
        </SwipeableViews>
      </React.Fragment>
    </Page>
  );
}
