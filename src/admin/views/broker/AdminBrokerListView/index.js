import React, { useState } from "react";
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

const AdminBrokerListView = () => {
  const classes = useStyles();
  const [broker, setBroker] = useState([]);

  const [selectedBrokerIds, setSelectedBrokerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  React.useEffect(() => {
    async function getBrokers() {
      const {
        data: {
          listBrokers: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(graphqlOperation(queries.listBrokers));
      const n = { data: { listBrokers: { items: itemsPage1, nextToken } } };
      console.log(n)
      const items = n.data.listBrokers.items;
      setBroker(items);
    }
    getBrokers();
  }, []);

  const handleSelectAll = (event) => {
    let newSelectedBrokerIds;

    if (event.target.checked) {
      newSelectedBrokerIds = broker.map((broker) => broker.brokerId);
    } else {
      newSelectedBrokerIds = [];
    }

    setSelectedBrokerIds(newSelectedBrokerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedBrokerIds.indexOf(id);
    let newSelectedBrokerIds = [];

    if (selectedIndex === -1) {
      newSelectedBrokerIds = newSelectedBrokerIds.concat(
        selectedBrokerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedBrokerIds = newSelectedBrokerIds.concat(
        selectedBrokerIds.slice(1)
      );
    } else if (selectedIndex === selectedBrokerIds.length - 1) {
      newSelectedBrokerIds = newSelectedBrokerIds.concat(
        selectedBrokerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedBrokerIds = newSelectedBrokerIds.concat(
        selectedBrokerIds.slice(0, selectedIndex),
        selectedBrokerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedBrokerIds(newSelectedBrokerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <React.Fragment>
      <Page className={clsx(classes.root)} title="Brokers">
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
                              selectedBrokerIds.length === broker.length
                            }
                            color="primary"
                            indeterminate={
                              selectedBrokerIds.length > 0 &&
                              selectedBrokerIds.length < broker.length
                            }
                            onChange={handleSelectAll}
                          />
                        </TableCell>
                        <TableCell>Broker's Name</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Industry</TableCell>
                        <TableCell>Website</TableCell>
                        <TableCell>Latest update</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {broker
                        .slice(page * limit, page * limit + limit)
                        .map((broker) => (
                          <TableRow
                            hover
                            key={broker.brokerId}
                            selected={
                              selectedBrokerIds.indexOf(
                                broker.brokerId
                              ) !== -1
                            }
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={
                                  selectedBrokerIds.indexOf(
                                    broker.brokerId
                                  ) !== -1
                                }
                                onChange={(event) =>
                                  handleSelectOne(event, broker.brokerId)
                                }
                                value="true"
                              />
                            </TableCell>
                            <TableCell>
                              <Box alignItems="center" display="flex">
                                <Link to={`/admin/broker/${broker.id}/`}>
                                  <Avatar
                                    className={classes.avatar}
                                    src={`${broker.broker_logo}`}
                                  >
                                    {getInitials(broker.broker_name)}
                                  </Avatar>
                                </Link>
                                <Typography color="textPrimary" variant="body1">
                                  {broker.broker_name}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              {`${broker.broker_country}`}
                            </TableCell>
                            <TableCell>
                              {`${broker.broker_industry}`}
                            </TableCell>
                            <TableCell>
                              {`${broker.broker_website}`}
                            </TableCell>
                            <TableCell>
                              {moment(broker.createdAt).format("DD/MM/YYYY")}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
              <TablePagination
                component="div"
                count={broker.length}
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
            <Link to={`/admin/brokergroups/`}>
              <Button>Add Broker</Button>
            </Link>
          </Box>
        </Container>
      </Page>
    </React.Fragment>
  );
};

export default AdminBrokerListView;
