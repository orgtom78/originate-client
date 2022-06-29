import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Step,
  Stepper,
  StepLabel,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Formik, Form } from "formik";
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuid } from "uuid";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import { useUser } from "src/components/context/usercontext.js";
import NewSupplierView from "src/supplier/views/account/NewSupplierView";

import Page from "src/components/Page";

import BuyerListView from "src/supplier/views/buyer/BuyerListView";
import BuyerAddressForm from "./Forms/BuyerAddressForm";
import BuyerFinancialsForm from "./Forms/BuyerFinancialsForm";
import BuyerHistoryForm from "./Forms/BuyerHistoryForm";

import validationSchema from "./FormModel/validationSchema";
import NewBuyerFormModel from "./FormModel/NewBuyerFormModel";
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

const steps = ["Client Details", "Client Financials", "Client History"];
const { formId, formField } = NewBuyerFormModel;

const buyerId = "buyer-" + uuid();
const financialsId = "financials-buyer" + uuid() + buyerId;

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BuyerAddressForm formField={formField} vbuyer={buyerId} />;
    case 1:
      return <BuyerFinancialsForm formField={formField} value={financialsId} />;
    case 2:
      return <BuyerHistoryForm formField={formField} vbuyer={buyerId} />;
    default:
      throw new Error("Unknown step");
  }
}

export default function NewAccount() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const [sub, setSub] = useState("");
  const [supid, setSupid] = useState("");
  const [identityId, setIdentityId] = useState("");
  const context = useUser();

  const isLastStep = activeStep === steps.length - 1;

  React.useEffect(() => {
    // attempt to fetch the info of the user that was already logged in
    async function onLoad() {
      const data = await context;
      const { sub, supplierId, identity } = data;
      setSub(sub);
      setSupid(supplierId);
      setIdentityId(identity);
    }
    onLoad();
  }, [context]);

  async function _submitForm(values, actions) {
    try {
      const userId = sub;
      const supplierId = supid;
      const buyer_name = values["buyer_name"];
      const buyer_country = values["buyer_country"];
      const buyer_address_postalcode = values["buyer_address_postalcode"];
      const buyer_address_city = values["buyer_address_city"];
      const buyer_address_street = values["buyer_address_street"];
      const buyer_contact_name = values["buyer_contact_name"];
      const buyer_contact_email = values["buyer_contact_email"];
      const buyer_website = values["buyer_website"];
      const buyer_sold_goods_description =
        values["buyer_sold_goods_description"];
      const buyer_loan_request_amount = values["buyer_loan_request_amount"];
      const buyer_currency = values["buyer_currency"];
      const buyer_payment_terms = values["buyer_payment_terms"];
      const buyer_sample_trading_docs_attachment =
        values["buyer_sample_trading_docs_attachment"];

      const financials_reporting_period = values["financials_reporting_period"];
      const sales = values["sales"];
      const ebit = values["ebit"];
      const net_profit = values["net_profit"];
      const cost_of_goods_sold = values["cost_of_goods_sold"];
      const current_assets = values["current_assets"];
      const current_liabilities = values["current_liabilities"];
      const total_equity = values["total_equity"];
      const balance_sheet_attachment = values["balance_sheet_attachment"];
      const income_statement_attachment = values["income_statement_attachment"];

      const buyer_supplier_year_business_relation_started =
        values["buyer_supplier_year_business_relation_started"];
      const buyer_previous_year_transaction_amount =
        values["buyer_previous_year_transaction_amount"];
      const buyer_reporting_year_transaction_amount =
        values["buyer_reporting_year_transaction_amount"];
      const buyer_next_year_projected_transaction_amount =
        values["buyer_next_year_projected_transaction_amount"];
      const buyer_previous_year_number_invoices =
        values["buyer_previous_year_number_invoices"];
      const buyer_insurance_name = values["buyer_insurance_name"];
      const buyer_existing_disputes = values["buyer_existing_disputes"];
      const buyer_finance_department_contact_email =
        values["buyer_finance_department_contact_emails"];
      const buyer_use_of_goods_purchased =
        values["buyer_use_of_goods_purchased"];
      const buyer_invoices_paid_on_time = values["buyer_invoices_paid_on_time"];
      const buyer_invoices_past_due_30_days =
        values["buyer_invoices_past_due_30_days"];
      const buyer_invoices_past_due_60_days =
        values["buyer_invoices_past_due_60_days"];
      const buyer_invoices_past_due_90_days =
        values["buyer_invoices_past_due_90_days"];
      const buyer_reporting_year = "2021";
      const buyer_status = "Under Review";

      await createBuyer({
        userId,
        buyerId,
        supplierId,
        identityId,
        buyer_address_city,
        buyer_address_postalcode,
        buyer_address_street,
        buyer_name,
        buyer_country,
        buyer_website,
        buyer_contact_name,
        buyer_contact_email,
        buyer_currency,
        buyer_loan_request_amount,
        buyer_payment_terms,
        buyer_sample_trading_docs_attachment,
        buyer_sold_goods_description,
        buyer_insurance_name,
        buyer_next_year_projected_transaction_amount,
        buyer_previous_year_transaction_amount,
        buyer_reporting_year,
        buyer_reporting_year_transaction_amount,
        buyer_previous_year_number_invoices,
        buyer_status,
        buyer_supplier_year_business_relation_started,
        buyer_existing_disputes,
        buyer_finance_department_contact_email,
        buyer_invoices_paid_on_time,
        buyer_invoices_past_due_30_days,
        buyer_invoices_past_due_60_days,
        buyer_invoices_past_due_90_days,
        buyer_use_of_goods_purchased,
      });

      await createFinancials({
        userId,
        financialsId,
        identityId,
        buyerId,
        balance_sheet_attachment,
        income_statement_attachment,
        sales,
        net_profit,
        ebit,
        cost_of_goods_sold,
        current_assets,
        current_liabilities,
        total_equity,
        financials_reporting_period,
      });
    } catch (e) {
      onError(e);
    }
    actions.setSubmitting(false);
    setActiveStep(activeStep + 1);
  }

  function createBuyer(input) {
    return API.graphql(
      graphqlOperation(mutations.createBuyer, { input: input })
    );
  }

  function createFinancials(input) {
    return API.graphql(
      graphqlOperation(mutations.createFinancials, { input: input })
    );
  }

  async function _handleSubmit(values, actions) {
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
    <React.Fragment>
      {supid ? (
        <Page className={classes.root} title="New Credit Limits">
          <Container maxWidth="lg">
            <React.Fragment>
              <Typography component="h1" variant="h4" align="center">
                Get credit limits for your clients
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
                  <BuyerListView />
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
      ) : (
        <>
          <NewSupplierView />
        </>
      )}
    </React.Fragment>
  );
}
