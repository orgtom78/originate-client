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

const UboListView = () => {
  const classes = useStyles();
  const context = useUser();
  const sub = context.sub;
  const [ubo, setUbo] = useState([]);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function getUbos() {
      const id = await sub;
      let filter = {
        userId: { eq: id },
      };
      const {
        data: {
          listUBOs: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listUBOs, { filter: filter })
      );
      const n = { data: { listUBOs: { items: itemsPage1, nextToken } } };
      const items = n.data.listUBOs.items;
      setUbo(items);
    }
    getUbos();
  }, [sub]);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  function checkstatus(ubo) {
    if (ubo === "submitted") {
      return (
        <>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={orangeTheme}>
              <Chip label={ubo} color="primary" />
            </ThemeProvider>
          </StyledEngineProvider>
        </>
      );
    } else if (ubo === "Under Review") {
      return (
        <>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={orangeTheme}>
              <Chip label={ubo} color="secondary" />
            </ThemeProvider>
          </StyledEngineProvider>
        </>
      );
    } else {
      return (
        <>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={greenTheme}>
              <Chip label={ubo} color="primary" />
            </ThemeProvider>
          </StyledEngineProvider>
        </>
      );
    }
  }

  return (
    <Page className={clsx(classes.root)} title="Ubos">
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
                    {ubo.slice(0, limit).map((ubo) => (
                      <TableRow hover key={ubo.uboId}>
                        <TableCell>
                          <Box alignItems="center" display="flex">
                            <Link to={`/app/updateubo/${ubo.id}`}>
                              <Avatar
                                className={classes.avatar}
                                src={ubo.avatarUrl}
                              >
                                {getInitials(ubo.ubo_name)}
                              </Avatar>
                            </Link>
                            <Typography color="textPrimary" variant="body1">
                              {ubo.ubo_name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{ubo.ubo_email}</TableCell>
                        <TableCell>{`${ubo.ubo_nationality}`}</TableCell>
                        <TableCell>{checkstatus(ubo.ubo_status)}</TableCell>
                        <TableCell>
                          {moment(ubo.createdAt).format("DD/MM/YYYY")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={ubo.length}
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

export default UboListView;
