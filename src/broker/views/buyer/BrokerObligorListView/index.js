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
import { Auth, API, graphqlOperation } from "aws-amplify";
import moment from "moment";
import getInitials from "src/utils/getInitials";
import NumberFormat from "react-number-format";
import NewBrokerView from "src/broker/views/account/NewBrokerView";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const BrokerBuyerListView = () => {
  const classes = useStyles();
  const [buyer, setBuyer] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [investid, setInvestid] = useState("");

  useEffect(() => {
    async function getBuyers() {
      let user = await Auth.currentAuthenticatedUser();
      const id = user.attributes["custom:groupid"];
      setInvestid(id);
      let filter = {
        brokerId: { eq: id },
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
      var x = items.filter((e) => e.buyer_status === "Approved");
      setBuyer(x);
    }
    getBuyers();
  }, [investid]);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <React.Fragment>
      {investid ? (
        <React.Fragment>
          <Page className={clsx(classes.root)} title="Buyers">
            <Container maxWidth={false}>
              <Box mt={3}>
                <Card>
                  <PerfectScrollbar>
                    <Box minWidth={1050}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Buyer's Name</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>Website</TableCell>
                            <TableCell>Limit Request</TableCell>
                            <TableCell>Latest update</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {buyer.slice(0, limit).map((buyer) => (
                            <TableRow hover key={buyer.buyerId}>
                              <TableCell>
                                <Box alignItems="center" display="flex">
                                  <Link to={`/broker/buyer/${buyer.id}`}>
                                    <Avatar
                                      className={classes.avatar}
                                      src={`${buyer.buyer_logo}`}
                                    >
                                      {getInitials(buyer.buyer_name)}
                                    </Avatar>
                                  </Link>

                                  <Typography
                                    color="textPrimary"
                                    variant="body1"
                                  >
                                    {buyer.buyer_name}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>{`${buyer.buyer_country}`}</TableCell>
                              <TableCell>{`${buyer.buyer_website}`}</TableCell>
                              <TableCell>
                                <NumberFormat
                                  value={`${buyer.buyer_loan_request_amount}`}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"$"}
                                />
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
      ) : (
        <>
          <NewBrokerView />
        </>
      )}
    </React.Fragment>
  );
};

export default BrokerBuyerListView;
