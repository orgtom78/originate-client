import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  InputField,
  SelectField,
  DatePickerField,
} from "src/components/FormFields";
import AdminUploadField from "src/components/FormFields/AdminUploadField.js";
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
  {
    value: "Sole Proprietorship",
    label: "Sole Proprietorship",
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
      spv_logo,
      spv_name,
      spv_type,
      spv_date_of_incorporation,
      spv_address_city,
      spv_address_street,
      spv_address_postalcode,
      spv_country,
      spv_industry,
      spv_registration_cert_attachment,
      spv_website,
      spv_address_refinment,
      spv_industry_code,
      spv_register_number,
      spv_trading_name,
    },
  } = props;

  const { groupid } = useParams();
  const investId = props.value;
  const { ident } = useParams();
  const { values: formValues } = useFormikContext();
  const updatefields = { values: formValues };
  const updateregcert =
    updatefields.values.spv_registration_cert_attachment;
  const updatelogo = updatefields.values.spv_logo;

  const [slogo, setSlogo] = useState("");

  const [updateregcertimg, setUpdateregcertimg] = useState("");
  const [updateregcertpdf, setUpdateregcertpdf] = useState("");

  const [certloading, setCertLoading] = useState(false);
  const [certsuccess, setCertSuccess] = useState(false);
  const [logoloading, setLogoLoading] = useState(false);
  const [logosuccess, setLogoSuccess] = useState(false);

  useEffect(() => {
    if (updateregcert) {
      async function geturl() {
        var uploadext = updateregcert.split(".").pop();
        var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
        const d = imageExtensions.includes(uploadext);
        if (d === true) {
          const u = await Storage.get(updateregcert, {
            level: "private",
            identityId: ident,
          });
          setUpdateregcertimg(u);
        } else {
          const h = await Storage.get(updateregcert, {
            level: "private",
            identityId: ident,
          });
          setUpdateregcertpdf(h);
        }
      }
      geturl();
    }
  }, [updateregcert, ident]);

  useEffect(() => {
    if (updatelogo) {
      async function geturl() {
        const u = await Storage.get(updatelogo, {
          level: "private",
          identityId: ident,
        });
        setSlogo(u);
      }
      geturl();
    }
  }, [updatelogo, ident]);

  async function handleCertClick() {
    setCertSuccess(false);
    setCertLoading(true);
    const b = await updateregcert;
    if (b) {
      setCertSuccess(true);
      setCertLoading(false);
    } else {
      setCertSuccess(false);
      setCertLoading(true);
    }
  }

  async function handleLogoClick() {
    setLogoSuccess(false);
    setLogoLoading(true);
    const b = await slogo;
    if (b) {
      setLogoSuccess(true);
      setLogoLoading(false);
    }
  }

  function updateregcertisimageorpdf() {
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
              <InputField
                name={spv_trading_name.name}
                label={spv_trading_name.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={spv_website.name}
                label={spv_website.label}
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
                name={spv_address_refinment.name}
                label={spv_address_refinment.label}
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
              <InputField
                name={spv_industry_code.name}
                label={spv_industry_code.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={spv_register_number.name}
                label={spv_register_number.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {updateregcert ? (
                <>{updateregcertisimageorpdf()}</>
              ) : (
                <>
                  <AdminUploadField
                    name={spv_registration_cert_attachment.name}
                    id={spv_registration_cert_attachment.name}
                    accept="image/*, application/pdf"
                    style={{ display: "none" }}
                    identityId={ident}
                    userid={groupid}
                    sectorid={investId}
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
                      Registration Certificate*
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
                  <AdminUploadField
                    name={spv_logo.name}
                    id={spv_logo.name}
                    accept="image/*"
                    style={{ display: "none" }}
                    identityId={ident}
                    userid={groupid}
                    sectorid={investId}
                  />
                  <label htmlFor={spv_logo.name}>
                    <LoaderButton
                      id={spv_logo.name}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={logoloading}
                      success={logosuccess}
                      loading={logoloading}
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
