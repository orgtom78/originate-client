import React from "react";
import { InputField } from "src/components/FormFields";
import { Card, CardContent, Divider, Grid } from "@material-ui/core";

export default function DunsForm(props) {
  const {
    formField: { insurance_buyer_duns, insurance_supplier_duns },
  } = props;

  return (
    <React.Fragment>
      <Card>
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InputField
                name={insurance_buyer_duns.name}
                label={insurance_buyer_duns.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={insurance_supplier_duns.name}
                label={insurance_supplier_duns.label}
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
