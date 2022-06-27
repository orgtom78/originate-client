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
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { UploadCloud as UploadIcon } from "react-feather";
import { API, graphqlOperation } from "aws-amplify";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import LoaderButton from "src/components/LoaderButton.js";
import { green } from "@mui/material/colors";
import DirectorListView from "src/admin/views/investor/AdminInvestorView/Lists/directorlist.js";
import UboListView from "src/admin/views/investor/AdminInvestorView/Lists/ubolist.js";
import AdminUpdateInvestorBankView from "src/admin/views/bank/AdminUpdateInvestorBankView/index.js";
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

const InvestorForm = ({ className, value, ...rest }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [userId, setUserId] = useState("");
  const [dynamoinvestorid, setdynamoinvestorId] = useState("");
  const [investorId, setInvestorId] = useState("");
  const [investor_logo, setInvestor_logo] = useState("");
  const [investor_name, setInvestor_name] = useState("");
  const [investor_type, setInvestor_type] = useState("");
  const [investor_date_of_incorporation, setInvestor_date_of_incorporation] =
    useState("");
  const [investor_address_city, setInvestor_address_city] = useState("");
  const [investor_address_street, setInvestor_address_street] = useState("");
  const [investor_address_postalcode, setInvestor_address_postalcode] =
    useState("");
  const [investor_country, setInvestor_country] = useState("");
  const [investor_industry, setInvestor_industry] = useState("");
  const [
    investor_registration_cert_attachment,
    setInvestor_registration_cert_attachment,
  ] = useState("");
  const [investor_website, setInvestor_website] = useState("");
  const [investor_address_refinment, setInvestor_address_refinment] =
    useState("");
  const [investor_industry_code, setInvestor_industry_code] = useState("");
  const [investor_register_number, setInvestor_register_number] = useState("");
  const [investor_trading_name, setInvestor_trading_name] = useState("");
  const [investor_email, setInvestor_email] = useState("");

  //Financials:
  const [financialsId, setFinancialsId] = useState("");
  const [ebit, setEbit] = useState("");
  //const [financials_attachment, setFinancials_attachment] = useState("");
  const [net_profit, setNet_profit] = useState("");
  const [financials_rating, setFinancials_rating] = useState("");
  const [financials_reporting_period, setFinancials_reporting_period] =
    useState("");
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

  const [investorloading, setInvestorLoading] = useState(false);
  const [investorsuccess, setInvestorSuccess] = useState(false);
  const [financialsloading, setFinancialsLoading] = useState(false);
  const [financialssuccess, setFinancialsSuccess] = useState(false);

  useEffect(() => {
    const id = value.value;
    getInvestor({ id });
    async function getInvestor(input) {
      try {
        const investor = await API.graphql(
          graphqlOperation(queries.getInvestor, input)
        );
        const {
          data: {
            getInvestor: {
              id,
              userId,
              investorId,
              investor_email,
              investor_logo,
              investor_name,
              investor_type,
              investor_date_of_incorporation,
              investor_address_city,
              investor_address_street,
              investor_address_postalcode,
              investor_country,
              investor_industry,
              investor_registration_cert_attachment,
              investor_website,
              investor_address_refinment,
              investor_industry_code,
              investor_register_number,
              investor_trading_name,
            },
          },
        } = investor;
        setdynamoinvestorId(id);
        setUserId(userId);
        setInvestorId(investorId);
        setInvestor_email(investor_email);
        setInvestor_logo(investor_logo);
        setInvestor_name(investor_name);
        setInvestor_date_of_incorporation(investor_date_of_incorporation);
        setInvestor_type(investor_type);
        setInvestor_address_city(investor_address_city);
        setInvestor_address_street(investor_address_street);
        setInvestor_address_postalcode(investor_address_postalcode);
        setInvestor_country(investor_country);
        setInvestor_industry(investor_industry);
        setInvestor_registration_cert_attachment(
          investor_registration_cert_attachment
        );
        setInvestor_website(investor_website);
        setInvestor_address_refinment(investor_address_refinment);
        setInvestor_industry_code(investor_industry_code);
        setInvestor_register_number(investor_register_number);
        setInvestor_trading_name(investor_trading_name);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
  }, [value]);

  useEffect(() => {
    getFinancials(userId, investorId);
    async function getFinancials(uid, iid) {
      try {
        let filter = {
          userId: { eq: uid },
          investorId: { eq: iid },
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
        const n = {
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
          net_profit,
          financials_rating,
          financials_reporting_period,
          sales,
          total_assets,
          total_liabilities,
        } = financials;
        setFinancialsId(id);
        setEbit(ebit);
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
  }, [userId, investorId]);

  async function handleInvestorSubmit() {
    setInvestorSuccess(false);
    setInvestorLoading(true);
    try {
      const id = dynamoinvestorid;
      await updateInvestor({
        id,
        userId,
        investor_email,
        investor_logo,
        investor_name,
        investor_type,
        investor_date_of_incorporation,
        investor_address_city,
        investor_address_street,
        investor_address_postalcode,
        investor_country,
        investor_industry,
        investor_registration_cert_attachment,
        investor_website,
        investor_address_refinment,
        investor_industry_code,
        investor_register_number,
        investor_trading_name,
      });
    } catch (e) {
      onError(e);
    }
    setInvestorSuccess(true);
    setInvestorLoading(false);
    navigate("/admin/investors");
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
    navigate("/admin/investors");
  }

  function updateInvestor(input) {
    return API.graphql(
      graphqlOperation(mutations.updateInvestor, { input: input })
    );
  }
  function updateFinancials(input) {
    return API.graphql(
      graphqlOperation(mutations.updateFinancials, { input: input })
    );
  }

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
                        name="investor_name"
                        onChange={(e) => setInvestor_name(e.target.value)}
                        required
                        value={investor_name || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company Trading Name"
                        name="investor_trading_name"
                        onChange={(e) =>
                          setInvestor_trading_name(e.target.value)
                        }
                        value={investor_trading_name || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company Website"
                        name="investor_website"
                        onChange={(e) => setInvestor_website(e.target.value)}
                        required
                        value={investor_website || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Select
                        fullWidth
                        label="Company Type"
                        name="investor_type"
                        onChange={(e) => setInvestor_type(e.target.value)}
                        required
                        value={investor_type || ""}
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
                        name="investor_register_number"
                        onChange={(e) =>
                          setInvestor_register_number(e.target.value)
                        }
                        required
                        value={investor_register_number || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company City"
                        name="investor_address_city"
                        onChange={(e) =>
                          setInvestor_address_city(e.target.value)
                        }
                        required
                        value={investor_address_city || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Zipcode"
                        name="investor_address_postalcode"
                        onChange={(e) =>
                          setInvestor_address_postalcode(e.target.value)
                        }
                        type="number"
                        value={investor_address_postalcode || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Street"
                        name="investor_address_street"
                        onChange={(e) =>
                          setInvestor_address_street(e.target.value)
                        }
                        required
                        value={investor_address_street || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Address refinment"
                        name="investor_address_refinment"
                        onChange={(e) =>
                          setInvestor_address_refinment(e.target.value)
                        }
                        value={investor_address_refinment || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      container
                      justifyContent="space-around"
                      item
                      md={6}
                      xs={12}
                    >
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          value={investor_date_of_incorporation || ""}
                          margin="normal"
                          variant="outlined"
                          id="date_of_incorporation"
                          label="Company Date of Incorporation"
                          name="date_of_incorporation"
                          minDate={new Date("1500/12/31")}
                          maxDate={new Date()}
                          onChange={(newvalue) =>
                            setInvestor_date_of_incorporation(newvalue)
                          }
                          onAccept={(e) => setInvestor_date_of_incorporation(e)}
                          required
                          renderInput={(params) => (
                            <TextField fullWidth {...params} />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Select
                        fullWidth
                        label="Country"
                        name="investor_country"
                        onChange={(e) => setInvestor_country(e.target.value)}
                        required
                        value={investor_country || ""}
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
                        label="Investor Industry"
                        name="investor_industry"
                        onChange={(e) => setInvestor_industry(e.target.value)}
                        value={investor_industry || ""}
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
                        label="Investor Industry Code"
                        name="investor_industry_code"
                        onChange={(e) =>
                          setInvestor_industry_code(e.target.value)
                        }
                        value={investor_industry_code || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Investor EMail"
                        name="investor_email"
                        onChange={(e) => setInvestor_email(e.target.value)}
                        value={investor_email || ""}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <Box display="flex" justifyContent="flex-end" p={2}>
                  <LoaderButton
                    startIcon={<UploadIcon />}
                    disabled={investorloading}
                    success={investorsuccess}
                    loading={investorloading}
                    onClick={handleInvestorSubmit}
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
                <DirectorListView value={investorId} />
              </CardContent>
              <Divider />
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Link
                  to={`/admin/adminnewinvestordirector/${dynamoinvestorid}`}
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
                <UboListView value={investorId} />
              </CardContent>
              <Divider />
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Link to={`/admin/adminnewinvestorubo/${dynamoinvestorid}`}>
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
                    <Grid
                      container
                      justifyContent="space-around"
                      item
                      md={6}
                      xs={12}
                    >
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          value={financials_reporting_period || ""}
                          margin="normal"
                          variant="outlined"
                          id="financials_reporting_period"
                          label="Company Date of Incorporation"
                          name="financials_reporting_period"
                          views={["year"]}
                          onChange={(e) => setFinancials_reporting_period(e)}
                          required
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          renderInput={(params) => (
                            <TextField fullWidth {...params} />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
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
                <AdminUpdateInvestorBankView value={investorId} user={userId} />
              </CardContent>
            </Card>
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    </Container>
  );
};

InvestorForm.propTypes = {
  className: PropTypes.string,
};

export default InvestorForm;
