import React from "react";
import "date-fns";
import { Container,   Card,
  CardContent } from "@mui/material";
  import clsx from "clsx";
  import makeStyles from "@mui/styles/makeStyles";

import BuyerForm from "./Forms/BuyerForm";
import BuyerUploads from "./Forms/BuyerUploads";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  }));

const Profile = (value) => {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.root)}>
    <CardContent>
      <BuyerForm value={value} />
      <br></br>
      <BuyerUploads value={value} />
      </CardContent>
    </Card>
  );
};

export default Profile;
