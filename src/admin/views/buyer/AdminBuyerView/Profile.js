import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";
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
  const [buyer_name, setBuyer_name] = useState("");
  const [buyer_address_city, setBuyer_address_city] = useState("");
  const [buyer_country, setBuyer_country] = useState("");
  const [buyer_industry, setBuyer_industry] = useState("");
  const [buyer_logo, setBuyer_logo] = useState("");
  const [identityId, setIdentityId] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadedFile, setUploadedFile] = useState("");
  const file = useRef(null);

  useEffect(() => {
    async function getBuyer() {
      try {
        const data = await API.graphql(
          graphqlOperation(queries.getBuyer, { id })
        );
        const {
          data: {
            getBuyer: {
              identityId,
              buyer_logo,
              buyer_name,
              buyer_address_city,
              buyer_country,
              buyer_industry,
            },
          },
        } = data;
        setIdentityId(identityId);
        setBuyer_name(buyer_name);
        setBuyer_address_city(buyer_address_city);
        setBuyer_country(buyer_country);
        setBuyer_industry(buyer_industry);
        setBuyer_logo(buyer_logo);
        const z = await Storage.get(buyer_logo, {
          level: "private",
          identityId: identityId,
        });
        setAvatar(z);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    getBuyer();
  }, [id]);

  const city = buyer_address_city;
  const country = buyer_country;
  const industry = buyer_industry;
  const name = buyer_name;

  useEffect(() => {
    if (uploadedFile) {
      async function geturl() {
        const u = await Storage.get(uploadedFile, {
          level: "private",
          identityId: identityId,
        });
        setBuyer_logo(uploadedFile);
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
    await Storage.remove(buyer_logo,{
      level: "private",
      identityId: identityId,
    });
  }

  async function handleLogoSubmit(a) {
    setSuccess(false);
    setLoading(true);
    try {
      const u = a ? await s3Upload(a) : null;
      setUploadedFile(u);
      var buyer_logo = u;
      await updateBuyer({
        id,
        buyer_logo,
      });
    } catch (e) {
      onError(e);
    }
    setSuccess(true);
    setLoading(false);
    navigate(`/admin/buyer/${id}`);
  }

  function updateBuyer(input) {
    return API.graphql(
      graphqlOperation(mutations.updateBuyer, { input: input })
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
            id="buyer_logo"
            accept="image/*"
            style={{ display: "none" }}
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="buyer_logo">
            <LoaderButton
              id="buyer_logo"
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
