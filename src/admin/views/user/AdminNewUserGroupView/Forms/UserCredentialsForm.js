import React from "react";
import { InputField, SelectField } from "src/components/FormFields";
import { Card, CardContent, Divider, Grid } from "@material-ui/core";

const type = [
  {
    value: "Supplier",
    label: "Supplier",
  },
  {
    value: "Investor",
    label: "Investor",
  },
];

export default function UserCredentialsForm(props) {
  const {
    formField: { group_name, group_type, email, password, confirmpassword },
  } = props;

  return (
    <React.Fragment>
      <Card>
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <SelectField
                name={group_type.name}
                label={group_type.label}
                data={type}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={group_name.name}
                label={group_name.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={email.name}
                label={email.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={password.name}
                label={password.label}
                fullWidth
                variant="outlined"
                type="password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={confirmpassword.name}
                label={confirmpassword.label}
                fullWidth
                variant="outlined"
                type="password"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
