import React from 'react';
import {
  InputField,
  SelectField
} from "../FormFields";
import {
  Card,
  CardContent,
  Divider,
  Grid,
} from '@material-ui/core';

const type = [
  {
    value: "limited",
    label: "Limited",
  },
  {
    value: "partnership",
    label: "Partnership",
  },
  {
    value: "corporation",
    label: "Corporation",
  },
];

  export default function ShareholderForm(props) {
    const {
      formField: {
        company_director_name,
        company_ubo_name,
        company_type,
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
              name={company_director_name.name}
              label={company_director_name.label}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name={company_ubo_name.name}
              label={company_ubo_name.label}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectField
              name={company_type.name}
              label={company_type.label}
              data={type}
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
  