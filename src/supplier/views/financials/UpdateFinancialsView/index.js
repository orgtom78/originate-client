import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "date-fns";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
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
import * as queries from "src/graphql/queries.js";
import LoaderButton from "src/components/LoaderButton.js";
import { green } from "@material-ui/core/colors";
import { useUser } from "src/components/context/usercontext.js";
import { Storage } from "aws-amplify";

const useStyles = makeStyles((theme) => ({
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

const SupplierFinancials = ({ className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [supplierId, setSupplierId] = useState("");
  const [financialsId, setFinancialsId] = useState("");
  const [balance_sheet_attachment, setBalance_sheet_attachment] = useState("");
  const [
    income_statement_attachment,
    setIncome_statement_attachment,
  ] = useState("");
  const [ebit, setEbit] = useState("");
  const [net_profit, setNet_profit] = useState("");
  const [
    financials_reporting_period,
    setFinancials_reporting_period,
  ] = useState("");
  const [sales, setSales] = useState("");
  const [total_assets, setTotal_assets] = useState("");
  const [retained_earnings, setRetained_earnings] = useState("");
  const [working_capital, setWorking_capital] = useState("");

  const [sub, setSub] = useState("");
  const context = useUser();

  const file = useRef(null);

  const balancelabel = "balance_sheet_attachment";
  const balancename = "Balance Sheet";
  const incomelabel = "income_statement_attachment";
  const incomename = "Income statement";

  const [balanceimg, setBalanceimg] = useState("");
  const [balancepdf, setBalancepdf] = useState("");
  const [incomeimg, setIncomeimg] = useState("");
  const [incomepdf, setIncomepdf] = useState("");

  const [financialsloading, setFinancialsLoading] = useState(false);
  const [financialssuccess, setFinancialsSuccess] = useState(false);
  const [balanceloading, setBalanceloading] = useState(false);
  const [balancesuccess, setBalancesuccess] = useState(false);
  const [incomeloading, setIncomeloading] = useState(false);
  const [incomesuccess, setIncomesuccess] = useState(false);

  useEffect(() => {
    // attempt to fetch the info of the user that was already logged in
    async function onLoad() {
      const data = await context;
      const { sub, supplierId } = data;
      setSub(sub);
      setSupplierId(supplierId);
    }
    onLoad();
    loadFinancials(sub);
  }, [context, sub]);

  async function loadFinancials(input) {
    const id = input;
    let filter = {
      userId: { eq: id },
      sortkey: { contains: "financials-supplier" },
    };
    try {
      const {
        data: {
          listsFinancials: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listsFinancials, { filter: filter })
      );
      const o = { data: { listsFinancials: { items: itemsPage1, nextToken } } };
      const finance = await o.data.listsFinancials.items[0];
      const {
        financialsId,
        ebit,
        balance_sheet_attachment,
        income_statement_attachment,
        net_profit,
        financials_reporting_period,
        sales,
        total_assets,
        retained_earnings,
        working_capital,
      } = finance;
      setFinancialsId(financialsId);
      setEbit(ebit);
      setBalance_sheet_attachment(balance_sheet_attachment);
      setIncome_statement_attachment(income_statement_attachment);
      setNet_profit(net_profit);
      setFinancials_reporting_period(financials_reporting_period);
      setSales(sales);
      setTotal_assets(total_assets);
      setRetained_earnings(retained_earnings);
      setWorking_capital(working_capital);
    } catch (err) {
      console.log("error fetching data..", err);
    }
  }

  async function s3Up(file, name) {
    var fileExtension = file.name.split(".").pop();
    const filename = `${sub}${supplierId}${name}.${fileExtension}`;

    const stored = await Storage.vault.put(filename, file, {
      contentType: file.type,
    });
    return stored.key;
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
        ebit,
        balance_sheet_attachment,
        income_statement_attachment,
        net_profit,
        financials_reporting_period,
        sales,
        total_assets,
        retained_earnings,
        working_capital,
      });
    } catch (e) {
      onError(e);
    }
    setFinancialsSuccess(true);
    setFinancialsLoading(false);
    navigate("/app/account");
  }

  function updateFinancials(input) {
    return API.graphql(
      graphqlOperation(mutations.updateFinancials, { input: input })
    );
  }

  useEffect(() => {
    if (balance_sheet_attachment) {
      async function getbalanceimgurl() {
        var uploadext = balance_sheet_attachment.split(".").pop();
        var imageExtensions = [
          "jpg",
          "jpeg",
          "bmp",
          "gif",
          "png",
          "tiff",
          "eps",
          "svg",
        ];
        var x = imageExtensions.includes(uploadext);
        if (x === true) {
          var y = await Storage.vault.get(balance_sheet_attachment);
          setBalanceimg(y);
        }
      }
      getbalanceimgurl();
    }
  }, [balance_sheet_attachment]);

  useEffect(() => {
    if (balance_sheet_attachment) {
      async function getbankidpdfurl() {
        var uploadext = balance_sheet_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        var x = imageExtensions.includes(uploadext);
        if (x === true) {
          var y = await Storage.vault.get(balance_sheet_attachment);
          setBalancepdf(y);
        }
      }
      getbankidpdfurl();
    }
  }, [balance_sheet_attachment]);

  function balanceisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(balanceimg)) {
      return (
        <>
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <img className={classes.img} alt="complex" src={balanceimg} />
                <div>
                  <input
                    id={balanceimg}
                    accept="image/*,application/pdf"
                    style={{ display: "none" }}
                    type="file"
                    onChange={(event) => handlebalanceChange(event)}
                  />
                  <label htmlFor={balanceimg}>
                    <LoaderButton
                      id={balanceimg}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={balanceloading}
                      success={balancesuccess}
                      loading={balanceloading}
                    >
                      {" "}
                      Update File
                    </LoaderButton>
                  </label>
                </div>
              </Grid>
            </Grid>
          </Box>
        </>
      );
    } else if (regex.test(balancepdf)) {
      return (
        <>
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <iframe
                  title="file"
                  style={{ width: "100%", height: "100%" }}
                  allowFullScreen
                  src={balancepdf}
                />
                <div>
                  <input
                    id={balancepdf}
                    accept="image/*,application/pdf"
                    style={{ display: "none" }}
                    type="file"
                    onChange={(event) => handlebalanceChange(event)}
                  />
                  <label htmlFor={balancepdf}>
                    <LoaderButton
                      id={balancepdf}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={balanceloading}
                      success={balancesuccess}
                      loading={balanceloading}
                    >
                      {" "}
                      Update File
                    </LoaderButton>
                  </label>
                </div>
              </Grid>
            </Grid>
          </Box>
        </>
      );
    } else {
      return (
        <>
          <input
            name={label}
            id={label}
            accept="image/*,application/pdf"
            style={{ display: "none" }}
            type="file"
            onChange={(event) => handlebalanceChange(event)}
          />
          <label htmlFor={label}>
            <LoaderButton
              id={label}
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={balanceloading}
              success={balancesuccess}
              loading={balanceloading}
            >
              {" "}
              {name}
            </LoaderButton>
          </label>
        </>
      );
    }
  }

  function handlebalanceChange(event) {
    file.current = event.target.files[0];
    const newbalancefile = file.current;
    onbalanceChange(newbalancefile);
  }

  async function onbalanceChange(newfile) {
    setBalancesuccess(false);
    setBalanceloading(true);
    try {
      const u = newfile
        ? await s3Up(newfile, "balance_sheet_attachment")
        : null;
      var balance_sheet_attachment = u;
      const sortkey = financialsId;
      const userId = sub;
      await updateFinancials({
        sortkey,
        userId,
        balance_sheet_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setBalancesuccess(true);
    setBalanceloading(false);
    navigate("/app/account");
  }

  useEffect(() => {
    if (income_statement_attachment) {
      async function getincomeimgurl() {
        var uploadext = income_statement_attachment.split(".").pop();
        var imageExtensions = [
          "jpg",
          "jpeg",
          "bmp",
          "gif",
          "png",
          "tiff",
          "eps",
          "svg",
        ];
        var x = imageExtensions.includes(uploadext);
        if (x === true) {
          var y = await Storage.vault.get(income_statement_attachment);
          setIncomeimg(y);
        }
      }
      getincomeimgurl();
    }
  }, [income_statement_attachment]);

  useEffect(() => {
    if (income_statement_attachment) {
      async function getbankidpdfurl() {
        var uploadext = income_statement_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        var x = imageExtensions.includes(uploadext);
        if (x === true) {
          var y = await Storage.vault.get(income_statement_attachment);
          setIncomepdf(y);
        }
      }
      getbankidpdfurl();
    }
  }, [income_statement_attachment]);

  function incomeisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(incomeimg)) {
      return (
        <>
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <img className={classes.img} alt="complex" src={incomeimg} />
                <div>
                  <input
                    id={incomeimg}
                    accept="image/*,application/pdf"
                    style={{ display: "none" }}
                    type="file"
                    onChange={(event) => handleincomeChange(event)}
                  />
                  <label htmlFor={incomeimg}>
                    <LoaderButton
                      id={incomeimg}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={incomeloading}
                      success={incomesuccess}
                      loading={incomeloading}
                    >
                      {" "}
                      Update File
                    </LoaderButton>
                  </label>
                </div>
              </Grid>
            </Grid>
          </Box>
        </>
      );
    } else if (regex.test(incomepdf)) {
      return (
        <>
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <iframe
                  title="file"
                  style={{ width: "100%", height: "100%" }}
                  allowFullScreen
                  src={incomepdf}
                />
                <div>
                  <input
                    id={incomepdf}
                    accept="image/*,application/pdf"
                    style={{ display: "none" }}
                    type="file"
                    onChange={(event) => handleincomeChange(event)}
                  />
                  <label htmlFor={incomepdf}>
                    <LoaderButton
                      id={incomepdf}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={incomeloading}
                      success={incomesuccess}
                      loading={incomeloading}
                    >
                      {" "}
                      Update File
                    </LoaderButton>
                  </label>
                </div>
              </Grid>
            </Grid>
          </Box>
        </>
      );
    } else {
      return (
        <>
          <input
            name={label}
            id={label}
            accept="image/*,application/pdf"
            style={{ display: "none" }}
            type="file"
            onChange={(event) => handleincomeChange(event)}
          />
          <label htmlFor={label}>
            <LoaderButton
              id={label}
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={incomeloading}
              success={incomesuccess}
              loading={incomeloading}
            >
              {" "}
              {name}
            </LoaderButton>
          </label>
        </>
      );
    }
  }

  function handleincomeChange(event) {
    file.current = event.target.files[0];
    const newincomefile = file.current;
    onincomeChange(newincomefile);
  }

  async function onincomeChange(newfile) {
    setIncomesuccess(false);
    setIncomeloading(true);
    try {
      const u = newfile
        ? await s3Up(newfile, "income_statement_attachment")
        : null;
      var income_statement_attachment = u;
      const sortkey = financialsId;
      const userId = sub;
      await updateFinancials({
        sortkey,
        userId,
        income_statement_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setIncomesuccess(true);
    setIncomeloading(false);
    navigate("/app/account");
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
    <React.Fragment>
      <Container>
        <form
          autoComplete="off"
          noValidate
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around" item md={12} xs={12}>
                    <KeyboardDatePicker
                      fullWidth
                      value={financials_reporting_period || ""}
                      margin="normal"
                      variant="outlined"
                      id="financials_reporting_period"
                      label="Reporting Period"
                      name="financials_reporting_period"
                      format="yyyy"
                      views={["year"]}
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
                    label="Earnings Before Interest and Tax"
                    name="ebit"
                    onChange={(e) => setEbit(e.target.value)}
                    required
                    value={ebit || ""}
                    variant="outlined"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Net Profit"
                    name="net_profit"
                    onChange={(e) => setNet_profit(e.target.value)}
                    required
                    value={net_profit || ""}
                    variant="outlined"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
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
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
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
                    label="Working Capital"
                    name="working_capital"
                    onChange={(e) => setWorking_capital(e.target.value)}
                    required
                    value={working_capital || ""}
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
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <>
                <Typography>Balance Sheet:</Typography>
                {balanceisimageorpdf(balancelabel, balancename)}
              </>
            </Grid>
          </Grid>
        </Box>
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <>
                <Typography>Income Statement:</Typography>
                {incomeisimageorpdf(incomelabel, incomename)}
              </>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
};

SupplierFinancials.propTypes = {
  className: PropTypes.string,
};

export default SupplierFinancials;
