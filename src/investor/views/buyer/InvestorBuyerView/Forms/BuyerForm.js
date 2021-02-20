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
  Divider,
  Grid,
  TextField,
  Typography,
  Select,
  makeStyles,
  MenuItem,
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
import DirectorListView from "src/admin/views/buyer/AdminBuyerView/Lists/directorlist.js";
import UboListView from "src/admin/views/buyer/AdminBuyerView/Lists/ubolist.js";
import FinancialsListView from "src/investor/views/buyer/InvestorBuyerView/Lists/financialslist.js";
import * as queries from "src/graphql/queries.js";
import AWS from "aws-sdk";
import config from "src/admin/views/user/AdminNewUserGroupView/node_modules/src/config.js.js";
import countries from "src/components/FormLists/countries.js";
import industries from "src/components/FormLists/industries.js";

const cr = countries;
const indust = industries;

AWS.config.update({
  accessKeyId: config.AWS.ID,
  secretAccessKey: config.AWS.KEY,
  region: config.AWS.REGION,
});

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
    value: "Approved",
    label: "Approved",
  },
];

const BuyerForm = ({ className, value, ...rest }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();
  const { buyId } = useParams();
  const { ident } = useParams();

  const [userId, setUserId] = useState("");
  const [buyerId, setBuyerId] = useState("");
  const [identityId, setIdentityId] = useState("");
  const [investorId, setInvestorId] = useState("");
  const [buyer_status, setBuyer_status] = useState("");
  const [buyer_logo, setBuyer_logo] = useState("");
  const [buyer_name, setBuyer_name] = useState("");
  const [buyer_type, setBuyer_type] = useState("");
  const [
    buyer_date_of_incorporation,
    setBuyer_date_of_incorporation,
  ] = useState("");
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
    const userId = id;
    const sortkey = buyId;
    setBuyerId(sortkey);
    getBuyer({ userId, sortkey });
    async function getBuyer(input) {
      try {
        const buyer = await API.graphql(
          graphqlOperation(queries.getBuyer, input)
        );
        const {
          data: {
            getBuyer: {
              userId,
              buyerId,
              investorId,
              identityId,
              buyer_status,
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
        setUserId(userId);
        setBuyerId(buyerId);
        setInvestorId(investorId);
        setIdentityId(identityId);
        setBuyer_status(buyer_status);
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
  }, [id, buyId]);

  async function handleBuyerSubmit() {
    setBuyerSuccess(false);
    setBuyerLoading(true);
    try {
      const userId = id;
      const sortkey = buyId;
      await updateBuyer({
        userId,
        sortkey,
        investorId,
        buyer_status,
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
    navigate("/admin/buyers");
  }

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
                    <Grid item xs={12} sm={12}>
                      <Select
                        fullWidth
                        name="buyer_status"
                        label="Obligor Status"
                        onChange={(e) => setBuyer_status(e.target.value)}
                        required
                        value={buyer_status || ""}
                        variant="outlined"
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
                        label="Investor ID"
                        name="investorId"
                        onChange={(e) => setInvestorId(e.target.value)}
                        required
                        value={investorId || ""}
                        variant="outlined"
                      />
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
                        label="Company Registration Number"
                        name="buyer_register_number"
                        onChange={(e) =>
                          setBuyer_register_number(e.target.value)
                        }
                        required
                        value={buyer_register_number || ""}
                        variant="outlined"
                      />
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
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>

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
            <Card>
              <CardContent>
                <FinancialsListView value={value} />
              </CardContent>
              <Divider />
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Link to={`/admin/adminnewfinancials/${id}/${buyId}/${ident}`}>
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
            <Card>
              <CardContent>
                <DirectorListView value={value} />
              </CardContent>
              <Divider />
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Link to={`/admin/adminnewbuyerdirector/${id}`}>
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
                <UboListView value={value} />
              </CardContent>
              <Divider />
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Link to={`/admin/adminnewbuyerubo/${id}`}>
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
