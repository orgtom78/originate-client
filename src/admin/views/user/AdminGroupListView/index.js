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

const AdminUserGroupListView = () => {
  const classes = useStyles();
  const [usergroup, setUsergroup] = useState([]);

  const [selectedUsergroupIds, setSelectedUsergroupIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  React.useEffect(() => {
    async function getUsergroups() {
      const {
        data: {
          listUsergroups: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(graphqlOperation(queries.listUsergroups));

      const n = { data: { listUsergroups: { items: itemsPage1, nextToken } } };
      const items = n.data.listUsergroups.items;
      setUsergroup(items);
    }
    getUsergroups();
  }, []);

  const handleSelectAll = (event) => {
    let newSelectedUsergroupIds;

    if (event.target.checked) {
      newSelectedUsergroupIds = usergroup.map(
        (usergroup) => usergroup.usergroupId
      );
    } else {
      newSelectedUsergroupIds = [];
    }

    setSelectedUsergroupIds(newSelectedUsergroupIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsergroupIds.indexOf(id);
    let newSelectedUsergroupIds = [];

    if (selectedIndex === -1) {
      newSelectedUsergroupIds = newSelectedUsergroupIds.concat(
        selectedUsergroupIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedUsergroupIds = newSelectedUsergroupIds.concat(
        selectedUsergroupIds.slice(1)
      );
    } else if (selectedIndex === selectedUsergroupIds.length - 1) {
      newSelectedUsergroupIds = newSelectedUsergroupIds.concat(
        selectedUsergroupIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedUsergroupIds = newSelectedUsergroupIds.concat(
        selectedUsergroupIds.slice(0, selectedIndex),
        selectedUsergroupIds.slice(selectedIndex + 1)
      );
    }

    setSelectedUsergroupIds(newSelectedUsergroupIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <React.Fragment>
      <Page className={clsx(classes.root)} title="Users and Usergroups">
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
                              selectedUsergroupIds.length === usergroup.length
                            }
                            color="primary"
                            indeterminate={
                              selectedUsergroupIds.length > 0 &&
                              selectedUsergroupIds.length < usergroup.length
                            }
                            onChange={handleSelectAll}
                          />
                        </TableCell>
                        <TableCell>Group's Name</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Group Type</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>Created at</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {usergroup
                        .slice(page * limit, page * limit + limit)
                        .map((usergroup) => (
                          <TableRow
                            hover
                            key={usergroup.userId}
                            selected={
                              selectedUsergroupIds.indexOf(usergroup.userId) !==
                              -1
                            }
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={
                                  selectedUsergroupIds.indexOf(
                                    usergroup.userId
                                  ) !== -1
                                }
                                onChange={(event) =>
                                  handleSelectOne(event, usergroup.userId)
                                }
                                value="true"
                              />
                            </TableCell>
                            <TableCell>
                              <Box alignItems="center" display="flex">
                                <Link
                                  to={`/admin/user/${usergroup.userId}/${usergroup.groupId}`}
                                >
                                  <Avatar className={classes.avatar}>
                                    {getInitials(usergroup.user_name)}
                                  </Avatar>
                                </Link>
                                <Typography color="textPrimary" variant="body1">
                                  {usergroup.group_name}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>{`${usergroup.user_name}`}</TableCell>
                            <TableCell>{`${usergroup.group_type}`}</TableCell>
                            <TableCell>{`${usergroup.groupId}`}</TableCell>
                            <TableCell>
                              {moment(usergroup.createdAt).format("DD/MM/YYYY")}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
              <TablePagination
                component="div"
                count={usergroup.length}
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
            <Link to={`/admin/newuser`}>
              <Button>Add User+Group</Button>
            </Link>
          </Box>
        </Container>
      </Page>
    </React.Fragment>
  );
};

export default AdminUserGroupListView;
