import React, { useState } from 'react';
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
import * as queries from "src/graphql/queries.js";

import Page from 'src/components/Page';

import UboForm from './Forms/UboForm';

import validationSchema from './FormModel/validationSchema';
import NewSupplierUboFormModel from './FormModel/NewSupplierUboFormModel';
import formInitialValues from './FormModel/formInitialValues';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const { formId, formField } = NewSupplierUboFormModel;

export default function NewAccount() {
  const classes = useStyles();
  const navigate = useNavigate();
  const currentValidationSchema = validationSchema[0];
  const [identityId, setIdentityId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [suppliername, setSuppliername] = useState("");
  const { id } = useParams();


  React.useEffect(() => {
    // attempt to fetch the info of the user that was already logged in
    async function onLoad() {
      getSupplier(id)
    }onLoad();
  }, [id]);

  async function getSupplier(input) {
    try {
      let filter = { userId: { eq: input }, sortkey: { contains: "supplier-", notContains: "-supplier" }};
      const {data:{listsSupplier:{items:[itemsPage1], nextToken } } } = await API.graphql(graphqlOperation(queries.listsSupplier, { filter: filter }));
      const n = {data:{listsSupplier:{items:[itemsPage1], nextToken } } };
      const suppliers = await n.data.listsSupplier.items[0]
      const {
            identityId,
            supplierId,
            supplier_name,
      } = suppliers;
      setIdentityId(identityId);
      setSupplierId(supplierId);
      setSuppliername(supplier_name)

    } catch (err) {
    console.log("error fetching data..", err);
    }
}

  function _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    try {
      const userId = id;
      const b = uuid();
      const uboId = 'ubo-supplier'+b;
      const sortkey = uboId;
      const ubo_name = values['ubo_name'];
      const ubo_email = values['ubo_email'];
      const ubo_phone_number = values['ubo_phone_number'];
      const ubo_id_attachment = values['ubo_id_attachment'];
      const ubo_id_number = values['ubo_id_number'];
      const ubo_id_type = values['ubo_id_type'];
      const ubo_nationality = values['ubo_nationality'];
      const ubo_poa_attachment = values['ubo_poa_attachment'];
      const ubo_country_of_residence = values['ubo_country_of_residence'];
      const ubo_status = 'Under Review';

      await createUbo({
        userId,
        sortkey,
        uboId,
        supplierId,
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
    } catch (e) {
      onError(e);
    }
  }

  function createUbo(input) {
    return API.graphql(graphqlOperation(mutations.createUbo,
      {input: input}
    ))
  };


  function _handleSubmit(values, actions) {
      _submitForm(values, actions);
      navigate('/admin/suppliers')
  }

  return (
    <Page
    className={classes.root}
    title="Add ubo"
  >
    <Container maxWidth="lg">
    <React.Fragment>
      <Typography component="h1" variant="h4" align="center">
        Add an owner to {suppliername}
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
                <UboForm  formField={formField} value={identityId}/>
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