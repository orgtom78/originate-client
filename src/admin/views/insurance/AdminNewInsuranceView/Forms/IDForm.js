import React from "react";
import { InputField } from "src/components/FormFields";
import SelectListField from "src/components/FormFields/SelectISO2.jsx";
import { Card, CardContent, Divider, Grid } from "@mui/material";
import countries from "src/components/FormLists/countries.js";

const cr = countries;

export default function DunsForm(props) {
  const {
    formField: { buyer_name, buyer_country },
  } = props;

  return (
    <React.Fragment>
      <Card>
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InputField
                name={buyer_name.name}
                label={buyer_name.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectListField
                name={buyer_country.name}
                label={buyer_country.label}
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
