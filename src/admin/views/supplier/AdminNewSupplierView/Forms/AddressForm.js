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
import makeStyles from "@mui/styles/makeStyles";
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
      supplier_logo,
      supplier_name,
      supplier_type,
      supplier_date_of_incorporation,
      supplier_address_city,
      supplier_address_street,
      supplier_address_number,
      supplier_address_postalcode,
      supplier_country,
      supplier_industry,
      supplier_registration_cert_attachment,
      supplier_website,
      supplier_address_refinment,
      supplier_industry_code,
      supplier_register_number,
      supplier_trading_name,
    },
  } = props;

  const { ID } = useParams();
  const supId = props.value;
  const { ident } = useParams();

  const { values: formValues } = useFormikContext();
  const updatefields = { values: formValues };
  const updateregcert =
    updatefields.values.supplier_registration_cert_attachment;
  const updatelogo = updatefields.values.supplier_logo;

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
                name={supplier_name.name}
                label={supplier_name.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={supplier_trading_name.name}
                label={supplier_trading_name.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={supplier_website.name}
                label={supplier_website.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                name={supplier_type.name}
                label={supplier_type.label}
                data={type}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={supplier_address_city.name}
                label={supplier_address_city.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={supplier_address_postalcode.name}
                label={supplier_address_postalcode.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={supplier_address_street.name}
                label={supplier_address_street.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={supplier_address_number.name}
                label={supplier_address_number.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={supplier_address_refinment.name}
                label={supplier_address_refinment.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectListField
                name={supplier_country.name}
                label={supplier_country.label}
                data={cr}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerField
                name={supplier_date_of_incorporation.name}
                label={supplier_date_of_incorporation.label}
                format="dd/MM/yyyy"
                minDate={new Date("1500/12/31")}
                maxDate={new Date()}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectListField
                name={supplier_industry.name}
                label={supplier_industry.label}
                data={ind}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={supplier_industry_code.name}
                label={supplier_industry_code.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={supplier_register_number.name}
                label={supplier_register_number.label}
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
                    name={supplier_registration_cert_attachment.name}
                    id={supplier_registration_cert_attachment.name}
                    accept="image/*, application/pdf"
                    style={{ display: "none" }}
                    identityid={ident}
                    userid={ID}
                    sectorid={supId}
                  />
                  <label htmlFor={supplier_registration_cert_attachment.name}>
                    <LoaderButton
                      id={supplier_registration_cert_attachment.name}
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
                    name={supplier_logo.name}
                    id={supplier_logo.name}
                    accept="image/*"
                    style={{ display: "none" }}
                    identityid={ident}
                    userid={ID}
                    sectorid={supId}
                  />
                  <label htmlFor={supplier_logo.name}>
                    <LoaderButton
                      id={supplier_logo.name}
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
