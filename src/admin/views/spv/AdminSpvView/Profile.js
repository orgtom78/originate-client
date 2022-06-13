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
  const [spvId, setSpvId] = useState("");
  const [userId, setUserId] = useState("");
  const [spv_name, setSpv_name] = useState("");
  const [spv_address_city, setSpv_address_city] = useState("");
  const [spv_country, setSpv_country] = useState("");
  const [spv_industry, setSpv_industry] = useState("");
  const [spv_logo, setSpv_logo] = useState("");
  const [identityId, setIdentityId] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadedFile, setUploadedFile] = useState("");
  const file = useRef(null);

  useEffect(() => {
    async function getSpv() {
      try {
        const data = await API.graphql(
          graphqlOperation(queries.getSpv, { id })
        );
        const {
          data: {
            getSpv: {
              userId,
              spvId,
              identityId,
              spv_logo,
              spv_name,
              spv_address_city,
              spv_country,
              spv_industry,
            },
          },
        } = data;
        setSpvId(spvId);
        setUserId(userId);
        setIdentityId(identityId);
        setSpv_name(spv_name);
        setSpv_address_city(spv_address_city);
        setSpv_country(spv_country);
        setSpv_industry(spv_industry);
        setSpv_logo(spv_logo);
        const z = await Storage.get(spv_logo, {
          level: "private",
          identityId: identityId,
        });
        setAvatar(z);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    getSpv();
  }, [id]);

  const city = spv_address_city;
  const country = spv_country;
  const industry = spv_industry;
  const name = spv_name;

  useEffect(() => {
    if (uploadedFile) {
      async function geturl() {
        const u = await Storage.get(uploadedFile, {
          level: "private",
          identityId: identityId,
        });
        setSpv_logo(uploadedFile);
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
    await Storage.vault.remove(spv_logo);
  }

  async function handleLogoSubmit(a) {
    setSuccess(false);
    setLoading(true);
    try {
      const u = a ? await s3Upload(a) : null;
      setUploadedFile(u);
      var spv_logo = u;
      const sortkey = spvId;
      await updateSpv({
        userId,
        sortkey,
        spv_logo,
      });
    } catch (e) {
      onError(e);
    }
    setSuccess(true);
    setLoading(false);
    navigate("/admin/spvs");
  }

  function updateSpv(input) {
    return API.graphql(
      graphqlOperation(mutations.updateSpv, { input: input })
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
            id="spv_logo"
            accept="image/*"
            style={{ display: "none" }}
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="spv_logo">
            <LoaderButton
              id="spv_logo"
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
