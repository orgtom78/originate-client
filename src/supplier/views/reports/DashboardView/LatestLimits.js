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
  TableSortLabel,
  Tooltip,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import { useUser } from "src/components/context/usercontext.js";
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
  const context = useUser();
  const sub = context.sub;
  const [limitdata, setLimitdata] = useState([]);

  useEffect(() => {
    async function loadRequest() {
      const a = await sub;
      return a;
    }
    loadRequest();
  }, [sub]);

  useEffect(() => {
    const getRequests = async () => {
      const id = sub;
      let filter = {
        userId: { eq: id },
      };
      const {
        data: {
          listBuyers: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listBuyers, { filter: filter, limit: 10000 })
      );
      const n = { data: { listBuyers: { items: itemsPage1, nextToken } } };
      const items = await n.data.listBuyers.items;
      setLimitdata(items);
    };
    getRequests();
  }, [sub]);

  function checkstatus(status) {
    if (status === "submitted") {
      return (
        <>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={orangeTheme}>
              <Chip label={status} color="primary" />
            </ThemeProvider>
          </StyledEngineProvider>
        </>
      );
    } else if (
      status === "Under Review" ||
      status === "Investor Offer Pending"
    ) {
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
      <CardHeader title="Latest Limits" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Buyer</TableCell>
                <TableCell>Requested Limit</TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {limitdata.map((limit) => (
                <TableRow hover key={limit.buyerId}>
                  <TableCell>{limit.buyer_name}</TableCell>
                  <TableCell>
                    <NumberFormat
                      value={limit.buyer_loan_request_amount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </TableCell>
                  <TableCell>
                    {moment(limit.createdAt).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>{checkstatus(limit.buyer_status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Link to={`/app/buyers`}>
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
