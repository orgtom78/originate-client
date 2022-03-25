import React, { useState } from "react";
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
  makeStyles,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import Page from "src/components/Page";
import moment from "moment";
import NumberFormat from "react-number-format";

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

const InvestorBankTransactionListView = (input) => {
  const classes = useStyles();
  const [selectedCompanyIds, setSelectedCompanyIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCompanyIds;

    if (event.target.checked) {
      newSelectedCompanyIds = Object.keys(input).map(
        (bankaccount) => bankaccount.transaction_id
      );
    } else {
      newSelectedCompanyIds = [];
    }

    setSelectedCompanyIds(newSelectedCompanyIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCompanyIds.indexOf(id);
    let newSelectedCompanyIds = [];

    if (selectedIndex === -1) {
      newSelectedCompanyIds = newSelectedCompanyIds.concat(
        selectedCompanyIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCompanyIds = newSelectedCompanyIds.concat(
        selectedCompanyIds.slice(1)
      );
    } else if (selectedIndex === selectedCompanyIds.length - 1) {
      newSelectedCompanyIds = newSelectedCompanyIds.concat(
        selectedCompanyIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCompanyIds = newSelectedCompanyIds.concat(
        selectedCompanyIds.slice(0, selectedIndex),
        selectedCompanyIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCompanyIds(newSelectedCompanyIds);
  };

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
                    <TableCell>Tranaction Name</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(input)
                    .slice(page * limit, page * limit + limit)
                    .map((key, index) => (
                      <TableRow>
                        <TableCell>
                          <Typography color="textPrimary" variant="body1">
                            {`${input[key].name}`}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <NumberFormat
                            color="textPrimary"
                            variant="h3"
                            value={`${input[key].amount}`}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography color="textPrimary" variant="body1">
                            {moment(input[key].date).format("DD/MM/YYYY")}
                          </Typography>
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

export default InvestorBankTransactionListView;
