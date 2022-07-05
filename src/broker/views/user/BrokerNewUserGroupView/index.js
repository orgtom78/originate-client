import React from "react";
import { Button, Container, Link, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { Auth } from "aws-amplify";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuid } from "uuid";

import Page from "src/components/Page";

import UserCredentialsForm from "./Forms/UserCredentialsForm";

import validationSchema from "./FormModel/validationSchema";
import NewUserGroupFormModel from "./FormModel/NewUserGroupFormModel";
import formInitialValues from "./FormModel/formInitialValues";
import awsconfig from "src/aws-exports.js";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const { formId, formField } = NewUserGroupFormModel;

export default function NewUserGroup() {
  const classes = useStyles();
  const navigate = useNavigate();
  const currentValidationSchema = validationSchema[0];
  const AWS = require("aws-sdk");
  AWS.config = new AWS.Config();
  AWS.config.accessKeyId = awsconfig.accessKeyId;
  AWS.config.secretAccessKey = awsconfig.secretAccessKey;
  AWS.config.region = "us-east-2";

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const groupId = uuid() + "-group";

  async function _submitForm(values, actions) {
    await _sleep(1000);
    try {
      const email = values["email"];
      const password = values["password"];
      const confirmpassword = values["confirmpassword"];
      const group_name = values["group_name"];
      const group_type = "Supplier";

      await createUser({
        email,
        password,
        confirmpassword,
        group_name,
        group_type,
      });

      await getident({
        email,
        group_type,
      });
    } catch (e) {
      onError(e);
    }
    navigate("/broker/groups");
  }

  async function getident(input) {
    let cognito = new AWS.CognitoIdentityServiceProvider();
    let request = {
      Username: input.email,
      UserPoolId: awsconfig.aws_user_pools_id,
    };
    let confirm = await cognito.adminConfirmSignUp(request).promise();
    console.log(confirm);
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
      const sub = user.userSub;
      const sortkey = groupId;
      const group_name = input.group_name;
      const group_type = input.group_type;
      const userId = sub;
      let identity = await Auth.currentUserCredentials();
      let usercred = await Auth.currentAuthenticatedUser();
      const identityId = identity.identityId;
      const brokerId = usercred.attributes["custom:groupid"];

      await createUserGroup({
        userId,
        sortkey,
        brokerId,
        identityId,
        user_name,
        sub,
        groupId,
        group_name,
        group_type,
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
  }

  return (
    <Page className={classes.root} title="Register a new User">
      <Container maxWidth="lg">
        <React.Fragment>
          <Typography component="h1" variant="h4" align="center">
            Add a New User
          </Typography>
          <Typography component="h1" variant="body1" align="center">
            Your client, the Supplier, will be able to login and manage its
            profile, limits and upload invoices themselves with you as the
            introducing broker. Please share the login credentials afterwards
            with your client. They can login here:{" "}
            <Link href="https://app.originate.capital/">
              https://app.originate.capital/
            </Link>{" "}
            and should change their password after the first login.
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
