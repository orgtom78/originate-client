import React, { useEffect, useState } from "react";
import {
  InputField,
  SelectField,
  DatePickerField,
} from "src/components/FormFields";
import NewUploadField from "src/components/FormFields/NewUploadField.js";
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
import industries from "src/components/FormLists/industries.js";

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
  const {
    formField: {
      investor_logo,
      investor_name,
      investor_type,
      investor_date_of_incorporation,
      investor_address_city,
      investor_address_street,
      investor_address_number,
      investor_address_postalcode,
      investor_country,
      investor_industry,
      investor_registration_cert_attachment,
    },
  } = props;

  const userId = props.vuser;
  const investorId = props.vinvestor;
  const { values: formValues } = useFormikContext();
  const updatefields = { values: formValues };
  const updateregcert =
    updatefields.values.investor_registration_cert_attachment;
  const updatelogo = updatefields.values.investor_logo;

  const [slogo, setSlogo] = useState("");
  const [updateregcertpdf, setUpdateregcertpdf] = useState("");
  const [updateregcertimg, setUpdateregcertimg] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [certloading, setCertLoading] = useState(false);
  const [certsuccess, setCertSuccess] = useState(false);

  useEffect(() => {
    if (updateregcert) {
      async function geturl() {
        var uploadext = updateregcert.split(".").pop();
        var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
        const d = imageExtensions.includes(uploadext);
        if (d === true) {
          const u = await Storage.vault.get(updateregcert);
          setUpdateregcertimg(u);
        } else {
          const h = await Storage.vault.get(updateregcert);
          setUpdateregcertpdf(h);
        }
      }
      geturl();
    }
  }, [updateregcert]);

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
        const u = await Storage.vault.get(updatelogo);
        setSlogo(u);
      }
      getlogourl();
    }
  }, [updatelogo]);

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
                name={investor_name.name}
                label={investor_name.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                name={investor_type.name}
                label={investor_type.label}
                data={type}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={investor_address_city.name}
                label={investor_address_city.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={investor_address_postalcode.name}
                label={investor_address_postalcode.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={investor_address_street.name}
                label={investor_address_street.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={investor_address_number.name}
                label={investor_address_number.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectListField
                name={investor_country.name}
                label={investor_country.label}
                data={cr}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerField
                name={investor_date_of_incorporation.name}
                label={investor_date_of_incorporation.label}
                format="dd/MM/yyyy"
                minDate={new Date("1500/12/31")}
                maxDate={new Date()}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectListField
                name={investor_industry.name}
                label={investor_industry.label}
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
                    name={investor_registration_cert_attachment.name}
                    id={investor_registration_cert_attachment.name}
                    accept="image/*, application/pdf"
                    style={{ display: "none" }}
                    ident={investorId}
                    userid={userId}
                  />
                  <label htmlFor={investor_registration_cert_attachment.name}>
                    <LoaderButton
                      id={investor_registration_cert_attachment.name}
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
                    name={investor_logo.name}
                    id={investor_logo.name}
                    accept="image/*"
                    style={{ display: "none" }}
                    ident={investorId}
                    userid={userId}
                  />
                  <label htmlFor={investor_logo.name}>
                    <LoaderButton
                      id={investor_logo.name}
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
