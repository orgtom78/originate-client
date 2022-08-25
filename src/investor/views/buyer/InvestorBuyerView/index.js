import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";

import Page from "src/components/Page";
import AccountDebtor from "./AccountDebtor";
import ApprovalStatus from "./ApprovalStatus";
import KeyFinancials from "./KeyFinancials";
import FinancialRatios from "./FinancialRatios";
import FinancialOverview from "./FinancialOverview";
import FinancialOverviewCsv from "./FinancialOverviewCsv";
import FinancialsListView from "src/investor/views/buyer/InvestorBuyerView/Lists/financialslist.js";
import BuyerUploadView from "src/investor/views/buyer/InvestorBuyerView/Forms/BuyerUploads.js";
import DirectorView from "src/investor/views/buyer/InvestorBuyerView/Lists/directorlist.js";
import OwnerView from "src/investor/views/buyer/InvestorBuyerView/Lists/ubolist.js";
import History from "src/investor/views/buyer/InvestorBuyerView/History.js";
import AssetRisk from "src/investor/views/buyer/InvestorBuyerView/AssetRisk.js";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Buyer = () => {
  const classes = useStyles();
  const { id } = useParams();

  const [item, setItem] = useState("");
  const [fin, setFin] = useState([]);

  const [userId, setUserId] = useState("");
  const [buyerId, setBuyerId] = useState("");
  const [investorId, setInvestorId] = useState("");
  const [identityId, setIdentityId] = useState("");
  const [buyer_status, setBuyer_status] = useState("");
  const [buyer_logo, setBuyer_logo] = useState("");
  const [buyer_name, setBuyer_name] = useState("");
  const [buyer_type, setBuyer_type] = useState("");
  const [buyer_date_of_incorporation, setBuyer_date_of_incorporation] =
    useState("");
  const [buyer_address_city, setBuyer_address_city] = useState("");
  const [buyer_address_street, setBuyer_address_street] = useState("");
  const [buyer_address_postalcode, setBuyer_address_postalcode] = useState("");
  const [buyer_country, setBuyer_country] = useState("");
  const [buyer_industry, setBuyer_industry] = useState("");
  const [
    buyer_registration_cert_attachment,
    setBuyer_registration_cert_attachment,
  ] = useState("");
  const [buyer_website, setBuyer_website] = useState("");
  const [buyer_address_refinment, setBuyer_address_refinment] = useState("");
  const [buyer_industry_code, setBuyer_industry_code] = useState("");
  const [buyer_register_number, setBuyer_register_number] = useState("");
  const [buyer_trading_name, setBuyer_trading_name] = useState("");

  useEffect(() => {
    async function getBuyer(input) {
      try {
        const buyer = await API.graphql(
          graphqlOperation(queries.getBuyer, input)
        );
        const {
          data: {
            getBuyer: {
              userId,
              buyerId,
              investorId,
              identityId,
              buyer_status,
              buyer_logo,
              buyer_name,
              buyer_type,
              buyer_date_of_incorporation,
              buyer_address_city,
              buyer_address_street,
              buyer_address_postalcode,
              buyer_country,
              buyer_industry,
              buyer_registration_cert_attachment,
              buyer_website,
              buyer_address_refinment,
              buyer_industry_code,
              buyer_register_number,
              buyer_trading_name,
            },
          },
        } = buyer;
        setItem(buyer);
        setUserId(userId);
        setBuyerId(buyerId);
        setInvestorId(investorId);
        setIdentityId(identityId);
        setBuyer_status(buyer_status);
        setBuyer_logo(buyer_logo);
        setBuyer_name(buyer_name);
        setBuyer_date_of_incorporation(buyer_date_of_incorporation);
        setBuyer_type(buyer_type);
        setBuyer_address_city(buyer_address_city);
        setBuyer_address_street(buyer_address_street);
        setBuyer_address_postalcode(buyer_address_postalcode);
        setBuyer_country(buyer_country);
        setBuyer_industry(buyer_industry);
        setBuyer_registration_cert_attachment(
          buyer_registration_cert_attachment
        );
        setBuyer_website(buyer_website);
        setBuyer_address_refinment(buyer_address_refinment);
        setBuyer_industry_code(buyer_industry_code);
        setBuyer_register_number(buyer_register_number);
        setBuyer_trading_name(buyer_trading_name);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    getBuyer({ id });
  }, [id]);

  useEffect(() => {
    async function getFinancials() {
      const id = await buyerId;
      let filter = {
        buyerId: { eq: id },
      };
      const {
        data: {
          listFinancialss: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listFinancialss, { filter: filter })
      );
      const n = { data: { listFinancialss: { items: itemsPage1, nextToken } } };
      const items = await n.data.listFinancialss.items;
      if (items.length > 0) {
        setFin(items);
      } else {
        setFin([]);
      }
      return items;
    }
    getFinancials();
  }, [buyerId]);

  return (
    <React.Fragment>
      <Page className={classes.root} title="Buyer">
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={6} sm={6} xl={6} xs={12}>
              <AccountDebtor value={item} />
            </Grid>
            <Grid item lg={6} sm={6} xl={6} xs={12}>
              <ApprovalStatus value={item} />
            </Grid>
          </Grid>
          <br></br>
          <br></br>
          <Grid container spacing={1}>
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <AssetRisk value={fin} data={item} />
            </Grid>
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <Accordion>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    Company Financial Overview
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FinancialOverviewCsv value={fin} />
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <Accordion>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    Company Financial Statements
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Card maxWidth={false}>
                    <CardContent>
                      <FinancialsListView value={fin} />
                    </CardContent>
                    <Divider />
                    <Box display="flex" justifyContent="flex-end" p={2}>
                      <Link
                        to={`/investor/investornewfinancials/${userId}/${buyerId}/${identityId}`}
                      >
                        <Button>Add Financials</Button>
                      </Link>
                    </Box>
                  </Card>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <Accordion>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    Company KYC/AML Documents
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <BuyerUploadView value={item} />
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <Accordion>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    Company Directors
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DirectorView />
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <Accordion>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    Company Owners
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <OwnerView />
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </React.Fragment>
  );
};

export default Buyer;
