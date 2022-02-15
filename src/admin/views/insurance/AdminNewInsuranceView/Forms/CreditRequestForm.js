import React from "react";
import { InputField, SelectField } from "src/components/FormFields";
import { Card, CardContent, Divider, Grid } from "@material-ui/core";

export default function CreditRequestForm(props) {
  const {
    formField: { debtor_eulerid, credit_amount, credit_currency },
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
                name={debtor_eulerid.name}
                label={debtor_eulerid.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                name={credit_currency.name}
                label={credit_currency.label}
                data={availablecurrencies}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={credit_amount.name}
                label={credit_amount.label}
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
