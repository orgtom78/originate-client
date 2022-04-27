import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  InputField,
  DatePickerField,
  SelectField,
} from "src/components/FormFields";
import SliderField from "src/components/FormFields/SliderField";
import AdminUploadField from "src/components/FormFields/AdminUploadField.js";
import { Card, CardContent, Divider, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Upload as UploadIcon } from "react-feather";
import { useFormikContext } from "formik";
import { Storage } from "aws-amplify";
import LoaderButton from "src/components/LoaderButton.js";
import { green } from "@mui/material/colors";

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

const insuranceStatus = [
  {
    value: "insurable-avg-price",
    label: "Insurable (avg.) Price",
  },
  {
    value: "insurable-above-avg-price",
    label: "Insurable (above avg.) Price",
  },
  {
    value: "not-insurable",
    label: "Not Insurable",
  },
];

const boolean = [
  {
    value: "yes",
    label: "Yes",
  },
  {
    value: "no",
    label: "No",
  },
];

const productUse = [
  {
    value: "direct-resale",
    label: "Direct Resale",
  },
  {
    value: "incorporation-into-product",
    label: "Incorporation into Product",
  },
  {
    value: "other",
    label: "Other",
  },
];

export default function HistoryForm(props) {
  const classes = useStyles();
  const {
    formField: {
      buyer_insurance_name,
      buyer_one_off_ipu_attachment,
      buyer_next_year_projected_transaction_amount,
      buyer_previous_year_transaction_amount,
      buyer_reporting_year,
      buyer_reporting_year_transaction_amount,
      buyer_previous_year_number_invoices,
      buyer_existing_disputes,
      buyer_existing_disputes_source,
      buyer_insurance_status,
      buyer_country_year_of_rating_downgrade,
      buyer_finance_department_contact_exists,
      buyer_finance_department_contact_email,
      buyer_field_visit_conducted,
      buyer_supplier_year_business_relation_started,
      buyer_invoices_paid_on_time,
      buyer_invoices_past_due,
      buyer_invoices_past_due_30_days,
      buyer_invoices_past_due_60_days,
      buyer_invoices_past_due_90_days,
      buyer_use_of_goods_purchased,
    },
  } = props;

  const { id } = useParams();
  const { ident } = useParams();
  const buyId = props.value;
  const { values: formValues } = useFormikContext();
  const updatefields = { values: formValues };
  const buyeripu = updatefields.values.buyer_one_off_ipu_attachment;
  const [ipuimg, setIpuimg] = useState("");
  const [ipupdf, setIpupdf] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (buyeripu) {
      async function geturl() {
        var uploadext = buyeripu.split(".").pop();
        var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
        const d = imageExtensions.includes(uploadext);
        if (d === true) {
          const u = await Storage.get(buyeripu, {
            level: "private",
            identityId: ident,
          });
          setIpuimg(u);
        } else {
          const h = await Storage.get(buyeripu, {
            level: "private",
            identityId: ident,
          });
          setIpupdf(h);
        }
      }
      geturl();
    }
  }, [buyeripu, ident]);

  async function handleClick() {
    setSuccess(false);
    setLoading(true);
    const b = await buyeripu;
    if (b) {
      setSuccess(true);
      setLoading(false);
    }
  }

  function isimageorpdf() {
    if (ipuimg) {
      return (
        <>
          <img className={classes.img} alt="complex" src={ipuimg} />
        </>
      );
    } else {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={ipupdf}
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
              <DatePickerField
                name={buyer_reporting_year.name}
                label={buyer_reporting_year.label}
                format="yyyy"
                views={["year"]}
                minDate={new Date("2021/12/31")}
                maxDate={new Date("2021/12/31")}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerField
                name={buyer_supplier_year_business_relation_started.name}
                label={buyer_supplier_year_business_relation_started.label}
                format="yyyy"
                views={["year"]}
                maxDate={new Date()}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={buyer_next_year_projected_transaction_amount.name}
                label={buyer_next_year_projected_transaction_amount.label}
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputField
                name={buyer_reporting_year_transaction_amount.name}
                label={buyer_reporting_year_transaction_amount.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={buyer_previous_year_transaction_amount.name}
                label={buyer_previous_year_transaction_amount.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={buyer_previous_year_number_invoices.name}
                label={buyer_previous_year_number_invoices.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={buyer_insurance_name.name}
                label={buyer_insurance_name.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                name={buyer_insurance_status.name}
                label={buyer_insurance_status.label}
                data={insuranceStatus}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                name={buyer_existing_disputes.name}
                label={buyer_existing_disputes.label}
                data={boolean}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={buyer_existing_disputes_source.name}
                label={buyer_existing_disputes_source.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerField
                name={buyer_country_year_of_rating_downgrade.name}
                label={buyer_country_year_of_rating_downgrade.label}
                format="yyyy"
                views={["year"]}
                maxDate={new Date()}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                name={buyer_finance_department_contact_exists.name}
                label={buyer_finance_department_contact_exists.label}
                data={boolean}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={buyer_finance_department_contact_email.name}
                label={buyer_finance_department_contact_email.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                name={buyer_field_visit_conducted.name}
                label={buyer_field_visit_conducted.label}
                data={boolean}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SliderField
                name={buyer_invoices_paid_on_time.name}
                label={buyer_invoices_paid_on_time.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SliderField
                name={buyer_invoices_past_due_30_days.name}
                label={buyer_invoices_past_due_30_days.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SliderField
                name={buyer_invoices_past_due_60_days.name}
                label={buyer_invoices_past_due_60_days.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SliderField
                name={buyer_invoices_past_due_90_days.name}
                label={buyer_invoices_past_due_90_days.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                name={buyer_use_of_goods_purchased.name}
                label={buyer_use_of_goods_purchased.label}
                data={productUse}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {buyeripu ? (
                <>{isimageorpdf()}</>
              ) : (
                <>
                  <AdminUploadField
                    name={buyer_one_off_ipu_attachment.name}
                    id={buyer_one_off_ipu_attachment.name}
                    accept="image/*,application/pdf"
                    style={{ display: "none" }}
                    identityid={ident}
                    userid={id}
                    sectorid={buyId}
                  />
                  <label htmlFor={buyer_one_off_ipu_attachment.name}>
                    <LoaderButton
                      id={buyer_one_off_ipu_attachment.name}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={loading}
                      success={success}
                      loading={loading}
                      onClick={handleClick}
                    >
                      {" "}
                      Executed Irrevocable Payment Undertaking*
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
