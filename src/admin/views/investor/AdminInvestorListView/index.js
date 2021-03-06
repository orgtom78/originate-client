import React, { useState, useCallback } from "react";
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
  makeStyles,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import Page from "src/components/Page";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import moment from "moment";
import getInitials from "src/utils/getInitials";
import AdminInvestorView from "src/admin/views/investor/AdminInvestorView";

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
  const [isclicked, setIsclicked] = useState("");
  const [userId, setUserId] = useState("");
  const [investorId, setInvestorId] = useState("");
  const [identityId, setIdentityId] = useState("");

  const [selectedInvestorIds, setSelectedInvestorIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  React.useEffect(() => {
    async function getInvestors() {
      let filter = {
        sortkey: { contains: "investor-", notContains: "-investor" },
      };
      const {
        data: {
          listsInvestor: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listsInvestor, { filter: filter })
      );
      const n = { data: { listsInvestor: { items: itemsPage1, nextToken } } };
      const items = n.data.listsInvestor.items;
      setInvestor(items);
    }
    getInvestors();
  }, []);

  const handler = useCallback(() => {
    if (!investor || !investor.length) {
      console.log("test");
    } else {
      const d = investor;
      return d;
    }
  }, [investor]);

  const handleSelectAll = (event) => {
    let newSelectedInvestorIds;

    if (event.target.checked) {
      newSelectedInvestorIds = investor.map((investor) => investor.investorId);
    } else {
      newSelectedInvestorIds = [];
    }

    setSelectedInvestorIds(newSelectedInvestorIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedInvestorIds.indexOf(id);
    let newSelectedInvestorIds = [];

    if (selectedIndex === -1) {
      newSelectedInvestorIds = newSelectedInvestorIds.concat(
        selectedInvestorIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedInvestorIds = newSelectedInvestorIds.concat(
        selectedInvestorIds.slice(1)
      );
    } else if (selectedIndex === selectedInvestorIds.length - 1) {
      newSelectedInvestorIds = newSelectedInvestorIds.concat(
        selectedInvestorIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedInvestorIds = newSelectedInvestorIds.concat(
        selectedInvestorIds.slice(0, selectedIndex),
        selectedInvestorIds.slice(selectedIndex + 1)
      );
    }

    setSelectedInvestorIds(newSelectedInvestorIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  function getidandident(investorId, userId, identityId) {
    setUserId(userId);
    setInvestorId(investorId);
    setIdentityId(identityId);
    setIsclicked(true);
  }

  return (
    <React.Fragment>
      {!isclicked ? (
        <Page className={clsx(classes.root)} title="Investors">
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
                              checked={
                                selectedInvestorIds.length === investor.length
                              }
                              color="primary"
                              indeterminate={
                                selectedInvestorIds.length > 0 &&
                                selectedInvestorIds.length < investor.length
                              }
                              onChange={handleSelectAll}
                            />
                          </TableCell>
                          <TableCell>Investor's Name</TableCell>
                          <TableCell>Country</TableCell>
                          <TableCell>Industry</TableCell>
                          <TableCell>Website</TableCell>
                          <TableCell>Latest update</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {investor.slice(0, limit).map((investor) => (
                          <TableRow
                            hover
                            key={investor.investorId}
                            selected={
                              selectedInvestorIds.indexOf(
                                investor.investorId
                              ) !== -1
                            }
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={
                                  selectedInvestorIds.indexOf(
                                    investor.investorId
                                  ) !== -1
                                }
                                onChange={(event) =>
                                  handleSelectOne(event, investor.investorId)
                                }
                                value="true"
                              />
                            </TableCell>
                            <TableCell>
                              <Box alignItems="center" display="flex">
                                <Avatar
                                  className={classes.avatar}
                                  src={`${investor.investor_logo}`}
                                  onClick={() =>
                                    getidandident(
                                      investor.investorId,
                                      investor.userId,
                                      investor.identityId
                                    )
                                  }
                                >
                                  {getInitials(investor.investor_name)}
                                </Avatar>

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
                  onChangePage={handlePageChange}
                  onChangeRowsPerPage={handleLimitChange}
                  page={page}
                  rowsPerPage={limit}
                  rowsPerPageOptions={[5, 10, 25]}
                />
              </Card>
            </Box>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
            <Link to={''}>
              <Button>Add Investor</Button>
            </Link>
            </Box>
          </Container>
        </Page>
      ) : (
        <>
          <AdminInvestorView value={{ userId, investorId, identityId }} />
        </>
      )}
    </React.Fragment>
  );
};

export default AdminInvestorListView;
