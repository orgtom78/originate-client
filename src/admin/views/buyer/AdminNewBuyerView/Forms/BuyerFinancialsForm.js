import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  InputField,
  DatePickerField,
  SelectField,
} from "src/components/FormFields";
import AdminUploadField from "src/components/FormFields/AdminUploadField.js";
import { Card, CardContent, Divider, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
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

const auditType = [
  {
    value: "audited-big4",
    label: "Big 4 Auditor",
  },
  {
    value: "audited-2nd-tier",
    label: "2nd Tier Auditor",
  },
  {
    value: "audited-other",
    label: "Other Auditor",
  },
  {
    value: "management-prepared",
    label: "Management Prepared",
  },
];

export default function BuyerFinancialsForm(props) {
  const classes = useStyles();
  const {
    formField: {
      sales,
      financials_status,
      net_profit,
      total_equity,
      net_operating_loss,
      cash_flow_from_operating_activities,
      current_assets,
      current_liabilities,
      inventory_beginning,
      inventory_end,
      cost_of_goods_sold,
      ebit,
      interest_expenses,
      financials_reporting_period,
      inventory,
      balance_sheet_attachment,
      income_statement_attachment,
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
              <SelectField
                name={financials_status.name}
                label={financials_status.label}
                data={auditType}
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
                name={net_operating_loss.name}
                label={net_operating_loss.label}
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
                name={total_equity.name}
                label={total_equity.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={cash_flow_from_operating_activities.name}
                label={cash_flow_from_operating_activities.label}
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
                name={inventory_beginning.name}
                label={inventory_beginning.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={inventory_end.name}
                label={inventory_end.label}
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
                name={inventory.name}
                label={inventory.label}
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
