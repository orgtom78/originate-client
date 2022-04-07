import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Checkbox,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import PerfectScrollbar from "react-perfect-scrollbar";
import Page from "src/components/Page";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import moment from "moment";
import getInitials from "src/utils/getInitials";
import NumberFormat from "react-number-format";

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

const AdminBuyerListView = () => {
  const classes = useStyles();
  const [buyer, setBuyer] = useState([]);
  const [selectedBuyerIds, setSelectedBuyerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function getBuyers() {
      const {
        data: {
          listBuyers: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listBuyers)
      );
      const n = { data: { listBuyers: { items: itemsPage1, nextToken } } };
      const items = n.data.listBuyers.items;
      var x = items.filter((e) => e.buyer_status !== null);
      setBuyer(x);
    }
    getBuyers();
  }, []);


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
      <Page className={clsx(classes.root)} title="Buyers">
        <Container maxWidth={false}>
          <Box mt={3}>
            <Card>
              <PerfectScrollbar>
                <Box minWidth={1050}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedBuyerIds.length === buyer.length}
                            color="primary"
                            indeterminate={
                              selectedBuyerIds.length > 0 &&
                              selectedBuyerIds.length < buyer.length
                            }
                            onChange={handleSelectAll}
                          />
                        </TableCell>
                        <TableCell>Buyer's Name</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Website</TableCell>
                        <TableCell>Loan Request</TableCell>
                        <TableCell>Latest update</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {buyer.slice(page * limit, page * limit + limit).map((buyer) => (
                        <TableRow
                          hover
                          key={buyer.buyerId}
                          selected={
                            selectedBuyerIds.indexOf(buyer.buyerId) !== -1
                          }
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={
                                selectedBuyerIds.indexOf(buyer.buyerId) !== -1
                              }
                              onChange={(event) =>
                                handleSelectOne(event, buyer.buyerId)
                              }
                              value="true"
                            />
                          </TableCell>
                          <TableCell>
                            <Box alignItems="center" display="flex">
                              <Link
                                to={`/admin/buyer/${buyer.id}`}
                              >
                                <Avatar
                                  className={classes.avatar}
                                  src={`${buyer.buyer_logo}`}
                                >
                                  {getInitials(buyer.buyer_name)}
                                </Avatar>
                              </Link>

                              <Typography color="textPrimary" variant="body1">
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
          <Divider />
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Link to={`/admin/newsupplierbuyer`}>
              <Button>Add Buyer</Button>
            </Link>
          </Box>
        </Container>
      </Page>
    </React.Fragment>
  );
};

export default AdminBuyerListView;
