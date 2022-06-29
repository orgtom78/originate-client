import React from "react";
import "date-fns";
import { Container } from "@mui/material";

import BrokerForm from "./Forms/BrokerForm";
import BrokerUploads from "./Forms/BrokerUploads";

const Profile = (value) => {
  return (
    <Container maxWidth="lg">
      <BrokerForm value={value} />
      <br></br>
      <BrokerUploads value={value} />
    </Container>
  );
};

export default Profile;
