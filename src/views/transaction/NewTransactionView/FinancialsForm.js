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


const useStyles = makeStyles(() => ({
  root: {}
}));

const FinancialsForm = ({ className, ...rest }) => {
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
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Company bank statement"
                name="company_bank_statement"
                onChange={handleChange}
                required
                value={values.company_bank_statement}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Button 
              variant="contained" 
              fullWidth 
              onChange={handleFileChange} 
              required>
              Upload company's bank statement</Button>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Company financial accounts"
                name="company_financials_year"
                onChange={handleChange}
                required
                value={values.company_financials_year}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Button 
              variant="contained" 
              fullWidth 
              onChange={handleFileChange} 
              required>
              Upload company's financial statement</Button>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    </form>
  );
};

FinancialsForm.propTypes = {
  className: PropTypes.string
};

export default FinancialsForm;