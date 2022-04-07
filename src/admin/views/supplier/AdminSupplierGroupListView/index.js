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

const GroupList = () => {
  const classes = useStyles();
  const [groupdata, setGroupdata] = useState([]);

  useEffect(() => {
    async function getGroups() {
      let filter = {
        group_type: { eq: "Supplier" }
      };
      let limit = 100;
      const {
        data: {
          listUsergroups: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listUsergroups, { filter: filter, limit:limit })
      );
      const n = { data: { listUsergroups: { items: itemsPage1, nextToken } } };
      const items = n.data.listUsergroups.items;
      var fin = items.filter((e) => e.supplierId !== "" && e.investorId !== "");
      return fin;
    }

    async function test() {
      const c = await getGroups();
      setGroupdata(c);
    }
    test();
  }, []);

  return (
    <Page className={clsx(classes.root)} title="Available User Groups">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid container spacing={3}>
            {groupdata.map((groupdata) => (
              <Grid item key={groupdata.userId} lg={4} md={6} xs={12}>
                <Card>
                  <CardActionArea>
                    <Link
                      to={`/admin/newsupplier/${groupdata.groupId}/${groupdata.identityId}/${groupdata.userId}`}
                    >
                      <CardContent>
                        <Box display="flex" justifyContent="center" mb={3}>
                          <Avatar
                            alt="Group"
                            src={groupdata.group_name}
                            variant="square"
                          />
                        </Box>
                        <Typography
                          align="center"
                          color="textPrimary"
                          gutterBottom
                          variant="h4"
                        >
                          {groupdata.group_name}
                        </Typography>
                        <Typography
                          align="center"
                          color="textPrimary"
                          variant="body1"
                        >
                          {groupdata.group_type}
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

export default GroupList;
