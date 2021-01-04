import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { InputField, SelectField, UploadField } from "src/components/FormFields";
import SelectListField from "src/components/FormFields/SelectListField.jsx"; 
import {
  Card,
  CardContent,
  Divider,
  Grid,
  makeStyles,
} from "@material-ui/core";
import NumberFormat from 'react-number-format';
import { Upload as UploadIcon } from "react-feather";
import { useFormikContext } from "formik";
import { Storage } from "aws-amplify";
import LoaderButton from "src/components/LoaderButton.js";
import { green } from "@material-ui/core/colors";
import currencies from "src/components/currencies.js";
import countries from "src/components/countries.js";
import FormikAutocomplete from "src/components/FormFields/AutocompleteField.js";
import { Field } from "formik";

const cr = countries;
const curr = currencies;

const auto = FormikAutocomplete;

const terms = [
  {
    value: "30",
    label: "30 days",
  },
  {
    value: "60",
    label: "60 days",
  },
  {
    value: "90",
    label: "90 days",
  },
  {
    value: "120",
    label: "120 days",
  },
  {
    value: "180",
    label: "180 days",
  },
  {
    value: "210",
    label: "210 days",
  },
  {
    value: "240",
    label: "240 days",
  },
  {
    value: "270",
    label: "270 days",
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

export default function BuyerAddressForm(props) {
  const classes = useStyles();

  const {
    formField: {
      userId,
      identityId,
      supplierId,
      buyer_address_city,
      buyer_address_number,
      buyer_address_postalcode,
      buyer_address_street,
      buyer_name,
      buyer_country,
      buyer_website,
      buyer_currency,
      buyer_loan_request_amount,
      buyer_payment_terms,
      buyer_sample_trading_docs_attachment,
      buyer_sold_goods_description,
    },
  } = props;

  const { values: formValues } = useFormikContext();
  const updatefields = { values: formValues };
  const updateregcert = updatefields.values.buyer_sample_trading_docs_attachment;

  const [img, setImg] = useState("");
  const [updateregcertpdf, setUpdateregcertpdf] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (updateregcert) {
      async function geturl() {
        var uploadext = updateregcert.split(".").pop();
        var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
        const d = imageExtensions.includes(uploadext);
        if (d === true) {
          const u = await Storage.vault.get(updateregcert);
          setImg(u);
        } else {
          const h = await Storage.vault.get(updateregcert);
          setUpdateregcertpdf(h);
        }
      }
      geturl();
    }
  }, [updateregcert]);

  async function handleClick() {
    setSuccess(false);
    setLoading(true);
    const b = await img;
    if (b) {
      setSuccess(true);
      setLoading(false);
    }
  }

  function isimageorpdf() {
    if (img) {
      return (
        <>
          <img className={classes.img} alt="complex" src={img} />
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

  function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
        type="text"
      />
    );
  }
  
  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

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
                name={supplierId.name}
                label={supplierId.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={buyer_loan_request_amount.name}
                label={buyer_loan_request_amount.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                name={buyer_payment_terms.name}
                label={buyer_payment_terms.label}
                data={terms}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectListField
                name={buyer_currency.name}
                label={buyer_currency.label}
                data={curr}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={buyer_name.name}
                label={buyer_name.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectListField
                name={buyer_country.name}
                label={buyer_country.label}
                data={cr}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={buyer_address_postalcode.name}
                label={buyer_address_postalcode.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={buyer_address_city.name}
                label={buyer_address_city.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={buyer_address_street.name}
                label={buyer_address_street.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={buyer_address_number.name}
                label={buyer_address_number.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={buyer_website.name}
                label={buyer_website.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={buyer_sold_goods_description.name}
                label={buyer_sold_goods_description.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {updateregcert ? (
                <>{isimageorpdf()}</>
              ) : (
                <>
                  <UploadField
                    name={buyer_sample_trading_docs_attachment.name}
                    id={buyer_sample_trading_docs_attachment.name}
                    accept="image/*, application/pdf"
                    style={{ display: "none" }}
                  />
                  <label htmlFor={buyer_sample_trading_docs_attachment.name}>
                    <LoaderButton
                      id={buyer_sample_trading_docs_attachment.name}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={loading}
                      success={success}
                      loading={loading}
                      onClick={handleClick}
                    >
                      {" "}
                      Sample Tading Documents*
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
