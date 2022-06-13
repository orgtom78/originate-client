import React, { useEffect, useState } from "react";
import {
  InputField,
  SelectField,
  DatePickerField,
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
import industries from "src/components/FormLists/industries.js";
import { useUser } from "src/components/context/spvcontext.js";

const cr = countries;
const ind = industries;
const type = [
  {
    value: "Corporation",
    label: "Corporation",
  },
  {
    value: "Limited Liability",
    label: "Limited Liability",
  },
  {
    value: "Partnership",
    label: "Partnership",
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

export default function AddressForm(props) {
  const classes = useStyles();
  const context = useUser();
  const {
    formField: {
      spv_logo,
      spv_name,
      spv_type,
      spv_date_of_incorporation,
      spv_address_city,
      spv_address_street,
      spv_address_number,
      spv_address_postalcode,
      spv_country,
      spv_industry,
      spv_registration_cert_attachment,
    },
  } = props;

  const userId = props.vuser;
  const spvId = props.vspv;
  const { values: formValues } = useFormikContext();
  const updatefields = { values: formValues };
  const updateregcert =
    updatefields.values.spv_registration_cert_attachment;
  const updatelogo = updatefields.values.spv_logo;

  const [slogo, setSlogo] = useState("");
  const [identity, setIdentity] = useState("");
  const [updateregcertpdf, setUpdateregcertpdf] = useState("");
  const [updateregcertimg, setUpdateregcertimg] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [certloading, setCertLoading] = useState(false);
  const [certsuccess, setCertSuccess] = useState(false);

  
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
    if (updateregcert) {
      async function geturl() {
        var uploadext = updateregcert.split(".").pop();
        var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
        const d = imageExtensions.includes(uploadext);
        if (d === true) {
          const u = await Storage.get(updateregcert, {
            level: "private",
            identityId: identity,
          });
          setUpdateregcertimg(u);
        } else {
          const h = await Storage.get(updateregcert, {
            level: "private",
            identityId: identity,
          });
          setUpdateregcertpdf(h);
        }
      }
      geturl();
    }
  }, [updateregcert, identity]);

  async function handleCertClick() {
    setCertSuccess(false);
    setCertLoading(true);
    const b = await updateregcertimg;
    if (b) {
      setCertSuccess(true);
      setCertLoading(false);
    } else {
      setCertSuccess(false);
      setCertLoading(true);
    }
  }

  function isimageorpdf() {
    if (updateregcertimg) {
      return (
        <>
          <img className={classes.img} alt="complex" src={updateregcertimg} />
        </>
      );
    } else {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={updateregcertpdf}
          />
        </>
      );
    }
  }

  useEffect(() => {
    if (updatelogo) {
      async function getlogourl() {
        const u = await Storage.get(updatelogo, {
          level: "private",
          identityId: identity,
        });
        setSlogo(u);
      }
      getlogourl();
    }
  }, [updatelogo, identity]);

  async function handleLogoClick() {
    setSuccess(false);
    setLoading(true);
    const b = await slogo;
    if (b) {
      setSuccess(true);
      setLoading(false);
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
                name={spv_name.name}
                label={spv_name.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                name={spv_type.name}
                label={spv_type.label}
                data={type}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={spv_address_city.name}
                label={spv_address_city.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={spv_address_postalcode.name}
                label={spv_address_postalcode.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={spv_address_street.name}
                label={spv_address_street.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={spv_address_number.name}
                label={spv_address_number.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectListField
                name={spv_country.name}
                label={spv_country.label}
                data={cr}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerField
                name={spv_date_of_incorporation.name}
                label={spv_date_of_incorporation.label}
                format="dd/MM/yyyy"
                minDate={new Date("1500/12/31")}
                maxDate={new Date()}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectListField
                name={spv_industry.name}
                label={spv_industry.label}
                data={ind}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {updateregcert ? (
                <>{isimageorpdf()}</>
              ) : (
                <>
                  <NewUploadField
                    name={spv_registration_cert_attachment.name}
                    id={spv_registration_cert_attachment.name}
                    accept="image/*, application/pdf"
                    style={{ display: "none" }}
                    ident={spvId}
                    userid={userId}
                    identityid={identity}
                  />
                  <label htmlFor={spv_registration_cert_attachment.name}>
                    <LoaderButton
                      id={spv_registration_cert_attachment.name}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={certloading}
                      success={certsuccess}
                      loading={certloading}
                      onClick={handleCertClick}
                    >
                      {" "}
                      Business Registration Certificate*
                    </LoaderButton>
                  </label>
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {updatelogo ? (
                <>
                  <img className={classes.img} alt="complex" src={slogo} />
                </>
              ) : (
                <>
                  <NewUploadField
                    name={spv_logo.name}
                    id={spv_logo.name}
                    accept="image/*"
                    style={{ display: "none" }}
                    ident={spvId}
                    userid={userId}
                    identityid={identity}
                  />
                  <label htmlFor={spv_logo.name}>
                    <LoaderButton
                      id={spv_logo.name}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={loading}
                      success={success}
                      loading={loading}
                      onClick={handleLogoClick}
                    >
                      {" "}
                      Company logo
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
