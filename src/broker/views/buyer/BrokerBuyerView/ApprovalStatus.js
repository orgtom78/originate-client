import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Grid,
  Table,
  TableRow,
  TableCell,
  TextField,
  TableHead,
  TableBody,
  Typography,
  colors,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
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
}));

const Limits = (input) => {
  const classes = useStyles();
  const [buyer, setBuyer] = useState("");
  const [id, setId] = useState("");
  const [buyer_loan_approved_amount, setBuyer_loan_approved_amount] =
    useState("");
  const [buyer_loan_rate, setBuyer_loan_rate] = useState("");

  useEffect(() => {
    async function get() {
      try {
        const data = await input.value.data.getBuyer;
        setBuyer(data);
        setBuyer_loan_approved_amount(data.buyer_loan_approved_amount);
        setBuyer_loan_rate(data.buyer_loan_rate);
        setId(data.id);
        return;
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    get();
  }, [input]);

  return (
    <Card className={clsx(classes.root)}>
      <CardContent>
        <Grid item xs={12}>
          <Typography color="textSecondary" gutterBottom variant="h6">
            APPROVAL STATUS
          </Typography>
          <Table
            className={classes.table}
            aria-label="simple table"
            size="small"
          >
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Current Status
                </TableCell>
                <TableCell align="right">{buyer.buyer_status || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Approved Limit
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    label="Approved Limit"
                    hintText="buyer_loan_approved_amount"
                    value={buyer_loan_approved_amount || ""}
                    thousandSeparator={true}
                    prefix={"$"}
                    customInput={TextField}
                    onValueChange={(values) => {
                      const { formattedValue, value } = values;
                      setBuyer_loan_approved_amount(value);
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Discount (pa)
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    label="Loan Rate"
                    value={buyer_loan_rate || ""}
                    thousandSeparator={true}
                    suffix={"%"}
                    customInput={TextField}
                    onValueChange={(values) => {
                      const { formattedValue, value } = values;
                      setBuyer_loan_rate(value);
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
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
