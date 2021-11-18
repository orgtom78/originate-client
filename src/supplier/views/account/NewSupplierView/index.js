import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  makeStyles,
  Step,
  Stepper,
  StepLabel,
  Typography,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { v4 as uuid } from "uuid";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";

import Page from "src/components/Page";

import SupplierSuccessView from "src/supplier/views/account/SupplierSuccessView";
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
  button: {
    float: "right",
  },
}));

const steps = ["Company details", "Shareholder details", "Financial details"];
const { formId, formField } = NewSupplierFormModel;

const userId = uuid() + "-group";
const supplierId = "supplier-" + uuid();
const directorId = "director-supplier" + uuid();
const uboId = "ubo-supplier" + uuid();
const financialsId = "financials-supplier" + uuid();
const bankId = "bank-supplier" + uuid();

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <AddressForm
          formField={formField}
          vuser={userId}
          vsupplier={supplierId}
        />
      );
    case 1:
      return (
        <ShareholderForm
          formField={formField}
          vuser={userId}
          vubo={uboId}
          vdirector={directorId}
        />
      );
    case 2:
      return (
        <FinancialsForm
          formField={formField}
          vuser={userId}
          vbank={bankId}
          vfinancials={financialsId}
        />
      );
    default:
      throw new Error("Unknown step");
  }
}

export default function NewSupplier() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [sub, setSub] = useState("");
  const currentValidationSchema = validationSchema[activeStep];

  const isLastStep = activeStep === steps.length - 1;

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  React.useEffect(() => {
    async function loadUser() {
      let user = await Auth.currentAuthenticatedUser();
      const { attributes = {} } = user;
      const a = attributes["sub"];
      setSub(a);
    }
    loadUser();
  }, []);

  async function _submitForm(values, actions) {
    await _sleep(1000);
    try {
      let user = await Auth.currentAuthenticatedUser();
      let identity = await Auth.currentUserCredentials();
      const user_name = await user.attributes.email;
      const identityId = identity.identityId;
      const groupId = userId;
      const group_type = "Supplier";
      const sortkey = supplierId;
      const supplier_logo = values["supplier_logo"];
      const supplier_name = values["supplier_name"];
      const supplier_type = values["supplier_type"];
      const supplier_address_city = values["supplier_address_city"];
      const supplier_address_street = values["supplier_address_street"];
      const supplier_address_number = values["supplier_address_number"];
      const supplier_address_postalcode = values["supplier_address_postalcode"];
      const supplier_country = values["supplier_country"];
      const supplier_industry = values["supplier_industry"];
      const supplier_date_of_incorporation =
        values["supplier_date_of_incorporation"];
      const supplier_registration_cert_attachment =
        values["supplier_registration_cert_attachment"];

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

      const balance_sheet_attachment = values["balance_sheet_attachment"];
      const income_statement_attachment = values["income_statement_attachment"];
      const financials_reporting_period = values["financials_reporting_period"];
      const net_profit = values["net_profit"];
      const financials_rating = values["financials_rating"];
      const sales = values["sales"];
      const total_assets = values["total_assets"];
      const total_liabilities = total_assets;
      const ebit = values["ebit"];
      const retained_earnings = values["retained_earnings"];
      const working_capital = values["working_capital"];
      const financials_status = "Under Review";

      const bank_account_name = values["bank_account_name"];
      const bank_account_number = values["bank_account_number"];
      const bank_account_sortcode = values["bank_account_sortcode"];
      const bank_country = values["bank_country"];
      const bank_name = values["bank_name"];
      const bank_routing_number = values["bank_routing_number"];
      const bic_swift_code = values["bic_swift_code"];
      const iban = values["iban"];
      const bank_status = "Under Review";

      await createUsergroup({
        sub,
        identityId,
        groupId,
        group_type,
        user_name,
      });

      await createSupplier({
        userId,
        sortkey,
        identityId,
        supplierId,
        supplier_logo,
        supplier_name,
        supplier_type,
        supplier_date_of_incorporation,
        supplier_address_city,
        supplier_address_street,
        supplier_address_number,
        supplier_address_postalcode,
        supplier_country,
        supplier_industry,
        supplier_registration_cert_attachment,
      });

      await createDirector({
        userId,
        directorId,
        identityId,
        director_name,
        director_email,
        director_phone_number,
        director_id_attachment,
        director_id_type,
        director_id_number,
        director_nationality,
        director_poa_attachment,
        director_country_of_residence,
        director_status,
      });

      await createUbo({
        userId,
        uboId,
        identityId,
        ubo_name,
        ubo_email,
        ubo_phone_number,
        ubo_id_attachment,
        ubo_id_type,
        ubo_id_number,
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
        ebit,
        balance_sheet_attachment,
        income_statement_attachment,
        net_profit,
        financials_rating,
        financials_reporting_period,
        sales,
        total_assets,
        total_liabilities,
        retained_earnings,
        working_capital,
        financials_status,
      });

      await createBank({
        userId,
        bankId,
        supplierId,
        identityId,
        bank_account_name,
        bank_account_number,
        bank_account_sortcode,
        bank_country,
        bank_name,
        bank_routing_number,
        bic_swift_code,
        iban,
        bank_status,
      });

      await Auth.updateUserAttributes(user, {
        "custom:groupid": userId,
      });
    } catch (e) {
      onError(e);
    }
    actions.setSubmitting(false);
    setActiveStep(activeStep + 1);
    setTimeout(function() {
      navigate("/app/suppliers");
      window.location.reload();
    }, 3000);
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

  function createBank(input) {
    return API.graphql(
      graphqlOperation(mutations.createBank, { input: input })
    );
  }

  function createUsergroup(input) {
    return API.graphql(
      graphqlOperation(mutations.createUsergroup, { input: input })
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
    navigate("/app/account");
  }

  return (
    <Page className={classes.root} title="Create your Account">
      <Container maxWidth="lg">
        <React.Fragment>
          <Typography component="h1" variant="h4" align="center">
            Register your company
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
              <SupplierSuccessView />
            ) : (
              <Formik
                initialValues={formInitialValues}
                validationSchema={currentValidationSchema}
                onSubmit={_handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form id={formId}>
                    {getStepContent(activeStep)}
                    <br></br>
                    <div className={classes.buttons}>
                      {activeStep !== 3 && (
                        <Button
                          disabled={isSubmitting}
                          type="submit"
                          variant="contained"
                          color="primary"
                          className={classes.button}
                        >
                          {isLastStep ? "Submit" : "Next"}
                          {isSubmitting && (
                            <CircularProgress
                              size={24}
                              className={classes.buttonProgress}
                            />
                          )}
                        </Button>
                      )}
                      <div className={classes.wrapper}>
                        {activeStep !== 0 && (
                          <Button
                            onClick={_handleBack}
                            className={classes.button}
                          >
                            Back
                          </Button>
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
