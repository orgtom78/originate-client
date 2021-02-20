import React from "react";
import "date-fns";
import { Container } from "@material-ui/core";

import SupplierForm from "./Forms/SupplierForm";
import SupplierUploads from "./Forms/SupplierUploads";

const Profile = () => {
  return (
    <Container maxWidth="lg">
      <SupplierForm />
      <br></br>
      <SupplierUploads />
    </Container>
  );
};

export default Profile;
