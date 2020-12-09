import React, { useState, useMemo, useContext } from 'react';
import 'date-fns';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  UploadCloud as UploadIcon
} from 'react-feather';
import { API, graphqlOperation } from "aws-amplify";
import {MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { onError } from "src/libs/errorLib.js";
import * as mutations from 'src/graphql/mutations.js';
import LoaderButton from 'src/components/LoaderButton.js';
import { green } from '@material-ui/core/colors';
import { useUser } from 'src/components/usercontext.js';


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
  root: {},
  wrapper: {
    margin: 'auto',
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const CompanyForm = ({ className, ...rest }) => {
  const classes = useStyles();
  const [companyId, setCompanyId] = useState('');
  const [company_name, setCompany_name] = useState('');
  const [company_type, setCompany_type] = useState('');
  const [date_of_incorporation, setDate_of_incorporation] = useState('');
  const [company_address_city, setCompany_address_city] = useState('');
  const [company_address_street, setCompany_address_street] = useState('');
  const [company_address_postalcode, setCompany_address_postalcode] = useState('');
  const [company_country, setCompany_country] = useState('');
  const [company_industry, setCompany_industry] = useState('');
  const [company_director_name, setCompany_director_name] = useState('');
  const [company_ubo_name, setCompany_ubo_name,] = useState('');
  const [company_director_id_number, setCompany_director_id_number] = useState('');
  const [company_director_id_type, setCompany_director_id_type] = useState('');
  const [sub, setSub] = useState('');
  const context = useUser();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  React.useEffect(() => {
    // attempt to fetch the info of the user that was already logged in
      async function onLoad() {
        const data = await context;
          const {
            sub,
            companyId, 
            company_name,
            company_type,
            date_of_incorporation,
            company_address_city,
            company_address_street,
            company_address_postalcode,
            company_country,
            company_industry,
            company_director_name,
            company_ubo_name,
            company_director_id_number,
            company_director_id_type } = data;
            setSub(sub);
            setCompanyId(companyId);
            setCompany_name(company_name);
            setDate_of_incorporation(date_of_incorporation);
            setCompany_type(company_type);
            setCompany_address_city(company_address_city);
            setCompany_address_street(company_address_street);
            setCompany_address_postalcode(company_address_postalcode);
            setCompany_country(company_country);
            setCompany_industry(company_industry);
            setCompany_director_name(company_director_name);
            setCompany_ubo_name(company_ubo_name);
            setCompany_director_id_number(company_director_id_number);
            setCompany_director_id_type(company_director_id_type);
        } onLoad()
  }, [context]);

    console.log(context)

    async function handleCompanySubmit() {
      setSuccess(false);
      setLoading(true);
      try {
        const userId = sub;
        const sortkey = companyId;
        await updateCompany({
          userId,
          sortkey,
          company_name,
          company_type,
          date_of_incorporation,
          company_address_city,
          company_address_street,
          company_address_postalcode,
          company_country,
          company_industry,
        }); 
      } catch (e) {
        onError(e);
      }
      setSuccess(true);
      setLoading(false);
      window.location.reload(true);
    };

    async function handleShareholderSubmit() {
      setSuccess(false);
      setLoading(true);
      try {
        const userId = sub;
        const sortkey = companyId;
        await updateCompany({
          userId,
          sortkey,
          company_director_name,
          company_ubo_name,
          company_director_id_number,
          company_director_id_type 
        }); 
      } catch (e) {
        onError(e);
      }
      setSuccess(true);
      setLoading(false);
      window.location.reload(true);
    };
  
    function updateCompany(input) {
      return API.graphql(graphqlOperation(mutations.updateCompany,
        {input: input}
      ));
    };


  return (
    <Container maxWidth="lg">
<React.Fragment>
    <Accordion defaultExpanded={true}>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Company Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
                onChange={(e) => setCompany_name(e.target.value)}
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
                label="Company Type"
                name="company_type"
                onChange={(e) => setCompany_type(e.target.value)}
                required
                value={company_type}
                variant="outlined"
              />
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid
              container justify="space-around"
              item
              md={6}
              xs={12}
            > 
              <KeyboardDatePicker
                fullWidth   
                value={date_of_incorporation}
                margin="normal"
                variant="outlined"
                id="date_of_incorporation"
                label="Company Date of Incorporation"
                name="date_of_incorporation"
                format="dd/MM/yyyy"
                minDate={new Date("1500/12/31")}
                maxDate={new Date()}
                onChange={(e) => setDate_of_incorporation(e.target.value)}
                required
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            </MuiPickersUtilsProvider>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Company City"
                name="company_address_city"
                onChange={(e) => setCompany_address_city(e.target.value)}
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
                onChange={(e) => setCompany_address_street(e.target.value)}
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
                onChange={(e) => setCompany_address_postalcode(e.target.value)}
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
                onChange={(e) => setCompany_country(e.target.value)}
                required
                select
                SelectProps={{ native: true }}
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
                onChange={(e) => setCompany_industry(e.target.value)}
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
          <LoaderButton
            startIcon={<UploadIcon />}
            disabled={loading}
            success={success}
            loading={loading}
            onClick={handleCompanySubmit}
          >
            Update details
          </LoaderButton>
        </Box>
      </Card>
    </form>
        </AccordionDetails>
        </Accordion>
        <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Company Shareholders</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
                label="Company Director Name"
                name="company_director_name"
                onChange={(e) => setCompany_director_name(e.target.value)}
                required
                value={company_director_name}
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
                label="Company UBO Name"
                name="company_ubo_name"
                onChange={(e) => setCompany_ubo_name(e.target.value)}
                required
                value={company_ubo_name}
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
                label="Director ID Number"
                name="company_director_id_number"
                onChange={(e) => setCompany_director_id_number(e.target.value)}
                required
                value={company_director_id_number}
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Director ID Type"
                name="company_director_id_type"
                onChange={(e) => setCompany_director_id_type(e.target.value)}
                value={company_director_id_type}
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
          <LoaderButton
            startIcon={<UploadIcon />}
            disabled={loading}
            success={success}
            loading={loading}
            onClick={handleShareholderSubmit}
          >
            Update details
          </LoaderButton>
        </Box>
      </Card>
    </form>
        </AccordionDetails>
        </Accordion>
        <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Company Financials</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
                onChange={useMemo(() => [])}
                required
                value=''
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
                onChange={useMemo(() => [])}
                required
                value=''
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
                onChange={useMemo(() => [])}
                required
                value=''
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
                onChange={useMemo(() => [])}
                type="number"
                value=''
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
          <LoaderButton
            startIcon={<UploadIcon />}
            disabled={loading}
            success={success}
            loading={loading}
            onClick={handleCompanySubmit}
          >
            Update details
          </LoaderButton>
        </Box>
      </Card>
    </form>
        </AccordionDetails>
        </Accordion>
      </React.Fragment>
    </Container>

  );
};

CompanyForm.propTypes = {
  className: PropTypes.string
};

export default CompanyForm;
