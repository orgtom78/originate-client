import React from "react";
import "date-fns";
import { Container } from "@mui/material";

import BuyerForm from "./Forms/BuyerForm";
import BuyerUploads from "./Forms/BuyerUploads";

const Profile = (value) => {
  return (
    <Container maxWidth={false}>
      <BuyerForm value={value} />
      <br></br>
      <BuyerUploads value={value} />
    </Container>
  );
};

export default Profile;
