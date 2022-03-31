import React from "react";
import { InputField, DatePickerField, SelectField } from "src/components/FormFields";
import { Card, CardContent, Divider, Grid } from "@material-ui/core";
import { addDays, subDays } from "date-fns";
export default function RequestForm(props) {
  const {
    formField: {
      buyer_eulerid,
      supplier_eulerid,
      invoice_amount,
      invoice_currency,
      invoice_due_date,
      invoice_issue_date,
      invoice_number,
    },
  } = props;

  const availablecurrencies = [
    {
      value: "eur",
      label: "Euros",
    },
    {
      value: "gbp",
      label: "Pounds Sterling",
    },
    {
      value: "usd",
      label: "US dollars",
    },
  ];

  return (
    <React.Fragment>
      <Card>
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InputField
                name={buyer_eulerid.name}
                label={buyer_eulerid.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={supplier_eulerid.name}
                label={supplier_eulerid.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerField
                name={invoice_issue_date.name}
                label={invoice_issue_date.label}
                format="dd/MM/yyyy"
                minDate={subDays(new Date(), 60)}
                maxDate={new Date()}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerField
                name={invoice_due_date.name}
                label={invoice_due_date.label}
                format="dd/MM/yyyy"
                minDate={new Date("2022/01/01")}
                maxDate={addDays(new Date(), 120)}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                name={invoice_currency.name}
                label={invoice_currency.label}
                data={availablecurrencies}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={invoice_amount.name}
                label={invoice_amount.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={invoice_number.name}
                label={invoice_number.label}
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
