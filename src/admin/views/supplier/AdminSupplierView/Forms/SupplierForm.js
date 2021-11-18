import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "date-fns";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
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
} from "@material-ui/core";
import NumberFormat from "react-number-format";
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
import DirectorListView from "src/admin/views/supplier/AdminSupplierView/Lists/directorlist.js";
import UboListView from "src/admin/views/supplier/AdminSupplierView/Lists/ubolist.js";
import AdminUpdateBankView from "src/admin/views/bank/AdminUpdateBankView/index.js";
import * as queries from "src/graphql/queries.js";
import countries from "src/components/FormLists/countries.js";
import industries from "src/components/FormLists/industries.js";

const cr = countries;
const indust = industries;

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
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

const type = [
  {
    value: "Corporation",
    label: "Corporation",
  },
  {
    value: "Limited Liability",
    label: "Limited Liability",
  },
  {
    value: "Partnership",
    label: "Partnership",
  },
  {
    value: "Sole Proprietorship",
    label: "Sole Proprietorship",
  },
];

const SupplierForm = ({ className, value, ...rest }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [userId, setUserId] = useState("");
  const [dynamosupplierid, setdynamosupplierId] = useState("");
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
  const [supplier_website, setSupplier_website] = useState("");
  const [supplier_address_refinment, setSupplier_address_refinment] = useState(
    ""
  );
  const [supplier_industry_code, setSupplier_industry_code] = useState("");
  const [supplier_register_number, setSupplier_register_number] = useState("");
  const [supplier_trading_name, setSupplier_trading_name] = useState("");

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
  const [accounts_payable, setAccounts_payable] = useState("");
  const [accounts_receivable, setAccounts_receivable] = useState("");
  const [cash, setCash] = useState("");
  const [equity_book_value, setEquity_book_value] = useState("");
  const [equity_market_value, setEquity_market_value] = useState("");
  const [interest_expenses, setInterest_expenses] = useState("");
  const [inventory, setInventory] = useState("");
  const [retained_earnings, setRetained_earnings] = useState("");
  const [short_term_debt, setShort_term_debt] = useState("");
  const [working_capital, setWorking_capital] = useState("");

  const [supplierloading, setSupplierLoading] = useState(false);
  const [suppliersuccess, setSupplierSuccess] = useState(false);
  const [financialsloading, setFinancialsLoading] = useState(false);
  const [financialssuccess, setFinancialsSuccess] = useState(false);

  useEffect(() => {
    const id = value.value;
    getSupplier({ id });
    async function getSupplier(input) {
      try {
        const supplier = await API.graphql(
          graphqlOperation(queries.getSupplier, input)
        );
        const {
          data: {
            getSupplier: {
              id,
              userId,
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
              supplier_website,
              supplier_address_refinment,
              supplier_industry_code,
              supplier_register_number,
              supplier_trading_name,
            },
          },
        } = supplier;
        setdynamosupplierId(id);
        setUserId(userId);
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
        setSupplier_website(supplier_website);
        setSupplier_address_refinment(supplier_address_refinment);
        setSupplier_industry_code(supplier_industry_code);
        setSupplier_register_number(supplier_register_number);
        setSupplier_trading_name(supplier_trading_name);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
  }, [value]);

  useEffect(() => {
    getFinancials(userId);
    async function getFinancials(input) {
      try {
        let filter = {
          userId: { eq: input }
        };
        const {
          data: {
            listFinancialss: {
              items: [itemsPage1],
              nextToken,
            },
          },
        } = await API.graphql(
          graphqlOperation(queries.listFinancialss, { filter: filter })
        );
        const n = await {
          data: { listFinancialss: { items: [itemsPage1], nextToken } },
        };
        const financials = await n.data.listFinancialss.items[0];
        const {
          id,
          accounts_payable,
          accounts_receivable,
          cash,
          equity_book_value,
          equity_market_value,
          interest_expenses,
          inventory,
          retained_earnings,
          short_term_debt,
          working_capital,
          ebit,
          financials_attachment,
          net_profit,
          financials_rating,
          financials_reporting_period,
          sales,
          total_assets,
          total_liabilities,
        } = financials;
        setFinancialsId(id);
        setEbit(ebit);
        setFinancials_attachment(financials_attachment);
        setNet_profit(net_profit);
        setFinancials_rating(financials_rating);
        setFinancials_reporting_period(financials_reporting_period);
        setSales(sales);
        setTotal_assets(total_assets);
        setTotal_liabilities(total_liabilities);
        setAccounts_payable(accounts_payable);
        setAccounts_receivable(accounts_receivable);
        setCash(cash);
        setEquity_book_value(equity_book_value);
        setEquity_market_value(equity_market_value);
        setInterest_expenses(interest_expenses);
        setInventory(inventory);
        setRetained_earnings(retained_earnings);
        setShort_term_debt(short_term_debt);
        setWorking_capital(working_capital);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
  }, [userId]);

  async function handleSupplierSubmit() {
    setSupplierSuccess(false);
    setSupplierLoading(true);
    try {
      const id = dynamosupplierid;
      await updateSupplier({
        id,
        userId,
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
        supplier_website,
        supplier_address_refinment,
        supplier_industry_code,
        supplier_register_number,
        supplier_trading_name,
      });
    } catch (e) {
      onError(e);
    }
    setSupplierSuccess(true);
    setSupplierLoading(false);
    navigate("/admin/suppliers");
  }

  async function handleFinancialsSubmit() {
    setFinancialsSuccess(false);
    setFinancialsLoading(true);
    try {
      var id = financialsId;
      await updateFinancials({
        id,
        userId,
        accounts_payable,
        accounts_receivable,
        cash,
        equity_book_value,
        equity_market_value,
        interest_expenses,
        inventory,
        retained_earnings,
        short_term_debt,
        working_capital,
        ebit,
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
    navigate("/admin/suppliers");
  }

  function updateSupplier(input) {
    return API.graphql(
      graphqlOperation(mutations.updateSupplier, { input: input })
    );
  }
  function updateFinancials(input) {
    return API.graphql(
      graphqlOperation(mutations.updateFinancials, { input: input })
    );
  }

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
                        value={supplier_name || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company Trading Name"
                        name="supplier_trading_name"
                        onChange={(e) =>
                          setSupplier_trading_name(e.target.value)
                        }
                        value={supplier_trading_name || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company Website"
                        name="supplier_website"
                        onChange={(e) => setSupplier_website(e.target.value)}
                        required
                        value={supplier_website || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Select
                        fullWidth
                        label="Company Type"
                        name="supplier_type"
                        onChange={(e) => setSupplier_type(e.target.value)}
                        required
                        value={supplier_type || ""}
                        variant="outlined"
                      >
                        {type.map((item, index) => (
                          <MenuItem key={index} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company Registration Number"
                        name="supplier_register_number"
                        onChange={(e) =>
                          setSupplier_register_number(e.target.value)
                        }
                        required
                        value={supplier_register_number || ""}
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
                        value={supplier_address_city || ""}
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
                        value={supplier_address_postalcode || ""}
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
                        value={supplier_address_street || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Address refinment"
                        name="supplier_address_refinment"
                        onChange={(e) =>
                          setSupplier_address_refinment(e.target.value)
                        }
                        value={supplier_address_refinment || ""}
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
                          value={supplier_date_of_incorporation || ""}
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
                    <Grid item md={6} xs={12}>
                      <Select
                        fullWidth
                        label="Country"
                        name="supplier_country"
                        onChange={(e) => setSupplier_country(e.target.value)}
                        required
                        value={supplier_country || ""}
                        variant="outlined"
                      >
                        {cr.map((item, index) => (
                          <MenuItem key={index} value={item.label}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Select
                        fullWidth
                        label="Supplier Industry"
                        name="supplier_industry"
                        onChange={(e) => setSupplier_industry(e.target.value)}
                        value={supplier_industry || ""}
                        variant="outlined"
                      >
                        {indust.map((item, index) => (
                          <MenuItem key={index} value={item.label}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Supplier Industry Code"
                        name="supplier_industry_code"
                        onChange={(e) =>
                          setSupplier_industry_code(e.target.value)
                        }
                        value={supplier_industry_code || ""}
                        variant="outlined"
                      />
                    </Grid>
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
              Company Director List
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Card>
              <CardContent>
                <DirectorListView value={supplierId} />
              </CardContent>
              <Divider />
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Link
                  to={`/admin/adminnewsupplierdirector/${supplierId}`}
                >
                  <Button>Add Director</Button>
                </Link>
              </Box>
            </Card>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>
              Company Owner List
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Card>
              <CardContent>
                <UboListView value={supplierId} />
              </CardContent>
              <Divider />
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Link
                  to={`/admin/adminnewsupplierubo/${supplierId}`}
                >
                  <Button>Add Owner</Button>
                </Link>
              </Box>
            </Card>
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
                        value={ebit || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Cash Balance"
                        name="cash"
                        onChange={(e) => setCash(e.target.value)}
                        required
                        value={cash || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Accounts Payable"
                        name="accounts_payable"
                        onChange={(e) => setAccounts_payable(e.target.value)}
                        required
                        value={accounts_payable || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Accounts Receivable"
                        name="accounts_receivable"
                        onChange={(e) => setAccounts_receivable(e.target.value)}
                        required
                        value={accounts_receivable || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company Net Profit"
                        name="net_profit"
                        onChange={(e) => setNet_profit(e.target.value)}
                        required
                        value={net_profit || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company Rating"
                        name="financials_rating"
                        onChange={(e) => setFinancials_rating(e.target.value)}
                        required
                        value={financials_rating || ""}
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
                          value={financials_reporting_period || ""}
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
                        value={sales || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Total Assets"
                        name="total_assets"
                        onChange={(e) => setTotal_assets(e.target.value)}
                        required
                        value={total_assets || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Total Liabilities"
                        name="total_liabilities"
                        onChange={(e) => setTotal_liabilities(e.target.value)}
                        required
                        value={total_liabilities || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Equity Market value"
                        name="equity_market_value"
                        onChange={(e) => setEquity_market_value(e.target.value)}
                        required
                        value={equity_market_value || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Equity Book value"
                        name="equity_book_value"
                        onChange={(e) => setEquity_book_value(e.target.value)}
                        required
                        value={equity_book_value || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Interest Expenses"
                        name="interest_expenses"
                        onChange={(e) => setInterest_expenses(e.target.value)}
                        required
                        value={interest_expenses || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Inventory"
                        name="inventory"
                        onChange={(e) => setInventory(e.target.value)}
                        required
                        value={inventory || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Retained Earnings"
                        name="retained_earnings"
                        onChange={(e) => setRetained_earnings(e.target.value)}
                        required
                        value={retained_earnings || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Short Term Debt"
                        name="short_term_debt"
                        onChange={(e) => setShort_term_debt(e.target.value)}
                        required
                        value={short_term_debt || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Working Capital"
                        name="working_capital"
                        onChange={(e) => setWorking_capital(e.target.value)}
                        required
                        value={working_capital || ""}
                        variant="outlined"
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
                    Update Financial details
                  </LoaderButton>
                </Box>
              </Card>
            </form>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>
              Company Main Bank 
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Card>
              <CardContent>
                <AdminUpdateBankView value={supplierId} user={userId} />
              </CardContent>
            </Card>
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
