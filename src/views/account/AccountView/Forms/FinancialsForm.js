import React, { useState, useEffect } from 'react';
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
import { Auth,  API, graphqlOperation } from "aws-amplify";
import * as queries from 'src/graphql/queries.js';
import { onError } from "src/libs/errorLib.js";

const country = [
  {
    value: "Germany",
    label: "Germany",
  },
  {
    value: "china",
    label: "China",
  },
  {
    value: "Usa",
    label: "USA",
  },
];
const industry = [
  {
    value: "fmcg",
    label: "FMCG",
  },
  {
    value: "textile",
    label: "Textile",
  },
  {
    value: "automotive",
    label: "Automotive",
  },
];

const useStyles = makeStyles(() => ({
  root: {}
}));

const FinancialsForm = ({ className, ...rest }) => {
  const classes = useStyles();
  const [company_name, setCompany_name] = useState('');
  const [company_address_city, setCompany_address_city] = useState('');
  const [company_address_street, setCompany_address_street] = useState('');
  const [company_address_postalcode, setCompany_address_postalcode] = useState('');
  const [company_country, setCompany_country] = useState('');
  const [company_industry, setCompany_industry] = useState('');

  const [values, setValues] = useState([null]);

  useEffect(() => {
    async function loadCompany() {
      let filter = { userId: {eq:'dcd44927-2efd-4fc0-b955-0c676d04f738'}};
        const { data: { listsCompany: { items: itemsPage1, nextToken } } } = await API.graphql(graphqlOperation(queries.listsCompany, { filter: filter }));
        const n  = { data: { listsCompany: { items: itemsPage1, nextToken }}};
        const company = n.data.listsCompany.items[0]
        return company
      }
    async function onLoad() {
        const data = await loadCompany();
        const { company_name,
          company_address_city,
          company_address_street,
          company_address_postalcode,
          company_country,
          company_industry } = data;
          setCompany_name(company_name);
          setCompany_address_city(company_address_city);
          setCompany_address_street(company_address_street);
          setCompany_address_postalcode(company_address_postalcode);
          setCompany_country(company_country);
          setCompany_industry(company_industry)
      } onLoad()
    }, [values]);


  const handleChange = (event) => {
    setCompany_name(
      event.target.company_name
    );
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Company Legal Name"
                name="company_name"
                onChange={handleChange}
                required
                value={company_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Company City"
                name="company_address_city"
                onChange={handleChange}
                required
                value={company_address_city}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Street"
                name="company_address_street"
                onChange={handleChange}
                required
                value={company_address_street}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Zipcode"
                name="company_address_postalcode"
                onChange={handleChange}
                type="number"
                value={company_address_postalcode}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                name="company_country"
                onChange={handleChange}
                required
                select
                SelectProps={{ company_country }}
                value={company_country}
                variant="outlined"
                >
                {country.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select Industry"
                name="company_industry"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={company_industry}
                variant="outlined"
              >
                {industry.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

FinancialsForm.propTypes = {
  className: PropTypes.string
};

export default FinancialsForm;
