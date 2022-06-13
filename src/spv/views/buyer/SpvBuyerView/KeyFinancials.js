import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import NumberFormat from "react-number-format";

const Limits = (input) => {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    async function get() {
      try {
        const data = await input.value[0];
        if (data === undefined || data.length === 0) {
          setArr([])
        } else {
          setArr(data);
        }
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    get();
  }, [input]);

  return (
    <Card>
      <CardContent>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            KEY FINANCIALS
          </Typography>
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row" color="pink">
                  Year
                </TableCell>
                <TableCell align="right">
                  {moment(arr.financials_reporting_period).format("YYYY")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Sales
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={arr.sales}
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
                    value={arr.ebit}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Working Capital
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={arr.working_capital}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Retained Earnings
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={arr.retained_earnings}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Total Assets
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={arr.total_assets}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Market Value of Equity
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={arr.equity_market_value}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
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

export default Limits;
