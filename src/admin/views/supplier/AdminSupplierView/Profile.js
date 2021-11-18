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
  const [supplierId, setSupplierId] = useState("");
  const [userId, setUserId] = useState("");
  const [supplier_name, setSupplier_name] = useState("");
  const [supplier_address_city, setSupplier_address_city] = useState("");
  const [supplier_country, setSupplier_country] = useState("");
  const [supplier_industry, setSupplier_industry] = useState("");
  const [supplier_logo, setSupplier_logo] = useState("");
  const [identityId, setIdentityId] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadedFile, setUploadedFile] = useState("");
  const file = useRef(null);

  useEffect(() => {
    async function getSupplier() {
      try {
        const data = await API.graphql(
          graphqlOperation(queries.getSupplier, { id })
        );
        const {
          data: {
            getSupplier: {
              userId,
              supplierId,
              identityId,
              supplier_logo,
              supplier_name,
              supplier_address_city,
              supplier_country,
              supplier_industry,
            },
          },
        } = data;
        setSupplierId(supplierId);
        setUserId(userId);
        setIdentityId(identityId);
        setSupplier_name(supplier_name);
        setSupplier_address_city(supplier_address_city);
        setSupplier_country(supplier_country);
        setSupplier_industry(supplier_industry);
        setSupplier_logo(supplier_logo);
        const z = await Storage.get(supplier_logo, {
          level: "private",
          identityId: identityId,
        });
        setAvatar(z);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    getSupplier();
  }, [id]);

  const city = supplier_address_city;
  const country = supplier_country;
  const industry = supplier_industry;
  const name = supplier_name;

  useEffect(() => {
    if (uploadedFile) {
      async function geturl() {
        const u = await Storage.get(uploadedFile, {
          level: "private",
          identityId: identityId,
        });
        setSupplier_logo(uploadedFile);
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
    await Storage.vault.remove(supplier_logo);
  }

  async function handleLogoSubmit(a) {
    setSuccess(false);
    setLoading(true);
    try {
      const u = a ? await s3Upload(a) : null;
      setUploadedFile(u);
      var supplier_logo = u;
      const sortkey = supplierId;
      await updateSupplier({
        userId,
        sortkey,
        supplier_logo,
      });
    } catch (e) {
      onError(e);
    }
    setSuccess(true);
    setLoading(false);
    navigate("/admin/suppliers");
  }

  function updateSupplier(input) {
    return API.graphql(
      graphqlOperation(mutations.updateSupplier, { input: input })
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
            id="supplier_logo"
            accept="image/*"
            style={{ display: "none" }}
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="supplier_logo">
            <LoaderButton
              id="supplier_logo"
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
