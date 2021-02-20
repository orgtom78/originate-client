import React from "react";
import { InputField } from "src/components/FormFields";
import { Card, CardContent, Divider, Grid } from "@material-ui/core";

export default function UserCredentialsForm(props) {
  const {
    formField: { email, password, confirmpassword },
  } = props;

  return (
    <React.Fragment>
      <Card>
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
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
