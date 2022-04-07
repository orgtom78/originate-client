import React, { useEffect, useState } from "react";
import { InputField, DatePickerField } from "src/components/FormFields";
import NewUploadField from "src/components/FormFields/NewUploadField.js";
import SelectListField from "src/components/FormFields/SelectListField.jsx";
import { Card, CardContent, Divider, Grid } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { useFormikContext } from "formik";
import { Storage } from "aws-amplify";
import LoaderButton from "src/components/LoaderButton.js";
import { green } from "@mui/material/colors";
import { Upload as UploadIcon } from "react-feather";
import countries from "src/components/FormLists/countries.js";
import { useUser } from "src/components/context/usercontext.js";

const cr = countries;
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

export default function FinancialsForm(props) {
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
      total_assets,
      retained_earnings,
      working_capital,
      bank_name,
      bank_account_number,
      iban,
      bic_swift_code,
      bank_account_sortcode,
      bank_routing_number,
      bank_country,
    },
  } = props;

  const userId = props.vuser;
  const financialsId = props.vfinancials;
  const { values: formValues } = useFormikContext();
  const updatefields = { values: formValues };
  const balanceattachment = updatefields.values.balance_sheet_attachment;
  const incomeattachment = updatefields.values.income_statement_attachment;

  const [identityId, setIdentityId] = useState("");
  const [balanceimg, setBalanceimg] = useState("");
  const [balancepdf, setBalancepdf] = useState("");
  const [incomeimg, setIncomeimg] = useState("");
  const [incomepdf, setIncomepdf] = useState("");

  const [balanceloading, setBalanceloading] = useState(false);
  const [balancesuccess, setBalancesuccess] = useState(false);
  const [incomeloading, setIncomeloading] = useState(false);
  const [incomesuccess, setIncomesuccess] = useState(false);

  useEffect(() => {
    // attempt to fetch the info of the user that was already logged in
    async function onLoad() {
      const data = await context;
      const { identity } = data;
      setIdentityId(identity);
    }
    onLoad();
  }, [context]);

  useEffect(() => {
    if (balanceattachment) {
      async function getbalanceurl() {
        var uploadext = balanceattachment.split(".").pop();
        var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
        const d = imageExtensions.includes(uploadext);
        if (d === true) {
          const u = await Storage.get(balanceattachment, {
            level: "private",
            identityId: identityId,
          });
          setBalanceimg(u);
        } else {
          const h = await Storage.get(balanceattachment, {
            level: "private",
            identityId: identityId,
          });
          setBalancepdf(h);
        }
      }
      getbalanceurl();
    }
  }, [balanceattachment, identityId]);

  async function handlebalanceClick() {
    setBalancesuccess(false);
    setBalanceloading(true);
    const b = await balanceimg;
    if (b) {
      setBalancesuccess(true);
      setBalanceloading(false);
    }
  }

  function balanceattachmentisimageorpdf() {
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
      async function getincomeurl() {
        var uploadext = incomeattachment.split(".").pop();
        var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
        const d = imageExtensions.includes(uploadext);
        if (d === true) {
          const u = await Storage.vault.get(incomeattachment, {
            level: "private",
            identityId: identityId,
          });
          setIncomeimg(u);
        } else {
          const h = await Storage.vault.get(incomeattachment, {
            level: "private",
            identityId: identityId,
          });
          setIncomepdf(h);
        }
      }
      getincomeurl();
    }
  }, [incomeattachment, identityId]);

  async function handleincomeClick() {
    setIncomesuccess(false);
    setIncomeloading(true);
    const b = await incomeimg;
    if (b) {
      setIncomesuccess(true);
      setIncomeloading(false);
    }
  }

  function incomeattachmentisimageorpdf() {
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
              {balanceattachment ? (
                <>{balanceattachmentisimageorpdf()}</>
              ) : (
                <>
                  <NewUploadField
                    name={balance_sheet_attachment.name}
                    id={balance_sheet_attachment.name}
                    accept="image/*, application/pdf"
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
                      onClick={handlebalanceClick}
                    >
                      {" "}
                      Company Balance Sheet*
                    </LoaderButton>
                  </label>
                </>
              )}
            </Grid>
            <Grid item xs={6}>
              {incomeattachment ? (
                <>{incomeattachmentisimageorpdf()}</>
              ) : (
                <>
                  <NewUploadField
                    name={income_statement_attachment.name}
                    id={income_statement_attachment.name}
                    accept="image/*, application/pdf"
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
                      onClick={handleincomeClick}
                    >
                      {" "}
                      Company Income Statement*
                    </LoaderButton>
                  </label>
                </>
              )}
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
            <Grid item xs={12} sm={12}>
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
              <SelectListField
                name={bank_country.name}
                label={bank_country.label}
                data={cr}
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
