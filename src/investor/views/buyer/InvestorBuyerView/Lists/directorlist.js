import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Button,
  Box,
  Card,
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
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation, Storage } from "aws-amplify";
import moment from "moment";
import getInitials from "src/utils/getInitials";

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

const DirectorListView = (value) => {
  const classes = useStyles();
  const { id } = useParams();
  const { buyId } = useParams();
  const { ident } = useParams();
  const [director, setDirector] = useState([]);

  const [selectedDirectorIds, setSelectedDirectorIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function getDirectors() {
      let filter = {
        userId: { eq: id },
        sortkey: { contains: "director-buyer" },
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
  }, [id]);

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

  const geturl = async (input) => {
    if (input === "") {
      return;
    } else {
      const t = await Storage.get(input, {
        level: "private",
        identityId: ident,
      });
      window.open(t, "_blank");
    }
  };

  return (
    <React.Fragment>
      <Container maxWidth={false}>
        <Card>
          <PerfectScrollbar>
            <Box maxWidth="100%" maxHeight="100%">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedDirectorIds.length === director.length}
                        color="primary"
                        indeterminate={
                          selectedDirectorIds.length > 0 &&
                          selectedDirectorIds.length < director.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Nationality</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Proof of Address</TableCell>
                    <TableCell>Date created</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {director.slice(0, limit).map((director) => (
                    <TableRow
                      hover
                      key={director.directorId}
                      selected={
                        selectedDirectorIds.indexOf(director.directorId) !== -1
                      }
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={
                            selectedDirectorIds.indexOf(director.directorId) !==
                            -1
                          }
                          onChange={(event) =>
                            handleSelectOne(event, director.directorId)
                          }
                          value="true"
                        />
                      </TableCell>
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <Avatar
                            className={classes.avatar}
                            src={director.avatarUrl}
                          >
                            {getInitials(director.director_name)}
                          </Avatar>
                          <Typography color="textPrimary" variant="body1">
                            {director.director_name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{director.director_nationality}</TableCell>
                      <TableCell>
                        <Button
                          label="Download"
                          color="primary"
                          target="_blank"
                          onClick={() =>
                            geturl(director.director_id_attachment)
                          }
                        >
                          Download
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          label="Download"
                          color="primary"
                          target="_blank"
                          onClick={() =>
                            geturl(director.director_poa_attachment)
                          }
                        >
                          Download
                        </Button>
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
      </Container>
    </React.Fragment>
  );
};

export default DirectorListView;
