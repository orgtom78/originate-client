import React, { useState, useEffect } from "react";
import clsx from "clsx";
import moment from "moment";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
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
  tableRow2: {
    backgroundColor: colors.teal[200],
  },
}));

const Limits = ({ className, value, ...rest }) => {
  const classes = useStyles();
  const [financials, setFinancials] = useState([]);
  const [financials2, setFinancials2] = useState([]);
  const [financials3, setFinancials3] = useState([]);

  useEffect(() => {
    async function get1() {
      try {
        const data = await value;
        var previousyear = moment()
          .subtract(365, "days")
          .format("YYYY");
        var previousfinancials = await data.filter(
          (e) =>
            moment(e.financials_reporting_period).format("YYYY") ===
            previousyear
        );
        const a = await previousfinancials[0];
        if (a !== undefined) {
          setFinancials(a);
        }
        return;
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    get1();
  }, [value]);

  useEffect(() => {
    async function get2() {
      try {
        const data = await value;
        var previousyear = moment()
          .subtract(730, "days")
          .format("YYYY");
        var previousfinancials = await data.filter(
          (e) =>
            moment(e.financials_reporting_period).format("YYYY") ===
            previousyear
        );
        const a = await previousfinancials[0];
        if (a !== undefined) {
          setFinancials2(a);
        }
        return;
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    get2();
  }, [value]);

  useEffect(() => {
    async function get3() {
      try {
        const data = await value;
        var previousyear = moment()
          .subtract(1095, "days")
          .format("YYYY");
        var previousfinancials = await data.filter(
          (e) =>
            moment(e.financials_reporting_period).format("YYYY") ===
            previousyear
        );
        const a = await previousfinancials[0];
        if (a !== undefined) {
          setFinancials3(a);
        }
        return;
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    get3();
  }, [value]);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid item>
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
                <TableCell component="th" scope="row" color="teal">
                  <Box fontWeight="fontWeightBold">Year</Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    {moment(financials.financials_reporting_period).format(
                      "YYYY"
                    )}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    {moment(financials2.financials_reporting_period).format(
                      "YYYY"
                    )}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    {moment(financials3.financials_reporting_period).format(
                      "YYYY"
                    )}
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow2}>
                <TableCell component="th" scope="row">
                  Balance Sheet
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Cash
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.cash}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.cash}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.cash}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Accounts Receivable
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.accounts_receivable}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.accounts_receivable}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.accounts_receivable}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Inventory
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.inventory}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.inventory}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.inventory}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Other Current Assets
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.other_current_assets}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.other_current_assets}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.other_current_assets}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Box fontWeight="fontWeightBold">Current Assets</Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials.current_assets}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials2.current_assets}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials3.current_assets}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Fixed Assets (PPE)
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.sale_purchase_of_fixed_asset}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.sale_purchase_of_fixed_asset}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.sale_purchase_of_fixed_asset}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Goodwill/Intangibles
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.goodwill}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.goodwill}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.goodwill}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Other Non-current Assets
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.other_non_current_assets}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.other_non_current_assets}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.other_non_current_assets}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Box fontWeight="fontWeightBold">Total Assets</Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials.total_assets}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials2.total_assets}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials3.total_assets}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Accounts Payable
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.accounts_payable}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.accounts_payable}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.accounts_payable}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Current Portion of Long-Term Debt
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.current_long_term_debt}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.current_long_term_debt}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.current_long_term_debt}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Other Current Liabilities
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.other_current_liabilities}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.other_current_liabilities}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.other_current_liabilities}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Box fontWeight="fontWeightBold">Current Liabilities</Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials.current_liabilities}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials2.current_liabilities}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials3.current_liabilities}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Long Term Debt
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.long_term_debt}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.long_term_debt}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.long_term_debt}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Other Long Term Liabilities
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.other_long_term_liabilities}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.other_long_term_liabilities}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.other_long_term_liabilities}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Box fontWeight="fontWeightBold">Total Liabilities</Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials.total_liabilities}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials2.total_liabilities}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials3.total_liabilities}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Box fontWeight="fontWeightBold">Equity</Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials.total_equity}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials2.total_equity}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials3.total_equity}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Box fontWeight="fontWeightBold">
                    Total Liabilities and Equity
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={
                        financials.total_liabilities_and_equity
                      }
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={
                        financials2.total_liabilities_and_equity
                      }
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={
                        financials3.total_liabilities_and_equity
                      }
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow2}>
                <TableCell component="th" scope="row">
                  Income Statement
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Sales
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.sales}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.sales}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.sales}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Cost of Goods Sold
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.cost_of_goods_sold}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.cost_of_goods_sold}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.cost_of_goods_sold}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Box fontWeight="fontWeightBold">Gross Margin</Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials.gross_margin}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials2.gross_margin}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials3.gross_margin}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Depreciation
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.depreciation_expenses}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.depreciation_expenses}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.depreciation_expenses}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Operating Expenses
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.operating_expenses}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.operating_expenses}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.operating_expenses}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Box fontWeight="fontWeightBold">Operating Income</Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials.operating_income}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials2.operating_income}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials3.operating_income}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Interest Expenses
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.interest_expenses}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.interest_expenses}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.interest_expenses}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Other Expenses
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.other_expenses}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.other_expenses}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.other_expenses}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Box fontWeight="fontWeightBold">EBT</Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials.ebt}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials.ebt}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials2.ebt}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials3.ebt}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Income Tax Expenses
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.income_tax_expense}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.income_tax_expense}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.income_tax_expense}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  EBIT
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.ebit}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.ebit}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.ebit}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Extraordinary Income/Expense
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.extraordinary_income}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.extraordinary_income}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.extraordinary_income}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Box fontWeight="fontWeightBold">Net Profit</Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials.net_profit}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials2.net_profit}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="fontWeightBold">
                    <NumberFormat
                      value={financials3.net_profit}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow2}>
                <TableCell component="th" scope="row">
                  Cash Flow
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Cash Flow from Operations
                </TableCell>
                <TableCell align="right">
                <NumberFormat
                    value={financials.cash_flow}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.cash_flow}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.cash_flow}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow2}>
                <TableCell component="th" scope="row">
                  Financials Breakdown
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  EBITDA
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.ebitda}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.ebitda}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.ebitda}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Current Ratio
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.current_ratio}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale='2'
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.current_ratio}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale='2'
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.current_ratio}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale='2'
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Debt / Equity
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.debt_equity_ratio}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale='2'
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.debt_equity_ratio}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale='2'
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.debt_equity_ratio}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale='2'
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Debt / EBITDA
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.debt_ebitda_ratio}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale='2'
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.debt_ebitda_ratio}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale='2'
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.debt_ebitda_ratio}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale='2'
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Inventory Turnover
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.inventory_turnover}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale='2'
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.inventory_turnover}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale='2'
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.inventory_turnover}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale='2'
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Interest Coverage
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials.interest_coverage}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale='2'
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials2.interest_coverage}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale='2'
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={financials3.interest_coverage}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale='2'
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
