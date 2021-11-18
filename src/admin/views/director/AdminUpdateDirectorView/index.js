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
  makeStyles,
} from "@material-ui/core";
import Page from "src/components/Page";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "src/graphql/mutations.js";
import LoaderButton from "src/components/LoaderButton.js";
import { UploadCloud as UploadIcon } from "react-feather";
import { onError } from "src/libs/errorLib.js";
import { Storage } from "aws-amplify";
import { green } from "@material-ui/core/colors";
import { useParams } from "react-router-dom";

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

const UpdateDirectorForm = ({ className, value, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();

  const [identityId, setIdentityId] = useState("");
  const [userId, setUserId] = useState("");
  const [directorId, setDirectorId] = useState("");
  const [director_status, setDirector_status] = useState("");
  const [director_name, setDirector_name] = useState("");
  const [director_email, setDirector_email] = useState("");
  const [director_phone_number, setDirector_phone_number] = useState("");
  const [director_id_attachment, setDirector_id_attachment] = useState("");
  const [director_id_number, setDirector_id_number] = useState("");
  const [director_id_type, setDirector_id_type] = useState("");
  const [director_nationality, setDirector_nationality] = useState("");
  const [director_poa_attachment, setDirector_poa_attachment] = useState("");
  const [
    director_country_of_residence,
    setDirector_country_of_residence,
  ] = useState("");

  const [directorloading, setDirectorLoading] = useState(false);
  const [directorsuccess, setDirectorSuccess] = useState(false);

  const [directoridloading, setDirectoridLoading] = useState(false);
  const [directoridsuccess, setDirectoridSuccess] = useState(false);
  const [directorpoaloading, setDirectorpoaLoading] = useState(false);
  const [directorpoasuccess, setDirectorpoaSuccess] = useState(false);

  const [directoridimg, setDirectoridImg] = useState("");
  const [directoridpdf, setDirectoridpdf] = useState("");
  const [directorpoaimg, setDirectorpoaImg] = useState("");
  const [directorpoapdf, setDirectorpoapdf] = useState("");

  const file = useRef(null);

  const directoridlabel = "director_id_attachment";
  const directoridname = "Director ID";
  const directorpoalabel = "director_poa_attachment";
  const directorpoaname = "Director Proof of Address";

  useEffect(() => {
    getDirector({ id });
  }, [id]);

  async function getDirector(input) {
    try {
      const director = await API.graphql(
        graphqlOperation(queries.getDirector, input)
      );
      const {
        data: {
          getDirector: {
            userId,
            identityId,
            directorId,
            director_status,
            director_name,
            director_email,
            director_phone_number,
            director_id_attachment,
            director_id_number,
            director_id_type,
            director_nationality,
            director_poa_attachment,
            director_country_of_residence,
          },
        },
      } = director;
      setUserId(userId);
      setIdentityId(identityId);
      setDirectorId(directorId);
      setDirector_status(director_status);
      setDirector_name(director_name);
      setDirector_email(director_email);
      setDirector_phone_number(director_phone_number);
      setDirector_id_attachment(director_id_attachment);
      setDirector_id_number(director_id_number);
      setDirector_id_type(director_id_type);
      setDirector_nationality(director_nationality);
      setDirector_poa_attachment(director_poa_attachment);
      setDirector_country_of_residence(director_country_of_residence);
    } catch (err) {
      console.log("error fetching data..", err);
    }
  }

  async function handleDirectorSubmit() {
    setDirectorSuccess(false);
    setDirectorLoading(true);
    try {
      const sortkey = directorId;
      await updateDirector({
        id,
        userId,
        sortkey,
        director_status,
        director_name,
        director_email,
        director_phone_number,
        director_id_attachment,
        director_id_number,
        director_id_type,
        director_nationality,
        director_poa_attachment,
        director_country_of_residence,
      });
    } catch (e) {
      onError(e);
    }
    setDirectorSuccess(true);
    setDirectorLoading(false);
    navigate("/admin/");
  }

  function updateDirector(input) {
    return API.graphql(
      graphqlOperation(mutations.updateDirector, { input: input })
    );
  }

  useEffect(() => {
    if (director_id_attachment) {
      async function getdirectoridimgurl() {
        var uploadext = director_id_attachment.split(".").pop();
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
          var y = await Storage.get(director_id_attachment, {
            level: "private",
            identityId: identityId,
          });
          setDirectoridImg(y);
        }
      }
      getdirectoridimgurl();
    }
  }, [director_id_attachment, identityId]);

  useEffect(() => {
    if (director_id_attachment) {
      async function getdirectoridpdfurl() {
        var uploadext = director_id_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        var x = imageExtensions.includes(uploadext);
        if (x === true) {
          var y = await Storage.get(director_id_attachment, {
            level: "private",
            identityId: identityId,
          });
          setDirectoridpdf(y);
        }
      }
      getdirectoridpdfurl();
    }
  }, [director_id_attachment, identityId]);

  function directoridisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(directoridimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={directoridimg} />
          <div>
            <input
              id={directoridimg}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handledirectoridChange(event)}
            />
            <label htmlFor={directoridimg}>
              <LoaderButton
                id={directoridimg}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={directoridloading}
                success={directoridsuccess}
                loading={directoridloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else if (regex.test(directoridpdf)) {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            allowFullScreen
            src={directoridpdf}
          />
          <div>
            <input
              id={directoridpdf}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handledirectoridChange(event)}
            />
            <label htmlFor={directoridpdf}>
              <LoaderButton
                id={directoridpdf}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={directoridloading}
                success={directoridsuccess}
                loading={directoridloading}
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
            onChange={(event) => handledirectoridChange(event)}
          />
          <label htmlFor={label}>
            <LoaderButton
              id={label}
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={directoridloading}
              success={directoridsuccess}
              loading={directoridloading}
            >
              {" "}
              {name}
            </LoaderButton>
          </label>
        </>
      );
    }
  }

  function handledirectoridChange(event) {
    file.current = event.target.files[0];
    const newdirectoridfile = file.current;
    ondirectoridChange(newdirectoridfile);
  }

  async function s3Up(file, name) {
    const userid = userId;
    const sectorid = directorId;
    var fileExtension = file.name.split(".").pop();
    const filename = `${userid}${sectorid}${name}.${fileExtension}`;
    const stored = await Storage.put(filename, file, {
      level: "private",
      identityId: identityId,
      contentType: file.type,
    });
    return stored.key;
  }

  async function ondirectoridChange(newfile) {
    setDirectoridSuccess(false);
    setDirectoridLoading(true);
    try {
      const u = newfile ? await s3Up(newfile, 'director_id_attachment') : null;
      var director_id_attachment = u;
      await updateDirector({
        id,
        director_id_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setDirectoridSuccess(true);
    setDirectoridLoading(false);
    navigate("/admin/");
  }

  useEffect(() => {
    if (director_poa_attachment) {
      async function getdirectorpoaimgurl() {
        var uploadext = director_poa_attachment.split(".").pop();
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
          var y = await Storage.get(director_poa_attachment, {
            level: "private",
            identityId: identityId,
          });
          setDirectorpoaImg(y);
        }
      }
      getdirectorpoaimgurl();
    }
  }, [director_poa_attachment, identityId]);

  useEffect(() => {
    if (director_poa_attachment) {
      async function getdirectorpoapdfurl() {
        var uploadext = director_poa_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        var x = imageExtensions.includes(uploadext);
        if (x === true) {
          var y = await Storage.get(director_poa_attachment, {
            level: "private",
            identityId: identityId,
          });
          setDirectorpoapdf(y);
        }
      }
      getdirectorpoapdfurl();
    }
  }, [director_poa_attachment, identityId]);

  function directorpoaisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(directorpoaimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={directorpoaimg} />
          <div>
            <input
              id={directorpoaimg}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handledirectorpoaChange(event)}
            />
            <label htmlFor={directorpoaimg}>
              <LoaderButton
                id={directorpoaimg}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={directorpoaloading}
                success={directorpoasuccess}
                loading={directorpoaloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else if (regex.test(directorpoapdf)) {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            allowFullScreen
            src={directorpoapdf}
          />
          <div>
            <input
              id={directorpoapdf}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handledirectorpoaChange(event)}
            />
            <label htmlFor={directorpoapdf}>
              <LoaderButton
                id={directorpoapdf}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={directorpoaloading}
                success={directorpoasuccess}
                loading={directorpoaloading}
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
            onChange={(event) => handledirectorpoaChange(event)}
          />
          <label htmlFor={label}>
            <LoaderButton
              id={label}
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={directorpoaloading}
              success={directorpoasuccess}
              loading={directorpoaloading}
            >
              {" "}
              {name}
            </LoaderButton>
          </label>
        </>
      );
    }
  }

  function handledirectorpoaChange(event) {
    file.current = event.target.files[0];
    const newdirectorpoafile = file.current;
    ondirectorpoaChange(newdirectorpoafile);
  }

  async function ondirectorpoaChange(newfile) {
    setDirectorpoaSuccess(false);
    setDirectorpoaLoading(true);
    try {
      const u = newfile ? await s3Up(newfile, 'director_poa_attachment') : null;
      var director_poa_attachment = u;
      await updateDirector({
        id,
        director_poa_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setDirectorpoaSuccess(true);
    setDirectorpoaLoading(false);
    navigate("/admin/");
  }

  return (
    <Page title="Update Director">
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
                        name="director_status"
                        label="Director Status"
                        onChange={(e) => setDirector_status(e.target.value)}
                        required
                        value={director_status || ""}
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
                    label="Company Director Name"
                    name="director_name"
                    onChange={(e) => setDirector_name(e.target.value)}
                    required
                    value={director_name || ""}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Company Director Email"
                    name="director_email"
                    onChange={(e) => setDirector_email(e.target.value)}
                    required
                    value={director_email || ""}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Company Director Phone"
                    name="director_phone_number"
                    onChange={(e) => setDirector_phone_number(e.target.value)}
                    required
                    value={director_phone_number || ""}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Select
                    fullWidth
                    label="Company Director ID Type"
                    name="director_id_type"
                    onChange={(e) => setDirector_id_type(e.target.value)}
                    required
                    value={director_id_type || ""}
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
                    label="Company Director ID Number"
                    name="director_id_number"
                    onChange={(e) => setDirector_id_number(e.target.value)}
                    required
                    value={director_id_number || ""}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <LoaderButton
                startIcon={<UploadIcon />}
                disabled={directorloading}
                success={directorsuccess}
                loading={directorloading}
                onClick={handleDirectorSubmit}
              >
                Update Director details
              </LoaderButton>
            </Box>
          </Card>
        </form>
        <Divider />
        <Grid item md={12} xs={12}>
          <>
            <Typography>Director ID:</Typography>
            {directoridisimageorpdf(directoridlabel, directoridname)}
          </>
        </Grid>
        <Grid item md={12} xs={12}>
          <>
            <Typography>Director Proof of Address:</Typography>
            {directorpoaisimageorpdf(directorpoalabel, directorpoaname)}
          </>
        </Grid>
      </Container>
    </Page>
  );
};

export default UpdateDirectorForm;
