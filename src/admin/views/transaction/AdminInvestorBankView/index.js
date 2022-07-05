import React, { useState, useEffect } from "react";
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
  createTheme,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Pagination } from "@mui/material";
import Page from "src/components/Page";
import { green, orange } from "@mui/material/colors";
import { ArrowUp as ArrowUpIcon } from "react-feather";
import { ArrowDown as ArrowDownIcon } from "react-feather";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";

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
  const { id } = useParams();
  const [collection, setCollection] = useState("");
  const [remittance, setRemittance] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    async function getBankaccounts() {
      try {
        let filter = {
          id: { eq: id},
        };
        const data = await API.graphql(
          graphqlOperation(queries.listPlaidauths, { filter: filter })
        );
        const {
          data: {
            listPlaidauths: { items: itemsPage1, nextToken },
          },
        } = data;
        const { account_id1: account1, account_id2: account2 } = itemsPage1[0];
        setLoading(true);
        if (data) {
          setRemittance(account1);
          setCollection(account2);
          setSuccess(true);
          setDisabled(true);
          setLoading(false);
        } else {
          setSuccess(false);
          setDisabled(false);
          setLoading(false);
        }
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    getBankaccounts();
  }, [id]);

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
                  <Link to={`/admin/transaction/account/${remittance}/`}>
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
                  <Link to={`/admin/transaction/account/${collection}/`}>
                    <CardContent>
                      <Box display="flex" justifyContent="center" mb={3}>
                        <Avatar alt="collection" variant="square">
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
