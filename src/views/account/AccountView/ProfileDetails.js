import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Container,
  makeStyles,
  Typography 
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import { Auth,  API, graphqlOperation } from "aws-amplify";
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

const { formId, formField } = NewAccountFormModel;

export default function NewAccount() {
  const classes = useStyles();
  const currentValidationSchema = validationSchema;


  function _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    try {
      let user = await Auth.currentAuthenticatedUser();
      const { attributes = {} } = user;
      const userId = attributes['sub'];
      const company_name = values['company_name'];
      const company_address_city = values['company_address_city'];
      const company_address_postalcode = values['company_address_postalcode'];
      const company_country = values['company_country'];
      const company_industry = values['company_industry'];
      const date_of_incorporation = values['date_of_incorporation'];

      await createCompany({
        userId,
        company_name,
        company_address_city,
        company_address_postalcode,
        company_country,
        company_industry,
        date_of_incorporation,
      }); 
    } catch (e) {
      onError(e);
    }
  }

  function createCompany(input) {
    return API.graphql(graphqlOperation(mutations.createCompany,
      {input: input}
    ))
  };

  function _handleSubmit(values, actions) {
      _submitForm(values, actions);
      console.log(values);
      console.log(actions)
  }
  console.log(_handleSubmit);

  return (
    <Container maxWidth="lg">
    <React.Fragment>
    <Accordion defaultExpanded={true}>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Company Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Formik
            initialValues={formInitialValues}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
              <Form id={formId}>
                <AddressForm  formField={formField}/>
              </Form>
          </Formik>
        </AccordionDetails>
        </Accordion>
        <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Company Shareholders</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Formik
            initialValues={formInitialValues}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
              <Form id={formId}>
                <ShareholderForm  formField={formField}/>
              </Form>
          </Formik>
        </AccordionDetails>
        </Accordion>
        <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Company Financials</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Formik
            initialValues={formInitialValues}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
              <Form id={formId}>
                <FinancialsForm  formField={formField}/>
              </Form>
          </Formik>
        </AccordionDetails>
        </Accordion>
      </React.Fragment>
    </Container>
  );
}