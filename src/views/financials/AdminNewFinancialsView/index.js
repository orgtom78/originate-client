import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import {
  Button,
  Container,
  makeStyles,
  Typography,
  Step,
  Stepper,
  StepLabel,
  CircularProgress, 
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuid } from 'uuid';
import { onError } from "src/libs/errorLib.js";
import * as mutations from 'src/graphql/mutations.js';

import Page from 'src/components/Page';

import BalanceSheetForm from './Forms/BalanceSheetForm';
import IncomeStatementForm from './Forms/IncomeStatementForm';

import validationSchema from './FormModel/validationSchema';
import NewFinancialsFormModel from './FormModel/NewFinancialsFormModel';
import formInitialValues from './FormModel/formInitialValues';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

export default function NewFinancials() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const { buyId } = useParams();
  const { ident } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const steps = ['Balance Sheet', 'Income Statement'];
  const { formId, formField } = NewFinancialsFormModel;
  const financialsId = 'financials-'+uuid()+buyId;

  const isLastStep = activeStep === steps.length - 1;


function getStepContent(step) {
  switch (step) {
    case 0:
      return <BalanceSheetForm  formField={formField} value={financialsId}/>;
    case 1:
      return <IncomeStatementForm formField={formField} value={financialsId}/>;
    default:
      throw new Error('Unknown step');
  }
}

  function _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    try {
      const userId = id;
      const sortkey = financialsId;
      const identityId = ident;
      const supplierId = values['supplierId'];
      const buyerId = buyId;
      const working_capital = values['working_capital'];
      const cash = values['cash'];
      const financials_reporting_period = values['financials_reporting_period'];
      const financials_rating = values['financials_rating'];
      const net_profit = values['net_profit'];
      const tax_expenses = values['tax_expenses'];
      const extraordinary_income = values['extraordinary_income'];
      const sale_purchase_of_fixed_asset = values['sale_purchase_of_fixed_asset'];
      const depreciation_expenses = values['depreciation_expenses'];
      const interest_expenses = values['interest_expenses'];
      const ebit = values['ebit'];
      const bad_debt_expenses = values['bad_debt_expenses'];
      const marketing_expenses = values['marketing_expenses'];
      const operating_expenses = values['operating_expenses'];
      const cost_of_goods_sold = values['cost_of_goods_sold'];
      const sales = values['sales'];
      const equity_market_value = values['equity_market_value'];
      const equity_book_value = values['equity_book_value'];
      const total_equity = values['total_equity'];
      const retained_earnings = values['retained_earnings'];
      const paid_in_capital = values['paid_in_capital'];
      const preferred_stock = values['preferred_stock'];
      const common_stock = values['common_stock'];
      const total_liabilities = values['total_liabilities'];
      const dividends_payable = values['dividends_payable'];
      const income_tax_payable = values['income_tax_payable'];
      const other_long_term_liabilities = values['other_long_term_liabilities'];
      const other_current_liabilities = values['other_current_liabilities'];
      const long_term_debt = values['long_term_debt'];
      const unearned_revenue = values['unearned_revenue'];
      const accured_expenses = values['accured_expenses'];
      const accounts_payable = values['accounts_payable'];
      const short_term_debt = values['short_term_debt'];
      const total_assets = values['total_assets'];
      const accumulated_depreciation = values['accumulated_depreciation'];
      const other_non_current_assets = values['other_non_current_assets'];
      const other_current_assets = values['other_current_assets'];
      const goodwill = values['goodwill'];
      const inventory = values['inventory'];
      const accounts_receivable = values['accounts_receivable'];
      const marketable_securities = values['marketable_securities'];
      const income_statement_attachment = values['income_statement_attachment'];
      const balance_sheet_attachment = values['balance_sheet_attachment'];
      const financials_attachment = values['financials_attachment'];


      await createFinancials({
        userId,
        sortkey,
        supplierId,
        buyerId,
        identityId,
        financialsId,
        financials_attachment,
        balance_sheet_attachment,
        income_statement_attachment,
        marketable_securities,
        accounts_receivable,
        inventory,
        goodwill,
        other_current_assets,
        other_non_current_assets,
        accumulated_depreciation,
        total_assets,
        short_term_debt,
        accounts_payable,
        accured_expenses,
        unearned_revenue,
        long_term_debt,
        other_current_liabilities,
        other_long_term_liabilities,
        income_tax_payable,
        dividends_payable,
        total_liabilities,
        common_stock,
        preferred_stock,
        paid_in_capital,
        retained_earnings,
        total_equity,
        equity_book_value,
        equity_market_value,
        sales,
        cost_of_goods_sold,
        operating_expenses,
        marketing_expenses,
        bad_debt_expenses,
        ebit,
        interest_expenses,
        depreciation_expenses,
        sale_purchase_of_fixed_asset,
        extraordinary_income,
        tax_expenses,
        net_profit,
        financials_rating,
        financials_reporting_period,
        cash,
        working_capital,
      }); 
    } catch (e) {
      onError(e);
    }
    actions.setSubmitting(false);
    setActiveStep(activeStep + 1);
  }

  function createFinancials(input) {
    return API.graphql(graphqlOperation(mutations.createFinancials,
      {input: input}
    ))
  };

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
<Page
    className={classes.root}
    title="add Financials"
  >
    <Container maxWidth="lg">
    <React.Fragment>
      <Typography component="h1" variant="h4" align="center">
        Add Financials
      </Typography>
      <br></br>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {activeStep === steps.length ? (
          navigate('/admin/buyers')
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
                    <Button onClick={_handleBack} className={classes.button}>
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
                      {isLastStep ? 'Submit' : 'Next'}
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