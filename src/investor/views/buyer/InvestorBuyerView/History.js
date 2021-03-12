import React, { useState } from "react";
import clsx from "clsx";
import moment from "moment";
import PropTypes from "prop-types";
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
  makeStyles,
} from "@material-ui/core";
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
  const [arr, setArr] = useState([]);

  async function get() {
    try {
      const data = await value;
      const ar = await data.data.getBuyer;
      if (ar) {
        setArr(ar);
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
            TRADING HISTORY
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
                  Year relationship began
                </TableCell>
                <TableCell align="right">
                  {moment(
                    arr.buyer_supplier_year_business_relation_started
                  ).format("YYYY")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Prior year sales
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={arr.buyer_previous_year_transaction_amount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Current year sales
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={arr.buyer_reporting_year_transaction_amount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Projected next year sales
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={arr.buyer_next_year_projected_transaction_amount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Goods sold description
                </TableCell>
                <TableCell align="right">
                  {arr.buyer_sold_goods_description}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Payment terms
                </TableCell>
                <TableCell align="right">{arr.buyer_payment_terms}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Invoicing currency
                </TableCell>
                <TableCell align="right">{arr.buyer_currency}</TableCell>
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
