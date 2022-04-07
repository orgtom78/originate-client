import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, CircularProgress, Container, Step, Stepper, StepLabel, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Formik, Form } from "formik";
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuid } from "uuid";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import * as queries from "src/graphql/queries.js";

import Page from "src/components/Page";

import AddressForm from "./Forms/AddressForm";
import ShareholderForm from "./Forms/ShareholderForm";
import FinancialsForm from "./Forms/FinancialsForm";

import validationSchema from "./FormModel/validationSchema";
import NewSupplierFormModel from "./FormModel/NewSupplierFormModel";
import formInitialValues from "./FormModel/formInitialValues";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const steps = ["Company details", "Shareholder details", "Financial details"];
const { formId, formField } = NewSupplierFormModel;

const supplierId = "supplier-" + uuid();
const directorId = "director-supplier" + uuid();
const uboId = "ubo-supplier" + uuid();
const financialsId = "financials-supplier" + uuid();

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm formField={formField} value={supplierId} />;
    case 1:
      return (
        <ShareholderForm formField={formField} dir={directorId} ubo={uboId} />
      );
    case 2:
      return <FinancialsForm formField={formField} fin={financialsId} />;
    default:
      throw new Error("Unknown step");
  }
}

export default function NewSupplier() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const { ID } = useParams();
  const { ident } = useParams();
  const { sub } = useParams();

  const isLastStep = activeStep === steps.length - 1;

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    try {
      const userId = ID;
      const identityId = ident;
      const supplier_logo = values["supplier_logo"];
      const supplier_name = values["supplier_name"];
      const supplier_type = values["supplier_type"];
      const supplier_address_city = values["supplier_address_city"];
      const supplier_address_street = values["supplier_address_street"];
      const supplier_address_postalcode = values["supplier_address_postalcode"];
      const supplier_address_refinment = values["supplier_address_refinment"];
      const supplier_country = values["supplier_country"];
      const supplier_industry = values["supplier_industry"];
      const supplier_industry_code = values["supplier_industry_code"];
      const supplier_date_of_incorporation =
        values["supplier_date_of_incorporation"];
      const supplier_registration_cert_attachment =
        values["supplier_registration_cert_attachment"];
      const supplier_articles_of_association_attachment =
        values["supplier_articles_of_association_attachment"];
      const supplier_shareholder_list_attachment =
        values["supplier_shareholder_list_attachment"];
      const supplier_director_list_attachment =
        values["supplier_director_list_attachment"];
      const supplier_register_number = values["supplier_register_number"];
      const supplier_trading_name = values["supplier_trading_name"];
      const supplier_website = values["supplier_website"];

      const director_name = values["director_name"];
      const director_email = values["director_email"];
      const director_phone_number = values["director_phone_number"];
      const director_id_attachment = values["director_id_attachment"];
      const director_id_number = values["director_id_number"];
      const director_id_type = values["director_id_type"];
      const director_nationality = values["director_nationality"];
      const director_poa_attachment = values["director_poa_attachment"];
      const director_country_of_residence =
        values["director_country_of_residence"];
      const director_status = "Under Review";

      const ubo_name = values["ubo_name"];
      const ubo_email = values["ubo_email"];
      const ubo_phone_number = values["ubo_phone_number"];
      const ubo_id_attachment = values["ubo_id_attachment"];
      const ubo_id_number = values["ubo_id_number"];
      const ubo_id_type = values["ubo_id_type"];
      const ubo_nationality = values["ubo_nationality"];
      const ubo_poa_attachment = values["ubo_poa_attachment"];
      const ubo_country_of_residence = values["ubo_country_of_residence"];
      const ubo_status = "Under Review";

      const financials_attachment = values["financial_accounts_attachment"];
      const financials_reporting_period = values["financials_reporting_period"];
      const net_profit = values["net_profit"];
      const financials_rating = values["financials_rating"];
      const sales = values["sales"];
      const total_assets = values["total_assets"];
      const total_liabilities = values["total_liabilities"];
      const ebit = values["ebit"];
      const financials_status = "Under Review";
      const accounts_payable = values["accounts_payable"];
      const accounts_receivable = values["accounts_receivable"];
      const cash = values["cash"];
      const equity_book_value = values["equity_book_value"];
      const equity_market_value = values["equity_market_value"];
      const interest_expenses = values["interest_expenses"];
      const inventory = values["inventory"];
      const retained_earnings = values["retained_earnings"];
      const short_term_debt = values["short_term_debt"];
      const working_capital = values["working_capital"];

      await createSupplier({
        userId,
        supplierId,
        identityId,
        supplier_logo,
        supplier_name,
        supplier_type,
        supplier_date_of_incorporation,
        supplier_address_city,
        supplier_address_street,
        supplier_address_postalcode,
        supplier_country,
        supplier_industry,
        supplier_registration_cert_attachment,
        supplier_articles_of_association_attachment,
        supplier_shareholder_list_attachment,
        supplier_director_list_attachment,
        supplier_register_number,
        supplier_trading_name,
        supplier_website,
        supplier_address_refinment,
        supplier_industry_code,
      });

      await createDirector({
        userId,
        supplierId,
        directorId,
        identityId,
        director_name,
        director_email,
        director_phone_number,
        director_id_number,
        director_id_attachment,
        director_id_type,
        director_nationality,
        director_poa_attachment,
        director_country_of_residence,
        director_status,
      });

      await createUbo({
        userId,
        supplierId,
        uboId,
        identityId,
        ubo_name,
        ubo_email,
        ubo_phone_number,
        ubo_id_number,
        ubo_id_attachment,
        ubo_id_type,
        ubo_nationality,
        ubo_poa_attachment,
        ubo_country_of_residence,
        ubo_status,
      });

      await createFinancials({
        userId,
        financialsId,
        supplierId,
        identityId,
        accounts_payable,
        accounts_receivable,
        cash,
        equity_book_value,
        equity_market_value,
        interest_expenses,
        inventory,
        retained_earnings,
        short_term_debt,
        working_capital,
        ebit,
        financials_attachment,
        net_profit,
        financials_rating,
        financials_reporting_period,
        sales,
        total_assets,
        total_liabilities,
        financials_status,
      });

      await updateUsergroup();
    } catch (e) {
      onError(e);
    }
    actions.setSubmitting(false);
    setActiveStep(activeStep + 1);
    navigate("/admin/suppliers");
  }

  function createSupplier(input) {
    return API.graphql(
      graphqlOperation(mutations.createSupplier, { input: input })
    );
  }

  function createDirector(input) {
    return API.graphql(
      graphqlOperation(mutations.createDirector, { input: input })
    );
  }

  function createUbo(input) {
    return API.graphql(graphqlOperation(mutations.createUbo, { input: input }));
  }

  function createFinancials(input) {
    return API.graphql(
      graphqlOperation(mutations.createFinancials, { input: input })
    );
  }

  function getUsergroupid(input) {
    return API.graphql(
      graphqlOperation(queries.listUsergroups, { input: input })
    );
  }

  async function updateUsergroup() {
    var userId = sub;
    var groupId = ID;
    const { data: {
      listUsergroups: { items: itemsPage1, nextToken },
    }}  = await getUsergroupid({ userId, groupId});
    const n = { data: { listUsergroupss: { items: itemsPage1, nextToken } } };
    const items = n.data.listUsergroupss.items;
    const id = items[0].id;
    console.log(items)
    var input = { userId, groupId, supplierId, id};
    return API.graphql(
      graphqlOperation(mutations.updateUsergroup, { input: input })
    );
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  return (
    <Page className={classes.root} title="Register a new Client">
      <Container maxWidth="lg">
        <React.Fragment>
          <Typography component="h1" variant="h4" align="center">
            Register a new Client
          </Typography>
          <br></br>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              navigate("/admin/suppliers")
            ) : (
              <Formik
                initialValues={formInitialValues}
                validationSchema={currentValidationSchema}
                onSubmit={_handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form id={formId}>
                    {getStepContent(activeStep)}

                    <div className={classes.buttons}>
                      {activeStep !== 0 && (
                        <Button
                          onClick={_handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                      )}
                      <div className={classes.wrapper}>
                        <Button
                          disabled={isSubmitting}
                          type="submit"
                          variant="contained"
                          color="primary"
                          className={classes.button}
                        >
                          {isLastStep ? "Submit" : "Next"}
                        </Button>
                        {isSubmitting && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )}
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </React.Fragment>
        </React.Fragment>
      </Container>
    </Page>
  );
}
