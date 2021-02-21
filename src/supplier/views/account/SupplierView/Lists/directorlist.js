import React, { useState, useCallback, useEffect } from "react";
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
  createMuiTheme,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import Page from "src/components/Page";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import { useUser } from "src/components/context/usercontext.js";
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

const greenTheme = createMuiTheme({
  palette: { primary: { main: green[500] }, secondary: { main: green[200] } },
});
const orangeTheme = createMuiTheme({
  palette: { primary: { main: orange[500] }, secondary: { main: orange[200] } },
});

const DirectorListView = () => {
  const classes = useStyles();
  const context = useUser();
  const sub = context.sub;
  const [director, setDirector] = useState([]);

  const [selectedDirectorIds, setSelectedDirectorIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function getDirectors() {
      const id = await sub;
      let filter = {
        userId: { eq: id },
        sortkey: { contains: "director-supplier" },
      };
      const {
        data: {
          listsDirector: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listsDirector, { filter: filter })
      );
      const n = { data: { listsDirector: { items: itemsPage1, nextToken } } };
      const items = n.data.listsDirector.items;
      setDirector(items);
    }
    getDirectors();
  }, [sub]);

  const handler = useCallback(() => {
    if (!director || !director.length) {
      return;
    } else {
      const d = director;
      return d;
    }
  }, [director]);

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
    <Page className={clsx(classes.root)} title="Directors">
      <Container maxWidth="lg">
        <Box mt={3}>
          <Card>
            <PerfectScrollbar>
              <Box maxWidth="100%" maxHeight="100%">
                <Table>
                  <TableHead>
                    <TableRow>
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
                          selectedDirectorIds.indexOf(director.directorId) !==
                          -1
                        }
                      >
                        <TableCell>
                          <Box alignItems="center" display="flex">
                            <Link
                              to={`/app/updatedirector/${director.directorId}`}
                            >
                              <Avatar
                                className={classes.avatar}
                                src={director.avatarUrl}
                              >
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
  );
};

export default DirectorListView;
