import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
import ProfileDetails from "./ProfileDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Buyer = (value) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Page className={classes.root} title="Buyer">
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={12} md={6} xs={12}>
              <ProfileDetails value={value} />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </React.Fragment>
  );
};

export default Buyer;
