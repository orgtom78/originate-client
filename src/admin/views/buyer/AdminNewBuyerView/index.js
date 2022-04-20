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
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuid } from "uuid";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";

import Page from "src/components/Page";

import BuyerAddressForm from "./Forms/BuyerAddressForm";
import BuyerFinancialsForm from "./Forms/BuyerFinancialsForm";
import BuyerHistoryForm from "./Forms/BuyerHistoryForm";

import validationSchema from "./FormModel/validationSchema";
import NewBuyerFormModel from "./FormModel/NewBuyerFormModel";
import formInitialValues from "./FormModel/formInitialValues";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const steps = ["Client Details", "Client Financials", "Client History"];
const { formId, formField } = NewBuyerFormModel;

const buyerId = "buyer-" + uuid();
const financialsId = "financials-buyer" + uuid() + buyerId;

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BuyerAddressForm formField={formField} value={buyerId} />;
    case 1:
      return <BuyerFinancialsForm formField={formField} fin={financialsId} />;
    case 2:
      return <BuyerHistoryForm formField={formField} value={buyerId} />;
    default:
      throw new Error("Unknown step");
  }
}

export default function NewAccount() {
  const { id } = useParams();
  const { user } = useParams();
  const { ident } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];

  const isLastStep = activeStep === steps.length - 1;

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    try {
      const userId = user;
      const supplierId = id;
      const identityId = ident;

      const investorId = values["investorId"];
      const buyer_loan_request_amount = values["buyer_loan_request_amount"];
      const buyer_payment_terms = values["buyer_payment_terms"];
      const buyer_currency = values["buyer_currency"];
      const buyer_name = values["buyer_name"];
      const buyer_date_of_incorporation = values["buyer_date_of_incorporation"];
      const buyer_country = values["buyer_country"];
      const buyer_address_postalcode = values["buyer_address_postalcode"];
      const buyer_address_city = values["buyer_address_city"];
      const buyer_address_street = values["buyer_address_street"];
      const buyer_address_number = values["buyer_address_number"];
      const buyer_website = values["buyer_website"];
      const buyer_sample_trading_docs_attachment =
        values["buyer_sales_contract_attachment"];

      const balance_sheet_attachment = values["balance_sheet_attachment"];
      const income_statement_attachment = values["income_statement_attachment"];
      const financials_status = values["financials_status"];
      const financials_reporting_period = values["financials_reporting_period"];
      const net_profit = values["net_profit"];
      const sales = values["sales"];
      const net_operating_loss = values["net_operating_loss"];
      const ebit = values["ebit"];
      const total_equity = values["total_equity"];
      const cash_flow_from_operating_activities =
        values["cash_flow_from_operating_activities"];
      const interest_expenses = values["interest_expenses"];
      const current_assets = values["current_assets"];
      const current_liabilities = values["current_liabilities"];
      const inventory_beginning = values["inventory_beginning"];
      const inventory_end = values["inventory_end"];
      const inventory = values["inventory"];
      const cost_of_goods_sold = values["cost_of_goods_sold"];

      const buyer_reporting_year = values["buyer_reporting_year"];
      const buyer_supplier_year_business_relation_started =
        values["buyer_supplier_year_business_relation_started"];
      const buyer_next_year_projected_transaction_amount =
        values["buyer_next_year_projected_transaction_amount"];
      const buyer_reporting_year_transaction_amount =
        values["buyer_reporting_year_transaction_amount"];
      const buyer_previous_year_transaction_amount =
        values["buyer_previous_year_transaction_amount"];
      const buyer_previous_year_number_invoices =
        values["buyer_previous_year_number_invoices"];
      const buyer_insurance_name = values["buyer_insurance_name"];
      const buyer_insurance_status = values["buyer_insurance_status"];
      const buyer_existing_disputes = values["buyer_existing_disputes"];
      const buyer_existing_disputes_source =
        values["buyer_existing_disputes_source"];
      const buyer_country_year_of_rating_downgrade =
        values["buyer_country_year_of_rating_downgrade"];
      const buyer_finance_department_contact_exists =
        values["buyer_finance_department_contact_exists"];
      const buyer_finance_department_contact_email =
        values["buyer_finance_department_contact_email"];
      const buyer_field_visit_conducted = values["buyer_field_visit_conducted"];
      const buyer_invoices_paid_on_time = values["buyer_invoices_paid_on_time"];
      const buyer_invoices_past_due = values["buyer_invoices_past_due"];
      const buyer_invoices_past_due_30_days =
        values["buyer_invoices_past_due_30_days"];
      const buyer_invoices_past_due_60_days =
        values["buyer_invoices_past_due_60_days"];
      const buyer_invoices_past_due_90_days =
        values["buyer_invoices_past_due_90_days"];
      const buyer_use_of_goods_purchased =
        values["buyer_use_of_goods_purchased"];
      const buyer_one_off_ipu_attachment =
        values["buyer_one_off_ipu_attachment"];
      const buyer_status = "Under Review";

      await createBuyer({
        userId,
        buyerId,
        supplierId,
        identityId,
        investorId,
        buyer_address_city,
        buyer_address_postalcode,
        buyer_address_street,
        buyer_address_number,
        buyer_name,
        buyer_country,
        buyer_website,
        buyer_currency,
        buyer_loan_request_amount,
        buyer_payment_terms,
        buyer_sample_trading_docs_attachment,
        buyer_date_of_incorporation,
        buyer_insurance_name,
        buyer_one_off_ipu_attachment,
        buyer_next_year_projected_transaction_amount,
        buyer_previous_year_transaction_amount,
        buyer_reporting_year,
        buyer_reporting_year_transaction_amount,
        buyer_previous_year_number_invoices,
        buyer_existing_disputes,
        buyer_existing_disputes_source,
        buyer_insurance_status,
        buyer_country_year_of_rating_downgrade,
        buyer_finance_department_contact_exists,
        buyer_finance_department_contact_email,
        buyer_field_visit_conducted,
        buyer_supplier_year_business_relation_started,
        buyer_invoices_paid_on_time,
        buyer_invoices_past_due,
        buyer_invoices_past_due_30_days,
        buyer_invoices_past_due_60_days,
        buyer_invoices_past_due_90_days,
        buyer_use_of_goods_purchased,
        buyer_status,
      });

      await createFinancials({
        userId,
        financialsId,
        identityId,
        buyerId,
        sales,
        financials_status,
        net_profit,
        total_equity,
        net_operating_loss,
        cash_flow_from_operating_activities,
        current_assets,
        current_liabilities,
        inventory_beginning,
        inventory_end,
        cost_of_goods_sold,
        ebit,
        interest_expenses,
        financials_reporting_period,
        inventory,
        balance_sheet_attachment,
        income_statement_attachment,
      });
      navigate("/admin/buyers");
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
    <React.Fragment>
      <Page className={classes.root} title="New Credit Limits">
        <Container maxWidth="lg">
          <React.Fragment>
            <Typography component="h1" variant="h4" align="center">
              Credit limits and approval process for new clients
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
                navigate("/admin/buyers")
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
    </React.Fragment>
  );
}
