import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Auth, API } from "aws-amplify";
import {
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import Page from "src/components/Page";
import moment from "moment";
import NumberFormat from "react-number-format";

const apiName = "plaid";

const InvestorBankTransactionListView = (input) => {
  const { id } = useParams();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [trans, setTrans] = useState([]);

  useEffect(() => {
    async function getTransactions() {
      const user = await Auth.currentAuthenticatedUser();
      const { attributes = {} } = user;
      const sub = attributes["custom:groupid"];
      const myInit = {
        queryStringParameters: {
          id: sub,
          bankid: id,
        },
      };
      const data = await API.get(apiName, "/api/transactions1", myInit);
      console.log(data.transactions)
      setTrans(data.transactions);
    }
    getTransactions();
  }, [id]);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Page title="Company IDs">
      <React.Fragment>
        <Container maxWidth="lg">
          <Card>
            <PerfectScrollbar>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction Name</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(trans)
                    .slice(page * limit, page * limit + limit)
                    .map((key) => (
                      <TableRow hover key={trans.transaction_id}>
                        <TableCell>
                          <Typography color="textPrimary" variant="body1">
                            {`${trans[key].name}`}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <NumberFormat
                            color="textPrimary"
                            variant="h3"
                            value={`${trans[key].amount}`}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography color="textPrimary" variant="body1">
                            {moment(trans[key].date).format("DD/MM/YYYY")}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={Object.keys(trans).length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Container>
      </React.Fragment>
    </Page>
  );
};

export default InvestorBankTransactionListView;
