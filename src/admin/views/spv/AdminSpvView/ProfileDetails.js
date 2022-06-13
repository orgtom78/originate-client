import React from "react";
import "date-fns";
import { Container } from "@mui/material";

import SpvForm from "./Forms/SpvForm";
import SpvUploads from "./Forms/SpvUploads";

const Profile = (value) => {
  return (
    <Container maxWidth="lg">
      <SpvForm value={value} />
      <br></br>
      <SpvUploads value={value} />
    </Container>
  );
};

export default Profile;
