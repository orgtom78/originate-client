import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Container,
  makeStyles,
  Step,
  Stepper,
  StepLabel,
  Typography 
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuid } from 'uuid';
import { onError } from "src/libs/errorLib.js";
import * as mutations from 'src/graphql/mutations.js';
import { useUser } from "src/components/usercontext.js";
import NewSupplierView from 'src/views/supplier/NewSupplierView';

import Page from 'src/components/Page';

import BuyerAddressForm from './Forms/BuyerAddressForm';
import BuyerFinancialsForm from './Forms/BuyerFinancialsForm';
import BuyerHistoryForm from './Forms/BuyerHistoryForm';

import validationSchema from './FormModel/validationSchema';
import NewBuyerFormModel from './FormModel/NewBuyerFormModel';
import formInitialValues from './FormModel/formInitialValues';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const steps = ['Client Details', 'Client Financials', 'Client History'];
const { formId, formField } = NewBuyerFormModel;

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BuyerAddressForm  formField={formField}/>;
    case 1:
      return <BuyerFinancialsForm  formField={formField}/>;
    case 2:
      return <BuyerHistoryForm formField={formField}/>;
    default:
      throw new Error('Unknown step');
  }
}

export default function NewAccount() {
  const classes = useStyles();
  const navigate = useNavigate();
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
      const {
        sub,
        supplierId,
        identity,
      } = data;
      setSub(sub)
      setSupid(supplierId);
      setIdentityId(identity)
    }
    onLoad();
  }, [context]);


  function _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    try {
      const userId = sub;
      const n = uuid();
      const buyerId = 'buyer-'+n;
      const supplierId = supid;

      const buyer_address_city = values['buyer_address_city'];
      const buyer_address_number = values['buyer_address_number'];
      const buyer_address_postalcode = values['buyer_address_postalcode'];
      const buyer_address_street = values['buyer_address_street'];
      const buyer_name = values['buyer_name'];
      const buyer_country = values['buyer_country'];
      const buyer_website = values['buyer_website'];
      const buyer_currency = values['buyer_currency'];
      const buyer_loan_request_amount = values['buyer_loan_request_amount'];
      const buyer_payment_terms = values['buyer_payment_terms'];
      const buyer_sample_trading_docs_attachment = values['buyer_sales_contract_attachment'];
      const buyer_sold_goods_description = values['buyer_sold_goods_description'];

      const ebit = values['ebit'];
      const financials_attachment = values['financials_attachment'];
      const net_profit = values['net_profit'];
      const financials_rating = values['financials_rating'];
      const financials_reporting_period = values['financials_reporting_period'];
      const sales = values['sales'];
      const total_assets = values['total_assets'];
      const m = uuid();
      const financialsId  = 'financials-buyer'+m;
      const financials_status = 'Under Review';

      const buyer_insurance_name = values['buyer_insurance_name'];
      const buyer_one_off_ipu_attachment = values['buyer_one_off_ipu_attachment'];
      const buyer_next_year_projected_transaction_amount = values['buyer_next_year_projected_transaction_amount'];
      const buyer_previous_year_transaction_amount = values['buyer_previous_year_transaction_amount'];
      const buyer_reporting_year = values['buyer_reporting_year'];
      const buyer_reporting_year_transaction_amount = values['buyer_reporting_year_transaction_amount'];
      const buyer_previous_year_number_invoices = values['buyer_previous_year_number_invoices'];
      const buyer_status = 'Under Review'

      await createBuyer({
        userId,
        buyerId,
        supplierId,
        identityId,
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
        buyer_sold_goods_description,
        buyer_insurance_name,
        buyer_one_off_ipu_attachment,
        buyer_next_year_projected_transaction_amount,
        buyer_previous_year_transaction_amount,
        buyer_reporting_year,
        buyer_reporting_year_transaction_amount,
        buyer_previous_year_number_invoices,
        buyer_status
      });

      await createFinancials({
        userId,
        financialsId,
        identityId,
        buyerId,
        ebit,
        financials_attachment,
        net_profit,
        financials_rating,
        financials_reporting_period,
        sales,
        total_assets,
        financials_status
      }); 
    } catch (e) {
      onError(e);
    }
    actions.setSubmitting(false);
    setActiveStep(activeStep + 1);
  }

  function createBuyer(input) {
    return API.graphql(graphqlOperation(mutations.createBuyer,
      {input: input}
    ))
  };

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
    <React.Fragment>
    {supid ? (
    <Page
    className={classes.root}
    title="New Credit Limits"
  >
    <Container maxWidth="lg">
    <React.Fragment>
      <Typography component="h1" variant="h4" align="center">
        Get credit limits for your clients
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
          navigate('/app/buyers')
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
    ) : (
        <>
        <NewSupplierView />
        </>
      )}
      </React.Fragment>
    );
}