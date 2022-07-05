import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InputField, DatePickerField } from "src/components/FormFields";
import AdminUploadField from "src/components/FormFields/AdminUploadField";
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

export default function BalanceSheetForm(props) {
  const classes = useStyles();
  const {
    formField: {
      balance_sheet_attachment,
      financials_reporting_period,
      cash, 
      accounts_receivable,
      inventory,
      other_current_assets,
      sale_purchase_of_fixed_asset,
      goodwill,
      other_non_current_assets,
      accounts_payable,
      current_long_term_debt,
      other_current_liabilities,
      long_term_debt,
      other_long_term_liabilities,
      total_equity,
      total_liabilities_and_equity,
    },
  } = props;

  const financialsId = props.value;
  const { id } = useParams();
  const { ident } = useParams();
  const { values: formValues } = useFormikContext();
  const updatefields = { values: formValues };

  const balance_sheet_update = updatefields.values.balance_sheet_attachment;

  const [balanceimg, setBalanceimg] = useState("");
  const [balancepdf, setBalancepdf] = useState("");

  const [balanceloading, setBalanceLoading] = useState(false);
  const [balancesuccess, setBalanceSuccess] = useState(false);

  useEffect(() => {
    if (balance_sheet_update) {
      async function geturl() {
        var uploadext = balance_sheet_update.split(".").pop();
        var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
        const d = imageExtensions.includes(uploadext);
        if (d === true) {
          const u = await Storage.get(balance_sheet_update, {
            level: "private",
            identityId: ident,
          });
          setBalanceimg(u);
        } else {
          const h = await Storage.get(balance_sheet_update, {
            level: "private",
            identityId: ident,
          });
          setBalancepdf(h);
        }
      }
      geturl();
    }
  }, [balance_sheet_update, ident]);

  async function handleBalanceClick() {
    setBalanceSuccess(false);
    setBalanceLoading(true);
    const b = await balanceimg;
    if (b) {
      setBalanceSuccess(true);
      setBalanceLoading(false);
    }
  }

  function balanceisimageorpdf() {
    if (balanceimg) {
      return (
        <>
          <img className={classes.img} alt="complex" src={balanceimg} />
        </>
      );
    } else {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={balancepdf}
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
            <Grid item xs={12}>
              {balance_sheet_update ? (
                <>{balanceisimageorpdf()}</>
              ) : (
                <>
                  <AdminUploadField
                    name={balance_sheet_attachment.name}
                    id={balance_sheet_attachment.name}
                    accept="image/*, application/pdf"
                    style={{ display: "none" }}
                    identityid={ident}
                    userid={id}
                    sectorid={financialsId}
                  />
                  <label htmlFor={balance_sheet_attachment.name}>
                    <LoaderButton
                      id={balance_sheet_attachment.name}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={balanceloading}
                      success={balancesuccess}
                      loading={balanceloading}
                      onClick={handleBalanceClick}
                    >
                      {" "}
                      Balance Sheet*
                    </LoaderButton>
                  </label>
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerField
                name={financials_reporting_period.name}
                label={financials_reporting_period.label}
                format="yyyy"
                views={["year"]}
                minDate={new Date("2017/12/31")}
                maxDate={new Date()}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={cash.name}
                label={cash.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={accounts_receivable.name}
                label={accounts_receivable.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={inventory.name}
                label={inventory.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={other_current_assets.name}
                label={other_current_assets.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={sale_purchase_of_fixed_asset.name}
                label={sale_purchase_of_fixed_asset.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={goodwill.name}
                label={goodwill.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={other_non_current_assets.name}
                label={other_non_current_assets.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={accounts_payable.name}
                label={accounts_payable.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={current_long_term_debt.name}
                label={current_long_term_debt.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={other_current_liabilities.name}
                label={other_current_liabilities.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={long_term_debt.name}
                label={long_term_debt.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={other_long_term_liabilities.name}
                label={other_long_term_liabilities.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={total_equity.name}
                label={total_equity.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={total_liabilities_and_equity.name}
                label={total_liabilities_and_equity.label}
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
