import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { API, graphqlOperation } from "aws-amplify";
import * as queries from 'src/graphql/queries.js';


const useStyles = makeStyles(() => ({
  root: {}
}));

const FinancialsForm = ({ className, ...rest }) => {
  const classes = useStyles();
  const [reporting_start_date, setReporting_start_date] = useState('');
  const [reporting_end_date, setReporting_end_date] = useState('');
  const [reporting_period, setReporting_period] = useState('');
  const [net_profit, setNet_profit] = useState('');

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
        const { reporting_start_date,
          reporting_end_date,
          reporting_period,
          net_profit } = data;
          setReporting_start_date(reporting_start_date);
          setReporting_end_date(reporting_end_date);
          setReporting_period(reporting_period);
          setNet_profit(net_profit);
      } onLoad()
    }, []);

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
                label="Financial Reporting Start Date"
                name="reporting_start_date"
                onChange={e => setReporting_start_date(e.target.value)}
                required
                value={reporting_start_date}
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
                label="Financial Reporting End Date"
                name="reporting_end_date"
                onChange={e => setReporting_end_date(e.target.value)}
                required
                value={reporting_end_date}
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
                label="Reporting Year"
                name="reporting_period"
                onChange={e => setReporting_period(e.target.value)}
                required
                value={reporting_period}
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
                label="Net Profit"
                name="net_profit"
                onChange={e => setNet_profit(e.target.value)}
                type="number"
                value={net_profit}
                variant="outlined"
              />
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
