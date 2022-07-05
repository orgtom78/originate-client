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

const AdminSpvListView = () => {
  const classes = useStyles();
  const [spv, setSpv] = useState([]);

  const [selectedSpvIds, setSelectedSpvIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  React.useEffect(() => {
    async function getSpvs() {
      const {
        data: {
          listSpvs: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(graphqlOperation(queries.listSpvs));
      const n = { data: { listSpvs: { items: itemsPage1, nextToken } } };
      console.log(n)
      const items = n.data.listSpvs.items;
      setSpv(items);
    }
    getSpvs();
  }, []);

  const handleSelectAll = (event) => {
    let newSelectedSpvIds;

    if (event.target.checked) {
      newSelectedSpvIds = spv.map((spv) => spv.spvId);
    } else {
      newSelectedSpvIds = [];
    }

    setSelectedSpvIds(newSelectedSpvIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedSpvIds.indexOf(id);
    let newSelectedSpvIds = [];

    if (selectedIndex === -1) {
      newSelectedSpvIds = newSelectedSpvIds.concat(
        selectedSpvIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedSpvIds = newSelectedSpvIds.concat(
        selectedSpvIds.slice(1)
      );
    } else if (selectedIndex === selectedSpvIds.length - 1) {
      newSelectedSpvIds = newSelectedSpvIds.concat(
        selectedSpvIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedSpvIds = newSelectedSpvIds.concat(
        selectedSpvIds.slice(0, selectedIndex),
        selectedSpvIds.slice(selectedIndex + 1)
      );
    }

    setSelectedSpvIds(newSelectedSpvIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <React.Fragment>
      <Page className={clsx(classes.root)} title="Spvs">
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
                              selectedSpvIds.length === spv.length
                            }
                            color="primary"
                            indeterminate={
                              selectedSpvIds.length > 0 &&
                              selectedSpvIds.length < spv.length
                            }
                            onChange={handleSelectAll}
                          />
                        </TableCell>
                        <TableCell>Spv's Name</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Industry</TableCell>
                        <TableCell>Website</TableCell>
                        <TableCell>Latest update</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {spv
                        .slice(page * limit, page * limit + limit)
                        .map((spv) => (
                          <TableRow
                            hover
                            key={spv.spvId}
                            selected={
                              selectedSpvIds.indexOf(
                                spv.spvId
                              ) !== -1
                            }
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={
                                  selectedSpvIds.indexOf(
                                    spv.spvId
                                  ) !== -1
                                }
                                onChange={(event) =>
                                  handleSelectOne(event, spv.spvId)
                                }
                                value="true"
                              />
                            </TableCell>
                            <TableCell>
                              <Box alignItems="center" display="flex">
                                <Link to={`/admin/spv/${spv.id}/`}>
                                  <Avatar
                                    className={classes.avatar}
                                    src={`${spv.spv_logo}`}
                                  >
                                    {getInitials(spv.spv_name)}
                                  </Avatar>
                                </Link>
                                <Typography color="textPrimary" variant="body1">
                                  {spv.spv_name}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              {`${spv.spv_country}`}
                            </TableCell>
                            <TableCell>
                              {`${spv.spv_industry}`}
                            </TableCell>
                            <TableCell>
                              {`${spv.spv_website}`}
                            </TableCell>
                            <TableCell>
                              {moment(spv.createdAt).format("DD/MM/YYYY")}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
              <TablePagination
                component="div"
                count={spv.length}
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
            <Link to={`/admin/spvgroups/`}>
              <Button>Add Spv</Button>
            </Link>
          </Box>
        </Container>
      </Page>
    </React.Fragment>
  );
};

export default AdminSpvListView;
