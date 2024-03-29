import React from "react";
import { InputField } from "src/components/FormFields";
import { Card, CardContent, Divider, Grid } from "@mui/material";
export default function OneClickRequestForm(props) {
  const {
    formField: {
      buyer_eulerid,
    },
  } = props;

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
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
