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
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Pagination } from '@mui/material';
import Page from "src/components/Page";
import Toolbar from "./Toolbar";
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
}));

const SupplierList = () => {
  const classes = useStyles();
  const [supplierdata, setSupplierdata] = useState([]);

  useEffect(() => {
    async function getSuppliers() {
      const {
        data: {
          listSuppliers: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listSuppliers)
      );
      const n = { data: { listSuppliers: { items: itemsPage1, nextToken } } };
      const items = n.data.listSuppliers.items;
      return items;
    }

    async function test() {
      const c = await getSuppliers();
      setSupplierdata(c);
    }
    test();
  }, []);

  function getLink(status, id, buyid, supid) {
    if (status === "Approved") {
      return `/admin/newrequest/${id}/${buyid}/${supid}`;
    } else {
      return <></>;
    }
  }

  return (
    <Page className={clsx(classes.root)} title="Approved Suppliers">
      <Container maxWidth={false}>
        <Toolbar />
        <Typography component="h1" variant="h4" align="center">
            Select the Supplier that issued the Invoice
          </Typography>
        <Box mt={3}>
          <Grid container spacing={3}>
            {supplierdata.map((supplierdata) => (
              <Grid item key={supplierdata.supplierId} lg={4} md={6} xs={12}>
                <Card>
                  <CardActionArea>
                    <Link
                      to={`/admin/newrequestlist/${supplierdata.supplierId}`}
                    >
                      <CardContent>
                        <Box display="flex" justifyContent="center" mb={3}>
                          <Avatar
                            alt="Supplier"
                            src={supplierdata.supplier_name}
                            variant="square"
                          />
                        </Box>
                        <Typography
                          align="center"
                          color="textPrimary"
                          gutterBottom
                          variant="h4"
                        >
                          {supplierdata.supplier_name}
                        </Typography>
                        <Typography
                          align="center"
                          color="textPrimary"
                          variant="body1"
                        >
                          {supplierdata.supplier_sold_goods_description}
                        </Typography>
                      </CardContent>
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

export default SupplierList;
