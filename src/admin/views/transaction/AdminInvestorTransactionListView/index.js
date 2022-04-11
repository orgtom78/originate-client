import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  Avatar,
  Box,
  Card,
  Container,
  Divider,
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
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const AdminInvestorListView = () => {
  const classes = useStyles();
  const [investor, setInvestor] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function getInvestors() {
      const {
        data: {
          listInvestors: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(graphqlOperation(queries.listInvestors));
      const n = { data: { listInvestors: { items: itemsPage1, nextToken } } };
      console.log(n);
      const items = n.data.listInvestors.items;
      setInvestor(items);
    }
    getInvestors();
  }, []);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <React.Fragment>
      <Page className={clsx(classes.root)} title="Investors">
        <Container maxWidth={false}>
          <Box mt={3}>
            <Card>
              <PerfectScrollbar>
                <Box minWidth={1050}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Investor's Name</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Industry</TableCell>
                        <TableCell>Website</TableCell>
                        <TableCell>Latest update</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {investor
                        .slice(page * limit, page * limit + limit)
                        .map((investor) => (
                          <TableRow hover key={investor.investorId}>
                            <TableCell>
                              <Box alignItems="center" display="flex">
                                <Link to={`/admin/transaction/${investor.userId}/`}>
                                  <Avatar
                                    className={classes.avatar}
                                    src={`${investor.investor_logo}`}
                                  >
                                    {getInitials(investor.investor_name)}
                                  </Avatar>
                                </Link>
                                <Typography color="textPrimary" variant="body1">
                                  {investor.investor_name}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              {`${investor.investor_country}`}
                            </TableCell>
                            <TableCell>
                              {`${investor.investor_industry}`}
                            </TableCell>
                            <TableCell>
                              {`${investor.investor_website}`}
                            </TableCell>
                            <TableCell>
                              {moment(investor.createdAt).format("DD/MM/YYYY")}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
              <TablePagination
                component="div"
                count={investor.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Card>
          </Box>
          <Divider />
        </Container>
      </Page>
    </React.Fragment>
  );
};

export default AdminInvestorListView;
