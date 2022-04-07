import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuid } from 'uuid';
import { onError } from "src/libs/errorLib.js";
import * as mutations from 'src/graphql/mutations.js';
import * as queries from "src/graphql/queries.js";

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
  const [identityId, setIdentityId] = useState("");
  const [userId, setUserId] = useState("");
  const [buyerId, setBuyerId] = useState("");
  const [buyername, setBuyername] = useState("");
  const { id } = useParams();

  React.useEffect(() => {
    // attempt to fetch the info of the user that was already logged in
    async function onLoad() {
      getBuyer({ id });
    }
    onLoad();
  }, [id]);

  function _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function getBuyer(input) {
    try {
      const buyer = await API.graphql(
        graphqlOperation(queries.getBuyer, input)
      );
      const {
        data: {
          getBuyer: {
            buyerId,
            userId,
            identityId,
            buyer_name,
          },
        },
      } = buyer;
      setUserId(userId);
      setIdentityId(identityId);
      setBuyerId(buyerId);
      setBuyername(buyer_name);
    } catch (err) {
      console.log("error fetching data..", err);
    }
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    try {
      const documentId = 'document-buyer'+uuid()+buyerId;
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
      navigate(`/admin/buyer/${id}`)
  }

  return (
    <Page
    className={classes.root}
    title="Add Document"
  >
    <Container maxWidth="lg">
    <React.Fragment>
      <Typography component="h1" variant="h4" align="center">
        Add a document to {buyername}
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
                <DocumentForm formField={formField} value={identityId} user={userId} buyer={buyerId} />
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