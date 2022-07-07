import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Typography, Step, Stepper, StepLabel, CircularProgress } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuid } from "uuid";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";

import Page from "src/components/Page";

import BalanceSheetForm from "./Forms/BalanceSheetForm";
import IncomeStatementForm from "./Forms/IncomeStatementForm";

import validationSchema from "./FormModel/validationSchema";
import NewFinancialsFormModel from "./FormModel/NewFinancialsFormModel";
import formInitialValues from "./FormModel/formInitialValues";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

export default function NewFinancials() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const { buyId } = useParams();
  const { ident } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const steps = ["Balance Sheet", "Income Statement"];
  const { formId, formField } = NewFinancialsFormModel;
  const financialsId = "financials-" + uuid() + buyId;

  const isLastStep = activeStep === steps.length - 1;

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <BalanceSheetForm formField={formField} value={financialsId} />;
      case 1:
        return (
          <IncomeStatementForm formField={formField} value={financialsId} />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    try {
      const userId = id;
      const sortkey = financialsId;
      const identityId = ident;
      const supplierId = values["supplierId"];
      const buyerId = buyId;
      const balance_sheet_attachment = values["balance_sheet_attachment"];
      const financials_reporting_period = values["financials_reporting_period"];
      const cash = values["cash"];
      const accounts_receivable = values["accounts_receivable"];
      const inventory = values["inventory"];
      const other_current_assets = values["other_current_assets"];
      const current_assets =
      Number(cash) +
      Number(accounts_receivable) +
      Number(inventory) +
      Number(other_current_assets);
      const sale_purchase_of_fixed_asset =
      values["sale_purchase_of_fixed_asset"];
      const goodwill = values["goodwill"];
      const other_non_current_assets = values["other_non_current_assets"];
      const ta =
      current_assets +
      Number(sale_purchase_of_fixed_asset) +
      Number(goodwill) +
      Number(other_non_current_assets);   
      const total_assets = ta;
      const accounts_payable = values["accounts_payable"];
      const current_long_term_debt = values["current_long_term_debt"];
      const other_current_liabilities = values["other_current_liabilities"];
      const cl =
      Number(accounts_payable) +
      Number(current_long_term_debt) +
      Number(other_current_liabilities);
      const current_liabilities = cl;
      const long_term_debt = values["long_term_debt"];
      const other_long_term_liabilities = values["other_long_term_liabilities"];
      const tl = Number(long_term_debt) + Number(other_long_term_liabilities) + current_liabilities;
      const total_liabilities = tl;
      const total_equity = values["total_equity"];
      const total_liabilities_and_equity = total_liabilities + Number(total_equity);

      const income_statement_attachment = values["income_statement_attachment"];
      const sales = values["sales"];
      const cost_of_goods_sold = values["cost_of_goods_sold"];
      const gross_margin = Number(sales) - Number(cost_of_goods_sold);
      const depreciation_expenses = values["depreciation_expenses"];
      const operating_expenses = values["operating_expenses"];
      const operating_income =
      Number(gross_margin) -
      Number(depreciation_expenses) -
      Number(operating_expenses);
      const other_expenses = values["other_expenses"];
      const eb = 
      Number(operating_income) -
      Number(other_expenses);
      const ebit = eb;
      const interest_expenses = values["interest_expenses"];
      const ebt = ebit - Number(interest_expenses)
      const income_tax_expense = values["income_tax_expense"];
      const extraordinary_income = values["extraordinary_income"];
      const np = Number(ebt) - Number(income_tax_expense) - Number(extraordinary_income);
      const net_profit = np;
      const cash_flow_from_operating_activities = values["cash_flow_from_operating_activities"];
      const inventory_turnover = values["inventory_turnover"];
      const current_ratio = Number(current_assets) / Number(current_liabilities);
      const interest_coverage = Number(ebit) / Number(interest_expenses);

      await createFinancials({
        userId,
        sortkey,
        supplierId,
        buyerId,
        identityId,
        financialsId,
        financials_reporting_period,
        balance_sheet_attachment,
        income_statement_attachment,
        cash,
        accounts_receivable,
        inventory,
        goodwill,
        other_current_assets,
        current_assets,
        other_non_current_assets,
        sale_purchase_of_fixed_asset,
        total_assets,
        accounts_payable,
        other_current_liabilities,
        current_long_term_debt,
        current_liabilities,
        other_long_term_liabilities,
        long_term_debt,
        total_liabilities,
        total_equity,
        total_liabilities_and_equity,
        sales,
        cost_of_goods_sold,
        gross_margin,
        depreciation_expenses,
        operating_expenses,
        operating_income,
        interest_expenses,
        other_expenses,
        income_tax_expense,
        extraordinary_income,
        cash_flow_from_operating_activities,
        inventory_turnover,
        ebit,
        ebt,
        net_profit,
        current_ratio,
        interest_coverage
      });
    } catch (e) {
      onError(e);
    }
    actions.setSubmitting(false);
    setActiveStep(activeStep + 1);
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
    <Page className={classes.root} title="Add Financials">
      <Container maxWidth="lg">
        <React.Fragment>
          <Typography component="h1" variant="h4" align="center">
            Add Financials
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
  );
}
