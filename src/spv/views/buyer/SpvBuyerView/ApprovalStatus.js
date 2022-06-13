import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Grid,
  Stack,
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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BlockIcon from "@mui/icons-material/Block";
import * as mutations from "src/graphql/mutations.js";
import { Auth, API, graphqlOperation } from "aws-amplify";
import LoaderButton from "src/components/LoaderButton.js";
import LoaderButtonRed from "src/components/LoaderButtonRed.js";
import { onError } from "src/libs/errorLib.js";
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

  const [approveloading, setApproveloading] = useState(false);
  const [approvesuccess, setApprovesuccess] = useState(false);
  const [declineloading, setDeclineloading] = useState(false);
  const [declinesuccess, setDeclinesuccess] = useState(false);

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

  async function onapprovedclick() {
    setApprovesuccess(false);
    setApproveloading(true);
    try {
      const buyer_status = "Approved";
      let user = await Auth.currentAuthenticatedUser();
      const spvId = user.attributes["custom:groupid"];
      await updateBuyer({
        id,
        spvId,
        buyer_status,
        buyer_loan_approved_amount,
        buyer_loan_rate,
      });
    } catch (e) {
      onError(e);
    }
    setApprovesuccess(true);
    setApproveloading(false);
    window.location.reload();
  }

  async function ondeclinedclick() {
    setDeclinesuccess(false);
    setDeclineloading(true);
    try {
      const buyer_status = "Declined";
      var buyer_loan_approved_amount = "0";
      await updateBuyer({
        id,
        buyer_status,
        buyer_loan_approved_amount,
      });
    } catch (e) {
      onError(e);
    }
    setDeclinesuccess(true);
    setDeclineloading(false);
    window.location.reload();
  }

  function updateBuyer(input) {
    return API.graphql(
      graphqlOperation(mutations.updateBuyer, { input: input })
    );
  }

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
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Stack spacing={2} direction="row">
            <LoaderButtonRed
              startIcon={<BlockIcon />}
              onClick={() => ondeclinedclick()}
              id="Declined"
              fullWidth
              component="span"
              disabled={declineloading}
              success={declinesuccess}
              loading={declineloading}
            >
              Decline
            </LoaderButtonRed>
            <LoaderButton
              startIcon={<CheckCircleOutlineIcon />}
              onClick={() => onapprovedclick()}
              id="Approved"
              fullWidth
              component="span"
              disabled={approveloading}
              success={approvesuccess}
              loading={approveloading}
            >
              Approve
            </LoaderButton>
          </Stack>
        </Grid>
      </CardContent>
    </Card>
  );
};

Limits.propTypes = {
  className: PropTypes.string,
};

export default Limits;
