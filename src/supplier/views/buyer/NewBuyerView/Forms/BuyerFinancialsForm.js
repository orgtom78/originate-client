import React, { useEffect, useState } from "react";
import { InputField, DatePickerField } from "src/components/FormFields";
import NewUploadField from "src/components/FormFields/NewUploadField.js";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { useFormikContext } from "formik";
import { Storage, Auth } from "aws-amplify";
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
      retained_earnings,
      working_capital,
      sales,
      total_assets,
    },
  } = props;

  const financialsId = props.value;
  const { values: formValues } = useFormikContext();
  const updatefields = { values: formValues };
  const balanceattachment = updatefields.values.balance_sheet_attachment;
  const incomeattachment = updatefields.values.income_statement_attachment;

  const [balanceimg, setBalanceimg] = useState("");
  const [balancepdf, setBalancepdf] = useState("");
  const [incomeimg, setIncomeimg] = useState("");
  const [incomepdf, setIncomepdf] = useState("");

  const [balanceloading, setBalanceloading] = useState(false);
  const [balancesuccess, setBalancesuccess] = useState(false);
  const [incomeloading, setIncomeloading] = useState(false);
  const [incomesuccess, setIncomesuccess] = useState(false);

  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function getsub() {
      let user = await Auth.currentAuthenticatedUser();
      const { attributes = {} } = user;
      const b = await attributes["custom:groupid"];
      setUserId(b);
    }
    getsub();
  }, []);

  useEffect(() => {
    if (balanceattachment) {
      async function geturl() {
        var uploadext = balanceattachment.split(".").pop();
        var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
        const d = imageExtensions.includes(uploadext);
        if (d === true) {
          const u = await Storage.vault.get(balanceattachment);
          setBalanceimg(u);
        } else {
          const h = await Storage.vault.get(balanceattachment);
          setBalancepdf(h);
        }
      }
      geturl();
    }
  }, [balanceattachment]);

  async function handleBalanceClick() {
    setBalancesuccess(false);
    setBalanceloading(true);
    const b = await balanceimg;
    if (b) {
      setBalancesuccess(true);
      setBalanceloading(false);
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
    if (incomeattachment) {
      async function geturl() {
        var uploadext = incomeattachment.split(".").pop();
        var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
        const d = imageExtensions.includes(uploadext);
        if (d === true) {
          const u = await Storage.vault.get(incomeattachment);
          setIncomeimg(u);
        } else {
          const h = await Storage.vault.get(incomeattachment);
          setIncomepdf(h);
        }
      }
      geturl();
    }
  }, [incomeattachment]);

  async function handleIncomeClick() {
    setIncomesuccess(false);
    setIncomeloading(true);
    const b = await incomeimg;
    if (b) {
      setIncomesuccess(true);
      setIncomeloading(false);
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
            <Grid item xs={12} sm={6}>
              {balanceattachment ? (
                <>{balanceisimageorpdf()}</>
              ) : (
                <>
                  <NewUploadField
                    name={balance_sheet_attachment.name}
                    id={balance_sheet_attachment.name}
                    accept="image/*,application/pdf"
                    style={{ display: "none" }}
                    ident={financialsId}
                    userid={userId}
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
                      Buyer Balance Sheet*
                    </LoaderButton>
                  </label>
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {incomeattachment ? (
                <>{incomeisimageorpdf()}</>
              ) : (
                <>
                  <NewUploadField
                    name={income_statement_attachment.name}
                    id={income_statement_attachment.name}
                    accept="image/*,application/pdf"
                    style={{ display: "none" }}
                    ident={financialsId}
                    userid={userId}
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
                      Buyer Income Statement*
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
