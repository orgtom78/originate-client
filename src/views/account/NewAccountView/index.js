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
import { Auth,  API, graphqlOperation } from "aws-amplify";
import { v4 as uuid } from 'uuid';
import { onError } from "src/libs/errorLib.js";
import * as mutations from 'src/graphql/mutations.js';

import Page from 'src/components/Page';

import AddressForm from './Forms/AddressForm';
import ShareholderForm from './Forms/ShareholderForm';
import FinancialsForm from './Forms/FinancialsForm';

import validationSchema from './FormModel/validationSchema';
import NewAccountFormModel from './FormModel/NewAccountFormModel';
import formInitialValues from './FormModel/formInitialValues';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const steps = ['Company details', 'Shareholder details', 'Financial details'];
const { formId, formField } = NewAccountFormModel;

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm  formField={formField}/>;
    case 1:
      return <ShareholderForm formField={formField}/>;
    case 2:
      return <FinancialsForm  formField={formField}/>;
    default:
      throw new Error('Unknown step');
  }
}

export default function NewAccount() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];

  const isLastStep = activeStep === steps.length - 1;

  function _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    alert(JSON.stringify(values, null, 2));
    try {
      let user = await Auth.currentAuthenticatedUser();
      const { attributes = {} } = user;
      const userId = attributes['sub'];
      console.log(userId);
      const companyId = uuid();
      const company_name = values['company_name'];
      const company_address_city = values['company_address_city'];
      const company_address_postalcode = values['company_address_postalcode'];
      const company_country = values['company_country'];
      const company_industry = values['company_industry'];
      const date_of_incorporation = values['date_of_incorporation'];
      const registration_cert_attachment = values['registration_cert_attachment'];

      await createCompany({
        userId,
        companyId,
        company_name,
        company_address_city,
        company_address_postalcode,
        company_country,
        company_industry,
        date_of_incorporation,
        registration_cert_attachment
      }); 
    } catch (e) {
      onError(e);
    }

    actions.setSubmitting(false);
    setActiveStep(activeStep + 1);
  }

  function createCompany(input) {
    return API.graphql(graphqlOperation(mutations.createCompany,
      {input: input}
    ))
  };

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
      console.log(values);
      console.log(actions)
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  console.log(_handleSubmit);

  return (
    <Page
    className={classes.root}
    title="NewAccount"
  >
    <Container maxWidth="lg">
    <React.Fragment>
      <Typography component="h1" variant="h4" align="center">
        Register your company
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
          navigate('/app/account')
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