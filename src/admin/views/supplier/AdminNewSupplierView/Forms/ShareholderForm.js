import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InputField, SelectField } from "src/components/FormFields";
import AdminUploadField from "src/components/FormFields/AdminUploadField.js";
import SelectListField from "src/components/FormFields/SelectListField.jsx";
import { Card, CardContent, Divider, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Upload as UploadIcon } from "react-feather";
import { useFormikContext } from "formik";
import { Storage } from "aws-amplify";
import LoaderButton from "src/components/LoaderButton.js";
import { green } from "@mui/material/colors";
import countries from "src/components/FormLists/countries.js";

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

  const { ID } = useParams();
  const dirId = props.dir;
  const uboId = props.ubo;
  const { ident } = useParams();
  const { values: formValues } = useFormikContext();
  const updatefields = { values: formValues };

  const director_updatepoa = updatefields.values.director_poa_attachment;
  const director_updateid = updatefields.values.director_id_attachment;
  const ubo_updatepoa = updatefields.values.ubo_poa_attachment;
  const ubo_updateid = updatefields.values.ubo_id_attachment;

  const [directorpoaimg, setDirectorpoaimg] = useState("");
  const [directorpoapdf, setDirectorpoapdf] = useState("");
  const [directoridimg, setDirectoridimg] = useState("");
  const [directoridpdf, setDirectoridpdf] = useState("");

  const [ubopoaimg, setUbopoaimg] = useState("");
  const [ubopoapdf, setUbopoapdf] = useState("");
  const [uboidimg, setUboidimg] = useState("");
  const [uboidpdf, setUboidpdf] = useState("");

  const [directoridloading, setDirectoridLoading] = useState(false);
  const [directoridsuccess, setDirectoridSuccess] = useState(false);
  const [directorpoaloading, setDirectorpoaLoading] = useState(false);
  const [directorpoasuccess, setDirectorpoaSuccess] = useState(false);
  const [uboidloading, setUboidLoading] = useState(false);
  const [uboidsuccess, setUboidSuccess] = useState(false);
  const [ubopoaloading, setUbopoaLoading] = useState(false);
  const [ubopoasuccess, setUbopoaSuccess] = useState(false);

  useEffect(() => {
    if (director_updateid) {
      async function geturl() {
        var uploadext = director_updateid.split(".").pop();
        var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
        const d = imageExtensions.includes(uploadext);
        if (d === true) {
          const u = await Storage.get(director_updateid, {
            level: "private",
            identityId: ident,
          });
          setDirectoridimg(u);
        } else {
          const h = await Storage.get(director_updateid, {
            level: "private",
            identityId: ident,
          });
          setDirectoridpdf(h);
        }
      }
      geturl();
    }
  }, [director_updateid, ident]);

  useEffect(() => {
    if (director_updatepoa) {
      async function geturl() {
        var uploadext = director_updatepoa.split(".").pop();
        var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
        const d = imageExtensions.includes(uploadext);
        if (d === true) {
          const u = await Storage.get(director_updatepoa, {
            level: "private",
            identityId: ident,
          });
          setDirectorpoaimg(u);
        } else {
          const h = await Storage.get(director_updatepoa, {
            level: "private",
            identityId: ident,
          });
          setDirectorpoapdf(h);
        }
      }
      geturl();
    }
  }, [director_updatepoa, ident]);

  useEffect(() => {
    if (ubo_updateid) {
      async function geturl() {
        var uploadext = ubo_updateid.split(".").pop();
        var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
        const d = imageExtensions.includes(uploadext);
        if (d === true) {
          const u = await Storage.get(ubo_updateid, {
            level: "private",
            identityId: ident,
          });
          setUboidimg(u);
        } else {
          const h = await Storage.get(ubo_updateid, {
            level: "private",
            identityId: ident,
          });
          setUboidpdf(h);
        }
      }
      geturl();
    }
  }, [ubo_updateid, ident]);

  useEffect(() => {
    if (ubo_updatepoa) {
      async function geturl() {
        var uploadext = ubo_updatepoa.split(".").pop();
        var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
        const d = imageExtensions.includes(uploadext);
        if (d === true) {
          const u = await Storage.get(ubo_updatepoa, {
            level: "private",
            identityId: ident,
          });
          setUbopoaimg(u);
        } else {
          const h = await Storage.get(ubo_updatepoa, {
            level: "private",
            identityId: ident,
          });
          setUbopoapdf(h);
        }
      }
      geturl();
    }
  }, [ubo_updatepoa, ident]);

  async function handleDirectorIdClick() {
    setDirectoridSuccess(false);
    setDirectoridLoading(true);
    const b = await director_updateid;
    if (b) {
      setDirectoridSuccess(true);
      setDirectoridLoading(false);
    }
  }
  async function handleDirectorPoaClick() {
    setDirectorpoaSuccess(false);
    setDirectorpoaLoading(true);
    const b = await director_updatepoa;
    if (b) {
      setDirectorpoaSuccess(true);
      setDirectorpoaLoading(false);
    }
  }

  async function handleUboIdClick() {
    setUboidSuccess(false);
    setUboidLoading(true);
    const b = await ubo_updateid;
    if (b) {
      setUboidSuccess(true);
      setUboidLoading(false);
    }
  }
  async function handleUboPoaClick() {
    setUbopoaSuccess(false);
    setUbopoaLoading(true);
    const b = await ubo_updatepoa;
    if (b) {
      setUbopoaSuccess(true);
      setUbopoaLoading(false);
    }
  }

  function director_updateidisimageorpdf() {
    if (director_updateid) {
      return (
        <>
          <img className={classes.img} alt="complex" src={directoridimg} />
        </>
      );
    } else {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={directoridpdf}
          />
        </>
      );
    }
  }

  function director_updatepoaisimageorpdf() {
    if (director_updatepoa) {
      return (
        <>
          <img className={classes.img} alt="complex" src={directorpoaimg} />
        </>
      );
    } else {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={directorpoapdf}
          />
        </>
      );
    }
  }

  function ubo_updateidisimageorpdf() {
    if (ubo_updateid) {
      return (
        <>
          <img className={classes.img} alt="complex" src={uboidimg} />
        </>
      );
    } else {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={uboidpdf}
          />
        </>
      );
    }
  }

  function ubo_updatepoaisimageorpdf() {
    if (ubo_updatepoa) {
      return (
        <>
          <img className={classes.img} alt="complex" src={ubopoaimg} />
        </>
      );
    } else {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={ubopoapdf}
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
                <>{director_updateidisimageorpdf()}</>
              ) : (
                <>
                  <AdminUploadField
                    name={director_id_attachment.name}
                    id={director_id_attachment.name}
                    accept="image/*"
                    style={{ display: "none" }}
                    identityid={ident}
                    userid={ID}
                    sectorid={dirId}
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
                      onClick={handleDirectorIdClick}
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
                <>{director_updatepoaisimageorpdf()}</>
              ) : (
                <>
                  <AdminUploadField
                    name={director_poa_attachment.name}
                    id={director_poa_attachment.name}
                    accept="image/*"
                    style={{ display: "none" }}
                    identityid={ident}
                    userid={ID}
                    sectorid={dirId}
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
                      onClick={handleDirectorPoaClick}
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
                <>{ubo_updateidisimageorpdf()}</>
              ) : (
                <>
                  <AdminUploadField
                    name={ubo_id_attachment.name}
                    id={ubo_id_attachment.name}
                    accept="image/*"
                    style={{ display: "none" }}
                    identityid={ident}
                    userid={ID}
                    sectorid={uboId}
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
                      onClick={handleUboIdClick}
                    >
                      {" "}
                      Owners's ID*
                    </LoaderButton>
                  </label>
                </>
              )}
            </Grid>

            <Grid item xs={6}>
              {ubo_updatepoa ? (
                <>{ubo_updatepoaisimageorpdf()}</>
              ) : (
                <>
                  <AdminUploadField
                    name={ubo_poa_attachment.name}
                    id={ubo_poa_attachment.name}
                    accept="image/*"
                    style={{ display: "none" }}
                    identityid={ident}
                    userid={ID}
                    sectorid={uboId}
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
                      onClick={handleUboPoaClick}
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
