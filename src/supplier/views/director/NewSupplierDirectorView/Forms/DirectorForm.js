import React, { useEffect, useState } from "react";
import {
  InputField,
  SelectField,
  UploadField,
} from "src/components/FormFields";
import SelectListField from "src/components/FormFields/SelectListField.jsx";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { Upload as UploadIcon } from "react-feather";
import { useFormikContext } from "formik";
import { Storage } from "aws-amplify";
import LoaderButton from "src/components/LoaderButton.js";
import { green } from "@material-ui/core/colors";
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
    },
  } = props;

  const { values: formValues } = useFormikContext();
  const updatefields = { values: formValues };

  const director_updatepoa = updatefields.values.director_poa_attachment;
  const director_updateid = updatefields.values.director_id_attachment;

  const [dpoaimg, setDpoaimg] = useState("");
  const [didimg, setDidimg] = useState("");
  const [dpoapdf, setDpoapdf] = useState("");
  const [didpdf, setDidpdf] = useState("");

  const [directoridloading, setDirectoridLoading] = useState(false);
  const [directoridsuccess, setDirectoridSuccess] = useState(false);
  const [directorpoaloading, setDirectorpoaLoading] = useState(false);
  const [directorpoasuccess, setDirectorpoaSuccess] = useState(false);

  useEffect(() => {
    if (director_updateid) {
      async function geturl() {
        var uploadext = director_updateid.split(".").pop();
        var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
        const d = imageExtensions.includes(uploadext);
        if (d === true) {
          const u = await Storage.vault.get(director_updateid);
          setDidimg(u);
        } else {
          const h = await Storage.vault.get(director_updateid);
          setDidpdf(h);
        }
      }
      geturl();
    }
  }, [director_updateid]);

  async function handleIdClick() {
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
          const u = await Storage.vault.get(director_updatepoa);
          setDpoaimg(u);
        } else {
          const h = await Storage.vault.get(director_updatepoa);
          setDpoapdf(h);
        }
      }
      geturl();
    }
  }, [director_updatepoa]);

  async function handlePoaClick() {
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
                  <UploadField
                    name={director_id_attachment.name}
                    id={director_id_attachment.name}
                    accept="image/*, application/pdf"
                    style={{ display: "none" }}
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
                      onClick={handleIdClick}
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
                  <UploadField
                    name={director_poa_attachment.name}
                    id={director_poa_attachment.name}
                    accept="image/*, application/pdf"
                    style={{ display: "none" }}
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
                      onClick={handlePoaClick}
                    >
                      {" "}
                      Director's proof of address*
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
