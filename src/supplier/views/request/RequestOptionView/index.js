import React from "react";
import { Link, useParams } from "react-router-dom";
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
import { Clipboard as ClipBoardIcon } from "react-feather";
import { AtSign as AtSignIcon } from "react-feather";

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

const Invoice = () => {
  const classes = useStyles();
  const { id } = useParams();

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
                  <Link to={`/app/newrequest/${id}/`}>
                    <CardContent>
                      <Box display="flex" justifyContent="center" mb={3}>
                        <Avatar alt="remittance" variant="square">
                          <ClipBoardIcon />
                        </Avatar>
                      </Box>
                      <Typography
                        align="center"
                        color="textPrimary"
                        gutterBottom
                        variant="h4"
                      >
                        {"Manual New Invoice"}
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
                  <Link to={``}>
                    <CardContent>
                      <Box display="flex" justifyContent="center" mb={3}>
                        <Avatar alt="collection" variant="square">
                          <AtSignIcon />
                        </Avatar>
                      </Box>
                      <Typography
                        align="center"
                        color="textPrimary"
                        gutterBottom
                        variant="h4"
                      >
                        {"E-Signature New Invoice"}
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

export default Invoice;
