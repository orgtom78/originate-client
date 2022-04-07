import React from "react";
import Page from "src/components/Page";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  header: {
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const SuccessView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Settings">
      <Container maxWidth="lg">
        <Card>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            textAlign="right"
            p={2}
            m={2}
          >
            <Avatar alt="Alias" className={classes.avatar}>
              <CheckBoxIcon />
            </Avatar>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              p={2}
              m={2}
            >
              <Typography variant="h2">
                {" "}
                Your company has been successfully created
              </Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" p={2}>
            <Typography variant="h5"> Next steps </Typography>
          </Box>
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid container item xs justifyContent="flex-end">
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  p={2}
                >
                  <Typography variant="h5">
                    1. Register your buyer's company
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  p={2}
                >
                  <Link to={`/app/newbuyer`}>
                    <Button variant="outlined" color="primary">
                      {" "}
                      Add Buyer
                    </Button>
                  </Link>
                </Box>
              </Grid>
              <Grid container item xs justifyContent="flex-end">
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  p={2}
                >
                  <Typography variant="h5">
                    2. Create a Credit Limit Request
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  p={2}
                >
                  <Link to={`/app/buyers`}>
                    <Button variant="outlined" color="primary">
                      {" "}
                      Make A Request
                    </Button>
                  </Link>
                </Box>
              </Grid>
              <Grid container item xs justifyContent="flex-end">
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  p={2}
                >
                  <Typography variant="h5">
                    3. Create a Payout Request for your Buyer
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  p={2}
                >
                  <Link to={`/app/buyers`}>
                    <Button variant="outlined" color="primary">
                      {" "}
                      Request Payouts
                    </Button>
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default SuccessView;
