import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { Auth } from "aws-amplify";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";

import Page from "src/components/Page";

import UserCredentialsForm from "./Forms/UserCredentialsForm";

import validationSchema from "./FormModel/validationSchema";
import NewSupplierFormModel from "./FormModel/NewUserFormModel";
import formInitialValues from "./FormModel/formInitialValues";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const { formId, formField } = NewSupplierFormModel;

export default function NewSupplier() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const currentValidationSchema = validationSchema[0];
  const [group, setGroup] = useState([]);
  const [groupId, setGroupId] = useState("");

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    loadUsergroup({ id });
  }, [id]);

  async function loadUsergroup(input) {
    const group = await API.graphql(
      graphqlOperation(queries.getUsergroup, input)
    );
    const items = group.data.getUsergroup;
    setGroup(items);
    setGroupId(items.groupId)
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    try {
      const email = values["email"];
      const password = values["password"];
      const confirmpassword = values["confirmpassword"];

      await createUser({
        email,
        password,
        confirmpassword,
      });
    } catch (e) {
      onError(e);
    }
  }

  async function createUser(input) {
    const user_name = input.email;
    try {
      let user = await Auth.signUp({
        username: input.email,
        password: input.password,
        attributes: {
          "custom:groupid": groupId,
        },
      });
      const test = user.userSub;
      const sortkey = groupId;
      const group_name = group.group_name;
      const userId = test;
      var sub = test;

      await createUserGroup({
        userId,
        sortkey,
        user_name,
        sub,
        groupId,
        group_name,
      });
    } catch (e) {
      onError(e);
    }
  }

  function createUserGroup(input) {
    return API.graphql(
      graphqlOperation(mutations.createUsergroup, { input: input })
    );
  }

  function _handleSubmit(values, actions) {
    _submitForm(values, actions);
    navigate("/broker/groups");
  }

  return (
    <Page className={classes.root} title="Register a new User">
      <Container maxWidth="lg">
        <React.Fragment>
          <Typography component="h1" variant="h4" align="center">
            Add a New User to {group.group_name}
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
                  <UserCredentialsForm formField={formField} />

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
