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
  Chip,
  Divider,
  Grid,
  Typography,
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Pagination } from "@mui/material";
import Page from "src/components/Page";
import Toolbar from "./Toolbar";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import { useUser } from "src/components/context/usercontext.js";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DollarIcon from "@mui/icons-material/LocalAtm";
import DollarAvailableIcon from "@mui/icons-material/AttachMoney";
import PaymentIcon from "@mui/icons-material/Payment";
import { green, orange } from "@mui/material/colors";
import NumberFormat from "react-number-format";

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

const BuyerList = () => {
  const classes = useStyles();
  const context = useUser();
  const sub = context.sub;
  const [buyerdata, setBuyerdata] = useState([]);

  useEffect(() => {
    async function loadUser() {
      const a = await sub;
      return a;
    }

    async function getBuyers() {
      const id = await loadUser();
      let filter = {
        userId: { contains: id },
      };
      const {
        data: {
          listBuyers: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listBuyers, { filter: filter })
      );
      const n = { data: { listBuyers: { items: itemsPage1, nextToken } } };
      const items = n.data.listBuyers.items;
      return items;
    }

    async function test() {
      const c = await getBuyers();
      setBuyerdata(c);
    }
    test();
  }, [sub]);

  function checkstatus(buyerdata) {
    if (buyerdata === "submitted") {
      return (
        <>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={orangeTheme}>
              <Chip label={buyerdata} color="primary" />
            </ThemeProvider>
          </StyledEngineProvider>
        </>
      );
    } else if (
      buyerdata === "Under Review" ||
      buyerdata === "Investor Offer Pending"
    ) {
      return (
        <>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={orangeTheme}>
              <Chip label={buyerdata} color="secondary" />
            </ThemeProvider>
          </StyledEngineProvider>
        </>
      );
    } else {
      return (
        <>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={greenTheme}>
              <Chip label={buyerdata} color="primary" />
            </ThemeProvider>
          </StyledEngineProvider>
        </>
      );
    }
  }

  function getLink(status, id) {
    if (status === "Approved") {
      return `/app/requestoptions/${id}`;
    } else {
      return <></>;
    }
  }

  return (
    <Page className={clsx(classes.root)} title="Approved Buyers">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid container spacing={3}>
            {buyerdata.map((buyerdata) => (
              <Grid item key={buyerdata.buyerId} lg={4} md={6} xs={12}>
                <Card>
                  <CardActionArea>
                    <Link to={getLink(buyerdata.buyer_status, buyerdata.id)}>
                      <CardContent>
                        <Box display="flex" justifyContent="center" mb={3}>
                          <Avatar
                            alt="Buyer"
                            src={buyerdata.buyer_sample_trading_docs_attachment}
                            variant="square"
                          />
                        </Box>
                        <Typography
                          align="center"
                          color="textPrimary"
                          gutterBottom
                          variant="h4"
                        >
                          {buyerdata.buyer_name}
                        </Typography>
                        <Typography
                          align="center"
                          color="textPrimary"
                          variant="body1"
                        >
                          {buyerdata.buyer_sold_goods_description}
                        </Typography>
                      </CardContent>
                      <Box flexGrow={1} />
                      <Divider />
                      <Box p={2}>
                        <Grid
                          container
                          justifyContent="space-between"
                          spacing={2}
                        >
                          <Grid className={classes.statsItem} item>
                            <AccessTimeIcon
                              className={classes.statsIcon}
                              color="action"
                            />
                            {checkstatus(buyerdata.buyer_status)}
                          </Grid>
                          <Grid className={classes.statsItem} item>
                            <DollarIcon
                              className={classes.statsIcon}
                              color="action"
                            />
                            <Typography
                              color="textSecondary"
                              display="inline"
                              variant="body2"
                            >
                              <NumberFormat
                                color="textPrimary"
                                variant="h3"
                                value={buyerdata.buyer_loan_request_amount}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                              />
                              <br></br>Requested Limit
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box flexGrow={1} />
                      <Divider />
                      <Box p={2}>
                        <Grid
                          container
                          justifyContent="space-between"
                          spacing={2}
                        >
                          <Grid className={classes.statsItem} item>
                            <DollarAvailableIcon
                              className={classes.statsIcon}
                              color="action"
                            />
                            <Typography
                              color="textSecondary"
                              display="inline"
                              variant="body2"
                            >
                              <NumberFormat
                                color="textPrimary"
                                variant="h3"
                                value={buyerdata.buyer_loan_approved_amount}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                              />
                              <br></br>Approved Limit
                            </Typography>
                          </Grid>
                          <Grid className={classes.statsItem} item>
                            <PaymentIcon
                              className={classes.statsIcon}
                              color="action"
                            />
                            <Typography
                              color="textSecondary"
                              display="inline"
                              variant="body2"
                            >
                              {buyerdata.buyer_loan_discount_fee} Discount (pa)
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Link>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination color="primary" count={1} size="small" />
        </Box>
      </Container>
    </Page>
  );
};

export default BuyerList;
