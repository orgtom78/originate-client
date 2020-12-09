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
  makeStyles,
  Typography,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core";

import { Pagination } from "@material-ui/lab";
import Page from "src/components/Page";
import Toolbar from "./Toolbar";
import ProductCard from "./ProductCard";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import { useUser } from "src/components/usercontext.js";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import GetAppIcon from "@material-ui/icons/GetApp";
import DollarIcon from "@material-ui/icons/LocalAtm";
import DollarAvailableIcon from "@material-ui/icons/AttachMoney";
import PaymentIcon from "@material-ui/icons/Payment";
import { Percent as PercentIcon } from "react-feather";
import { green, orange } from "@material-ui/core/colors";

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

const greenTheme = createMuiTheme({
  palette: { primary: { main: green[500] }, secondary: { main: green[200] } },
});
const orangeTheme = createMuiTheme({
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
      let filter = { userId: { eq: id }, sortkey: { contains: "buyer-" } };
      const {
        data: {
          listsBuyer: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listsBuyer, { filter: filter })
      );
      const n = { data: { listsBuyer: { items: itemsPage1, nextToken } } };
      const items = n.data.listsBuyer.items;
      return items;
    }

    async function test() {
      const c = await getBuyers();
      setBuyerdata(c);
    }
    test();
  }, [sub]);

  /* for (const {
    buyerId: id,
    buyer_loan_amount: amount,
    buyer_payment_terms: terms,
    buyer_address_city: city,
    buyer_address_number: number,
    buyer_address_postalcode: zipcode,
    buyer_address_street: street,
    buyer_name: name,
    buyer_country: country,
    buyer_website: website,
    buyer_currency: curr,
    buyer_sales_contract_attachment: contract,
    buyer_insurance_name: insurance,
    buyer_next_year_projected_transaction_amount: nyear,
    buyer_previous_year_transaction_amount: pyear,
    buyer_reporting_year: ryear,
    buyer_reporting_year_transaction_amount: ryearamount,
    buyer_sold_goods_description: description,
    buyer_insurance_name: insurer,
    buyer_insurance_rating: insurer_rating,
    buyer_one_off_ipu_attachment: ipu,
    buyer_loan_rate: discount,
    buyer_status: status,
  } of buyerdata) {
    console.log("ID: " + id + ", City: " + city, "Name: " + name);
  }

    const handler = useCallback(() => {
    if (!buyerdata || !buyerdata.length) {
      console.log("test");
    } else {
      const d = buyerdata;
      return d;
    }
    console.log(handler);
  }, [buyerdata]);

  console.log(buyerdata);


  */

  const t = buyerdata.map((clients) => clients);

  function checkstatus(buyerdata) {
    if (buyerdata === "submitted") {
      return (
        <>
          <MuiThemeProvider theme={orangeTheme}>
            <Chip label={buyerdata} color="primary" />
          </MuiThemeProvider>
        </>
      );
    } else if (buyerdata === "under review") {
      return (
        <>
          <MuiThemeProvider theme={orangeTheme}>
            <Chip label={buyerdata} color="secondary" />
          </MuiThemeProvider>
        </>
      );
    } else {
      return (
        <>
          <MuiThemeProvider theme={greenTheme}>
            <Chip label={buyerdata} color="primary" />
          </MuiThemeProvider>
        </>
      );
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
                    <Link to={`/app/newtransaction/${buyerdata.buyerId}`}>
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
                        <Grid container justify="space-between" spacing={2}>
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
                              {buyerdata.buyer_loan_amount} Requested Limit
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box flexGrow={1} />
                      <Divider />
                      <Box p={2}>
                        <Grid container justify="space-between" spacing={2}>
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
                              Approved Limit
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
