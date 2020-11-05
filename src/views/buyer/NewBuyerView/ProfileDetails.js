import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

const countries = [
  {
    value: 'germany',
    label: 'Germany'
  },
  {
    value: 'china',
    label: 'China'
  },
  {
    value: 'usa',
    label: 'USA'
  }
];

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: 'Katarina',
    lastName: 'Smith',
    email: 'demo@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA'
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleFileChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Create A Company Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Company legal name"
                name="CompanyName"
                onChange={handleChange}
                required
                value={values.company_name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Button 
              variant="contained" 
              fullWidth 
              onChange={handleFileChange} 
              required>
              Upload Company Logo</Button>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Company legal name"
                name="CompanyName"
                onChange={handleChange}
                required
                value={values.company_name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Company country"
                name="company_country"
                onChange={handleChange}
                value={values.company_country}
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {countries.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Company date of incorporation"
                name="date_of_incorporation"
                onChange={handleChange}
                required
                value={values.date_of_incorporation}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Company registration number"
                name="company_register_number"
                onChange={handleChange}
                required
                value={values.company_register_number}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
