import React, { useEffect, useState } from "react";
import { InputField, DatePickerField } from "src/components/FormFields";
import NewUploadField from "src/components/FormFields/NewUploadField.js";
import { Card, CardContent, Divider, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useFormikContext } from "formik";
import { Storage } from "aws-amplify";
import LoaderButton from "src/components/LoaderButton.js";
import { green } from "@mui/material/colors";
import { Upload as UploadIcon } from "react-feather";
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

export default function BuyerFinancialsForm(props) {
  const context = useUser();
  const classes = useStyles();
  const {
    formField: {
      ebit,
      balance_sheet_attachment,
      income_statement_attachment,
      net_profit,
      financials_reporting_period,
      sales,
      current_assets,
      current_liabilities,
      cost_of_goods_sold,
      total_equity,
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
    if (balanceattachment) {
      async function geturl() {
        var uploadext = balanceattachment.split(".").pop();
        var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
        const d = imageExtensions.includes(uploadext);
        if (d === true) {
          const u = await Storage.get(balanceattachment, {
            level: "private",
            identityId: identity,
          });
          setBalanceimg(u);
        } else {
          const h = await Storage.get(balanceattachment, {
            level: "private",
            identityId: identity,
          });
          setBalancepdf(h);
        }
      }
      geturl();
    }
  }, [balanceattachment, identity]);

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
          const u = await Storage.get(incomeattachment, {
            level: "private",
            identityId: identity,
          });
          setIncomeimg(u);
        } else {
          const h = await Storage.get(incomeattachment, {
            level: "private",
            identityId: identity,
          });
          setIncomepdf(h);
        }
      }
      geturl();
    }
  }, [incomeattachment, identity]);

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
              <InputField
                fullWidth
                variant="outlined"
                name={sales.name}
                label={sales.label}
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
                name={cost_of_goods_sold.name}
                label={cost_of_goods_sold.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={current_assets.name}
                label={current_assets.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={current_liabilities.name}
                label={current_liabilities.label}
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
                    userid={usergroupId}
                    identityid={identity}
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
                    userid={usergroupId}
                    identityid={identity}
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
