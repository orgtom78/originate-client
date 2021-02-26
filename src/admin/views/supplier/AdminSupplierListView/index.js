import React, { useState, useCallback } from "react";
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
  makeStyles,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import Page from "src/components/Page";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import moment from "moment";
import getInitials from "src/utils/getInitials";
import AdminSupplierView from "src/admin/views/supplier/AdminSupplierView";

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

const AdminSupplierListView = () => {
  const classes = useStyles();
  const [supplier, setSupplier] = useState([]);
  const [isclicked, setIsclicked] = useState("");
  const [userId, setUserId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [identityId, setIdentityId] = useState("");

  const [selectedSupplierIds, setSelectedSupplierIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  React.useEffect(() => {
    async function getSuppliers() {
      let filter = {
        sortkey: { contains: "supplier-" },
      };
      const {
        data: {
          listsSupplier: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listsSupplier, { filter: filter })
      );
      const n = { data: { listsSupplier: { items: itemsPage1, nextToken } } };
      const items = n.data.listsSupplier.items;
      setSupplier(items);
    }
    getSuppliers();
  }, []);

  const handler = useCallback(() => {
    if (!supplier || !supplier.length) {
      console.log("test");
    } else {
      const d = supplier;
      return d;
    }
  }, [supplier]);

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

  function getidandident(supplierId, userId, identityId) {
    setUserId(userId);
    setSupplierId(supplierId);
    setIdentityId(identityId);
    setIsclicked(true);
  }

  return (
    <React.Fragment>
      {!isclicked ? (
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
                        {supplier.slice(0, limit).map((supplier) => (
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
                                <Avatar
                                  className={classes.avatar}
                                  src={`${supplier.supplier_logo}`}
                                  onClick={() =>
                                    getidandident(
                                      supplier.supplierId,
                                      supplier.userId,
                                      supplier.identityId
                                    )
                                  }
                                >
                                  {getInitials(supplier.supplier_name)}
                                </Avatar>

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
                  onChangePage={handlePageChange}
                  onChangeRowsPerPage={handleLimitChange}
                  page={page}
                  rowsPerPage={limit}
                  rowsPerPageOptions={[5, 10, 25]}
                />
              </Card>
            </Box>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Link to={''}>
                <Button>Add Supplier</Button>
              </Link>
            </Box>
          </Container>
        </Page>
      ) : (
        <>
          <AdminSupplierView value={{ userId, supplierId, identityId }} />
        </>
      )}
    </React.Fragment>
  );
};

export default AdminSupplierListView;
