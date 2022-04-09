import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import PerfectScrollbar from "react-perfect-scrollbar";
import Page from "src/components/Page";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import { useUser } from "src/components/context/usercontext.js";
import moment from "moment";
import getInitials from "src/utils/getInitials";
import { green, orange } from "@mui/material/colors";

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

const DirectorListView = () => {
  const classes = useStyles();
  const context = useUser();
  const sub = context.sub;
  const [director, setDirector] = useState([]);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function getDirectors() {
      const id = await sub;
      let filter = {
        userId: { eq: id },
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
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={orangeTheme}>
              <Chip label={director} color="primary" />
            </ThemeProvider>
          </StyledEngineProvider>
        </>
      );
    } else if (director === "Under Review") {
      return (
        <>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={orangeTheme}>
              <Chip label={director} color="secondary" />
            </ThemeProvider>
          </StyledEngineProvider>
        </>
      );
    } else {
      return (
        <>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={greenTheme}>
              <Chip label={director} color="primary" />
            </ThemeProvider>
          </StyledEngineProvider>
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
                      <TableRow hover key={director.directorId}>
                        <TableCell>
                          <Box alignItems="center" display="flex">
                            <Link to={`/app/updatedirector/${director.id}`}>
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
                          {`${director.director_nationality}`}
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
  );
};

export default DirectorListView;
