import React from "react";
import "date-fns";
import { Container } from "@material-ui/core";

import TransactionForm from "./Forms/TransactionForm";
import TransactionUploads from "./Forms/TransactionUploads";



const Profile = (value) => {
  return (
    <Container maxWidth="lg">
      <TransactionForm />
      <br></br>
      <TransactionUploads />
    </Container>
  );
};

export default Profile;
