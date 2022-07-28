import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  colors,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import * as mutations from "src/graphql/mutations.js";
import { API, graphqlOperation } from "aws-amplify";
import LoaderButton from "src/components/LoaderButton.js";
import { onError } from "src/libs/errorLib.js";

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
  const [buyer_description, setBuyer_description] = useState("");

  const [approveloading, setApproveloading] = useState(false);
  const [approvesuccess, setApprovesuccess] = useState(false);

  useEffect(() => {
    async function get() {
      try {
        const data = await input.value.data.getBuyer;
        setBuyer(data);
        setBuyer_description(data.buyer_description);
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
      await updateBuyer({
        id,
        buyer_description,
      });
    } catch (e) {
      onError(e);
    }
    setApprovesuccess(true);
    setApproveloading(false);
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
            BUYER DESCRIPTION
          </Typography>

          <TextField
            id="outlined-multiline-flexible"
            multiline
            fullWidth
            rows={4}
            value={buyer_description || ""}
            onChange={(e) => setBuyer_description(e.target.value)}
          />
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
            Update
          </LoaderButton>
        </Grid>
      </CardContent>
    </Card>
  );
};

Limits.propTypes = {
  className: PropTypes.string,
};

export default Limits;
