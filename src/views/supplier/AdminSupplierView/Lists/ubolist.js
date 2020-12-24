import React, { useState,  useCallback, useEffect } from 'react';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  Chip,
  Container,
  Checkbox,
  Link,
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
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Page from 'src/components/Page';
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import { useUser } from "src/components/usercontext.js";
import moment from 'moment';
import getInitials from 'src/utils/getInitials';
import { green, orange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    maxHeight: '100%',
    maxWidth: "100%",
    margin: "auto",
    display: "block",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  avatar: {
    marginRight: theme.spacing(2)
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

const UboListView = () => {
  const classes = useStyles();
  const context = useUser();
  const sub = context.sub;
  const [ubo, setUbo] = useState([]);

  const [selectedUboIds, setSelectedUboIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function getUbos() {
      const id = await sub;
      let filter = { userId: { eq: id }, sortkey: { contains: "ubo-supplier" } };
      const {
        data: {
          listsUBO: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listsUbo, { filter: filter })
      );
      const n = { data: { listsUBO: { items: itemsPage1, nextToken } } };
      const items = n.data.listsUBO.items;
      setUbo(items);
    }getUbos();
  }, [sub]);

  const handler = useCallback(() => {
    if (!ubo || !ubo.length) {
      return;
    } else {
      const d = ubo;
      return d;
    }
  }, [ubo]);

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
          <MuiThemeProvider theme={orangeTheme}>
            <Chip label={ubo} color="primary" />
          </MuiThemeProvider>
        </>
      );
    } else if (ubo === "Under Review") {
      return (
        <>
          <MuiThemeProvider theme={orangeTheme}>
            <Chip label={ubo} color="secondary" />
          </MuiThemeProvider>
        </>
      );
    } else {
      return (
        <>
          <MuiThemeProvider theme={greenTheme}>
            <Chip label={ubo} color="primary" />
          </MuiThemeProvider>
        </>
      );
    }
  }

  return (
    <Page
      className={clsx(classes.root)} 
      title="Ubos"
    >
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
                    checked={selectedUboIds.length === ubo.length}
                    color="primary"
                    indeterminate={
                      selectedUboIds.length > 0
                      && selectedUboIds.length < ubo.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Country
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Latest update
                </TableCell>
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
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Link href={`/app/updateubo/${ubo.uboId}`}>
                      <Avatar
                        className={classes.avatar}
                        src={ubo.avatarUrl}
                      >
                        {getInitials(ubo.ubo_name)}
                      </Avatar>
                      </Link>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {ubo.ubo_name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {ubo.ubo_email}
                  </TableCell>
                  <TableCell>
                    {`${ubo.ubo_country_of_residence}`}
                  </TableCell>
                  <TableCell>
                    {checkstatus(ubo.ubo_status)}
                  </TableCell>
                  <TableCell>
                    {moment(ubo.createdAt).format('DD/MM/YYYY')}
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

export default UboListView;
