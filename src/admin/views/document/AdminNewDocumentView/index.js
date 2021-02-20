import React from 'react';
import { useParams } from "react-router-dom";
import {
  Button,
  Container,
  makeStyles,
  Typography 
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuid } from 'uuid';
import { onError } from "src/libs/errorLib.js";
import * as mutations from 'src/graphql/mutations.js';

import Page from 'src/components/Page';

import DocumentForm from './Forms/DocumentForm';

import validationSchema from './FormModel/validationSchema';
import NewDocumentFormModel from './FormModel/NewDocumentFormModel';
import formInitialValues from './FormModel/formInitialValues';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const { formId, formField } = NewDocumentFormModel;

export default function NewAccount() {
  const classes = useStyles();
  const navigate = useNavigate();
  const currentValidationSchema = validationSchema[0];
  const { id } = useParams();
  const { buyId } = useParams();
  const { ident } = useParams();

  function _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    try {
      const userId = id;
      const identityId = ident;
      const buyerId = buyId;
      const documentId = 'document-buyer'+uuid()+buyId;
      const sortkey = documentId;
      const document_type = values['document_type'];
      const document_attachment = values['document_attachment'];


      await createDocument({
        userId,
        identityId,
        sortkey,
        documentId,
        buyerId,
        document_type,
        document_attachment
      }); 
    } catch (e) {
      onError(e);
    }
  }

  function createDocument(input) {
    return API.graphql(graphqlOperation(mutations.createDocument,
      {input: input}
    ))
  };


  function _handleSubmit(values, actions) {
      _submitForm(values, actions);
      navigate('/admin/buyers')
  }

  return (
    <Page
    className={classes.root}
    title="Add Document"
  >
    <Container maxWidth="lg">
    <React.Fragment>
      <Typography component="h1" variant="h4" align="center">
        Add a document 
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
                <DocumentForm formField={formField} value={ident} user={id} buyer={buyId} />
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