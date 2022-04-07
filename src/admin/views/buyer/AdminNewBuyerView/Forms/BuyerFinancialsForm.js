import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InputField, DatePickerField } from "src/components/FormFields";
import AdminUploadField from "src/components/FormFields/AdminUploadField.js";
import { Card, CardContent, Divider, Grid } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { useFormikContext } from "formik";
import { Storage } from "aws-amplify";
import LoaderButton from "src/components/LoaderButton.js";
import { green } from "@mui/material/colors";
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

export default function BuyerFinancialsForm(props) {
  const classes = useStyles();
  const {
    formField: {
      ebit,
      balance_sheet_attachment,
      income_statement_attachment,
      net_profit,
      financials_rating,
      financials_reporting_period,
      sales,
      total_assets,
      retained_earnings,
      working_capital,
    },
  } = props;

  const { id } = useParams();
  const finId = props.fin;
  const { ident } = useParams();
  const { values: formValues } = useFormikContext();
  const updatefields = { values: formValues };
  const balance_sheet_update = updatefields.values.balance_sheet_attachment;
  const income_update = updatefields.values.income_statement_attachment;

  const [balanceimg, setBalanceimg] = useState("");
  const [balancepdf, setBalancepdf] = useState("");
  const [incomeimg, setIncomeimg] = useState("");
  const [incomepdf, setIncomepdf] = useState("");

  const [balanceloading, setBalanceLoading] = useState(false);
  const [balancesuccess, setBalanceSuccess] = useState(false);
  const [incomeloading, setIncomeLoading] = useState(false);
  const [incomesuccess, setIncomeSuccess] = useState(false);

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

  useEffect(() => {
    if (income_update) {
      async function geturl() {
        var uploadext = income_update.split(".").pop();
        var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
        const d = imageExtensions.includes(uploadext);
        if (d === true) {
          const u = await Storage.get(income_update, {
            level: "private",
            identityId: ident,
          });
          setIncomeimg(u);
        } else {
          const h = await Storage.get(income_update, {
            level: "private",
            identityId: ident,
          });
          setIncomepdf(h);
        }
      }
      geturl();
    }
  }, [income_update, ident]);

  async function handleIncomeClick() {
    setIncomeSuccess(false);
    setIncomeLoading(true);
    const b = await incomeimg;
    if (b) {
      setIncomeSuccess(true);
      setIncomeLoading(false);
    }
  }

  function incomeisimageorpdf() {
    if (incomeimg) {
      return (
        <>
          <img className={classes.img} alt="complex" src={incomeimg} />
        </>
      );
    } else {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={incomepdf}
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
            <Grid item xs={6}>
              {balance_sheet_update ? (
                <>{balanceisimageorpdf()}</>
              ) : (
                <>
                  <AdminUploadField
                    name={balance_sheet_attachment.name}
                    id={balance_sheet_attachment.name}
                    accept="image/*,application/pdf"
                    style={{ display: "none" }}
                    identityid={ident}
                    userid={id}
                    sectorid={finId}
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
                      Company Balance Sheet*
                    </LoaderButton>
                  </label>
                </>
              )}
            </Grid>
            <Grid item xs={6}>
              {income_update ? (
                <>{incomeisimageorpdf()}</>
              ) : (
                <>
                  <AdminUploadField
                    name={income_statement_attachment.name}
                    id={income_statement_attachment.name}
                    accept="image/*,application/pdf"
                    style={{ display: "none" }}
                    identityid={ident}
                    userid={id}
                    sectorid={finId}
                  />
                  <label htmlFor={income_statement_attachment.name}>
                    <LoaderButton
                      id={income_statement_attachment.name}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={incomeloading}
                      success={incomesuccess}
                      loading={incomeloading}
                      onClick={handleIncomeClick}
                    >
                      {" "}
                      Company Income Statement*
                    </LoaderButton>
                  </label>
                </>
              )}
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
                name={retained_earnings.name}
                label={retained_earnings.label}
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
                name={total_assets.name}
                label={total_assets.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
