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
  const [brokerId, setBrokerId] = useState("");
  const [userId, setUserId] = useState("");
  const [broker_name, setBroker_name] = useState("");
  const [broker_address_city, setBroker_address_city] = useState("");
  const [broker_country, setBroker_country] = useState("");
  const [broker_industry, setBroker_industry] = useState("");
  const [broker_logo, setBroker_logo] = useState("");
  const [identityId, setIdentityId] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadedFile, setUploadedFile] = useState("");
  const file = useRef(null);

  useEffect(() => {
    async function getBroker() {
      try {
        const data = await API.graphql(
          graphqlOperation(queries.getBroker, { id })
        );
        const {
          data: {
            getBroker: {
              userId,
              brokerId,
              identityId,
              broker_logo,
              broker_name,
              broker_address_city,
              broker_country,
              broker_industry,
            },
          },
        } = data;
        setBrokerId(brokerId);
        setUserId(userId);
        setIdentityId(identityId);
        setBroker_name(broker_name);
        setBroker_address_city(broker_address_city);
        setBroker_country(broker_country);
        setBroker_industry(broker_industry);
        setBroker_logo(broker_logo);
        const z = await Storage.get(broker_logo, {
          level: "private",
          identityId: identityId,
        });
        setAvatar(z);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    getBroker();
  }, [id]);

  const city = broker_address_city;
  const country = broker_country;
  const industry = broker_industry;
  const name = broker_name;

  useEffect(() => {
    if (uploadedFile) {
      async function geturl() {
        const u = await Storage.get(uploadedFile, {
          level: "private",
          identityId: identityId,
        });
        setBroker_logo(uploadedFile);
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
    await Storage.vault.remove(broker_logo);
  }

  async function handleLogoSubmit(a) {
    setSuccess(false);
    setLoading(true);
    try {
      const u = a ? await s3Upload(a) : null;
      setUploadedFile(u);
      var broker_logo = u;
      const sortkey = brokerId;
      await updateBroker({
        userId,
        sortkey,
        broker_logo,
      });
    } catch (e) {
      onError(e);
    }
    setSuccess(true);
    setLoading(false);
    navigate("/admin/brokers");
  }

  function updateBroker(input) {
    return API.graphql(
      graphqlOperation(mutations.updateBroker, { input: input })
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
            id="broker_logo"
            accept="image/*"
            style={{ display: "none" }}
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="broker_logo">
            <LoaderButton
              id="broker_logo"
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
