import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clsx from "clsx";
import {
  Box,
  Button,
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
import moment from "moment";
import * as mutations from "src/graphql/mutations.js";
import LoaderButton from "src/components/LoaderButton.js";
import { UploadCloud as UploadIcon } from "react-feather";
import { useUser } from "src/components/usercontext.js";
import { onError } from "src/libs/errorLib.js";
import { Storage } from "aws-amplify";
import { s3Upload } from "src/libs/awsLib.js";
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

const UpdateDirectorForm = ({ className, ...rest }) => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const context = useUser();
  const sub = context.sub;

  const [directorId, setDirectorId] = useState("");
  const [director_name, setDirector_name] = useState("");
  const [director_email, setDirector_email] = useState("");
  const [director_phone_number, setDirector_phone_number] = useState("");
  const [director_id_attachment, setDirector_id_attachment] = useState("");
  const [director_id_number, setDirector_id_number] = useState("");
  const [director_id_type, setDirector_id_type] = useState("");
  const [director_nationality, setDirector_nationality] = useState("");
  const [director_poa_attachment, setDirector_poa_attachment] = useState("");
  const [director_country_of_residence, setDirector_country_of_residence] = useState("");

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
    const sub = context.sub;
    var userId = sub;
    var sortkey = id;
    getDirector({ userId, sortkey });
  }, [context, id]);

  async function getDirector(input) {
    try {
      const director = await API.graphql(
        graphqlOperation(queries.getDirector, input)
      );
      const {
        data: {
          getDirector: {
            directorId,
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
      setDirectorId(directorId);
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
      const userId = sub;
      const sortkey = directorId;
      await updateDirector({
        userId,
        sortkey,
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
    navigate("/app/account");
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
          var y = await Storage.vault.get(director_id_attachment);
          setDirectoridImg(y);
        }
      }
      getdirectoridimgurl();
    }
  }, [director_id_attachment]);

  useEffect(() => {
    if (director_id_attachment) {
      async function getdirectoridpdfurl() {
        var uploadext = director_id_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        var x = imageExtensions.includes(uploadext);
        if (x === true) {
          var y = await Storage.vault.get(director_id_attachment);
          setDirectoridpdf(y);
        }
      }
      getdirectoridpdfurl();
    }
  }, [director_id_attachment]);

  function directoridisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (regex.test(directoridimg)) {
      return (
        <>
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
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
          </Grid>
          </Grid>
          </Box>
        </>
      );
    } else if (regex.test(directoridpdf)) {
      return (
        <>
         <Box display="flex" justifyContent="flex-end" p={2}>
          <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
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
          </Grid>
          </Grid>
          </Box>
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

  async function ondirectoridChange(newfile) {
    setDirectoridSuccess(false);
    setDirectoridLoading(true);
    try {
      const u = newfile ? await s3Upload(newfile) : null;
      var director_id_attachment = u;
      const sortkey = directorId;
      const userId = sub;
      await updateDirector({
        sortkey,
        userId,
        director_id_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setDirectoridSuccess(true);
    setDirectoridLoading(false);
    window.location.reload(true);
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
          var y = await Storage.vault.get(director_poa_attachment);
          setDirectorpoaImg(y);
        }
      }
      getdirectorpoaimgurl();
    }
  }, [director_poa_attachment]);

  useEffect(() => {
    if (director_poa_attachment) {
      async function getdirectorpoapdfurl() {
        var uploadext = director_poa_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        var x = imageExtensions.includes(uploadext);
        if (x === true) {
          var y = await Storage.vault.get(director_poa_attachment);
          setDirectorpoapdf(y);
        }
      }
      getdirectorpoapdfurl();
    }
  }, [director_poa_attachment]);

  function directorpoaisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
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
          <Box display="flex" justifyContent="flex-end" p={2}>
          <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
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
          </Grid>
          </Grid>
          </Box>
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
      const u = newfile ? await s3Upload(newfile) : null;
      var director_poa_attachment = u;
      const sortkey = directorId;
      const userId = sub;
      await updateDirector({
        sortkey,
        userId,
        director_poa_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setDirectorpoaSuccess(true);
    setDirectorpoaLoading(false);
    window.location.reload(true);
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
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Company Director Name"
                    name="director_name"
                    onChange={(e) => setDirector_name(e.target.value)}
                    required
                    value={director_name|| ''}
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
                    value={director_email|| ''}
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
                    value={director_phone_number|| ''}
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
                    value={director_id_type|| ''}
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
                    value={director_id_number|| ''}
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
        <Box display="flex" justifyContent="flex-end" p={2}>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <>
                  <Typography>Director ID:</Typography>
                  {directoridisimageorpdf(directoridlabel, directoridname)}
                </>
              </Grid>
              <br></br>
              <Grid item md={12} xs={12}>
                <>
                  <Typography>Director Proof of Address:</Typography>
                  {directorpoaisimageorpdf(directorpoalabel, directorpoaname)}
                </>
              </Grid>
            </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default UpdateDirectorForm;
