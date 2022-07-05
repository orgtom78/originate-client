import React from "react";
import "date-fns";
import { Container } from "@mui/material";

import BuyerForm from "./Forms/BuyerForm";
import BuyerUploads from "./Forms/BuyerUploads";

const Profile = (value) => {
  return (
    <Container maxWidth="lg">
      <BuyerForm />
      <br></br>
      <BuyerUploads />
    </Container>
  );
};

export default Profile;
