import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles,
} from "@material-ui/core";
import LoaderButton from "src/components/LoaderButton.js";

const useStyles = makeStyles({
  root: {},
});

const Password = ({ className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    password: "",
    confirm: "",
  });
  const [isChanging, setIsChanging] = useState(false);

  const handleChange = async (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  async function updatepw() {
    setIsChanging(true);
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(
        currentUser,
        values.oldpassword,
        values.password
      );
    } catch (e) {
      alert(e.message);
    }
    setIsChanging(false);
    navigate("/app/account");
  }

  return (
    <form className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="oldpassword"
            onChange={handleChange}
            type="password"
            value={values.oldpassword}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="New password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirmpassword}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <LoaderButton
            color="primary"
            variant="contained"
            disabled={isChanging}
            loading={isChanging}
            onClick={updatepw}
          >
            Update
          </LoaderButton>
        </Box>
      </Card>
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string,
};

export default Password;
