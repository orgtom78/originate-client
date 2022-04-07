import React, { useEffect, useState } from "react";
import {
  InputField,
  SelectField,
} from "src/components/FormFields";
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
import { useUser } from "src/components/context/usercontext.js";

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

export default function UboForm(props) {
  const classes = useStyles();
  const context = useUser();
  const {
    formField: {
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
  const { values: formValues } = useFormikContext();
  const updatefields = { values: formValues };

  const ubo_updatepoa = updatefields.values.ubo_poa_attachment;
  const ubo_updateid = updatefields.values.ubo_id_attachment;

  const [dpoaimg, setDpoaimg] = useState("");
  const [didimg, setDidimg] = useState("");
  const [dpoapdf, setDpoapdf] = useState("");
  const [didpdf, setDidpdf] = useState("");

  const [uboidloading, setUboidLoading] = useState(false);
  const [uboidsuccess, setUboidSuccess] = useState(false);
  const [ubopoaloading, setUbopoaLoading] = useState(false);
  const [ubopoasuccess, setUbopoaSuccess] = useState(false);
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    async function onLoad() {
      const data = await context;
      const { identity } = data;
      setIdentity(identity);
    }
    onLoad();
  }, [context]);

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
          setDidimg(u);
        } else {
          const h = await Storage.get(ubo_updateid, {
            level: "private",
            identityId: identity,
          });
          setDidpdf(h);
        }
      }
      geturl();
    }
  }, [ubo_updateid, identity]);

  async function handleIdClick() {
    setUboidSuccess(false);
    setUboidLoading(true);
    const b = await didimg;
    if (b) {
      setUboidSuccess(true);
      setUboidLoading(false);
    }
  }

  function uboidisimageorpdf() {
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
          setDpoaimg(u);
        } else {
          const h = await Storage.get(ubo_updatepoa, {
            level: "private",
            identityId: identity,
          });
          setDpoapdf(h);
        }
      }
      geturl();
    }
  }, [ubo_updatepoa, identity]);

  async function handlePoaClick() {
    setUbopoaSuccess(false);
    setUbopoaLoading(true);
    const b = await dpoaimg;
    if (b) {
      setUbopoaSuccess(true);
      setUbopoaLoading(false);
    }
  }

  function ubopoaisimageorpdf() {
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
                      onClick={handleIdClick}
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
                      onClick={handlePoaClick}
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
