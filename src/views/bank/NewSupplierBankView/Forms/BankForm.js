import React, { useEffect, useState } from "react";
import { InputField, UploadField } from "src/components/FormFields";
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
import countries from "src/components/countries.js";
import currencies from "src/components/currencies.js";
import FormikAutocomplete from "src/components/FormFields/AutocompleteField.js";
import { Field } from "formik";

const curr = currencies;
const cr = countries;
const auto = FormikAutocomplete;

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
      account_statement_attachment,
      bank_account_number,
      bank_account_sortcode,
      bank_address_city,
      bank_address_number,
      bank_address_postalcode,
      bank_address_street,
      bank_branch,
      bank_country,
      bank_name,
      bank_routing_number,
      bic_swift_code,
      iban,
      iso_currency_code,
    },
  } = props;

  const { values: formValues } = useFormikContext();
  const updatefields = { values: formValues };

  const account_statement_update =
    updatefields.values.account_statement_attachment;

  const [accountimg, setAccountimg] = useState("");
  const [accountpdf, setAccountpdf] = useState("");

  const [accountloading, setAccountLoading] = useState(false);
  const [accountsuccess, setAccountSuccess] = useState(false);

  useEffect(() => {
    if (account_statement_update) {
      async function geturl() {
        var uploadext = account_statement_update.split(".").pop();
        var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
        const d = imageExtensions.includes(uploadext);
        if (d === true) {
          const u = await Storage.vault.get(account_statement_update);
          setAccountimg(u);
        } else {
          const h = await Storage.vault.get(account_statement_update);
          setAccountpdf(h);
        }
      }
      geturl();
    }
  }, [account_statement_update]);

  async function handleAccountClick() {
    setAccountSuccess(false);
    setAccountLoading(true);
    const b = await accountimg;
    if (b) {
      setAccountSuccess(true);
      setAccountLoading(false);
    }
  }

  function accountisimageorpdf() {
    if (accountimg) {
      return (
        <>
          <img className={classes.img} alt="complex" src={accountimg} />
        </>
      );
    } else {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={accountpdf}
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
                name={bank_name.name}
                label={bank_name.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={bank_account_number.name}
                label={bank_account_number.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={iban.name}
                label={iban.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={bic_swift_code.name}
                label={bic_swift_code.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={bank_account_sortcode.name}
                label={bank_account_sortcode.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={bank_routing_number.name}
                label={bank_routing_number.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={bank_address_city.name}
                label={bank_address_city.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={bank_address_postalcode.name}
                label={bank_address_postalcode.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={bank_address_street.name}
                label={bank_address_street.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={bank_address_number.name}
                label={bank_address_number.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={bank_branch.name}
                label={bank_branch.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectListField
                name={bank_country.name}
                label={bank_country.label}
                data={cr}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectListField
                name={iso_currency_code.name}
                label={iso_currency_code.label}
                data={curr}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              {account_statement_update ? (
                <>{accountisimageorpdf()}</>
              ) : (
                <>
                  <UploadField
                    name={account_statement_attachment.name}
                    id={account_statement_attachment.name}
                    accept="image/*, application/pdf"
                    style={{ display: "none" }}
                  />
                  <label htmlFor={account_statement_attachment.name}>
                    <LoaderButton
                      id={account_statement_attachment.name}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={accountloading}
                      success={accountsuccess}
                      loading={accountloading}
                      onClick={handleAccountClick}
                    >
                      {" "}
                      Bank Account Statement*
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
