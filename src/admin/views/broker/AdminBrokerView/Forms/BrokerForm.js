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
import DirectorListView from "src/admin/views/broker/AdminBrokerView/Lists/directorlist.js";
import UboListView from "src/admin/views/broker/AdminBrokerView/Lists/ubolist.js";
import AdminUpdateBrokerBankView from "src/admin/views/bank/AdminUpdateBrokerBankView/index.js";
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

const BrokerForm = ({ className, value, ...rest }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [userId, setUserId] = useState("");
  const [dynamobrokerid, setdynamobrokerId] = useState("");
  const [brokerId, setBrokerId] = useState("");
  const [broker_logo, setBroker_logo] = useState("");
  const [broker_name, setBroker_name] = useState("");
  const [broker_type, setBroker_type] = useState("");
  const [
    broker_date_of_incorporation,
    setBroker_date_of_incorporation,
  ] = useState("");
  const [broker_address_city, setBroker_address_city] = useState("");
  const [broker_address_street, setBroker_address_street] = useState("");
  const [
    broker_address_postalcode,
    setBroker_address_postalcode,
  ] = useState("");
  const [broker_country, setBroker_country] = useState("");
  const [broker_industry, setBroker_industry] = useState("");
  const [
    broker_registration_cert_attachment,
    setBroker_registration_cert_attachment,
  ] = useState("");
  const [broker_website, setBroker_website] = useState("");
  const [broker_address_refinment, setBroker_address_refinment] = useState(
    ""
  );
  const [broker_industry_code, setBroker_industry_code] = useState("");
  const [broker_register_number, setBroker_register_number] = useState("");
  const [broker_trading_name, setBroker_trading_name] = useState("");

  //Financials:
  const [financialsId, setFinancialsId] = useState("");
  const [ebit, setEbit] = useState("");
  //const [financials_attachment, setFinancials_attachment] = useState("");
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

  const [brokerloading, setBrokerLoading] = useState(false);
  const [brokersuccess, setBrokerSuccess] = useState(false);
  const [financialsloading, setFinancialsLoading] = useState(false);
  const [financialssuccess, setFinancialsSuccess] = useState(false);

  useEffect(() => {
    const id = value.value;
    getBroker({ id });
    async function getBroker(input) {
      try {
        const broker = await API.graphql(
          graphqlOperation(queries.getBroker, input)
        );
        const {
          data: {
            getBroker: {
              id,
              userId,
              brokerId,
              broker_logo,
              broker_name,
              broker_type,
              broker_date_of_incorporation,
              broker_address_city,
              broker_address_street,
              broker_address_postalcode,
              broker_country,
              broker_industry,
              broker_registration_cert_attachment,
              broker_website,
              broker_address_refinment,
              broker_industry_code,
              broker_register_number,
              broker_trading_name,
            },
          },
        } = broker;
        setdynamobrokerId(id);
        setUserId(userId);
        setBrokerId(brokerId);
        setBroker_logo(broker_logo);
        setBroker_name(broker_name);
        setBroker_date_of_incorporation(broker_date_of_incorporation);
        setBroker_type(broker_type);
        setBroker_address_city(broker_address_city);
        setBroker_address_street(broker_address_street);
        setBroker_address_postalcode(broker_address_postalcode);
        setBroker_country(broker_country);
        setBroker_industry(broker_industry);
        setBroker_registration_cert_attachment(
          broker_registration_cert_attachment
        );
        setBroker_website(broker_website);
        setBroker_address_refinment(broker_address_refinment);
        setBroker_industry_code(broker_industry_code);
        setBroker_register_number(broker_register_number);
        setBroker_trading_name(broker_trading_name);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
  }, [value]);

  useEffect(() => {
    getFinancials(userId, brokerId);
    async function getFinancials(uid, iid) {
      try {
        let filter = {
          userId: { eq: uid },
          brokerId: { eq: iid },
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
  }, [userId, brokerId]);

  async function handleBrokerSubmit() {
    setBrokerSuccess(false);
    setBrokerLoading(true);
    try {
      const id = dynamobrokerid;
      await updateBroker({
        id,
        userId,
        broker_logo,
        broker_name,
        broker_type,
        broker_date_of_incorporation,
        broker_address_city,
        broker_address_street,
        broker_address_postalcode,
        broker_country,
        broker_industry,
        broker_registration_cert_attachment,
        broker_website,
        broker_address_refinment,
        broker_industry_code,
        broker_register_number,
        broker_trading_name,
      });
    } catch (e) {
      onError(e);
    }
    setBrokerSuccess(true);
    setBrokerLoading(false);
    navigate("/admin/brokers");
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
    navigate("/admin/brokers");
  }

  function updateBroker(input) {
    return API.graphql(
      graphqlOperation(mutations.updateBroker, { input: input })
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
                        name="broker_name"
                        onChange={(e) => setBroker_name(e.target.value)}
                        required
                        value={broker_name || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company Trading Name"
                        name="broker_trading_name"
                        onChange={(e) =>
                          setBroker_trading_name(e.target.value)
                        }
                        value={broker_trading_name || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company Website"
                        name="broker_website"
                        onChange={(e) => setBroker_website(e.target.value)}
                        required
                        value={broker_website || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Select
                        fullWidth
                        label="Company Type"
                        name="broker_type"
                        onChange={(e) => setBroker_type(e.target.value)}
                        required
                        value={broker_type || ""}
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
                        name="broker_register_number"
                        onChange={(e) =>
                          setBroker_register_number(e.target.value)
                        }
                        required
                        value={broker_register_number || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company City"
                        name="broker_address_city"
                        onChange={(e) =>
                          setBroker_address_city(e.target.value)
                        }
                        required
                        value={broker_address_city || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Zipcode"
                        name="broker_address_postalcode"
                        onChange={(e) =>
                          setBroker_address_postalcode(e.target.value)
                        }
                        type="number"
                        value={broker_address_postalcode || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Street"
                        name="broker_address_street"
                        onChange={(e) =>
                          setBroker_address_street(e.target.value)
                        }
                        required
                        value={broker_address_street || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Address refinment"
                        name="broker_address_refinment"
                        onChange={(e) =>
                          setBroker_address_refinment(e.target.value)
                        }
                        value={broker_address_refinment || ""}
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
                          value={broker_date_of_incorporation || ""}
                          margin="normal"
                          variant="outlined"
                          id="date_of_incorporation"
                          label="Company Date of Incorporation"
                          name="date_of_incorporation"
                          minDate={new Date("1500/12/31")}
                          maxDate={new Date()}
                          onChange={(newvalue) =>
                            setBroker_date_of_incorporation(newvalue)
                          }
                          onAccept={(e) => setBroker_date_of_incorporation(e)}
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
                        name="broker_country"
                        onChange={(e) => setBroker_country(e.target.value)}
                        required
                        value={broker_country || ""}
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
                        label="Broker Industry"
                        name="broker_industry"
                        onChange={(e) => setBroker_industry(e.target.value)}
                        value={broker_industry || ""}
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
                        label="Broker Industry Code"
                        name="broker_industry_code"
                        onChange={(e) =>
                          setBroker_industry_code(e.target.value)
                        }
                        value={broker_industry_code || ""}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <Box display="flex" justifyContent="flex-end" p={2}>
                  <LoaderButton
                    startIcon={<UploadIcon />}
                    disabled={brokerloading}
                    success={brokersuccess}
                    loading={brokerloading}
                    onClick={handleBrokerSubmit}
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
                <DirectorListView value={brokerId} />
              </CardContent>
              <Divider />
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Link
                  to={`/admin/adminnewbrokerdirector/${dynamobrokerid}`}
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
                <UboListView value={brokerId} />
              </CardContent>
              <Divider />
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Link to={`/admin/adminnewbrokerubo/${dynamobrokerid}`}>
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
                <AdminUpdateBrokerBankView value={brokerId} user={userId} />
              </CardContent>
            </Card>
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    </Container>
  );
};

BrokerForm.propTypes = {
  className: PropTypes.string,
};

export default BrokerForm;
