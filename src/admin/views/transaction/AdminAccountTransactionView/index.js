import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import { Box, Card, Container, Grid } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Page from "src/components/Page";
import moment from "moment";

const AdminAccountTransactionView = () => {
  const { id } = useParams();
  const [trans, setTrans] = useState([]);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    async function getDynamoTransactions() {
      let filter = { senderaccountId: { eq: id } };
      const {
        data: {
          listTransactions: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listTransactions, {
          limit: 10000,
          filter: filter,
        })
      );
      const n = {
        data: { listTransactions: { items: itemsPage1, nextToken } },
      };
      const items = n.data.listTransactions.items;
      const d = items.sort(function (a, b) {
        return new Date(b.transaction_date) - new Date(a.transaction_date);
      });
      console.log(d)
      setTrans(d);
    }
    getDynamoTransactions();
  }, [id]);

  const columns = [
    {
      field: "transaction_description",
      headerName: "Transaction Name",
      minWidth: 400,
      editable: false,
      renderCell: (cellValues) => {
        return (
          <Link to={`/admin/transaction/${cellValues.row.id}`}>
            {cellValues.row.transaction_description}
          </Link>
        );
      },
    },
    {
      field: "transaction_source_amount",
      headerName: "Amount",
      minWidth: 200,
      editable: false,
    },
    {
      field: "transaction_date",
      headerName: "Date",
      minWidth: 200,
      editable: false,
    },
  ];

  const rows = trans.map((dynamotrans) => ({
    id: dynamotrans.id,
    transaction_description: dynamotrans.transaction_description,
    transaction_source_amount: dynamotrans.transaction_source_amount,
    transaction_date: moment(dynamotrans.transaction_date).format("MM/DD/YYYY"),
  }));

  return (
    <Page title="Bank Accounts">
      <React.Fragment>
        <Container maxWidth="lg">
          <React.Fragment>
            <Container maxWidth={false}>
              <Box mt={3}>
                <Card>
                  <PerfectScrollbar>
                    <Grid item>
                      <Box sx={{ height: 800, width: "100%" }}>
                        <div style={{ display: "flex", height: "100%" }}>
                          <div style={{ flexGrow: 1 }}>
                            <DataGrid
                              components={{
                                Toolbar: GridToolbar,
                              }}
                              componentsProps={{
                                toolbar: { showQuickFilter: true },
                              }}
                              rows={rows}
                              columns={columns}
                              pageSize={pageSize}
                              onPageSizeChange={(newPageSize) =>
                                setPageSize(newPageSize)
                              }
                              rowsPerPageOptions={[5, 10, 20, 40]}
                              pagination
                              checkboxSelection
                              disableSelectionOnClick
                            />
                          </div>
                        </div>
                      </Box>
                    </Grid>
                  </PerfectScrollbar>
                </Card>
              </Box>
            </Container>
          </React.Fragment>
        </Container>
      </React.Fragment>
    </Page>
  );
};

export default AdminAccountTransactionView;
