import React, { useState,  useCallback, useEffect } from 'react';
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
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation, Storage } from "aws-amplify";
import moment from 'moment';
import getInitials from 'src/utils/getInitials';

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

const UboListView = (value) => {
  const classes = useStyles();
  const { id } = useParams();
  const { buyId } = useParams();
  const { ident } = useParams();
  const [ubo, setUbo] = useState([]);

  const [selectedUboIds, setSelectedUboIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function getUbos() {
      let filter = { userId: { eq: id }, sortkey: { contains: "ubo-buyer" } };
      const {
        data: {
          listsUBO: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listsUbo, { filter: filter })
      );
      const n = { data: { listsUBO: { items: itemsPage1, nextToken } } };
      const items = await n.data.listsUBO.items;
      setUbo(items);
    };getUbos();
  }, [id]);

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

   const geturl = async (input) => {
    if (input === ''){
      return
    }
    else{
    const t = await Storage.get(input, {
    level: "private",
    identityId: ident,
  });
  window.open(t, '_blank');
  }}

  return (
    <React.Fragment>
      <Container maxWidth={false} >
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
                  Nationality
                </TableCell>
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  Proof of Address
                </TableCell>
                <TableCell>
                  Date created
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
                      <Avatar
                        className={classes.avatar}
                        src={ubo.avatarUrl}
                      >
                        {getInitials(ubo.ubo_name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {ubo.ubo_name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {ubo.ubo_nationality}
                  </TableCell>
                  <TableCell>
                  <Button
                  label='Download' 
                  color="primary"
                  target="_blank"
                  onClick={() => geturl(ubo.ubo_id_attachment)}
                  >Download
                  </Button>
                  </TableCell>
                  <TableCell>
                  <Button
                  label='Download' 
                  color="primary"
                  target="_blank"
                  onClick={() => geturl(ubo.ubo_poa_attachment)}
                  >Download
                  </Button>
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
    </Container>
  </React.Fragment>
)
};

export default UboListView;
