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

const Limits = ({ className, value, ...rest }) => {
  const classes = useStyles();
  const [obj, setObj] = useState({});

  useEffect(() => {
    async function get() {
      try {
        const data = await value.data.getBuyer;
        setObj(data);
        return;
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    get();
  }, [value]);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              ACCOUNT DEBTOR
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
                <TableRow>
                  <TableCell component="th" scope="row">
                    Name
                  </TableCell>
                  <TableCell align="right">{obj.buyer_name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Country
                  </TableCell>
                  <TableCell align="right">{obj.buyer_country}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Website
                  </TableCell>
                  <TableCell align="right">{obj.buyer_website}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Requested Limit
                  </TableCell>
                  <TableCell align="right">
                    <NumberFormat
                      value={obj.buyer_loan_request_amount}
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

Limits.propTypes = {
  className: PropTypes.string,
};

export default Limits;
