import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  InputField,
  SelectField,
  DatePickerField,
  UploadField,
} from "../FormFields";
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
import countries from "src/components/countries.js";
import industries from "src/components/industries.js";
import FormikAutocomplete from "src/views/account/NewAccountView/FormFields/AutocompleteField.js";
import { Field } from "formik";

const cr = countries;
const ind = industries;
const auto = FormikAutocomplete;

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
      supplier_address_postalcode,
      supplier_country,
      supplier_industry,
      supplier_registration_cert_attachment,
    },
  } = props;

  const { values: formValues } = useFormikContext();
  const updatefields = { values: formValues };
  const updateregcert =
    updatefields.values.supplier_registration_cert_attachment;
  const updatelogo = updatefields.values.supplier_logo;

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
                name={supplier_name.name}
                label={supplier_name.label}
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
              <Field
                name={supplier_country.name}
                label={supplier_country.label}
                component={auto}
                options={cr}
                getOptionLabel={(option) => option.label}
                data={cr}
                onChange={(e) => this.props.setState(e.option.label)}
                textFieldProps={{
                  name: supplier_country.name,
                  label: supplier_country.label,
                  fullWidth: true,
                  variant: "outlined",
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
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
              <Field
                name={supplier_industry.name}
                label={supplier_industry.label}
                component={auto}
                options={ind}
                getOptionLabel={(option) => option.label}
                textFieldProps={{
                  name: supplier_industry.name,
                  label: supplier_industry.label,
                  fullWidth: true,
                  variant: "outlined",
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {updateregcert ? (
                <>
                  <img className={classes.img} alt="complex" src={scert} />
                </>
              ) : (
                <>
                  <UploadField
                    name={supplier_registration_cert_attachment.name}
                    id={supplier_registration_cert_attachment.name}
                    accept="image/*"
                    style={{ display: "none" }}
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
                  <UploadField
                    name={supplier_logo.name}
                    id={supplier_logo.name}
                    accept="image/*"
                    style={{ display: "none" }}
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
