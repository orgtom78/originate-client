import React from "react";
import { Container, Grid } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import Page from "src/components/Page";
import Profile from "./Profile";
import ProfileDetails from "./ProfileDetails";
import { useParams } from "react-router-dom";

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
  const { id } = useParams();

  return (
    <React.Fragment>
      <Page className={classes.root} title="Account">
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <Profile value={id} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <ProfileDetails value={id} />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </React.Fragment>
  );
};

export default Buyer;
