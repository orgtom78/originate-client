import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Avatar, Box, Card, CardActions, CardContent, Divider, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { API, graphqlOperation } from "aws-amplify";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import { Storage } from "aws-amplify";
import LoaderButton from "src/components/LoaderButton.js";
import { s3Upload } from "src/libs/awsLib.js";
import * as queries from "src/graphql/queries.js";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
}));

export default function Profile({ className, value, ...rest }) {
  const id = value;
  const classes = useStyles();
  const [avatar, setAvatar] = useState("");
  const [investorId, setInvestorId] = useState("");
  const [userId, setUserId] = useState("");
  const [investor_name, setInvestor_name] = useState("");
  const [investor_address_city, setInvestor_address_city] = useState("");
  const [investor_country, setInvestor_country] = useState("");
  const [investor_industry, setInvestor_industry] = useState("");
  const [investor_logo, setInvestor_logo] = useState("");
  const [identityId, setIdentityId] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadedFile, setUploadedFile] = useState("");
  const file = useRef(null);

  useEffect(() => {
    async function getInvestor() {
      try {
        const data = await API.graphql(
          graphqlOperation(queries.getInvestor, { id })
        );
        const {
          data: {
            getInvestor: {
              userId,
              investorId,
              identityId,
              investor_logo,
              investor_name,
              investor_address_city,
              investor_country,
              investor_industry,
            },
          },
        } = data;
        setInvestorId(investorId);
        setUserId(userId);
        setIdentityId(identityId);
        setInvestor_name(investor_name);
        setInvestor_address_city(investor_address_city);
        setInvestor_country(investor_country);
        setInvestor_industry(investor_industry);
        setInvestor_logo(investor_logo);
        const z = await Storage.get(investor_logo, {
          level: "private",
          identityId: identityId,
        });
        setAvatar(z);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    getInvestor();
  }, [id]);

  const city = investor_address_city;
  const country = investor_country;
  const industry = investor_industry;
  const name = investor_name;

  useEffect(() => {
    if (uploadedFile) {
      async function geturl() {
        const u = await Storage.get(uploadedFile, {
          level: "private",
          identityId: identityId,
        });
        setInvestor_logo(uploadedFile);
        setAvatar(u);
      }
      geturl();
    }
  }, [uploadedFile, identityId]);

  function handleFileChange(event) {
    file.current = event.target.files[0];
    const a = file.current;
    if (a) {
      deleteold();
      handleLogoSubmit(a);
    }
  }

  async function deleteold() {
    await Storage.vault.remove(investor_logo);
  }

  async function handleLogoSubmit(a) {
    setSuccess(false);
    setLoading(true);
    try {
      const u = a ? await s3Upload(a) : null;
      setUploadedFile(u);
      var investor_logo = u;
      const sortkey = investorId;
      await updateInvestor({
        userId,
        sortkey,
        investor_logo,
      });
    } catch (e) {
      onError(e);
    }
    setSuccess(true);
    setLoading(false);
    navigate("/admin/investors");
  }

  function updateInvestor(input) {
    return API.graphql(
      graphqlOperation(mutations.updateInvestor, { input: input })
    );
  }

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar} src={avatar} />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {name}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${city} ${country}`}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${industry}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions style={{ width: "100%", justifyContent: "center" }}>
        <Box>
          <input
            id="investor_logo"
            accept="image/*"
            style={{ display: "none" }}
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="investor_logo">
            <LoaderButton
              id="investor_logo"
              color="primary"
              variant="text"
              fullWidth
              component="span"
              disabled={loading}
              success={success}
              loading={loading}
            >
              {" "}
              Update Company Logo
            </LoaderButton>
          </label>
        </Box>
      </CardActions>
    </Card>
  );
}
