import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  createTheme,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import * as queries from "src/graphql/queries.js";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { green, orange } from "@mui/material/colors";
import NumberFormat from "react-number-format";

const greenTheme = createTheme({
  palette: { primary: { main: green[500] }, secondary: { main: green[200] } },
});
const orangeTheme = createTheme({
  palette: { primary: { main: orange[500] }, secondary: { main: orange[200] } },
});

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: "flex-end",
  },
}));

const LatestLimits = ({ className, ...rest }) => {
  const classes = useStyles();
  const [limitdata, setLimitdata] = useState([]);

  useEffect(() => {
    const getRequests = async () => {
      let user = await Auth.currentAuthenticatedUser();
      let id = user.attributes["custom:groupid"];
      let filter = {
        request_status: { eq: "Under Review" },
        investorId: { eq: id },
      };
      const {
        data: {
          listRequests: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listRequests, { filter: filter })
      );
      const n = { data: { listRequests: { items: itemsPage1, nextToken } } };
      const items = await n.data.listRequests.items;
      setLimitdata(items);
    };
    getRequests();
  }, []);

  function checkstatus(status) {
    if (status === "Under Review") {
      return (
        <>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={orangeTheme}>
              <Chip label={status} color="secondary" />
            </ThemeProvider>
          </StyledEngineProvider>
        </>
      );
    } else {
      return (
        <>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={greenTheme}>
              <Chip label={status} color="primary" />
            </ThemeProvider>
          </StyledEngineProvider>
        </>
      );
    }
  }

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Latest invoices" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Buyer</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell sortDirection="desc">Created At</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {limitdata.map((limit) => (
                <TableRow hover key={limit.buyerId}>
                  <TableCell>
                    <Link to={`/investor/request/${limit.id}`}>
                      {limit.buyer_name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <NumberFormat
                      value={limit.invoice_amount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </TableCell>
                  <TableCell>
                    {moment(limit.createdAt).format("MM/DD/YYYY")}
                  </TableCell>
                  <TableCell>{checkstatus(limit.request_status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Link to={`/investor/requests`}>
          <Button
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
          >
            View all
          </Button>
        </Link>
      </Box>
    </Card>
  );
};

LatestLimits.propTypes = {
  className: PropTypes.string,
};

export default LatestLimits;
