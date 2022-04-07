import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import {
  Card,
  CardContent,
  Grid,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Typography,
  colors,
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56,
  },
  differenceIcon: {
    color: colors.red[900],
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1),
  },
  table: {
    minWidth: "100%",
    maxWidth: "100%",
  },
  tableRow: {
    backgroundColor: colors.teal[400],
  },
}));

const Limits = ({ className, value, ...rest }) => {
  const classes = useStyles();
  const [financials, setFinancials] = useState([]);

  async function get() {
    try {
      const data = await value;
      const ar = await data[0];
      if (ar) {
        setFinancials(ar);
      }
      return;
    } catch (err) {
      console.log("error fetching data..", err);
    }
  }
  get();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            FINANCIAL RATIOS
          </Typography>
          <Table
            className={classes.table}
            size="small"
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow className={classes.tableRow}>
                <TableCell component="th" scope="row" color="pink">
                  Year
                </TableCell>
                <TableCell align="right">
                  {moment(financials.financials_reporting_period).format(
                    "YYYY"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Working Capital / Total Assets
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.working_capital / financials.total_assets}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale="2"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Retained Earnings / Total Assets
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={
                      financials.retained_earnings / financials.total_assets
                    }
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale="2"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  EBIT / Total Assets
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.ebit / financials.total_assets}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale="2"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Market value of Equity / Total Liabilities
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={
                      financials.equity_market_value /
                      financials.total_liabilities
                    }
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale="2"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Sales / Total Assets
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.sales / financials.total_assets}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale="2"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Altman Z-Score
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={
                      1.2 *
                        (financials.working_capital / financials.total_assets) +
                      1.4 *
                        (financials.retained_earnings /
                          financials.total_assets) +
                      3.3 * (financials.ebit / financials.total_assets) +
                      0.6 *
                        (financials.equity_market_value /
                          financials.total_liabilities) +
                      1 * (financials.sales / financials.total_assets)
                    }
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale="2"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </CardContent>
    </Card>
  );
};

Limits.propTypes = {
  className: PropTypes.string,
};

export default Limits;
