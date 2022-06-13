import React from "react";
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
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Page from "src/components/Page";
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
}));

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
                  <Link to={`/spv/bank/remittance`}>
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
                  <Link to={`/spv/bank/collection`}>
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
