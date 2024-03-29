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
import { API, Auth, graphqlOperation } from "aws-amplify";
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

const BrokerSupplierListView = () => {
  const classes = useStyles();
  const [supplier, setSupplier] = useState([]);

  const [selectedSupplierIds, setSelectedSupplierIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  React.useEffect(() => {
    async function getSuppliers() {
      let user = await Auth.currentAuthenticatedUser();
      let id = user.attributes["custom:groupid"];
      let filter = {
        brokerId: { eq: id },
      };
      const {
        data: {
          listSuppliers: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(graphqlOperation(queries.listSuppliers, { filter: filter }));
      const n = { data: { listSuppliers: { items: itemsPage1, nextToken } } };
      console.log(n);
      const items = n.data.listSuppliers.items;
      setSupplier(items);
    }
    getSuppliers();
  }, []);

  const handleSelectAll = (event) => {
    let newSelectedSupplierIds;

    if (event.target.checked) {
      newSelectedSupplierIds = supplier.map((supplier) => supplier.supplierId);
    } else {
      newSelectedSupplierIds = [];
    }

    setSelectedSupplierIds(newSelectedSupplierIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedSupplierIds.indexOf(id);
    let newSelectedSupplierIds = [];

    if (selectedIndex === -1) {
      newSelectedSupplierIds = newSelectedSupplierIds.concat(
        selectedSupplierIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedSupplierIds = newSelectedSupplierIds.concat(
        selectedSupplierIds.slice(1)
      );
    } else if (selectedIndex === selectedSupplierIds.length - 1) {
      newSelectedSupplierIds = newSelectedSupplierIds.concat(
        selectedSupplierIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedSupplierIds = newSelectedSupplierIds.concat(
        selectedSupplierIds.slice(0, selectedIndex),
        selectedSupplierIds.slice(selectedIndex + 1)
      );
    }

    setSelectedSupplierIds(newSelectedSupplierIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <React.Fragment>
      <Page className={clsx(classes.root)} title="Suppliers">
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
                              selectedSupplierIds.length === supplier.length
                            }
                            color="primary"
                            indeterminate={
                              selectedSupplierIds.length > 0 &&
                              selectedSupplierIds.length < supplier.length
                            }
                            onChange={handleSelectAll}
                          />
                        </TableCell>
                        <TableCell>Supplier's Name</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Industry</TableCell>
                        <TableCell>Website</TableCell>
                        <TableCell>Latest update</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {supplier
                        .slice(page * limit, page * limit + limit)
                        .map((supplier) => (
                          <TableRow
                            hover
                            key={supplier.supplierId}
                            selected={
                              selectedSupplierIds.indexOf(
                                supplier.supplierId
                              ) !== -1
                            }
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={
                                  selectedSupplierIds.indexOf(
                                    supplier.supplierId
                                  ) !== -1
                                }
                                onChange={(event) =>
                                  handleSelectOne(event, supplier.supplierId)
                                }
                                value="true"
                              />
                            </TableCell>
                            <TableCell>
                              <Box alignItems="center" display="flex">
                                <Link to={`/broker/supplier/${supplier.id}/`}>
                                  <Avatar
                                    className={classes.avatar}
                                    src={`${supplier.supplier_logo}`}
                                  >
                                    {getInitials(supplier.supplier_name)}
                                  </Avatar>
                                </Link>
                                <Typography color="textPrimary" variant="body1">
                                  {supplier.supplier_name}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              {`${supplier.supplier_country}`}
                            </TableCell>
                            <TableCell>
                              {`${supplier.supplier_industry}`}
                            </TableCell>
                            <TableCell>
                              {`${supplier.supplier_website}`}
                            </TableCell>
                            <TableCell>
                              {moment(supplier.createdAt).format("DD/MM/YYYY")}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
              <TablePagination
                component="div"
                count={supplier.length}
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
            <Link to={`/broker/suppliergroups/`}>
              <Button>Add Supplier</Button>
            </Link>
          </Box>
        </Container>
      </Page>
    </React.Fragment>
  );
};

export default BrokerSupplierListView;
