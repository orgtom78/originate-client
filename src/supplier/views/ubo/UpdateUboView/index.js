import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clsx from "clsx";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Page from "src/components/Page";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "src/graphql/mutations.js";
import LoaderButton from "src/components/LoaderButton.js";
import { UploadCloud as UploadIcon } from "react-feather";
import { useUser } from "src/components/context/usercontext.js";
import { onError } from "src/libs/errorLib.js";
import { Storage } from "aws-amplify";
import { green } from "@material-ui/core/colors";

const idtype = [
  {
    value: "Passport",
    label: "Passport",
  },
  {
    value: "Identification Card",
    label: "Identification Card",
  },
  {
    value: "Driver's  License",
    label: "Driver's  License",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  wrapper: {
    margin: "auto",
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const UpdateUboForm = ({ className, ...rest }) => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const context = useUser();
  const sub = context.sub;

  const [uboId, setUboId] = useState("");
  const [ubo_name, setUbo_name] = useState("");
  const [ubo_email, setUbo_email] = useState("");
  const [ubo_phone_number, setUbo_phone_number] = useState("");
  const [ubo_id_attachment, setUbo_id_attachment] = useState("");
  const [ubo_id_number, setUbo_id_number] = useState("");
  const [ubo_id_type, setUbo_id_type] = useState("");
  const [ubo_nationality, setUbo_nationality] = useState("");
  const [ubo_poa_attachment, setUbo_poa_attachment] = useState("");
  const [ubo_country_of_residence, setUbo_country_of_residence] = useState("");

  const [uboloading, setUboLoading] = useState(false);
  const [ubosuccess, setUboSuccess] = useState(false);

  const [uboidloading, setUboidLoading] = useState(false);
  const [uboidsuccess, setUboidSuccess] = useState(false);
  const [ubopoaloading, setUbopoaLoading] = useState(false);
  const [ubopoasuccess, setUbopoaSuccess] = useState(false);

  const [uboidimg, setUboidImg] = useState("");
  const [uboidpdf, setUboidpdf] = useState("");
  const [ubopoaimg, setUbopoaImg] = useState("");
  const [ubopoapdf, setUbopoapdf] = useState("");

  const file = useRef(null);

  const uboidlabel = "ubo_id_attachment";
  const uboidname = "Owner ID";
  const ubopoalabel = "ubo_poa_attachment";
  const ubopoaname = "Owner Proof of Address";

  useEffect(() => {
    const sub = context.sub;
    var userId = sub;
    var sortkey = id;
    getUbo({ userId, sortkey });
  }, [context, id]);

  async function getUbo(input) {
    try {
      const ubo = await API.graphql(graphqlOperation(queries.getUbo, input));
      const {
        data: {
          getUBO: {
            uboId,
            ubo_name,
            ubo_email,
            ubo_phone_number,
            ubo_id_attachment,
            ubo_id_number,
            ubo_id_type,
            ubo_nationality,
            ubo_poa_attachment,
            ubo_country_of_residence,
          },
        },
      } = ubo;
      setUboId(uboId);
      setUbo_name(ubo_name);
      setUbo_email(ubo_email);
      setUbo_phone_number(ubo_phone_number);
      setUbo_id_attachment(ubo_id_attachment);
      setUbo_id_number(ubo_id_number);
      setUbo_id_type(ubo_id_type);
      setUbo_nationality(ubo_nationality);
      setUbo_poa_attachment(ubo_poa_attachment);
      setUbo_country_of_residence(ubo_country_of_residence);
    } catch (err) {
      console.log("error fetching data..", err);
    }
  }

  async function handleUboSubmit() {
    setUboSuccess(false);
    setUboLoading(true);
    try {
      const userId = sub;
      const sortkey = uboId;
      await updateUbo({
        userId,
        sortkey,
        ubo_name,
        ubo_email,
        ubo_phone_number,
        ubo_id_attachment,
        ubo_id_number,
        ubo_id_type,
        ubo_nationality,
        ubo_poa_attachment,
        ubo_country_of_residence,
      });
    } catch (e) {
      onError(e);
    }
    setUboSuccess(true);
    setUboLoading(false);
    navigate("/app/account");
  }

  function updateUbo(input) {
    return API.graphql(graphqlOperation(mutations.updateUbo, { input: input }));
  }

  useEffect(() => {
    if (ubo_id_attachment) {
      async function getuboidimgurl() {
        var uploadext = ubo_id_attachment.split(".").pop();
        var imageExtensions = [
          "jpg",
          "jpeg",
          "bmp",
          "gif",
          "png",
          "tiff",
          "eps",
          "svg",
        ];
        var x = imageExtensions.includes(uploadext);
        if (x === true) {
          var y = await Storage.vault.get(ubo_id_attachment);
          setUboidImg(y);
        }
      }
      getuboidimgurl();
    }
  }, [ubo_id_attachment]);

  useEffect(() => {
    if (ubo_id_attachment) {
      async function getuboidpdfurl() {
        var uploadext = ubo_id_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        var x = imageExtensions.includes(uploadext);
        if (x === true) {
          var y = await Storage.vault.get(ubo_id_attachment);
          setUboidpdf(y);
        }
      }
      getuboidpdfurl();
    }
  }, [ubo_id_attachment]);

  function uboidisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(uboidimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={uboidimg} />
          <div>
            <input
              id={uboidimg}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handleuboidChange(event)}
            />
            <label htmlFor={uboidimg}>
              <LoaderButton
                id={uboidimg}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={uboidloading}
                success={uboidsuccess}
                loading={uboidloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else if (regex.test(uboidpdf)) {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            allowFullScreen
            src={uboidpdf}
          />
          <div>
            <input
              id={uboidpdf}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handleuboidChange(event)}
            />
            <label htmlFor={uboidpdf}>
              <LoaderButton
                id={uboidpdf}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={uboidloading}
                success={uboidsuccess}
                loading={uboidloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else {
      return (
        <>
          <input
            name={label}
            id={label}
            accept="image/*,application/pdf"
            style={{ display: "none" }}
            type="file"
            onChange={(event) => handleuboidChange(event)}
          />
          <label htmlFor={label}>
            <LoaderButton
              id={label}
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={uboidloading}
              success={uboidsuccess}
              loading={uboidloading}
            >
              {" "}
              {name}
            </LoaderButton>
          </label>
        </>
      );
    }
  }

  async function s3Up(file, name) {
    var fileExtension = file.name.split(".").pop();
    const filename = `${sub}${uboId}${name}.${fileExtension}`;

    const stored = await Storage.vault.put(filename, file, {
      contentType: file.type,
    });
    return stored.key;
  }


  function handleuboidChange(event) {
    file.current = event.target.files[0];
    const newuboidfile = file.current;
    onuboidChange(newuboidfile);
  }

  async function onuboidChange(newfile) {
    setUboidSuccess(false);
    setUboidLoading(true);
    try {
      const u = newfile ? await s3Up(newfile, "ubo_id_attachment") : null;
      var ubo_id_attachment = u;
      const sortkey = uboId;
      const userId = sub;
      await updateUbo({
        sortkey,
        userId,
        ubo_id_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setUboidSuccess(true);
    setUboidLoading(false);
    navigate("/app/account");
  }

  useEffect(() => {
    if (ubo_poa_attachment) {
      async function getubopoaimgurl() {
        var uploadext = ubo_poa_attachment.split(".").pop();
        var imageExtensions = [
          "jpg",
          "jpeg",
          "bmp",
          "gif",
          "png",
          "tiff",
          "eps",
          "svg",
        ];
        var x = imageExtensions.includes(uploadext);
        if (x === true) {
          var y = await Storage.vault.get(ubo_poa_attachment);
          setUbopoaImg(y);
        }
      }
      getubopoaimgurl();
    }
  }, [ubo_poa_attachment]);

  useEffect(() => {
    if (ubo_poa_attachment) {
      async function getubopoapdfurl() {
        var uploadext = ubo_poa_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        var x = imageExtensions.includes(uploadext);
        if (x === true) {
          var y = await Storage.vault.get(ubo_poa_attachment);
          setUbopoapdf(y);
        }
      }
      getubopoapdfurl();
    }
  }, [ubo_poa_attachment]);

  function ubopoaisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(ubopoaimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={ubopoaimg} />
          <div>
            <input
              id={ubopoaimg}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handleubopoaChange(event)}
            />
            <label htmlFor={ubopoaimg}>
              <LoaderButton
                id={ubopoaimg}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={ubopoaloading}
                success={ubopoasuccess}
                loading={ubopoaloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else if (regex.test(ubopoapdf)) {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            allowFullScreen
            src={ubopoapdf}
          />
          <div>
            <input
              id={ubopoapdf}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handleubopoaChange(event)}
            />
            <label htmlFor={ubopoapdf}>
              <LoaderButton
                id={ubopoapdf}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={ubopoaloading}
                success={ubopoasuccess}
                loading={ubopoaloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else {
      return (
        <>
          <input
            name={label}
            id={label}
            accept="image/*,application/pdf"
            style={{ display: "none" }}
            type="file"
            onChange={(event) => handleubopoaChange(event)}
          />
          <label htmlFor={label}>
            <LoaderButton
              id={label}
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={ubopoaloading}
              success={ubopoasuccess}
              loading={ubopoaloading}
            >
              {" "}
              {name}
            </LoaderButton>
          </label>
        </>
      );
    }
  }

  function handleubopoaChange(event) {
    file.current = event.target.files[0];
    const newubopoafile = file.current;
    onubopoaChange(newubopoafile);
  }

  async function onubopoaChange(newfile) {
    setUbopoaSuccess(false);
    setUbopoaLoading(true);
    try {
      const u = newfile ? await s3Up(newfile, "ubo_poa_attachment") : null;
      var ubo_poa_attachment = u;
      const sortkey = uboId;
      const userId = sub;
      await updateUbo({
        sortkey,
        userId,
        ubo_poa_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setUbopoaSuccess(true);
    setUbopoaLoading(false);
    navigate("/app/account");
  }

  return (
    <Page title="Update Owner">
      <Container>
        <form
          autoComplete="off"
          noValidate
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Company Owner Name"
                    name="ubo_name"
                    onChange={(e) => setUbo_name(e.target.value)}
                    required
                    value={ubo_name || ""}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Company Owner Email"
                    name="ubo_email"
                    onChange={(e) => setUbo_email(e.target.value)}
                    required
                    value={ubo_email || ""}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Company Owner Phone"
                    name="ubo_phone_number"
                    onChange={(e) => setUbo_phone_number(e.target.value)}
                    required
                    value={ubo_phone_number || ""}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Select
                    fullWidth
                    label="Company Owner ID Type"
                    name="ubo_id_type"
                    onChange={(e) => setUbo_id_type(e.target.value)}
                    required
                    value={ubo_id_type || ""}
                    variant="outlined"
                  >
                    {idtype.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Company Owner ID Number"
                    name="ubo_id_number"
                    onChange={(e) => setUbo_id_number(e.target.value)}
                    required
                    value={ubo_id_number || ""}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <LoaderButton
                startIcon={<UploadIcon />}
                disabled={uboloading}
                success={ubosuccess}
                loading={uboloading}
                onClick={handleUboSubmit}
              >
                Update Ubo details
              </LoaderButton>
            </Box>
          </Card>
        </form>
        <Divider />
        <Grid item md={12} xs={12}>
          <>
            <Typography>Owner ID:</Typography>
            {uboidisimageorpdf(uboidlabel, uboidname)}
          </>
        </Grid>
        <Grid item md={12} xs={12}>
          <>
            <Typography>Ownner Proof of Address:</Typography>
            {ubopoaisimageorpdf(ubopoalabel, ubopoaname)}
          </>
        </Grid>
      </Container>
    </Page>
  );
};

export default UpdateUboForm;
