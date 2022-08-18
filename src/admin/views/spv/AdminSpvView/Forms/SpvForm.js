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

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import LoaderButton from "src/components/LoaderButton.js";
import { green } from "@mui/material/colors";
import DirectorListView from "src/admin/views/spv/AdminSpvView/Lists/directorlist.js";
import UboListView from "src/admin/views/spv/AdminSpvView/Lists/ubolist.js";
import AdminUpdateSpvBankView from "src/admin/views/bank/AdminUpdateSpvBankView/index.js";
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

const SpvForm = ({ className, value, ...rest }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [userId, setUserId] = useState("");
  const [dynamospvid, setdynamospvId] = useState("");
  const [spvId, setSpvId] = useState("");
  const [spv_logo, setSpv_logo] = useState("");
  const [spv_name, setSpv_name] = useState("");
  const [spv_type, setSpv_type] = useState("");
  const [spv_date_of_incorporation, setSpv_date_of_incorporation] =
    useState("");
  const [spv_address_city, setSpv_address_city] = useState("");
  const [spv_address_street, setSpv_address_street] = useState("");
  const [spv_address_postalcode, setSpv_address_postalcode] = useState("");
  const [spv_country, setSpv_country] = useState("");
  const [spv_industry, setSpv_industry] = useState("");
  const [
    spv_registration_cert_attachment,
    setSpv_registration_cert_attachment,
  ] = useState("");
  const [spv_website, setSpv_website] = useState("");
  const [spv_address_refinment, setSpv_address_refinment] = useState("");
  const [spv_industry_code, setSpv_industry_code] = useState("");
  const [spv_register_number, setSpv_register_number] = useState("");
  const [spv_trading_name, setSpv_trading_name] = useState("");

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

  const [spvloading, setSpvLoading] = useState(false);
  const [spvsuccess, setSpvSuccess] = useState(false);
  const [financialsloading, setFinancialsLoading] = useState(false);
  const [financialssuccess, setFinancialsSuccess] = useState(false);

  useEffect(() => {
    const id = value.value;
    getSpv({ id });
    async function getSpv(input) {
      try {
        const spv = await API.graphql(graphqlOperation(queries.getSpv, input));
        const {
          data: {
            getSpv: {
              id,
              userId,
              spvId,
              spv_logo,
              spv_name,
              spv_type,
              spv_date_of_incorporation,
              spv_address_city,
              spv_address_street,
              spv_address_postalcode,
              spv_country,
              spv_industry,
              spv_registration_cert_attachment,
              spv_website,
              spv_address_refinment,
              spv_industry_code,
              spv_register_number,
              spv_trading_name,
            },
          },
        } = spv;
        setdynamospvId(id);
        setUserId(userId);
        setSpvId(spvId);
        setSpv_logo(spv_logo);
        setSpv_name(spv_name);
        setSpv_date_of_incorporation(spv_date_of_incorporation);
        setSpv_type(spv_type);
        setSpv_address_city(spv_address_city);
        setSpv_address_street(spv_address_street);
        setSpv_address_postalcode(spv_address_postalcode);
        setSpv_country(spv_country);
        setSpv_industry(spv_industry);
        setSpv_registration_cert_attachment(spv_registration_cert_attachment);
        setSpv_website(spv_website);
        setSpv_address_refinment(spv_address_refinment);
        setSpv_industry_code(spv_industry_code);
        setSpv_register_number(spv_register_number);
        setSpv_trading_name(spv_trading_name);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
  }, [value]);

  useEffect(() => {
    getFinancials(userId, spvId);
    async function getFinancials(uid, iid) {
      try {
        let filter = {
          userId: { eq: uid },
          spvId: { eq: iid },
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
  }, [userId, spvId]);

  async function handleSpvSubmit() {
    setSpvSuccess(false);
    setSpvLoading(true);
    try {
      const id = dynamospvid;
      await updateSpv({
        id,
        userId,
        spv_logo,
        spv_name,
        spv_type,
        spv_date_of_incorporation,
        spv_address_city,
        spv_address_street,
        spv_address_postalcode,
        spv_country,
        spv_industry,
        spv_registration_cert_attachment,
        spv_website,
        spv_address_refinment,
        spv_industry_code,
        spv_register_number,
        spv_trading_name,
      });
    } catch (e) {
      onError(e);
    }
    setSpvSuccess(true);
    setSpvLoading(false);
    navigate("/admin/spvs");
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
    navigate("/admin/spvs");
  }

  function updateSpv(input) {
    return API.graphql(graphqlOperation(mutations.updateSpv, { input: input }));
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
                        name="spv_name"
                        onChange={(e) => setSpv_name(e.target.value)}
                        required
                        value={spv_name || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company Trading Name"
                        name="spv_trading_name"
                        onChange={(e) => setSpv_trading_name(e.target.value)}
                        value={spv_trading_name || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company Website"
                        name="spv_website"
                        onChange={(e) => setSpv_website(e.target.value)}
                        required
                        value={spv_website || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Select
                        fullWidth
                        label="Company Type"
                        name="spv_type"
                        onChange={(e) => setSpv_type(e.target.value)}
                        required
                        value={spv_type || ""}
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
                        name="spv_register_number"
                        onChange={(e) => setSpv_register_number(e.target.value)}
                        required
                        value={spv_register_number || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company City"
                        name="spv_address_city"
                        onChange={(e) => setSpv_address_city(e.target.value)}
                        required
                        value={spv_address_city || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Zipcode"
                        name="spv_address_postalcode"
                        onChange={(e) =>
                          setSpv_address_postalcode(e.target.value)
                        }
                        type="number"
                        value={spv_address_postalcode || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Street"
                        name="spv_address_street"
                        onChange={(e) => setSpv_address_street(e.target.value)}
                        required
                        value={spv_address_street || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Address refinment"
                        name="spv_address_refinment"
                        onChange={(e) =>
                          setSpv_address_refinment(e.target.value)
                        }
                        value={spv_address_refinment || ""}
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
                        <DesktopDatePicker
                          value={spv_date_of_incorporation || ""}
                          margin="normal"
                          variant="outlined"
                          id="date_of_incorporation"
                          label="Company Date of Incorporation"
                          name="date_of_incorporation"
                          minDate={new Date("1500/12/31")}
                          maxDate={new Date()}
                          onChange={(newvalue) =>
                            setSpv_date_of_incorporation(newvalue)
                          }
                          onAccept={(e) => setSpv_date_of_incorporation(e)}
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
                        name="spv_country"
                        onChange={(e) => setSpv_country(e.target.value)}
                        required
                        value={spv_country || ""}
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
                        label="Spv Industry"
                        name="spv_industry"
                        onChange={(e) => setSpv_industry(e.target.value)}
                        value={spv_industry || ""}
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
                        label="Spv Industry Code"
                        name="spv_industry_code"
                        onChange={(e) => setSpv_industry_code(e.target.value)}
                        value={spv_industry_code || ""}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <Box display="flex" justifyContent="flex-end" p={2}>
                  <LoaderButton
                    startIcon={<UploadIcon />}
                    disabled={spvloading}
                    success={spvsuccess}
                    loading={spvloading}
                    onClick={handleSpvSubmit}
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
                <DirectorListView value={spvId} />
              </CardContent>
              <Divider />
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Link to={`/admin/adminnewspvdirector/${dynamospvid}`}>
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
                <UboListView value={spvId} />
              </CardContent>
              <Divider />
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Link to={`/admin/adminnewspvubo/${dynamospvid}`}>
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
                        <DesktopDatePicker
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
                <AdminUpdateSpvBankView value={spvId} user={userId} />
              </CardContent>
            </Card>
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    </Container>
  );
};

SpvForm.propTypes = {
  className: PropTypes.string,
};

export default SpvForm;
