import React, { useState } from "react";
import "date-fns";
import clsx from "clsx";
import PropTypes from "prop-types";
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
  MenuItem,
  Select,
  TextField,
  Typography,
  makeStyles,
  Input,
  InputLabel,
  FormControl
} from "@material-ui/core";
import NumberFormat from 'react-number-format';
import { UploadCloud as UploadIcon } from "react-feather";
import { API, graphqlOperation } from "aws-amplify";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import LoaderButton from "src/components/LoaderButton.js";
import { green } from "@material-ui/core/colors";
import { useUser } from "src/components/usercontext.js";
import countries from "src/components/countries.js";
import industries from "src/components/industries.js";
import FormikAutocomplete from "src/views/account/AccountView/Forms/AutocompleteField.js";
import { Field } from "formik";

const cr = countries;
const ind = industries;
const auto = FormikAutocomplete;

const idtype = [
  {
    value: "Passport",
    label: "Passport",
  },
  {
    value: "Identification Card",
    label: "Identification Card",
  },
  {
    value: "Driver's  License",
    label: "Driver's  License",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
  }
  },
  wrapper: {
    margin: "auto",
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const SupplierForm = ({ className, ...rest }) => {
  const classes = useStyles();
  const [supplierId, setSupplierId] = useState("");
  const [supplier_logo, setSupplier_logo] = useState("");
  const [supplier_name, setSupplier_name] = useState("");
  const [supplier_type, setSupplier_type] = useState("");
  const [
    supplier_date_of_incorporation,
    setSupplier_date_of_incorporation,
  ] = useState("");
  const [supplier_address_city, setSupplier_address_city] = useState("");
  const [supplier_address_street, setSupplier_address_street] = useState("");
  const [
    supplier_address_postalcode,
    setSupplier_address_postalcode,
  ] = useState("");
  const [supplier_country, setSupplier_country] = useState("");
  const [supplier_industry, setSupplier_industry] = useState("");
  const [
    supplier_registration_cert_attachment,
    setSupplier_registration_cert_attachment,
  ] = useState("");

  //supplier director data:
  const [directorId, setDirectorId] = useState("");
  const [director_name, setDirector_name] = useState("");
  const [director_email, setDirector_email] = useState("");
  const [director_phone_number, setDirector_phone_number] = useState("");
  const [director_id_attachment, setDirector_id_attachment] = useState("");
  const [director_id_number, setDirector_id_number] = useState("");
  const [director_id_type, setDirector_id_type] = useState("");
  const [director_nationality, setDirector_nationality] = useState("");
  const [director_poa_attachment, setDirector_poa_attachment] = useState("");
  const [
    director_country_of_residence,
    setDirector_country_of_residence,
  ] = useState("");

  // supplier UBO data:
  const [uboId, setUboId] = useState("");
  const [ubo_name, setUbo_name] = useState("");
  const [ubo_email, setUbo_email] = useState("");
  const [ubo_phone_number, setUbo_phone_number] = useState("");
  const [ubo_id_attachment, setUbo_id_attachment] = useState("");
  const [ubo_id_number, setUbo_id_number] = useState("");
  const [ubo_id_type, setUbo_id_type] = useState("");
  const [ubo_nationality, setUbo_nationality] = useState("");
  const [ubo_poa_attachment, setUbo_poa_attachment] = useState("");
  const [ubo_country_of_residence, setUbo_country_of_residence] = useState("");

  //Financials:
  const [financialsId, setFinancialsId] = useState("");
  const [ebit, setEbit] = useState("");
  const [financials_attachment, setFinancials_attachment] = useState("");
  const [net_profit, setNet_profit] = useState("");
  const [financials_rating, setFinancials_rating] = useState("");
  const [
    financials_reporting_period,
    setFinancials_reporting_period,
  ] = useState("");
  const [sales, setSales] = useState("");
  const [total_assets, setTotal_assets] = useState("");
  const [total_liabilities, setTotal_liabilities] = useState("");

  const [sub, setSub] = useState("");
  const context = useUser();

  const [supplierloading, setSupplierLoading] = useState(false);
  const [suppliersuccess, setSupplierSuccess] = useState(false);
  const [directorloading, setDirectorLoading] = useState(false);
  const [directorsuccess, setDirectorSuccess] = useState(false);
  const [uboloading, setUboLoading] = useState(false);
  const [ubosuccess, setUboSuccess] = useState(false);
  const [financialsloading, setFinancialsLoading] = useState(false);
  const [financialssuccess, setFinancialsSuccess] = useState(false);

  React.useEffect(() => {
    // attempt to fetch the info of the user that was already logged in
    async function onLoad() {
      const data = await context;
      const {
        sub,
        supplierId,
        supplier_logo,
        supplier_name,
        supplier_type,
        supplier_date_of_incorporation,
        supplier_address_city,
        supplier_address_street,
        supplier_address_postalcode,
        supplier_country,
        supplier_industry,
        supplier_registration_cert_attachment,
        directorId,
        director_name,
        director_email,
        director_phone_number,
        director_id_attachment,
        director_id_number,
        director_id_type,
        director_nationality,
        director_poa_attachment,
        director_country_of_residence,
        uboId,
        ubo_name,
        ubo_email,
        ubo_phone_number,
        ubo_id_attachment,
        ubo_id_number,
        ubo_id_type,
        ubo_nationality,
        ubo_poa_attachment,
        ubo_country_of_residence,
        financialsId,
        ebit,
        financials_attachment,
        net_profit,
        financials_rating,
        financials_reporting_period,
        sales,
        total_assets,
        total_liabilities,
      } = data;
      setSub(sub);
      setSupplierId(supplierId);
      setSupplier_logo(supplier_logo);
      setSupplier_name(supplier_name);
      setSupplier_date_of_incorporation(supplier_date_of_incorporation);
      setSupplier_type(supplier_type);
      setSupplier_address_city(supplier_address_city);
      setSupplier_address_street(supplier_address_street);
      setSupplier_address_postalcode(supplier_address_postalcode);
      setSupplier_country(supplier_country);
      setSupplier_industry(supplier_industry);
      setSupplier_registration_cert_attachment(
        supplier_registration_cert_attachment
      );
      setDirectorId(directorId);
      setDirector_name(director_name);
      setDirector_email(director_email);
      setDirector_phone_number(director_phone_number);
      setDirector_id_attachment(director_id_attachment);
      setDirector_id_number(director_id_number);
      setDirector_id_type(director_id_type);
      setDirector_nationality(director_nationality);
      setDirector_poa_attachment(director_poa_attachment);
      setDirector_country_of_residence(director_country_of_residence);
      setUboId(uboId);
      setUbo_name(ubo_name);
      setUbo_email(ubo_email);
      setUbo_phone_number(ubo_phone_number);
      setUbo_id_attachment(ubo_id_attachment);
      setUbo_id_number(ubo_id_number);
      setUbo_id_type(ubo_id_type);
      setUbo_nationality(ubo_nationality);
      setUbo_poa_attachment(ubo_poa_attachment);
      setUbo_country_of_residence(ubo_country_of_residence);
      setFinancialsId(financialsId);
      setEbit(ebit);
      setFinancials_attachment(financials_attachment);
      setNet_profit(net_profit);
      setFinancials_rating(financials_rating);
      setFinancials_reporting_period(financials_reporting_period);
      setSales(sales);
      setTotal_assets(total_assets);
      setTotal_liabilities(total_liabilities);
    }
    onLoad();
  }, [context]);

  async function handleSupplierSubmit() {
    setSupplierSuccess(false);
    setSupplierLoading(true);
    try {
      const userId = sub;
      const sortkey = supplierId;
      await updateSupplier({
        userId,
        sortkey,
        supplier_logo,
        supplier_name,
        supplier_type,
        supplier_date_of_incorporation,
        supplier_address_city,
        supplier_address_street,
        supplier_address_postalcode,
        supplier_country,
        supplier_industry,
      });
    } catch (e) {
      onError(e);
    }
    setSupplierSuccess(true);
    setSupplierLoading(false);
    window.location.reload(true);
  }

  async function handleDirectorSubmit() {
    setDirectorSuccess(false);
    setDirectorLoading(true);
    try {
      const userId = sub;
      const sortkey = directorId;
      await updateDirector({
        userId,
        sortkey,
        directorId,
        director_name,
        director_email,
        director_phone_number,
        director_id_attachment,
        director_id_number,
        director_id_type,
        director_nationality,
        director_poa_attachment,
        director_country_of_residence,
      });
    } catch (e) {
      onError(e);
    }
    setDirectorSuccess(true);
    setDirectorLoading(false);
    window.location.reload(true);
  }

  async function handleUBOSubmit() {
    setUboSuccess(false);
    setUboLoading(true);
    try {
      const userId = sub;
      const sortkey = uboId;
      await updateUbo({
        userId,
        sortkey,
        uboId,
        ubo_name,
        ubo_email,
        ubo_phone_number,
        ubo_id_attachment,
        ubo_id_number,
        ubo_id_type,
        ubo_nationality,
        ubo_poa_attachment,
        ubo_country_of_residence,
      });
    } catch (e) {
      onError(e);
    }
    setUboSuccess(true);
    setUboLoading(false);
    window.location.reload(true);
  }

  async function handleFinancialsSubmit() {
    setFinancialsSuccess(false);
    setFinancialsLoading(true);
    try {
      const userId = sub;
      const sortkey = financialsId;
      await updateFinancials({
        userId,
        sortkey,
        financialsId,
        ebit,
        financials_attachment,
        net_profit,
        financials_rating,
        financials_reporting_period,
        sales,
        total_assets,
        total_liabilities,
      });
    } catch (e) {
      onError(e);
    }
    setFinancialsSuccess(true);
    setFinancialsLoading(false);
    window.location.reload(true);
  }

  function updateSupplier(input) {
    return API.graphql(
      graphqlOperation(mutations.updateSupplier, { input: input })
    );
  }
  function updateDirector(input) {
    return API.graphql(
      graphqlOperation(mutations.updateDirector, { input: input })
    );
  }
  function updateUbo(input) {
    return API.graphql(graphqlOperation(mutations.updateUbo, { input: input }));
  }
  function updateFinancials(input) {
    return API.graphql(
      graphqlOperation(mutations.updateFinancials, { input: input })
    );
  };

  function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  }
  
  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  

  return (
    <Container maxWidth="lg">
      <React.Fragment>
        <Accordion defaultExpanded={true}>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
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
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company Legal Name"
                        name="supplier_name"
                        onChange={(e) => setSupplier_name(e.target.value)}
                        required
                        value={supplier_name}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company Type"
                        name="supplier_type"
                        onChange={(e) => setSupplier_type(e.target.value)}
                        required
                        value={supplier_type}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company City"
                        name="supplier_address_city"
                        onChange={(e) =>
                          setSupplier_address_city(e.target.value)
                        }
                        required
                        value={supplier_address_city}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Zipcode"
                        name="supplier_address_postalcode"
                        onChange={(e) =>
                          setSupplier_address_postalcode(e.target.value)
                        }
                        type="number"
                        value={supplier_address_postalcode}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Street"
                        name="supplier_address_street"
                        onChange={(e) =>
                          setSupplier_address_street(e.target.value)
                        }
                        required
                        value={supplier_address_street}
                        variant="outlined"
                      />
                    </Grid>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid
                        container
                        justify="space-around"
                        item
                        md={6}
                        xs={12}
                      >
                        <KeyboardDatePicker
                          fullWidth
                          value={supplier_date_of_incorporation}
                          margin="normal"
                          variant="outlined"
                          id="date_of_incorporation"
                          label="Company Date of Incorporation"
                          name="date_of_incorporation"
                          format="dd/MM/yyyy"
                          minDate={new Date("1500/12/31")}
                          maxDate={new Date()}
                          onChange={(e) =>
                            setSupplier_date_of_incorporation(e.target.value)
                          }
                          required
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </Grid>
                </CardContent>
                <Divider />
                <Box display="flex" justifyContent="flex-end" p={2}>
                  <LoaderButton
                    startIcon={<UploadIcon />}
                    disabled={supplierloading}
                    success={suppliersuccess}
                    loading={supplierloading}
                    onClick={handleSupplierSubmit}
                  >
                    Update details
                  </LoaderButton>
                </Box>
              </Card>
            </form>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>
              Company Director
            </Typography>
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
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company Director Name"
                        name="director_name"
                        onChange={(e) => setDirector_name(e.target.value)}
                        required
                        value={director_name}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company Director Email"
                        name="director_email"
                        onChange={(e) => setDirector_email(e.target.value)}
                        required
                        value={director_email}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company Director Phone"
                        name="director_phone_number"
                        onChange={(e) =>
                          setDirector_phone_number(e.target.value)
                        }
                        required
                        value={director_phone_number}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Select
                        fullWidth
                        label="Company Director ID Type"
                        name="director_id_type"
                        onChange={(e) => setDirector_id_type(e.target.value)}
                        required
                        value={director_id_type}
                        variant="outlined"
                      >
                        {idtype.map((item, index) => (
                          <MenuItem key={index} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company Director ID Number"
                        name="director_id_number"
                        onChange={(e) => setDirector_id_number(e.target.value)}
                        required
                        value={director_id_number}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <Box display="flex" justifyContent="flex-end" p={2}>
                  <LoaderButton
                    startIcon={<UploadIcon />}
                    disabled={directorloading}
                    success={directorsuccess}
                    loading={directorloading}
                    onClick={handleDirectorSubmit}
                  >
                    Update Director details
                  </LoaderButton>
                </Box>
              </Card>
            </form>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>Company Owner</Typography>
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
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company UBO Name"
                        name="ubo_name"
                        onChange={(e) => setUbo_name(e.target.value)}
                        required
                        value={ubo_name}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company UBO Email"
                        name="ubo_email"
                        onChange={(e) => setUbo_email(e.target.value)}
                        required
                        value={ubo_email}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company UBO Phone"
                        name="ubo_phone_number"
                        onChange={(e) => setUbo_phone_number(e.target.value)}
                        required
                        value={ubo_phone_number}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Select
                        fullWidth
                        label="Company UBO ID Type"
                        name="ubo_id_type"
                        onChange={(e) => setUbo_id_type(e.target.value)}
                        required
                        value={ubo_id_type}
                        variant="outlined"
                      >
                        {idtype.map((item, index) => (
                          <MenuItem key={index} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company UBO ID Number"
                        name="ubo_id_number"
                        onChange={(e) => setUbo_id_number(e.target.value)}
                        required
                        value={ubo_id_number}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <Box display="flex" justifyContent="flex-end" p={2}>
                  <LoaderButton
                    startIcon={<UploadIcon />}
                    disabled={uboloading}
                    success={ubosuccess}
                    loading={uboloading}
                    onClick={handleUBOSubmit}
                  >
                    Update Owner details
                  </LoaderButton>
                </Box>
              </Card>
            </form>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>
              Company Financials
            </Typography>
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
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Earnings Before Interest Tax"
                        name="ebit"
                        onChange={(e) => setEbit(e.target.value)}
                        required
                        value={ebit}
                        variant="outlined"
                        InputProps={{
                          inputComponent: NumberFormatCustom,
                        }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company Net Profit"
                        name="net_profit"
                        onChange={(e) => setNet_profit(e.target.value)}
                        required
                        value={net_profit}
                        variant="outlined"
                        InputProps={{
                          inputComponent: NumberFormatCustom,
                        }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company Rating"
                        name="financials_rating"
                        onChange={(e) => setFinancials_rating(e.target.value)}
                        required
                        value={financials_rating}
                        variant="outlined"
                      />
                    </Grid>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid
                        container
                        justify="space-around"
                        item
                        md={6}
                        xs={12}
                      >
                        <KeyboardDatePicker
                          fullWidth
                          value={financials_reporting_period}
                          margin="normal"
                          variant="outlined"
                          id="financials_reporting_period"
                          label="Company Date of Incorporation"
                          name="financials_reporting_period"
                          format="dd/MM/yyyy"
                          minDate={new Date("1500/12/31")}
                          maxDate={new Date()}
                          onChange={(e) =>
                            setFinancials_reporting_period(e.target.value)
                          }
                          required
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Sales/Revenue"
                        name="sales"
                        onChange={(e) => setSales(e.target.value)}
                        required
                        value={sales}
                        variant="outlined"
                        InputProps={{
                          inputComponent: NumberFormatCustom,
                        }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Total Assets"
                        name="total_assets"
                        onChange={(e) => setTotal_assets(e.target.value)}
                        required
                        value={total_assets}
                        variant="outlined"
                        InputProps={{
                          inputComponent: NumberFormatCustom,
                        }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Total Liabilities"
                        name="total_liabilities"
                        onChange={(e) => setTotal_liabilities(e.target.value)}
                        required
                        value={total_liabilities}
                        variant="outlined"
                        InputProps={{
                          inputComponent: NumberFormatCustom,
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <Box display="flex" justifyContent="flex-end" p={2}>
                  <LoaderButton
                    startIcon={<UploadIcon />}
                    disabled={financialsloading}
                    success={financialssuccess}
                    loading={financialsloading}
                    onClick={handleFinancialsSubmit}
                  >
                    Update Finacial details
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

SupplierForm.propTypes = {
  className: PropTypes.string,
};

export default SupplierForm;
