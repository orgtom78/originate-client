import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
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
  colors,
  Divider,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import NumberFormat from "react-number-format";
import { UploadCloud as UploadIcon } from "react-feather";
import { API, graphqlOperation } from "aws-amplify";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import LoaderButton from "src/components/LoaderButton.js";
import DirectorListView from "src/broker/views/buyer/BrokerBuyerView/Lists/directorlist.js";
import UboListView from "src/broker/views/buyer/BrokerBuyerView/Lists/ubolist.js";
import FinancialsListView from "src/broker/views/buyer/BrokerBuyerView/Lists/financialslist.js";
import * as queries from "src/graphql/queries.js";
import countries from "src/components/FormLists/countries.js";
import industries from "src/components/FormLists/industries.js";

const cr = countries;
const indust = industries;

const useStyles = makeStyles(() => ({
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: "auto",
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: colors.green[500],
    "&:hover": {
      backgroundColor: colors.green[700],
    },
  },
  buttonProgress: {
    color: colors.green[500],
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

const status = [
  {
    value: "Declined",
    label: "Declined",
  },
  {
    value: "Under Review",
    label: "Under Review",
  },
  {
    value: "Investor Offer Pending",
    label: "Investor Offer Pending",
  },
  {
    value: "Approved",
    label: "Approved",
  },
];

const BuyerForm = ({ className, value, ...rest }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  const [investor, setInvestor] = useState([]);
  const [buyerId, setBuyerId] = useState("");
  const [investorId, setInvestorId] = useState("");
  const [userId, setUserId] = useState("");
  const [identityId, setIdentityId] = useState("");
  const [broker, setBroker] = useState([]);
  const [brokerId, setBrokerId] = useState("");
  const [spv, setSpv] = useState([]);
  const [spvId, setSpvId] = useState("");

  const [buyer_status, setBuyer_status] = useState("");
  const [buyer_loan_request_amount, setBuyer_loan_request_amount] =
    useState("");
  const [buyer_loan_approved_amount, setBuyer_loan_approved_amount] =
    useState("");
  const [buyer_loan_rate, setBuyer_loan_rate] = useState("");
  const [buyer_loan_discount_fee, setBuyer_loan_discount_fee] = useState("");
  const [buyer_loan_transaction_fee, setBuyer_loan_transaction_fee] =
    useState("");
  const [buyer_loan_broker_fee, setBuyer_loan_broker_fee] = useState("");
  const [buyer_logo, setBuyer_logo] = useState("");
  const [buyer_name, setBuyer_name] = useState("");
  const [buyer_type, setBuyer_type] = useState("");
  const [buyer_date_of_incorporation, setBuyer_date_of_incorporation] =
    useState("");
  const [buyer_address_city, setBuyer_address_city] = useState("");
  const [buyer_address_street, setBuyer_address_street] = useState("");
  const [buyer_address_postalcode, setBuyer_address_postalcode] = useState("");
  const [buyer_country, setBuyer_country] = useState("");
  const [buyer_industry, setBuyer_industry] = useState("");
  const [
    buyer_registration_cert_attachment,
    setBuyer_registration_cert_attachment,
  ] = useState("");
  const [buyer_website, setBuyer_website] = useState("");
  const [buyer_address_refinment, setBuyer_address_refinment] = useState("");
  const [buyer_industry_code, setBuyer_industry_code] = useState("");
  const [buyer_register_number, setBuyer_register_number] = useState("");
  const [buyer_trading_name, setBuyer_trading_name] = useState("");

  const [buyerloading, setBuyerLoading] = useState(false);
  const [buyersuccess, setBuyerSuccess] = useState(false);

  useEffect(() => {
    getBuyer({ id });
    async function getBuyer(input) {
      try {
        const buyer = await API.graphql(
          graphqlOperation(queries.getBuyer, input)
        );
        const {
          data: {
            getBuyer: {
              buyerId,
              userId,
              identityId,
              investorId,
              brokerId,
              spvId,
              buyer_status,
              buyer_loan_request_amount,
              buyer_loan_approved_amount,
              buyer_loan_rate,
              buyer_loan_discount_fee,
              buyer_loan_transaction_fee,
              buyer_loan_broker_fee,
              buyer_logo,
              buyer_name,
              buyer_type,
              buyer_date_of_incorporation,
              buyer_address_city,
              buyer_address_street,
              buyer_address_postalcode,
              buyer_country,
              buyer_industry,
              buyer_registration_cert_attachment,
              buyer_website,
              buyer_address_refinment,
              buyer_industry_code,
              buyer_register_number,
              buyer_trading_name,
            },
          },
        } = buyer;
        setBuyerId(buyerId);
        setInvestorId(investorId);
        setBrokerId(brokerId);
        setSpvId(spvId);
        setUserId(userId);
        setIdentityId(identityId);
        setBuyer_status(buyer_status);
        setBuyer_loan_request_amount(buyer_loan_request_amount);
        setBuyer_loan_approved_amount(buyer_loan_approved_amount);
        setBuyer_loan_rate(buyer_loan_rate);
        setBuyer_loan_discount_fee(buyer_loan_discount_fee);
        setBuyer_loan_transaction_fee(buyer_loan_transaction_fee);
        setBuyer_loan_broker_fee(buyer_loan_broker_fee);
        setBuyer_logo(buyer_logo);
        setBuyer_name(buyer_name);
        setBuyer_date_of_incorporation(buyer_date_of_incorporation);
        setBuyer_type(buyer_type);
        setBuyer_address_city(buyer_address_city);
        setBuyer_address_street(buyer_address_street);
        setBuyer_address_postalcode(buyer_address_postalcode);
        setBuyer_country(buyer_country);
        setBuyer_industry(buyer_industry);
        setBuyer_registration_cert_attachment(
          buyer_registration_cert_attachment
        );
        setBuyer_website(buyer_website);
        setBuyer_address_refinment(buyer_address_refinment);
        setBuyer_industry_code(buyer_industry_code);
        setBuyer_register_number(buyer_register_number);
        setBuyer_trading_name(buyer_trading_name);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
  }, [id]);

  async function handleBuyerSubmit() {
    setBuyerSuccess(false);
    setBuyerLoading(true);
    try {
      await updateBuyer({
        id,
        investorId,
        brokerId,
        spvId,
        buyer_status,
        buyer_loan_request_amount,
        buyer_loan_approved_amount,
        buyer_loan_rate,
        buyer_loan_discount_fee,
        buyer_loan_transaction_fee,
        buyer_loan_broker_fee,
        buyer_logo,
        buyer_name,
        buyer_type,
        buyer_date_of_incorporation,
        buyer_address_city,
        buyer_address_street,
        buyer_address_postalcode,
        buyer_country,
        buyer_industry,
        buyer_registration_cert_attachment,
        buyer_website,
        buyer_address_refinment,
        buyer_industry_code,
        buyer_register_number,
        buyer_trading_name,
      });
    } catch (e) {
      onError(e);
    }
    setBuyerSuccess(true);
    setBuyerLoading(false);
    navigate(`/broker/buyer/${id}`);
  }

  useEffect(() => {
    async function getInvestors() {
      const {
        data: {
          listInvestors: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(graphqlOperation(queries.listInvestors));
      const n = { data: { listInvestors: { items: itemsPage1, nextToken } } };
      const items = n.data.listInvestors.items;
      const ids = items.map((item) => item.userId);
      setInvestorId(ids[0]);
      setInvestor(items);
    }
    getInvestors();
  }, []);

  useEffect(() => {
    async function getBrokers() {
      const {
        data: {
          listBrokers: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(graphqlOperation(queries.listBrokers));
      const n = { data: { listBrokers: { items: itemsPage1, nextToken } } };
      const items = n.data.listBrokers.items;
      const ids = items.map((item) => item.userId);
      setBroker(items);
    }
    getBrokers();
  }, []);

  useEffect(() => {
    async function getSpvs() {
      const {
        data: {
          listSpvs: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(graphqlOperation(queries.listSpvs));
      const n = { data: { listSpvs: { items: itemsPage1, nextToken } } };
      const items = n.data.listSpvs.items;
      const ids = items.map((item) => item.userId);
      setSpv(items);
    }
    getSpvs();
  }, []);

  function updateBuyer(input) {
    return API.graphql(
      graphqlOperation(mutations.updateBuyer, { input: input })
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
    <Container maxWidth={false}>
      <React.Fragment>
        <Accordion defaultExpanded={false}>
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
                    <Grid item xs={12} sm={12}>
                      <Select
                        fullWidth
                        name="buyer_status"
                        label="Obligor Status"
                        onChange={(e) => setBuyer_status(e.target.value)}
                        required
                        value={buyer_status || ""}
                        variant="outlined"
                        inputProps={{ readOnly: true }}
                      >
                        {status.map((item, index) => (
                          <MenuItem key={index} value={item.label}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company Legal Name"
                        name="buyer_name"
                        onChange={(e) => setBuyer_name(e.target.value)}
                        required
                        value={buyer_name || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company Trading Name"
                        name="buyer_trading_name"
                        onChange={(e) => setBuyer_trading_name(e.target.value)}
                        required
                        value={buyer_trading_name || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Company Website"
                        name="buyer_website"
                        onChange={(e) => setBuyer_website(e.target.value)}
                        required
                        value={buyer_website || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Desired Loan Amount"
                        name="buyer_loan_request_amount"
                        onChange={(e) =>
                          setBuyer_loan_request_amount(e.target.value)
                        }
                        required
                        value={buyer_loan_request_amount || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Discount (pa)"
                        name="buyer_loan_discount_fee"
                        onChange={(e) =>
                          setBuyer_loan_discount_fee(e.target.value)
                        }
                        required
                        value={buyer_loan_discount_fee || ""}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Transaction Fee (pa)"
                        name="buyer_loan_transaction_fee"
                        onChange={(e) =>
                          setBuyer_loan_transaction_fee(e.target.value)
                        }
                        required
                        value={buyer_loan_transaction_fee || ""}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Broker Fee (pa)"
                        name="buyer_loan_broker_fee"
                        onChange={(e) =>
                          setBuyer_loan_broker_fee(e.target.value)
                        }
                        required
                        value={buyer_loan_broker_fee || ""}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Select
                        fullWidth
                        label="Company Type"
                        name="buyer_type"
                        onChange={(e) => setBuyer_type(e.target.value)}
                        required
                        value={buyer_type || ""}
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
                        label="Company City"
                        name="buyer_address_city"
                        onChange={(e) => setBuyer_address_city(e.target.value)}
                        required
                        value={buyer_address_city || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Zipcode"
                        name="buyer_address_postalcode"
                        onChange={(e) =>
                          setBuyer_address_postalcode(e.target.value)
                        }
                        type="number"
                        value={buyer_address_postalcode || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Street"
                        name="buyer_address_street"
                        onChange={(e) =>
                          setBuyer_address_street(e.target.value)
                        }
                        required
                        value={buyer_address_street || ""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Address refinment"
                        name="buyer_address_refinment"
                        onChange={(e) =>
                          setBuyer_address_refinment(e.target.value)
                        }
                        required
                        value={buyer_address_refinment || ""}
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
                          value={buyer_date_of_incorporation || ""}
                          margin="normal"
                          variant="outlined"
                          id="date_of_incorporation"
                          label="Company Date of Incorporation"
                          name="date_of_incorporation"
                          format="dd/MM/yyyy"
                          minDate={new Date("1500/12/31")}
                          maxDate={new Date()}
                          onChange={(date) => {
                            setBuyer_date_of_incorporation(date);
                          }}
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
                      <Select
                        fullWidth
                        label="Country"
                        name="buyer_country"
                        onChange={(e) => setBuyer_country(e.target.value)}
                        required
                        value={buyer_country || ""}
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
                        onChange={(e) => setBuyer_industry(e.target.value)}
                        required
                        value={buyer_industry || ""}
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
                        label="Buyer Industry Code"
                        name="buyer_industry_code"
                        onChange={(e) => setBuyer_industry_code(e.target.value)}
                        required
                        value={buyer_industry_code || ""}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <Box display="flex" justifyContent="flex-end" p={2}>
                  <LoaderButton
                    startIcon={<UploadIcon />}
                    disabled={buyerloading}
                    success={buyersuccess}
                    loading={buyerloading}
                    onClick={handleBuyerSubmit}
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
              Company Financials
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Card maxWidth={false}>
              <CardContent>
                <FinancialsListView user={userId} buyer={buyerId} />
              </CardContent>
              <Divider />
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Link
                  to={`/broker/brokernewfinancials/${userId}/${buyerId}/${identityId}`}
                >
                  <Button>Add Financials</Button>
                </Link>
              </Box>
            </Card>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>
              Company Director List
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Card maxWidth={false}>
              <CardContent>
                <DirectorListView user={userId} buyer={buyerId} />
              </CardContent>
              <Divider />
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Link to={`/broker/brokernewbuyerdirector/${id}`}>
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
            <Card maxWidth={false}>
              <CardContent>
                <UboListView user={userId} buyer={buyerId} />
              </CardContent>
              <Divider />
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Link to={`/broker/brokernewbuyerubo/${id}`}>
                  <Button>Add Owner</Button>
                </Link>
              </Box>
            </Card>
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    </Container>
  );
};

BuyerForm.propTypes = {
  className: PropTypes.string,
};

export default BuyerForm;
