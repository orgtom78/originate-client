import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  Avatar,
  Box,
  Card,
  Chip,
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
  MuiThemeProvider,
  createTheme,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import Page from "src/components/Page";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import moment from "moment";
import getInitials from "src/utils/getInitials";
import { green, orange } from "@material-ui/core/colors";

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

const greenTheme = createTheme({
  palette: { primary: { main: green[500] }, secondary: { main: green[200] } },
});
const orangeTheme = createTheme({
  palette: { primary: { main: orange[500] }, secondary: { main: orange[200] } },
});

const DirectorListView = (value) => {
  const classes = useStyles();
  const sub = value.value;
  const [director, setDirector] = useState([]);

  const [selectedDirectorIds, setSelectedDirectorIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function getDirectors() {
      let filter = {
        investorId: { eq: sub },
      };
      const {
        data: {
          listDirectors: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listDirectors, { filter: filter })
      );
      const n = { data: { listDirectors: { items: itemsPage1, nextToken } } };
      const items = n.data.listDirectors.items;
      setDirector(items);
    }
    getDirectors();
  }, [sub]);

  const handleSelectAll = (event) => {
    let newSelectedDirectorIds;

    if (event.target.checked) {
      newSelectedDirectorIds = director.map((director) => director.directorId);
    } else {
      newSelectedDirectorIds = [];
    }

    setSelectedDirectorIds(newSelectedDirectorIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedDirectorIds.indexOf(id);
    let newSelectedDirectorIds = [];

    if (selectedIndex === -1) {
      newSelectedDirectorIds = newSelectedDirectorIds.concat(
        selectedDirectorIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedDirectorIds = newSelectedDirectorIds.concat(
        selectedDirectorIds.slice(1)
      );
    } else if (selectedIndex === selectedDirectorIds.length - 1) {
      newSelectedDirectorIds = newSelectedDirectorIds.concat(
        selectedDirectorIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedDirectorIds = newSelectedDirectorIds.concat(
        selectedDirectorIds.slice(0, selectedIndex),
        selectedDirectorIds.slice(selectedIndex + 1)
      );
    }

    setSelectedDirectorIds(newSelectedDirectorIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  function checkstatus(director) {
    if (director === "submitted") {
      return (
        <>
          <MuiThemeProvider theme={orangeTheme}>
            <Chip label={director} color="primary" />
          </MuiThemeProvider>
        </>
      );
    } else if (director === "Under Review") {
      return (
        <>
          <MuiThemeProvider theme={orangeTheme}>
            <Chip label={director} color="secondary" />
          </MuiThemeProvider>
        </>
      );
    } else {
      return (
        <>
          <MuiThemeProvider theme={greenTheme}>
            <Chip label={director} color="primary" />
          </MuiThemeProvider>
        </>
      );
    }
  }


  return (
    <React.Fragment>
        <Page className={clsx(classes.root)} title="Directors">
          <Container maxWidth="lg">
            <Box mt={3}>
              <Card>
                <PerfectScrollbar>
                  <Box maxWidth="100%" maxHeight="100%">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={
                                selectedDirectorIds.length === director.length
                              }
                              color="primary"
                              indeterminate={
                                selectedDirectorIds.length > 0 &&
                                selectedDirectorIds.length < director.length
                              }
                              onChange={handleSelectAll}
                            />
                          </TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Country</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Latest update</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {director.slice(0, limit).map((director) => (
                          <TableRow
                            hover
                            key={director.directorId}
                            selected={
                              selectedDirectorIds.indexOf(
                                director.directorId
                              ) !== -1
                            }
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={
                                  selectedDirectorIds.indexOf(
                                    director.directorId
                                  ) !== -1
                                }
                                onChange={(event) =>
                                  handleSelectOne(event, director.directorId)
                                }
                                value="true"
                              />
                            </TableCell>
                            <TableCell>
                              <Box alignItems="center" display="flex">
                              <Link
                                to={`/admin/director/${director.id}/`}
                              >
                                <Avatar className={classes.avatar}
                                src={`${director.avatarUrl}`}>
                                  {getInitials(director.director_name)}
                                </Avatar>
                              </Link>
                                <Typography color="textPrimary" variant="body1">
                                  {director.director_name}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>{director.director_email}</TableCell>
                            <TableCell>
                              {`${director.director_country_of_residence}`}
                            </TableCell>
                            <TableCell>
                              {checkstatus(director.director_status)}
                            </TableCell>
                            <TableCell>
                              {moment(director.createdAt).format("DD/MM/YYYY")}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </PerfectScrollbar>
                <TablePagination
                  component="div"
                  count={director.length}
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
  );
};

export default DirectorListView;
