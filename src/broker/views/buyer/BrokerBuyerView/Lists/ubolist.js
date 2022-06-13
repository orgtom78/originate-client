import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Chip,
  Checkbox,
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
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
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

const UboListView = (value) => {
  const classes = useStyles();
  const id = value.user;
  const buyid = value.buyer;
  const [ubo, setUbo] = useState([]);

  const [selectedUboIds, setSelectedUboIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function getUbos() {
      let filter = { userId: { eq: id }, buyerId: { eq: buyid } };
      const {
        data: {
          listUBOs: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listUBOs, { filter: filter })
      );
      const n = { data: { listUBOs: { items: itemsPage1, nextToken } } };
      const items = await n.data.listUBOs.items;
      setUbo(items);
    }
    getUbos();
  }, [id, buyid]);

  const handleSelectAll = (event) => {
    let newSelectedUboIds;

    if (event.target.checked) {
      newSelectedUboIds = ubo.map((ubo) => ubo.uboId);
    } else {
      newSelectedUboIds = [];
    }

    setSelectedUboIds(newSelectedUboIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUboIds.indexOf(id);
    let newSelectedUboIds = [];

    if (selectedIndex === -1) {
      newSelectedUboIds = newSelectedUboIds.concat(selectedUboIds, id);
    } else if (selectedIndex === 0) {
      newSelectedUboIds = newSelectedUboIds.concat(selectedUboIds.slice(1));
    } else if (selectedIndex === selectedUboIds.length - 1) {
      newSelectedUboIds = newSelectedUboIds.concat(selectedUboIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUboIds = newSelectedUboIds.concat(
        selectedUboIds.slice(0, selectedIndex),
        selectedUboIds.slice(selectedIndex + 1)
      );
    }

    setSelectedUboIds(newSelectedUboIds);
  };

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
    <React.Fragment>
      <PerfectScrollbar>
        <Box maxWidth="100%" maxHeight="100%">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedUboIds.length === ubo.length}
                    color="primary"
                    indeterminate={
                      selectedUboIds.length > 0 &&
                      selectedUboIds.length < ubo.length
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
              {ubo.slice(0, limit).map((ubo) => (
                <TableRow
                  hover
                  key={ubo.uboId}
                  selected={selectedUboIds.indexOf(ubo.uboId) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUboIds.indexOf(ubo.uboId) !== -1}
                      onChange={(event) => handleSelectOne(event, ubo.uboId)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Link to={`/broker/ubo/${ubo.id}`}>
                        <Avatar
                          className={classes.avatar}
                          src={`${ubo.ubo_logo}`}
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
                  <TableCell>{`${ubo.ubo_country_of_residence}`}</TableCell>
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
    </React.Fragment>
  );
};

export default UboListView;
