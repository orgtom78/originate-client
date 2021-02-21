import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  Avatar,
  Box,
  Card,
  Container,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import Page from "src/components/Page";
import * as queries from "src/graphql/queries.js";
import { Auth, API, graphqlOperation } from "aws-amplify";
import moment from "moment";
import getInitials from "src/utils/getInitials";
import NumberFormat from "react-number-format";
import NewInvestorView from "src/investor/views/account/NewInvestorView";

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

const InvestorBuyerListView = () => {
  const classes = useStyles();
  const [buyer, setBuyer] = useState([]);
  const [selectedBuyerIds, setSelectedBuyerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [investid, setInvestid] = useState("");

  useEffect(() => {
    async function getBuyers() {
      let filter = {
        sortkey: { contains: "buyer-", notContains: "financials-" },
      };
      const {
        data: {
          listsBuyer: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listsBuyer, { filter: filter })
      );
      const n = { data: { listsBuyer: { items: itemsPage1, nextToken } } };
      const items = n.data.listsBuyer.items;
      let user = await Auth.currentAuthenticatedUser();
      let id = user.attributes["custom:groupid"];
      setInvestid(id);
      var x = items.filter((e) => e.buyer_status === "Investor Offer Pending");
      setBuyer(x);
    }
    getBuyers();
  }, []);

  const handler = useCallback(() => {
    if (!buyer || !buyer.length) {
      return;
    } else {
      const d = buyer;
      return d;
    }
  }, [buyer]);

  const handleSelectAll = (event) => {
    let newSelectedBuyerIds;

    if (event.target.checked) {
      newSelectedBuyerIds = buyer.map((buyer) => buyer.buyerId);
    } else {
      newSelectedBuyerIds = [];
    }

    setSelectedBuyerIds(newSelectedBuyerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedBuyerIds.indexOf(id);
    let newSelectedBuyerIds = [];

    if (selectedIndex === -1) {
      newSelectedBuyerIds = newSelectedBuyerIds.concat(selectedBuyerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedBuyerIds = newSelectedBuyerIds.concat(
        selectedBuyerIds.slice(1)
      );
    } else if (selectedIndex === selectedBuyerIds.length - 1) {
      newSelectedBuyerIds = newSelectedBuyerIds.concat(
        selectedBuyerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedBuyerIds = newSelectedBuyerIds.concat(
        selectedBuyerIds.slice(0, selectedIndex),
        selectedBuyerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedBuyerIds(newSelectedBuyerIds);
  };

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
                            <TableCell>Loan Request</TableCell>
                            <TableCell>Latest update</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {buyer.slice(0, limit).map((buyer) => (
                            <TableRow
                              hover
                              key={buyer.buyerId}
                              selected={
                                selectedBuyerIds.indexOf(buyer.buyerId) !== -1
                              }
                            >
                              <TableCell>
                                <Box alignItems="center" display="flex">
                                  <Link
                                    to={`/investor/buyer/${buyer.userId}/${buyer.buyerId}/${buyer.identityId}`}
                                  >
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
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleLimitChange}
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
          <NewInvestorView />
        </>
      )}
    </React.Fragment>
  );
};

export default InvestorBuyerListView;
