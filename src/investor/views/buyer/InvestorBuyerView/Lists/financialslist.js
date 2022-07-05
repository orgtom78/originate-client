import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
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
import makeStyles from "@mui/styles/makeStyles";
import PerfectScrollbar from "react-perfect-scrollbar";
import moment from "moment";
import getInitials from "src/utils/getInitials";
import NumberFormat from "react-number-format";
import { Storage } from "aws-amplify";

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
    minWidth: "100%",
    maxWidth: "100%",
  },
}));

const FinancialsListView = (value) => {
  const classes = useStyles();
  const [financials, setFinancials] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const items = value.value;
    const s = items.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.financials_reporting_period) - new Date(a.financials_reporting_period);
    });
    setFinancials(s);
  }, [value]);

  const geturl = async (input, id) => {
    if (input === "") {
      return;
    } else {
      const t = await Storage.get(input, {
        level: "private",
        identityId: id,
      });
      window.open(t, "_blank");
    }
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
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
                    <TableCell>Year</TableCell>
                    <TableCell>Revenue</TableCell>
                    <TableCell>Profit</TableCell>
                    <TableCell>Balance Sheet</TableCell>
                    <TableCell>Income Statement</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {financials.slice(0, limit).map((financials) => (
                    <TableRow hover key={financials.financialsId}>
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <Link to={`/investor/financials/${financials.id}`}>
                            <Avatar
                              className={classes.avatar}
                              src={`${financials.buyer_logo}`}
                            >
                              {getInitials(financials.buyer_name)}
                            </Avatar>
                          </Link>
                          <Link to={`/investor/financials/${financials.id}`}>
                            <Typography color="textPrimary" variant="body1">
                              {moment(
                                financials.financials_reporting_period
                              ).format("YYYY")}
                            </Typography>
                          </Link>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <NumberFormat
                          value={`${financials.sales}`}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </TableCell>
                      <TableCell>
                        <NumberFormat
                          value={`${financials.net_profit}`}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          label="Download"
                          color="primary"
                          target="_blank"
                          onClick={() =>
                            geturl(
                              financials.balance_sheet_attachment,
                              financials.identityId
                            )
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
                            geturl(
                              financials.income_statement_attachment,
                              financials.identityId
                            )
                          }
                        >
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
          <TablePagination
            component="div"
            count={financials.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default FinancialsListView;
