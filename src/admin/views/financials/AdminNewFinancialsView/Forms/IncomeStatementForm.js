import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InputField, DatePickerField } from "src/components/FormFields";
import AdminUploadField from "src/components/FormFields/AdminUploadField";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { Upload as UploadIcon } from "react-feather";
import { useFormikContext } from "formik";
import { Storage } from "aws-amplify";
import LoaderButton from "src/components/LoaderButton.js";
import { green } from "@material-ui/core/colors";

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

export default function IncomeStatementForm(props) {
  const classes = useStyles();
  const {
    formField: {
      income_statement_attachment,
      sales,
      cost_of_goods_sold,
      operating_expenses,
      marketing_expenses,
      bad_debt_expenses,
      ebit,
      interest_expenses,
      depreciation_expenses,
      sale_purchase_of_fixed_asset,
      extraordinary_income,
      tax_expenses,
      net_profit,
      financials_rating,
      financials_reporting_period,
      cash,
      working_capital,
    },
  } = props;

  const financialsId = props.value;
  const { id } = useParams();
  const { ident } = useParams();

  const { values: formValues } = useFormikContext();
  const updatefields = { values: formValues };

  const income_update = updatefields.values.income_statement_attachment;

  const [incomeimg, setIncomeimg] = useState("");
  const [incomepdf, setIncomepdf] = useState("");

  const [incomeloading, setIncomeLoading] = useState(false);
  const [incomesuccess, setIncomeSuccess] = useState(false);

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
            <Grid item xs={12} sm={12}>
              {income_update ? (
                <>{incomeisimageorpdf()}</>
              ) : (
                <>
                  <AdminUploadField
                    name={income_statement_attachment.name}
                    id={income_statement_attachment.name}
                    accept="image/*, application/pdf"
                    style={{ display: "none" }}
                    identityid={ident}
                    userid={id}
                    sectorid={financialsId}
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
                      Income Statement*
                    </LoaderButton>
                  </label>
                </>
              )}
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
                name={cost_of_goods_sold.name}
                label={cost_of_goods_sold.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={operating_expenses.name}
                label={operating_expenses.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={marketing_expenses.name}
                label={marketing_expenses.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={bad_debt_expenses.name}
                label={bad_debt_expenses.label}
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
                name={interest_expenses.name}
                label={interest_expenses.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={depreciation_expenses.name}
                label={depreciation_expenses.label}
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
                name={extraordinary_income.name}
                label={extraordinary_income.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={tax_expenses.name}
                label={tax_expenses.label}
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
                name={cash.name}
                label={cash.label}
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
