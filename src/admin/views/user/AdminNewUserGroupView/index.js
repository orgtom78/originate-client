import React from "react";
import { Button, Container, makeStyles, Typography } from "@material-ui/core";
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
  AWS.config.update({
    region: 'us-east-2',
  });

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
      const group_type = values["group_type"];

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
  }

  console.log(awsconfig)
  console.log(awsconfig.aws_user_pools_id)

  async function getident(input) {
    let cognito = new AWS.CognitoIdentityServiceProvider();
    let request = {
      Username: input.email,
      UserPoolId: awsconfig.aws_user_pools_id,
    };
    let params = {
      GroupName: "Investor",
      Username: input.email,
      UserPoolId: awsconfig.aws_user_pools_id,
    };
    let confirm = await cognito.adminConfirmSignUp(request).promise();
    if (input.group_type === "Investor") {
      let group = await cognito.adminAddUserToGroup(params).promise();
      return group;
    }
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

      await createUserGroup({
        userId,
        sortkey,
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
    navigate("/admin/users");
  }

  return (
    <Page className={classes.root} title="Register a new User">
      <Container maxWidth="lg">
        <React.Fragment>
          <Typography component="h1" variant="h4" align="center">
            Add a New User and Group
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
