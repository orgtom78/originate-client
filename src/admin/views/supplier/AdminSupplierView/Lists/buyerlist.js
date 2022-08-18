import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  Avatar,
  Box,
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import PerfectScrollbar from "react-perfect-scrollbar";
import Page from "src/components/Page";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import moment from "moment";
import getInitials from "src/utils/getInitials";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    maxHeight: "100%",
    maxWidth: "100%",
    margin: "auto",
    display: "block",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  table: {
    width: 650,
  },
}));

const BuyerListView = (value) => {
  const classes = useStyles();
  const [buyer, setBuyer] = useState([]);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function getBuyers() {
      const id = await value.value;
      let filter = {
        supplierId: { contains: id },
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
      setBuyer(items);
    }
    getBuyers();
  }, [value.value]);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <React.Fragment>
      <Page className={clsx(classes.root)} title="Buyers">
        <Container maxWidth="lg">
          <Box mt={3}>
            <Card>
              <PerfectScrollbar>
                <Box maxWidth="100%" maxHeight="100%">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Latest update</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {buyer.slice(0, limit).map((buyer) => (
                        <TableRow hover key={buyer.buyerId}>
                          <TableCell>
                            <Box alignItems="center" display="flex">
                              <Link
                                to={`/admin/esign/${buyer.buyerId}/${buyer.supplierId}/`}
                              >
                                <Avatar
                                  className={classes.avatar}
                                  src={`${buyer.avatarUrl}`}
                                >
                                  {getInitials(buyer.buyer_name)}
                                </Avatar>
                              </Link>
                              <Typography color="textPrimary" variant="body1">
                                {buyer.buyer_name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {moment(buyer.createdAt).format("DD/MM/YYYY")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
              <TablePagination
                component="div"
                count={buyer.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Card>
          </Box>
        </Container>
      </Page>
    </React.Fragment>
  );
};

export default BuyerListView;
