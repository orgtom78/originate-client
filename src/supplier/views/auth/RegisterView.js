import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { Auth } from "aws-amplify";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import Page from "src/components/Page";
import { onError } from "src/libs/errorLib";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

export default function RegisterView() {
  const classes = useStyles();
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const navigate = useNavigate();

  function renderForm() {
    return (
      <Page className={classes.root} title="Register">
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          <Container maxWidth="sm">
            <Formik
              initialValues={{
                email: "",
                password: "",
                confirmpassword: "",
                ConfirmationCode:"",
                policy: false,
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email("Must be a valid email")
                  .max(255)
                  .required("Email is required"),
                password: Yup.string()
                  .max(255)
                  .required("a password with a minimum length of 8 characters, lowercase, uppercase, and numbers is required"),
                confirmpassword: Yup.string().oneOf(
                  [Yup.ref("password"), null],
                  "Passwords must match"
                ),
                policy: Yup.boolean().oneOf(
                  [true],
                  "This field must be checked"
                ),
              })}
              onSubmit={async (values) => {
                setIsLoading(true);
                try {
                  const newUser = await Auth.signUp({
                    username: values.email,
                    password: values.password,
                  });
                  setIsLoading(false);
                  setNewUser(newUser);
                } catch (e) {
                  onError(e);
                  setIsLoading(false);
                }
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box mb={3}>
                    <Typography color="textPrimary" variant="h2">
                      Create new account
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      Use your email to create a new account
                    </Typography>
                  </Box>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(
                      touched.confirmpassword && errors.confirmpassword
                    )}
                    fullWidth
                    helperText={
                      touched.confirmpassword && errors.confirmpassword
                    }
                    label="Confirm Password"
                    margin="normal"
                    name="confirmpassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.confirmpassword}
                    variant="outlined"
                  />
                  <Box alignItems="center" display="flex" ml={-1}>
                    <Checkbox
                      checked={values.policy}
                      name="policy"
                      onChange={handleChange}
                    />
                    <Typography color="textSecondary" variant="body1">
                      I have read the{" "}
                        <a target="_blank" rel="noopener noreferrer" href="https://originatecapital.co/terms-and-conditions/">Terms and Conditions</a>
                    </Typography>
                  </Box>
                  {Boolean(touched.policy && errors.policy) && (
                    <FormHelperText error>{errors.policy}</FormHelperText>
                  )}
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign up now
                    </Button>
                  </Box>
                  <Typography color="textSecondary" variant="body1">
                    Have an account?{" "}
                    <Link component={RouterLink} to="/login" variant="h6">
                      Sign in
                    </Link>
                  </Typography>
                </form>
              )}
            </Formik>
          </Container>
        </Box>
      </Page>
    );
  }

  function renderConfirmationForm() {
    return (
      <Page className={classes.root} title="Confirm">
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          <Container maxWidth="sm">
            <Formik
              initialValues={{
                ConfirmationCode: "",
                policy: false,
              }}
              validationSchema={Yup.object().shape({
                ConfirmationCode: Yup.string()
                  .max(255)
                  .required("Please enter the Confirmation Code received via email"),
              })}
              onSubmit={async (values) => {
                setIsLoading(true);
                try {
                  await Auth.confirmSignUp(
                    values.email,
                    values.ConfirmationCode
                  );
                  await Auth.signIn(values.email, values.password);
                  userHasAuthenticated(true);
                  navigate("/");
                  window.location.reload();
                } catch (e) {
                  onError(e);
                  setIsLoading(false);
                }
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box mb={3}>
                    <Typography color="textPrimary" variant="h2">
                      Confirm your account
                    </Typography>
                  </Box>
                  <TextField
                  autoComplete="off"
                    error={Boolean(
                      touched.ConfirmationCode && errors.ConfirmationCode
                    )}
                    fullWidth
                    helperText={
                      touched.ConfirmationCode && errors.ConfirmationCode
                    }
                    label="Confirmation Code"
                    margin="normal"
                    name="ConfirmationCode"
                    id="confirmation_code"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.ConfirmationCode}
                    variant="outlined"
                  />
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Verify
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Container>
        </Box>
      </Page>
    );
  }

  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}
