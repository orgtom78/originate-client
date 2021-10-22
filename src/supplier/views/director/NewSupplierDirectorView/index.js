import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuid } from "uuid";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import { useUser } from "src/components/context/usercontext.js";

import Page from "src/components/Page";

import DirectorForm from "./Forms/DirectorForm";

import validationSchema from "./FormModel/validationSchema";
import NewSupplierDirectorFormModel from "./FormModel/NewSupplierDirectorFormModel";
import formInitialValues from "./FormModel/formInitialValues";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const { formId, formField } = NewSupplierDirectorFormModel;

export default function NewAccount() {
  const classes = useStyles();
  const navigate = useNavigate();
  const currentValidationSchema = validationSchema[0];
  const [sub, setSub] = useState("");

  const [suppliername, setSuppliername] = useState("");
  const context = useUser();
  const { id } = useParams();

  React.useEffect(() => {
    // attempt to fetch the info of the user that was already logged in
    async function onLoad() {
      const data = await context;
      const { sub, supplier_name } = data;
      setSub(sub);
      setSuppliername(supplier_name);
    }
    onLoad();
  }, [context]);

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    try {
      const userId = sub;
      const b = uuid();
      const supplierId = id;
      const directorId = "director-supplier" + b;
      const sortkey = directorId;
      const director_name = values["director_name"];
      const director_email = values["director_email"];
      const director_phone_number = values["director_phone_number"];
      const director_id_attachment = values["director_id_attachment"];
      const director_id_number = values["director_id_number"];
      const director_id_type = values["director_id_type"];
      const director_nationality = values["director_nationality"];
      const director_poa_attachment = values["director_poa_attachment"];
      const director_country_of_residence =
        values["director_country_of_residence"];
      const director_status = "Under Review";

      await createDirector({
        userId,
        sortkey,
        directorId,
        supplierId,
        director_name,
        director_email,
        director_phone_number,
        director_id_attachment,
        director_id_type,
        director_id_number,
        director_nationality,
        director_poa_attachment,
        director_country_of_residence,
        director_status,
      });
    } catch (e) {
      onError(e);
    }
  }

  function createDirector(input) {
    return API.graphql(
      graphqlOperation(mutations.createDirector, { input: input })
    );
  }

  function _handleSubmit(values, actions) {
    _submitForm(values, actions);
    navigate("/app/account");
  }

  return (
    <Page className={classes.root} title="Add director">
      <Container maxWidth="lg">
        <React.Fragment>
          <Typography component="h1" variant="h4" align="center">
            Add a director to {suppliername}
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
                  <DirectorForm formField={formField} />
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