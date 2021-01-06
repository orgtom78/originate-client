import React, { useState, useEffect, useRef } from "react";
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
import { useUser } from "src/components/usercontext.js";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import { Storage } from "aws-amplify";
import LoaderButton from "src/components/LoaderButton.js";
import { s3Upload } from "src/libs/awsLib.js";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
}));

export default function Profile({ className, ...rest }) {
  const classes = useStyles();
  const [avatar, setAvatar] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [company_name, setCompany_name] = useState("");
  const [company_address_city, setCompany_address_city] = useState("");
  const [company_country, setCompany_country] = useState("");
  const [company_industry, setCompany_industry] = useState("");
  const [company_logo, setCompany_logo] = useState("");
  const [sub, setSub] = useState("");
  const context = useUser();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadedFile, setUploadedFile] = useState("");
  const file = useRef(null);

  React.useEffect(() => {
    // attempt to fetch the info of the user that was already logged in
    async function onLoad() {
      const data = await context;
      const {
        sub,
        companyId,
        company_name,
        company_address_city,
        company_country,
        company_industry,
        company_logo,
      } = data;
      setSub(sub);
      setCompanyId(companyId);
      setCompany_name(company_name);
      setCompany_address_city(company_address_city);
      setCompany_country(company_country);
      setCompany_industry(company_industry);
      setCompany_logo(company_logo);
      const z = await Storage.vault.get(company_logo);
      setAvatar(z);
    }
    onLoad();
  }, [context]);

  const city = company_address_city;
  const country = company_country;
  const industry = company_industry;
  const name = company_name;

  useEffect(() => {
    if (uploadedFile) {
      async function geturl() {
        const u = await Storage.vault.get(uploadedFile);
        setCompany_logo(uploadedFile);
        setAvatar(u);
      }
      geturl();
    }
  }, [uploadedFile]);

  function handleFileChange(event) {
    file.current = event.target.files[0];
    const a = file.current;
    deleteold();
    handleLogoSubmit(a);
  }

  async function deleteold() {
    await Storage.vault.remove(company_logo);
  }

  async function handleLogoSubmit(a) {
    setSuccess(false);
    setLoading(true);
    try {
      const u = a ? await s3Upload(a) : null;
      setUploadedFile(u);
      var company_logo = u;
      const userId = sub;
      const sortkey = companyId;
      await updateCompany({
        userId,
        sortkey,
        company_logo,
      });
    } catch (e) {
      onError(e);
    }
    setSuccess(true);
    setLoading(false);
  }

  function updateCompany(input) {
    return API.graphql(
      graphqlOperation(mutations.updateCompany, { input: input })
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
      <CardActions>
      <div>
        <input
          id="company_logo"
          accept="image/*"
          style={{ display: "none" }}
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="company_logo">
          <LoaderButton
            id="company_logo"
            color="primary"
            variant="text"
            component="span"
            fullWidth
            disabled={loading}
            success={success}
            loading={loading}
          >
            {" "}
            Update Company Logo
          </LoaderButton>
        </label>
        </div>
      </CardActions>
    </Card>
  );
}
