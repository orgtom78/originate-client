import React from "react";
import { Container, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Page from "src/components/Page";
import { useParams } from "react-router-dom";
import GroupForm from "./Forms/GroupForm";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const User = () => {
  const classes = useStyles();
  const { id } = useParams();

  return (
    <React.Fragment>
      <Page className={classes.root} title="Buyer">
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={12} md={6} xs={12}>
              <GroupForm groupvalue={id} />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </React.Fragment>
  );
};

export default User;
