import React, { useState } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import { useUser } from "src/components/usercontext.js";
import NewSupplierView from 'src/views/supplier/NewSupplierView';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


const Account = (value) => {
  const classes = useStyles();
  
  const ident = value.value.userId;
  const key = value.value.supplierId


  //'https://www.gravatar.com/avatar/dcd44927-2efd-4fc0-b955-0c676d04f738?d=identicon'//


  return (
  <React.Fragment>
    <Page
      className={classes.root}
      title="Account"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Profile value={{ident, key}}/>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails value={value}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
    </React.Fragment>
  );
};

export default Account;
