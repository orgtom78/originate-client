import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import Page from "src/components/Page";
import NumberFormat from "react-number-format";
import { Check as CheckIcon } from "react-feather";
import * as mutations from "src/graphql/mutations";
import { Auth, API, graphqlOperation } from "aws-amplify";

const SpvBankAccountsListView = (input) => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  async function makedefault(input) {
    try {
      let user = await Auth.currentAuthenticatedUser();
      let id = user.attributes["custom:groupid"];
      await API.graphql(
        graphqlOperation(mutations.updatePlaidauth, {
          input: { id: id, account_id1: input },
        })
      );
      navigate(`/spv/bank/remittance/${input}`);
    } catch (err) {
      console.log("error fetching data..", err);
    }
  }

  return (
    <Page title="Company IDs">
      <React.Fragment>
        <Container maxWidth="lg">
          <Card>
            <PerfectScrollbar>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Account Name</TableCell>
                    <TableCell>Balance</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(input)
                    .slice(page * limit, page * limit + limit)
                    .map((key) => (
                      <TableRow hover key={input.account_id}>
                        <TableCell>
                          <Typography color="textPrimary" variant="body1">
                            {`${input[key].name}`}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <NumberFormat
                            color="textPrimary"
                            variant="h3"
                            value={`${input[key].balances.available}`}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography color="textPrimary" variant="body1">
                            {"****"}
                            {input[key].mask}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => makedefault(input[key].account_id)}
                            endIcon={<CheckIcon />}
                          >
                            Make Default
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={Object.keys(input).length}
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

export default SpvBankAccountsListView;
