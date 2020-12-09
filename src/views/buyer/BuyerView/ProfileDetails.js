import React from "react";
import "date-fns";
import PropTypes from "prop-types";
import { Container, makeStyles } from "@material-ui/core";

import CompanyForm from "./Forms/CompanyForm";
import CompanyUploads from "./Forms/CompanyUploads";

const useStyles = makeStyles(() => ({
  root: {},
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <CompanyForm />
      <br></br>
      <CompanyUploads />
    </Container>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
