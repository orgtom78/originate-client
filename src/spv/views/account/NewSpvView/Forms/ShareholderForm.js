import React, { useEffect, useState } from "react";
import { InputField, SelectField } from "src/components/FormFields";
import NewUploadField from "src/components/FormFields/NewUploadField.js";
import SelectListField from "src/components/FormFields/SelectListField.jsx";
import { Card, CardContent, Divider, Grid } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Upload as UploadIcon } from "react-feather";
import { useFormikContext } from "formik";
import { Storage } from "aws-amplify";
import LoaderButton from "src/components/LoaderButton.js";
import { green } from "@mui/material/colors";
import countries from "src/components/FormLists/countries.js";
import { useUser } from "src/components/context/spvcontext.js";

const cr = countries;
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

const useStyles = makeStyles(() => ({
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
  root: {
    display: "flex",
    alignItems: "center",
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

export default function ShareholderForm(props) {
  const context = useUser();
  const classes = useStyles();
  const {
    formField: {
      director_name,
      director_email,
      director_phone_number,
      director_id_attachment,
      director_id_number,
      director_id_type,
      director_nationality,
      director_poa_attachment,
      director_country_of_residence,
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
  } = props;

  const userId = props.vuser;
  const uboId = props.vubo;
  const directorId = props.vdirector;

  const { values: formValues } = useFormikContext();
  const updatefields = { values: formValues };

  const director_updatepoa = updatefields.values.director_poa_attachment;
  const director_updateid = updatefields.values.director_id_attachment;
  const ubo_updatepoa = updatefields.values.ubo_poa_attachment;
  const ubo_updateid = updatefields.values.ubo_id_attachment;

  const [identity, setIdentity] = useState("");
  const [dpoaimg, setDpoaimg] = useState("");
  const [didimg, setDidimg] = useState("");
  const [dpoapdf, setDpoapdf] = useState("");
  const [didpdf, setDidpdf] = useState("");

  const [upoaimg, setUpoaimg] = useState("");
  const [uidimg, setUidimg] = useState("");
  const [upoapdf, setUpoapdf] = useState("");
  const [uidpdf, setUidpdf] = useState("");

  const [directoridloading, setDirectoridLoading] = useState(false);
  const [directoridsuccess, setDirectoridSuccess] = useState(false);
  const [directorpoaloading, setDirectorpoaLoading] = useState(false);
  const [directorpoasuccess, setDirectorpoaSuccess] = useState(false);

  const [uboidloading, setUboidLoading] = useState(false);
  const [uboidsuccess, setUboidSuccess] = useState(false);
  const [ubopoaloading, setUbopoaLoading] = useState(false);
  const [ubopoasuccess, setUbopoaSuccess] = useState(false);

  useEffect(() => {
    // attempt to fetch the info of the user that was already logged in
    async function onLoad() {
      const data = await context;
      const { identity } = data;
      setIdentity(identity);
    }
    onLoad();
  }, [context]);

  useEffect(() => {
    if (director_updateid) {
      async function geturl() {
        var uploadext = director_updateid.split(".").pop();
        var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
        const d = imageExtensions.includes(uploadext);
        if (d === true) {
          const u = await Storage.get(director_updateid, {
            level: "private",
            identityId: identity,
          });
          setDidimg(u);
        } else {
          const h = await Storage.get(director_updateid, {
            level: "private",
            identityId: identity,
          });
          setDidpdf(h);
        }
      }
      geturl();
    }
  }, [director_updateid, identity]);

  async function handleDIdClick() {
    setDirectoridSuccess(false);
    setDirectoridLoading(true);
    const b = await didimg;
    if (b) {
      setDirectoridSuccess(true);
      setDirectoridLoading(false);
    }
  }

  function didisimageorpdf() {
    if (didimg) {
      return (
        <>
          <img className={classes.img} alt="complex" src={didimg} />
        </>
      );
    } else {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={didpdf}
          />
        </>
      );
    }
  }

  useEffect(() => {
    if (director_updatepoa) {
      async function geturl() {
        var uploadext = director_updatepoa.split(".").pop();
        var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
        const d = imageExtensions.includes(uploadext);
        if (d === true) {
          const u = await Storage.get(director_updatepoa, {
            level: "private",
            identityId: identity,
          });
          setDpoaimg(u);
        } else {
          const h = await Storage.get(director_updatepoa, {
            level: "private",
            identityId: identity,
          });
          setDpoapdf(h);
        }
      }
      geturl();
    }
  }, [director_updatepoa, identity]);

  async function handleDPoaClick() {
    setDirectorpoaSuccess(false);
    setDirectorpoaLoading(true);
    const b = await dpoaimg;
    if (b) {
      setDirectorpoaSuccess(true);
      setDirectorpoaLoading(false);
    }
  }

  function dpoaisimageorpdf() {
    if (dpoaimg) {
      return (
        <>
          <img className={classes.img} alt="complex" src={dpoaimg} />
        </>
      );
    } else {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={dpoapdf}
          />
        </>
      );
    }
  }

  useEffect(() => {
    if (ubo_updateid) {
      async function geturl() {
        var uploadext = ubo_updateid.split(".").pop();
        var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
        const d = imageExtensions.includes(uploadext);
        if (d === true) {
          const u = await Storage.get(ubo_updateid, {
            level: "private",
            identityId: identity,
          });
          setUidimg(u);
        } else {
          const h = await Storage.get(ubo_updateid, {
            level: "private",
            identityId: identity,
          });
          setUidpdf(h);
        }
      }
      geturl();
    }
  }, [ubo_updateid, identity]);

  async function handleUIdClick() {
    setUboidSuccess(false);
    setUboidLoading(true);
    const b = await uidimg;
    if (b) {
      setUboidSuccess(true);
      setUboidLoading(false);
    }
  }

  function uboidisimageorpdf() {
    if (uidimg) {
      return (
        <>
          <img className={classes.img} alt="complex" src={uidimg} />
        </>
      );
    } else {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={uidpdf}
          />
        </>
      );
    }
  }

  useEffect(() => {
    if (ubo_updatepoa) {
      async function geturl() {
        var uploadext = ubo_updatepoa.split(".").pop();
        var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
        const d = imageExtensions.includes(uploadext);
        if (d === true) {
          const u = await Storage.get(ubo_updatepoa, {
            level: "private",
            identityId: identity,
          });
          setUpoaimg(u);
        } else {
          const h = await Storage.get(ubo_updatepoa, {
            level: "private",
            identityId: identity,
          });
          setUpoapdf(h);
        }
      }
      geturl();
    }
  }, [ubo_updatepoa, identity]);

  async function handleUPoaClick() {
    setUbopoaSuccess(false);
    setUbopoaLoading(true);
    const b = await upoaimg;
    if (b) {
      setUbopoaSuccess(true);
      setUbopoaLoading(false);
    }
  }

  function ubopoaisimageorpdf() {
    if (upoaimg) {
      return (
        <>
          <img className={classes.img} alt="complex" src={upoaimg} />
        </>
      );
    } else {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={upoapdf}
          />
        </>
      );
    }
  }

  return (
    <React.Fragment>
      <Card>
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InputField
                name={director_name.name}
                label={director_name.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={director_email.name}
                label={director_email.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={director_phone_number.name}
                label={director_phone_number.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectListField
                name={director_nationality.name}
                label={director_nationality.label}
                data={cr}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectListField
                name={director_country_of_residence.name}
                label={director_country_of_residence.label}
                data={cr}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                name={director_id_type.name}
                label={director_id_type.label}
                data={idtype}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputField
                name={director_id_number.name}
                label={director_id_number.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              {director_updateid ? (
                <>{didisimageorpdf()}</>
              ) : (
                <>
                  <NewUploadField
                    name={director_id_attachment.name}
                    id={director_id_attachment.name}
                    accept="image/*, application/pdf"
                    style={{ display: "none" }}
                    ident={directorId}
                    userid={userId}
                    identityid={identity}
                  />
                  <label htmlFor={director_id_attachment.name}>
                    <LoaderButton
                      id={director_id_attachment.name}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={directoridloading}
                      success={directoridsuccess}
                      loading={directoridloading}
                      onClick={handleDIdClick}
                    >
                      {" "}
                      Director's ID*
                    </LoaderButton>
                  </label>
                </>
              )}
            </Grid>

            <Grid item xs={6}>
              {director_updatepoa ? (
                <>{dpoaisimageorpdf()}</>
              ) : (
                <>
                  <NewUploadField
                    name={director_poa_attachment.name}
                    id={director_poa_attachment.name}
                    accept="image/*, application/pdf"
                    style={{ display: "none" }}
                    ident={directorId}
                    userid={userId}
                    identityid={identity}
                  />
                  <label htmlFor={director_poa_attachment.name}>
                    <LoaderButton
                      id={director_poa_attachment.name}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={directorpoaloading}
                      success={directorpoasuccess}
                      loading={directorpoaloading}
                      onClick={handleDPoaClick}
                    >
                      {" "}
                      Director's proof of address*
                    </LoaderButton>
                  </label>
                </>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputField
                name={ubo_name.name}
                label={ubo_name.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={ubo_email.name}
                label={ubo_email.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={ubo_phone_number.name}
                label={ubo_phone_number.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectListField
                name={ubo_nationality.name}
                label={ubo_nationality.label}
                data={cr}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectListField
                name={ubo_country_of_residence.name}
                label={ubo_country_of_residence.label}
                data={cr}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                name={ubo_id_type.name}
                label={ubo_id_type.label}
                data={idtype}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputField
                name={ubo_id_number.name}
                label={ubo_id_number.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              {ubo_updateid ? (
                <>{uboidisimageorpdf()}</>
              ) : (
                <>
                  <NewUploadField
                    name={ubo_id_attachment.name}
                    id={ubo_id_attachment.name}
                    accept="image/*, application/pdf"
                    style={{ display: "none" }}
                    ident={uboId}
                    userid={userId}
                    identityid={identity}
                  />
                  <label htmlFor={ubo_id_attachment.name}>
                    <LoaderButton
                      id={ubo_id_attachment.name}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={uboidloading}
                      success={uboidsuccess}
                      loading={uboidloading}
                      onClick={handleUIdClick}
                    >
                      {" "}
                      Owner's ID*
                    </LoaderButton>
                  </label>
                </>
              )}
            </Grid>

            <Grid item xs={6}>
              {ubo_updatepoa ? (
                <>{ubopoaisimageorpdf()}</>
              ) : (
                <>
                  <NewUploadField
                    name={ubo_poa_attachment.name}
                    id={ubo_poa_attachment.name}
                    accept="image/*, application/pdf"
                    style={{ display: "none" }}
                    ident={uboId}
                    userid={userId}
                    identityid={identity}
                  />
                  <label htmlFor={ubo_poa_attachment.name}>
                    <LoaderButton
                      id={ubo_poa_attachment.name}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={ubopoaloading}
                      success={ubopoasuccess}
                      loading={ubopoaloading}
                      onClick={handleUPoaClick}
                    >
                      {" "}
                      Owner's proof of address*
                    </LoaderButton>
                  </label>
                </>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
