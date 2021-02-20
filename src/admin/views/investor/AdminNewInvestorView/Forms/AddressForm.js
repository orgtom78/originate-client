import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  InputField,
  SelectField,
  DatePickerField,
} from "src/components/FormFields";
import AdminUploadField from "src/components/FormFields/AdminUploadField.js";
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
      userId,
      identityId,
      investor_logo,
      investor_name,
      investor_type,
      investor_date_of_incorporation,
      investor_address_city,
      investor_address_street,
      investor_address_postalcode,
      investor_country,
      investor_industry,
      investor_registration_cert_attachment,
      investor_website,
      investor_address_refinment,
      investor_industry_code,
      investor_register_number,
      investor_trading_name,
    },
  } = props;

  const { id } = useParams();
  const investId = props.value;
  const { ident } = useParams();
  const { values: formValues } = useFormikContext();
  const updatefields = { values: formValues };
  const updateregcert =
    updatefields.values.investor_registration_cert_attachment;
  const updatelogo = updatefields.values.investor_logo;

  const [scert, setScert] = useState("");
  const [slogo, setSlogo] = useState("");

  const [certloading, setCertLoading] = useState(false);
  const [certsuccess, setCertSuccess] = useState(false);
  const [logoloading, setLogoLoading] = useState(false);
  const [logosuccess, setLogoSuccess] = useState(false);

  useEffect(() => {
    if (updateregcert) {
      async function getcerturl() {
        const u = await Storage.vault.get(updateregcert);
        setScert(u);
      }
      getcerturl();
    }
  }, [updateregcert]);

  useEffect(() => {
    if (updatelogo) {
      async function getlogourl() {
        const u = await Storage.vault.get(updatelogo);
        setSlogo(u);
      }
      getlogourl();
    }
  }, [updatelogo]);

  async function handleCertClick() {
    setCertSuccess(false);
    setCertLoading(true);
    const b = await scert;
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

  return (
    <React.Fragment>
      <Card>
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InputField
                name={userId.name}
                label={userId.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={identityId.name}
                label={identityId.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={investor_name.name}
                label={investor_name.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={investor_trading_name.name}
                label={investor_trading_name.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={investor_website.name}
                label={investor_website.label}
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
                name={investor_address_refinment.name}
                label={investor_address_refinment.label}
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
              <InputField
                name={investor_industry_code.name}
                label={investor_industry_code.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={investor_register_number.name}
                label={investor_register_number.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {updateregcert ? (
                <>
                  <img className={classes.img} alt="complex" src={scert} />
                </>
              ) : (
                <>
                  <AdminUploadField
                    name={investor_registration_cert_attachment.name}
                    id={investor_registration_cert_attachment.name}
                    accept="image/*"
                    style={{ display: "none" }}
                    identityId={ident}
                    userid={id}
                    sectorid={investId}
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
                  <AdminUploadField
                    name={investor_logo.name}
                    id={investor_logo.name}
                    accept="image/*"
                    style={{ display: "none" }}
                    identityId={ident}
                    userid={id}
                    sectorid={investId}
                  />
                  <label htmlFor={investor_logo.name}>
                    <LoaderButton
                      id={investor_logo.name}
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
