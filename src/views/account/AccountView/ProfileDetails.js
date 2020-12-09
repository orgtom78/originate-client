import React from "react";
import "date-fns";
import PropTypes from "prop-types";
import { Container, makeStyles } from "@material-ui/core";

import SupplierForm from "./Forms/SupplierForm";
import SupplierUploads from "./Forms/SupplierUploads2";

const useStyles = makeStyles(() => ({
  root: {},
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <SupplierForm />
      <br></br>
      <SupplierUploads />
    </Container>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
