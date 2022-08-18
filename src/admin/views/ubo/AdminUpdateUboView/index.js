import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Page from "src/components/Page";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "src/graphql/mutations.js";
import LoaderButton from "src/components/LoaderButton.js";
import { UploadCloud as UploadIcon } from "react-feather";
import { onError } from "src/libs/errorLib.js";
import { Storage } from "aws-amplify";
import { green } from "@mui/material/colors";
import { useParams } from "react-router-dom";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

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

const status = [
  {
    value: "Declined",
    label: "Declined",
  },
  {
    value: "Under Review",
    label: "Under Review",
  },
  {
    value: "Approved",
    label: "Approved",
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

const UpdateUboForm = ({ className, value, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();

  const [userId, setUserId] = useState("");
  const [identityId, setIdentityId] = useState("");
  const [uboId, setUboId] = useState("");
  const [ubo_status, setUbo_status] = useState("");
  const [ubo_name, setUbo_name] = useState("");
  const [ubo_email, setUbo_email] = useState("");
  const [ubo_phone_number, setUbo_phone_number] = useState("");
  const [ubo_id_attachment, setUbo_id_attachment] = useState("");
  const [ubo_id_number, setUbo_id_number] = useState("");
  const [ubo_id_type, setUbo_id_type] = useState("");
  const [ubo_nationality, setUbo_nationality] = useState("");
  const [ubo_poa_attachment, setUbo_poa_attachment] = useState("");
  const [ubo_country_of_residence, setUbo_country_of_residence] = useState("");
  const [ubo_date_of_birth, setUbo_date_of_birth] = useState("");

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
  const uboidname = "Ubo ID";
  const ubopoalabel = "ubo_poa_attachment";
  const ubopoaname = "Ubo Proof of Address";

  useEffect(() => {
    getUbo({ id });
  }, [id]);

  async function getUbo(input) {
    try {
      const ubo = await API.graphql(graphqlOperation(queries.getUBO, input));
      const {
        data: {
          getUBO: {
            userId,
            identityId,
            uboId,
            ubo_status,
            ubo_name,
            ubo_email,
            ubo_phone_number,
            ubo_id_attachment,
            ubo_id_number,
            ubo_id_type,
            ubo_nationality,
            ubo_poa_attachment,
            ubo_country_of_residence,
            ubo_date_of_birth,
          },
        },
      } = ubo;
      setUserId(userId);
      setIdentityId(identityId);
      setUboId(uboId);
      setUbo_status(ubo_status);
      setUbo_name(ubo_name);
      setUbo_email(ubo_email);
      setUbo_phone_number(ubo_phone_number);
      setUbo_id_attachment(ubo_id_attachment);
      setUbo_id_number(ubo_id_number);
      setUbo_id_type(ubo_id_type);
      setUbo_nationality(ubo_nationality);
      setUbo_poa_attachment(ubo_poa_attachment);
      setUbo_country_of_residence(ubo_country_of_residence);
      setUbo_date_of_birth(ubo_date_of_birth);
    } catch (err) {
      console.log("error fetching data..", err);
    }
  }

  async function handleUboSubmit() {
    setUboSuccess(false);
    setUboLoading(true);
    try {
      const sortkey = uboId;
      await updateUbo({
        id,
        userId,
        sortkey,
        ubo_status,
        ubo_name,
        ubo_email,
        ubo_phone_number,
        ubo_id_attachment,
        ubo_id_number,
        ubo_id_type,
        ubo_nationality,
        ubo_poa_attachment,
        ubo_country_of_residence,
        ubo_date_of_birth,
      });
    } catch (e) {
      onError(e);
    }
    setUboSuccess(true);
    setUboLoading(false);
    navigate("/admin/");
  }

  function updateUbo(input) {
    return API.graphql(graphqlOperation(mutations.updateUBO, { input: input }));
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
          var y = await Storage.get(ubo_id_attachment, {
            level: "private",
            identityId: identityId,
          });
          setUboidImg(y);
        }
      }
      getuboidimgurl();
    }
  }, [ubo_id_attachment, identityId]);

  useEffect(() => {
    if (ubo_id_attachment) {
      async function getuboidpdfurl() {
        var uploadext = ubo_id_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        var x = imageExtensions.includes(uploadext);
        if (x === true) {
          var y = await Storage.get(ubo_id_attachment, {
            level: "private",
            identityId: identityId,
          });
          setUboidpdf(y);
        }
      }
      getuboidpdfurl();
    }
  }, [ubo_id_attachment, identityId]);

  function uboidisimageorpdf(label, name) {
    var regex =
      /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
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

  function handleuboidChange(event) {
    file.current = event.target.files[0];
    const newuboidfile = file.current;
    onuboidChange(newuboidfile);
  }

  async function s3Up(file) {
    const filename = `${Date.now()}-${file.name}`.replace(/ /g, "_");

    const stored = await Storage.put(filename, file, {
      level: "private",
      identityId: identityId,
      contentType: file.type,
    });
    return stored.key;
  }

  async function onuboidChange(newfile) {
    setUboidSuccess(false);
    setUboidLoading(true);
    try {
      const u = newfile ? await s3Up(newfile) : null;
      var ubo_id_attachment = u;
      await updateUbo({
        id,
        ubo_id_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setUboidSuccess(true);
    setUboidLoading(false);
    navigate("/admin/");
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
          var y = await Storage.get(ubo_poa_attachment, {
            level: "private",
            identityId: identityId,
          });
          setUbopoaImg(y);
        }
      }
      getubopoaimgurl();
    }
  }, [ubo_poa_attachment, identityId]);

  useEffect(() => {
    if (ubo_poa_attachment) {
      async function getubopoapdfurl() {
        var uploadext = ubo_poa_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        var x = imageExtensions.includes(uploadext);
        if (x === true) {
          var y = await Storage.get(ubo_poa_attachment, {
            level: "private",
            identityId: identityId,
          });
          setUbopoapdf(y);
        }
      }
      getubopoapdfurl();
    }
  }, [ubo_poa_attachment, identityId]);

  function ubopoaisimageorpdf(label, name) {
    var regex =
      /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
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
      const u = newfile ? await s3Up(newfile) : null;
      var ubo_poa_attachment = u;
      await updateUbo({
        id,
        ubo_poa_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setUbopoaSuccess(true);
    setUbopoaLoading(false);
    navigate("/admin/");
  }

  return (
    <Page title="Update Ubo">
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
                <Grid item xs={12} sm={12}>
                  <Select
                    fullWidth
                    name="ubo_status"
                    label="UBO Status"
                    onChange={(e) => setUbo_status(e.target.value)}
                    required
                    value={ubo_status || ""}
                    variant="outlined"
                  >
                    {status.map((item, index) => (
                      <MenuItem key={index} value={item.label}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Company Ubo Name"
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
                    label="Company Ubo Email"
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
                    label="Company Ubo Phone"
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
                    label="Company Ubo ID Type"
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
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Company Ubo ID Number"
                    name="ubo_id_number"
                    onChange={(e) => setUbo_id_number(e.target.value)}
                    required
                    value={ubo_id_number || ""}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      value={ubo_date_of_birth || ""}
                      margin="normal"
                      variant="outlined"
                      id="ubo_date_of_birth"
                      label="UBO Date of Birth"
                      name="ubo_date_of_birth"
                      onChange={(e) => setUbo_date_of_birth(e)}
                      required
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      renderInput={(params) => (
                        <TextField fullWidth {...params} />
                      )}
                    />
                  </LocalizationProvider>
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
            <Typography>Ubo ID:</Typography>
            {uboidisimageorpdf(uboidlabel, uboidname)}
          </>
        </Grid>
        <Grid item md={12} xs={12}>
          <>
            <Typography>Ubo Proof of Address:</Typography>
            {ubopoaisimageorpdf(ubopoalabel, ubopoaname)}
          </>
        </Grid>
      </Container>
    </Page>
  );
};

export default UpdateUboForm;
