import React from "react";
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

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const insuranceId = uuid() + "-insurance";

  async function _submitForm(values, actions) {
    await _sleep(1000);
    try {
      const buyerduns = values["insurance_buyer_duns"];
      const supplierduns = values["insurance_supplier_duns"];
      const buyeruuid = await getInsuranceuuid({
        buyerduns
      });
      const supplieruuid = await getInsuranceuuid({
        supplierduns
      });

    } catch (e) {
      onError(e);
    }
    navigate("/admin/groups");
  }

  async function getInsuranceuuid(input) {
    const url = 'https://api-demo.single-invoice.co/v2/transactor/'
    let request = {
      countrycode: "US",
      service: 'dun',
      id: input
    };

    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        authorization: "Bearer p2VwR2YuCXziUgL0tazMExdJM8joKG",
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(
        request
        )
  });
  return response.json();
}

  async function createInsurances(input) {
    try {
      await createInsurance({
        
      });
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
