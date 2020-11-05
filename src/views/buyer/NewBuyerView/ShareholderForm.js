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

const ShareholderForm = ({ className, ...rest }) => {
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
                label="Company director"
                name="company_director_name"
                onChange={handleChange}
                required
                value={values.company_director_name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Button 
              variant="contained" 
              fullWidth 
              onChange={handleFileChange} 
              required>
              Upload director passport/ID</Button>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Company beneficial owner"
                name="company_ubo_name"
                onChange={handleChange}
                required
                value={values.company_ubo_name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Button 
              variant="contained" 
              fullWidth 
              onChange={handleFileChange} 
              required>
              Upload beneficial owner passport/ID</Button>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Company type"
                name="company_type"
                onChange={handleChange}
                value={values.company_type}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Button 
              variant="contained" 
              fullWidth 
              onChange={handleFileChange} 
              required>
              Upload company's articles of association</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};

ShareholderForm.propTypes = {
  className: PropTypes.string
};

export default ShareholderForm;