import React from "react";
import "date-fns";
import { Container } from "@material-ui/core";

import SupplierForm from "./Forms/SupplierForm";
import SupplierUploads from "./Forms/SupplierUploads";

const Profile = (value) => {
  return (
    <Container maxWidth="lg">
      <SupplierForm value={value} />
      <br></br>
      <SupplierUploads value={value} />
    </Container>
  );
};

export default Profile;
