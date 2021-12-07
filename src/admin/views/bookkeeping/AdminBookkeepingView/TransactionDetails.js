import React from "react";
import "date-fns";
import { Container } from "@material-ui/core";

import TransactionForm from "./Forms/TransactionForm";

const Profile = (value) => {
  return (
    <Container maxWidth="lg">
      <TransactionForm value={value} />
    </Container>
  );
};

export default Profile;
