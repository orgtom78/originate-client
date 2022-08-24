import React, { useEffect, useState } from "react";
import {
  InputField,
  DatePickerField,
  SelectField,
} from "src/components/FormFields";
import SliderField from "src/components/FormFields/SliderField";
import { Card, CardContent, Divider, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

import { useFormikContext } from "formik";
import { Storage } from "aws-amplify";
import { green } from "@mui/material/colors";
import { useUser } from "src/components/context/usercontext.js";

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
  const context = useUser();
  const classes = useStyles();
  const {
    formField: {
      buyer_supplier_year_business_relation_started,
      buyer_previous_year_transaction_amount,
      buyer_reporting_year_transaction_amount,
      buyer_next_year_projected_transaction_amount,
      buyer_previous_year_number_invoices,
      buyer_insurance_name,
      buyer_existing_disputes,
      buyer_finance_department_contact_email,
      buyer_use_of_goods_purchased,
      buyer_invoices_paid_on_time,
      buyer_invoices_past_due_30_days,
      buyer_invoices_past_due_60_days,
      buyer_invoices_past_due_90_days,
    },
  } = props;

  const buyerId = props.vbuyer;
  const { values: formValues } = useFormikContext();
  const updatefields = { values: formValues };
  const buyeripu = updatefields.values.buyer_one_off_ipu_attachment;

  const [img, setImg] = useState("");
  const [updateregcertpdf, setUpdateregcertpdf] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [usergroupId, setUsergroupId] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    async function onLoad() {
      const data = await context;
      const { sub, identity } = data;
      setUsergroupId(sub);
      setIdentity(identity);
    }
    onLoad();
  }, [context]);

  useEffect(() => {
    if (buyeripu) {
      async function geturl() {
        var uploadext = buyeripu.split(".").pop();
        var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
        const d = imageExtensions.includes(uploadext);
        if (d === true) {
          const u = await Storage.get(buyeripu, {
            level: "private",
            identityId: identity,
          });
          setImg(u);
        } else {
          const h = await Storage.get(buyeripu, {
            level: "private",
            identityId: identity,
          });
          setUpdateregcertpdf(h);
        }
      }
      geturl();
    }
  }, [buyeripu, identity]);

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

  return (
    <React.Fragment>
      <Card>
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
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
                name={buyer_previous_year_number_invoices.name}
                label={buyer_previous_year_number_invoices.label}
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
                name={buyer_reporting_year_transaction_amount.name}
                label={buyer_reporting_year_transaction_amount.label}
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
                name={buyer_finance_department_contact_email.name}
                label={buyer_finance_department_contact_email.label}
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
              <InputField
                name={buyer_insurance_name.name}
                label={buyer_insurance_name.label}
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
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
