import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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


export default function Profile({ className, ...rest }) {
  const classes = useStyles();
  const [avatar, setAvatar] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [supplier_name, setSupplier_name] = useState("");
  const [supplier_address_city, setSupplier_address_city] = useState("");
  const [supplier_country, setSupplier_country] = useState("");
  const [supplier_industry, setSupplier_industry] = useState("");
  const [supplier_logo, setSupplier_logo] = useState("");
  const [sub, setSub] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadedFile, setUploadedFile] = useState("");
  const file = useRef(null);


  useEffect(() => {
    async function getSupplier(ident, key){
      var userId = ident;
      var sortkey = key;
      try {
      const data = await API.graphql(graphqlOperation(queries.getSupplier, { userId, sortkey }));
      const { data: { getSupplier: {
        sub,
        supplierId,
        supplier_logo,
        supplier_name,
        supplier_address_city,
        supplier_country,
        supplier_industry,
      }}} = data;
      setSub(sub);
      setSupplierId(supplierId);
      setSupplier_name(supplier_name);
      setSupplier_address_city(supplier_address_city);
      setSupplier_country(supplier_country);
      setSupplier_industry(supplier_industry);
      setSupplier_logo(supplier_logo);
      const z = await Storage.vault.get(supplier_logo);
      setAvatar(z);
    } catch (err) {
      console.log("error fetching data..", err);
    }}}, []);

  const city = supplier_address_city;
  const country = supplier_country;
  const industry = supplier_industry;
  const name = supplier_name;

  //'https://www.gravatar.com/avatar/dcd44927-2efd-4fc0-b955-0c676d04f738?d=identicon'//

  useEffect(() => {
    if (uploadedFile) {
      async function geturl() {
        const u = await Storage.vault.get(uploadedFile);
        setSupplier_logo(uploadedFile);
        setAvatar(u);
      }
      geturl();
    }
  }, [uploadedFile]);

  function handleFileChange(event) {
    file.current = event.target.files[0];
    const a = file.current;
    if(a){
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
      const userId = sub;
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
      <CardActions style={{ width: '100%', justifyContent: 'center'}}>
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
