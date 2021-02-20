import React, { useState } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
import Profile from "./Profile";
import ProfileDetails from "./ProfileDetails";
import { useUser } from "src/components/context/usercontext.js";
import NewSupplierView from "src/supplier/views/account/NewSupplierView";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Account = () => {
  const classes = useStyles();
  const [supplierId, setSupplierId] = useState("");
  const context = useUser();

  React.useEffect(() => {
    // attempt to fetch the info of the user that was already logged in
    async function onLoad() {
      const data = await context;
      const { supplierId } = data;
      setSupplierId(supplierId);
    }
    onLoad();
  }, [context]);

  const id = supplierId;
  if (id) {
    return (
      <React.Fragment>
        <Page className={classes.root} title="Account">
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} xs={12}>
                <Profile />
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                <ProfileDetails />
              </Grid>
            </Grid>
          </Container>
        </Page>
      </React.Fragment>
    );
  } else {
    return <NewSupplierView />;
  }
};

export default Account;
