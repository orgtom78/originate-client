import React, { useEffect, useState } from "react";
import {
  InputField,
  DatePickerField,
  UploadField,
} from "src/components/FormFields";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { useFormikContext } from "formik";
import { Storage } from "aws-amplify";
import LoaderButton from "src/components/LoaderButton.js";
import { green } from "@material-ui/core/colors";
import { Upload as UploadIcon } from "react-feather";

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
      accounts_payable,
      accounts_receivable,
      cash,
      equity_book_value,
      equity_market_value,
      interest_expenses,
      inventory,
      retained_earnings,
      short_term_debt,
      working_capital,
      ebit,
      financials_attachment,
      net_profit,
      financials_rating,
      financials_reporting_period,
      sales,
      total_assets,
      total_liabilities,
    },
  } = props;

  const { values: formValues } = useFormikContext();
  const updatefields = { values: formValues };
  const finattachment = updatefields.values.financials_attachment;

  const [img, setImg] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (finattachment) {
      async function geturl() {
        const u = await Storage.vault.get(finattachment);
        setImg(u);
      }
      geturl();
    }
  }, [finattachment]);

  async function handleClick() {
    setSuccess(false);
    setLoading(true);
    const b = await img;
    if (b) {
      setSuccess(true);
      setLoading(false);
    }
  }

  return (
    <React.Fragment>
      <Card>
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              {finattachment ? (
                <>
                  <img className={classes.img} alt="complex" src={img} />
                </>
              ) : (
                <>
                  <UploadField
                    name={financials_attachment.name}
                    id={financials_attachment.name}
                    accept="image/*,application/pdf"
                    style={{ display: "none" }}
                  />
                  <label htmlFor={financials_attachment.name}>
                    <LoaderButton
                      id={financials_attachment.name}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={loading}
                      success={success}
                      loading={loading}
                      onClick={handleClick}
                    >
                      {" "}
                      Company financial report*
                    </LoaderButton>
                  </label>
                </>
              )}
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
                name={accounts_receivable.name}
                label={accounts_receivable.label}
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
            <Grid item xs={12} sm={6}>
              <InputField
                name={interest_expenses.name}
                label={interest_expenses.label}
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
                name={retained_earnings.name}
                label={retained_earnings.label}
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
                name={working_capital.name}
                label={working_capital.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={ebit.name}
                label={ebit.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={net_profit.name}
                label={net_profit.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={financials_rating.name}
                label={financials_rating.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={sales.name}
                label={sales.label}
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
                name={total_liabilities.name}
                label={total_liabilities.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePickerField
                name={financials_reporting_period.name}
                label={financials_reporting_period.label}
                format="yyyy"
                views={["year"]}
                minDate={new Date("2000/12/31")}
                maxDate={new Date()}
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
