import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  Avatar,
  Box,
  Container,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  createTheme,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Pagination } from "@mui/material";
import Page from "src/components/Page";
import { green, orange } from "@mui/material/colors";
import { ArrowUp as ArrowUpIcon } from "react-feather";
import { ArrowDown as ArrowDownIcon } from "react-feather";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
  },
  productCard: {
    height: "100%",
  },
  statsItem: {
    alignItems: "center",
    display: "flex",
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },
  palette: {
    alternative: orange,
  },
}));

const greenTheme = createTheme({
  palette: { primary: { main: green[500] }, secondary: { main: green[200] } },
});
const orangeTheme = createTheme({
  palette: { primary: { main: orange[500] }, secondary: { main: orange[200] } },
});

const Banks = () => {
  const classes = useStyles();

  return (
    <Page className={clsx(classes.root)} title="Bank Accounts">
      <Container maxWidth={false}>
        <Box mt={3}>
          <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item spacing={3} xs={6}>
              <Card>
                <CardActionArea>
                  <Link to={`/investor/bank/remittance`}>
                    <CardContent>
                      <Box display="flex" justifyContent="center" mb={3}>
                        <Avatar alt="remittance" variant="square">
                          <ArrowUpIcon />
                        </Avatar>
                      </Box>
                      <Typography
                        align="center"
                        color="textPrimary"
                        gutterBottom
                        variant="h4"
                      >
                        {"Remittance Account"}
                      </Typography>
                      <Typography
                        align="center"
                        color="textPrimary"
                        variant="body1"
                      >
                        {""}
                      </Typography>
                    </CardContent>
                    <Box flexGrow={1} />
                  </Link>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item spacing={3} xs={6}>
              <Card>
                <CardActionArea>
                  <Link to={`/investor/bank/collection`}>
                    <CardContent>
                      <Box display="flex" justifyContent="center" mb={3}>
                        <Avatar alt="collectionn" variant="square">
                          <ArrowDownIcon />
                        </Avatar>
                      </Box>
                      <Typography
                        align="center"
                        color="textPrimary"
                        gutterBottom
                        variant="h4"
                      >
                        {"Collection Account"}
                      </Typography>
                      <Typography
                        align="center"
                        color="textPrimary"
                        variant="body1"
                      >
                        {""}
                      </Typography>
                    </CardContent>
                    <Box flexGrow={1} />
                  </Link>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default Banks;
