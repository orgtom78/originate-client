import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { useUser } from "src/components/context/usercontext.js";
import DirectorListView from "src/supplier/views/account/SupplierView/Lists/directorlist.js";
import UboListView from "src/supplier/views/account/SupplierView/Lists/ubolist.js";
import UpdateBankView from "src/supplier/views/bank/UpdateBankView";
import UpdateFinancialsView from "src/supplier/views/financials/UpdateFinancialsView/index.js";
import countries from "src/components/FormLists/countries.js";

const cr = countries;
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

const SupplierForm = ({ className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
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
  const [supplier_address_number, setSupplier_address_number] = useState("");
  const [
    supplier_address_postalcode,
    setSupplier_address_postalcode,
  ] = useState("");
  const [supplier_country, setSupplier_country] = useState("");
  const [supplier_industry, setSupplier_industry] = useState("");

  const [sub, setSub] = useState("");
  const context = useUser();

  const [supplierloading, setSupplierLoading] = useState(false);
  const [suppliersuccess, setSupplierSuccess] = useState(false);

  useEffect(() => {
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
        supplier_address_number,
        supplier_address_postalcode,
        supplier_country,
        supplier_industry,
      } = data;
      setSub(sub);
      setSupplierId(supplierId);
      setSupplier_logo(supplier_logo);
      setSupplier_name(supplier_name);
      setSupplier_date_of_incorporation(supplier_date_of_incorporation);
      setSupplier_type(supplier_type);
      setSupplier_address_city(supplier_address_city);
      setSupplier_address_street(supplier_address_street);
      setSupplier_address_number(supplier_address_number);
      setSupplier_address_postalcode(supplier_address_postalcode);
      setSupplier_country(supplier_country);
      setSupplier_industry(supplier_industry);
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
        supplier_address_street,
        supplier_address_number,
        supplier_address_city,
        supplier_address_postalcode,
        supplier_date_of_incorporation,
        supplier_country,
        supplier_industry,
      });
    } catch (e) {
      onError(e);
    }
    setSupplierSuccess(true);
    setSupplierLoading(false);
    navigate("/app/account");
  }

  function updateSupplier(input) {
    return API.graphql(
      graphqlOperation(mutations.updateSupplier, { input: input })
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
                        label="Street Number"
                        name="supplier_address_number"
                        onChange={(e) =>
                          setSupplier_address_number(e.target.value)
                        }
                        required
                        value={supplier_address_number || ""}
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
                <DirectorListView />
              </CardContent>
              <Divider />
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Button href={`/app/newsupplierdirector/${supplierId}`}>
                  Add Director
                </Button>
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
                <UboListView />
              </CardContent>
              <Divider />
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Button href={`/app/newsupplierubo/${supplierId}`}>
                  Add Owner
                </Button>
              </Box>
            </Card>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>
              Company Bank Account
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <UpdateBankView />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>
              Company Financials
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <UpdateFinancialsView />
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
