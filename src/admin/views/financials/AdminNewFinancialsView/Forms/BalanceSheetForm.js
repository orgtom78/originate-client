import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InputField } from "src/components/FormFields";
import AdminUploadField from "src/components/FormFields/AdminUploadField";
import { Card, CardContent, Divider, Grid } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
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
      marketable_securities,
      accounts_receivable,
      inventory,
      goodwill,
      other_current_assets,
      other_non_current_assets,
      accumulated_depreciation,
      total_assets,
      short_term_debt,
      accounts_payable,
      accured_expenses,
      unearned_revenue,
      long_term_debt,
      other_current_liabilities,
      other_long_term_liabilities,
      income_tax_payable,
      dividends_payable,
      total_liabilities,
      common_stock,
      preferred_stock,
      paid_in_capital,
      retained_earnings,
      total_equity,
      equity_book_value,
      equity_market_value,
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
              <InputField
                name={marketable_securities.name}
                label={marketable_securities.label}
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
                name={goodwill.name}
                label={goodwill.label}
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
                name={other_non_current_assets.name}
                label={other_non_current_assets.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={accumulated_depreciation.name}
                label={accumulated_depreciation.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={total_assets.name}
                label={total_assets.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={short_term_debt.name}
                label={short_term_debt.label}
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
                name={accured_expenses.name}
                label={accured_expenses.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={unearned_revenue.name}
                label={unearned_revenue.label}
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
                name={other_current_liabilities.name}
                label={other_current_liabilities.label}
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
                name={income_tax_payable.name}
                label={income_tax_payable.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={dividends_payable.name}
                label={dividends_payable.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={total_liabilities.name}
                label={total_liabilities.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={common_stock.name}
                label={common_stock.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={preferred_stock.name}
                label={preferred_stock.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={paid_in_capital.name}
                label={paid_in_capital.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={retained_earnings.name}
                label={retained_earnings.label}
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
                name={equity_book_value.name}
                label={equity_book_value.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={equity_market_value.name}
                label={equity_market_value.label}
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
