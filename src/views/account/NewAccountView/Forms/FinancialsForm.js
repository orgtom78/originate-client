import React from 'react';
import {
  InputField,
  DatePickerField
} from "../FormFields";
import {
  Card,
  CardContent,
  Divider,
  Grid,
} from '@material-ui/core';

  export default function ShareholderForm(props) {
    const {
      formField: {
        reporting_start_date,
        reporting_end_date,
        reporting_period,
      },
    } = props;
    return (
      <React.Fragment>
          <Card>
          <Divider />
          <CardContent>
        <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <DatePickerField
            name={reporting_start_date.name}
            label={reporting_start_date.label}
            format="MM/yy"
            views={["year", "month"]}
            minDate={new Date("2000/12/31")}
            maxDate={new Date()}
            fullWidth
            variant="outlined"
          />
          </Grid>
          <Grid item xs={12} md={6}>
          <DatePickerField
            name={reporting_end_date.name}
            label={reporting_end_date.label}
            format="MM/yy"
            views={["year", "month"]}
            minDate={new Date("2000/12/31")}
            maxDate={new Date()}
            fullWidth
            variant="outlined"
          />
          </Grid>
          <Grid item xs={12} md={6}>
          <DatePickerField
            name={reporting_period.name}
            label={reporting_period.label}
            format="yy"
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