import React from "react";
import "date-fns";
import { Container } from "@material-ui/core";

import InvestorForm from "./Forms/InvestorForm";
import InvestorUploads from "./Forms/InvestorUploads";

const Profile = (value) => {
  return (
    <Container maxWidth="lg">
      <InvestorForm value={value} />
      <br></br>
      <InvestorUploads value={value} />
    </Container>
  );
};

export default Profile;
