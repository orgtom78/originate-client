import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import Page from "src/components/Page";
import ProfileDetails from "./ProfileDetails";
import { useParams } from "react-router-dom";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import AssetRisk from "src/admin/views/buyer/AdminBuyerView/AssetRisk.js";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Buyer = (value) => {
  const classes = useStyles();
  const { id } = useParams();
  const [item, setItem] = useState("");
  const [fin, setFin] = useState([]);
  const [buyerId, setBuyerId] = useState("");

  useEffect(() => {
    async function getBuyer(input) {
      try {
        const buyer = await API.graphql(
          graphqlOperation(queries.getBuyer, input)
        );
        const {
          data: {
            getBuyer: {
              buyerId,
            },
          },
        } = buyer;
        setItem(buyer);
        setBuyerId(buyerId);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    getBuyer({ id });
  }, [id]);

  useEffect(() => {
    async function getFinancials() {
      let filter = {
        buyerId: { eq: buyerId },
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
      <Page className={classes.root} title="Account">
        <Container maxWidth="lg">
          <Grid container spacing={3}>
          <Grid item lg={12} md={12} xs={12}>
            <AssetRisk value={fin} data={item} />
            </Grid>
            <Grid item lg={12} md={12} xs={12}>
              <ProfileDetails value={id} />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </React.Fragment>
  );
};

export default Buyer;
