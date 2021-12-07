import React, { useState } from "react";
import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuid } from "uuid";

import Page from "src/components/Page";

import DunsForm from "./Forms/DunsForm";

import validationSchema from "./FormModel/validationSchema";
import NewInsuranceRequestFormModel from "./FormModel/NewInsuranceRequestFormModel";
import formInitialValues from "./FormModel/formInitialValues";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const { formId, formField } = NewInsuranceRequestFormModel;

export default function NewInsuranceRequest() {
  const classes = useStyles();
  const navigate = useNavigate();
  const currentValidationSchema = validationSchema[0];
  const [token, setToken] = useState("");

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const insuranceId = uuid() + "-insurance";

  async function _submitForm(values, actions) {
    await _sleep(1000);
    try {
      const buyerduns = values["insurance_buyer_duns"];
      const supplierduns = values["insurance_supplier_duns"];
      const buyeruuid = await getInsuranceuuidBuyer({
        buyerduns,
      });
      const supplieruuid = await getInsuranceuuidSupplier({
        supplierduns,
      });
    } catch (e) {
      onError(e);
    }
    navigate("/admin/newinsurance");
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
        companyName: `${input.buyerduns}`,
        companyIdentifiers: [
          {
            idTypeCode: "string",
            idValue: "string",
          },
        ],
        countryCode: "US",
        minimumScore: 0,
        companyIdentifierTypeCode: "EH",
      }),
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  async function getInsuranceuuidSupplier(input) {
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
        requestedSize: 3,
        companyName: `${input.supplierduns}`,
        countryCode: "US",
        minimumScore: 0,
        companyIdentifierTypeCode: "EH",
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

  return (
    <Page className={classes.root} title="Request Insurance Cover">
      <Container maxWidth="lg">
        <React.Fragment>
          <Typography component="h1" variant="h4" align="center">
            Request Insurance Cover
          </Typography>
          <br></br>
          <React.Fragment>
            <Formik
              initialValues={formInitialValues}
              validationSchema={currentValidationSchema}
              onSubmit={_handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form id={formId}>
                  <DunsForm formField={formField} />
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
        </React.Fragment>
      </Container>
    </Page>
  );
}
