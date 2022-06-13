import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";
import {
  Box,
  Card,
  CardContent,
  Container,
  colors,
  Divider,
  Grid,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { onError } from "src/libs/errorLib.js";
import Page from "src/components/Page";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import moment from "moment";
import * as mutations from "src/graphql/mutations.js";
import LoaderButton from "src/components/LoaderButton.js";
import { UploadCloud as UploadIcon } from "react-feather";
import { Storage } from "aws-amplify";
import { green } from "@mui/material/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
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
  table: {
    minWidth: 650,
  },
  tableRow: {
    backgroundColor: colors.teal[400],
  },
  tableRow2: {
    backgroundColor: colors.teal[200],
  },
}));

const UpdateFinancialsForm = ({ className, value, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();

  const [userId, setUserId] = useState("");
  const [buyerId, setBuyerId] = useState("");
  const [identityId, setIdentityId] = useState("");

  const [financialsId, setFinancialsId] = useState("");
  const [financials_attachment, setFinancials_attachment] = useState("");
  const [balance_sheet_attachment, setBalance_sheet_attachment] = useState("");
  const [
    income_statement_attachment,
    setIncome_statement_attachment,
  ] = useState("");
  const [current_assets, setCurrent_assets] = useState("");
  const [cash_flow, setCash_flow] = useState("");
  const [current_long_term_debt, setCurrent_long_term_debt] = useState("");
  const [current_liabilities, setCurrent_liabilities] = useState("");
  const [gross_margin, setGross_margin] = useState("");
  const [operating_income, setOperating_income] = useState("");
  const [other_expenses, setOther_expenses] = useState("");
  const [ebt, setEbt] = useState("");
  //const [ebitda, setEbitda] = useState("");
  //const [current_ratio, setCurrent_ratio] = useState("");
  //const [debt_equity_ratio, setDebt_equity_ratio] = useState("");
  //const [debt_ebitda_ratio, setDebt_ebitda_ratio] = useState("");
  const [inventory_turnover, setInventory_turnover] = useState("");
  const [interest_coverage, setInterest_coverage] = useState("");
  const [income_tax_expense, setIncome_tax_expense] = useState("");
  const [
    total_liabilities_and_equity,
    setTotal_liabilities_and_equity,
  ] = useState("");
  const [marketable_securities, setMarketable_securities] = useState("");
  const [accounts_receivable, setAccounts_receivable] = useState("");
  const [inventory, setInventory] = useState("");
  const [goodwill, setGoodwill] = useState("");
  const [other_current_assets, setOther_current_assets] = useState("");
  const [other_non_current_assets, setOther_non_current_assets] = useState("");
  const [accumulated_depreciation, setAccumulated_depreciation] = useState("");
  const [accured_expenses, setAccured_expenses] = useState("");
  const [unearned_revenue, setUnearned_revenue] = useState("");
  const [long_term_debt, setLong_term_debt] = useState("");
  const [other_current_liabilities, setOther_current_liabilities] = useState(
    ""
  );
  const [
    other_long_term_liabilities,
    setOther_long_term_liabilities,
  ] = useState("");
  const [income_tax_payable, setIncome_tax_payable] = useState("");
  const [dividends_payable, setDividends_payable] = useState("");
  const [total_liabilities, setTotal_liabilities] = useState("");
  const [common_stock, setCommon_stock] = useState("");
  const [preferred_stock, setPreferred_stock] = useState("");
  const [paid_in_capital, setPaid_in_capital] = useState("");
  const [retained_earnings, setRetained_earnings] = useState("");
  const [total_equity, setTotal_equity] = useState("");
  const [equity_book_value, setEquity_book_value] = useState("");
  const [equity_market_value, setEquity_market_value] = useState("");
  const [sales, setSales] = useState("");
  const [cost_of_goods_sold, setCost_of_goods_sold] = useState("");
  const [operating_expenses, setOperating_expenses] = useState("");
  const [marketing_expenses, setMarketing_expenses] = useState("");
  const [bad_debt_expenses, setBad_debt_expenses] = useState("");
  const [ebit, setEbit] = useState("");
  const [interest_expenses, setInterest_expenses] = useState("");
  const [depreciation_expenses, setDepreciation_expenses] = useState("");
  const [
    sale_purchase_of_fixed_asset,
    setSale_purchase_of_fixed_asset,
  ] = useState("");
  const [extraordinary_income, setExtraordinary_income] = useState("");
  const [tax_expenses, setTax_expenses] = useState("");
  const [net_profit, setNet_profit] = useState("");
  const [financials_rating, setFinancials_rating] = useState("");
  const [working_capital, setWorking_capital] = useState("");
  const [
    financials_reporting_period,
    setFinancials_reporting_period,
  ] = useState("");
  const [total_assets, setTotal_assets] = useState("");
  const [accounts_payable, setAccounts_payable] = useState("");
  const [cash, setCash] = useState("");
  const [short_term_debt, setShort_term_debt] = useState("");

  const [financialsloading, setFinancialsLoading] = useState(false);
  const [financialssuccess, setFinancialsSuccess] = useState(false);

  const [balanceloading, setBalanceLoading] = useState(false);
  const [balancesuccess, setBalanceSuccess] = useState(false);
  const [incomeloading, setIncomeLoading] = useState(false);
  const [incomesuccess, setIncomeSuccess] = useState(false);

  const [balanceimg, setBalanceImg] = useState("");
  const [balancepdf, setBalancepdf] = useState("");
  const [incomeimg, setIncomeImg] = useState("");
  const [incomepdf, setIncomepdf] = useState("");

  const [sheet, setSheet] = useState("");
  const [income, setIncome] = useState("");

  const file = useRef(null);

  const balancelabel = "balance_sheet_attachment";
  const balancename = "Balance Sheet";
  const incomelabel = "income_statement_attachment";
  const incomename = "Income Statement";

  useEffect(() => {
    getFinancials({ id });
  }, [id]);

  async function getFinancials(input) {
    try {
      const financials = await API.graphql(
        graphqlOperation(queries.getFinancials, input)
      );
      const {
        data: {
          getFinancials: {
            userId,
            buyerId,
            identityId,
            financialsId,
            financials_attachment,
            balance_sheet_attachment,
            income_statement_attachment,
            current_assets,
            cash_flow,
            current_long_term_debt,
            current_liabilities,
            gross_margin,
            operating_income,
            other_expenses,
            ebt,
            inventory_turnover,
            interest_coverage,
            income_tax_expense,
            total_liabilities_and_equity,
            marketable_securities,
            accounts_receivable,
            inventory,
            goodwill,
            other_current_assets,
            other_non_current_assets,
            accumulated_depreciation,
            total_assets,
            short_term_debt,
            accounts_payable,
            accured_expenses,
            unearned_revenue,
            long_term_debt,
            other_current_liabilities,
            other_long_term_liabilities,
            income_tax_payable,
            dividends_payable,
            total_liabilities,
            common_stock,
            preferred_stock,
            paid_in_capital,
            retained_earnings,
            total_equity,
            equity_book_value,
            equity_market_value,
            sales,
            cost_of_goods_sold,
            operating_expenses,
            marketing_expenses,
            bad_debt_expenses,
            ebit,
            interest_expenses,
            depreciation_expenses,
            sale_purchase_of_fixed_asset,
            extraordinary_income,
            tax_expenses,
            net_profit,
            financials_rating,
            financials_reporting_period,
            cash,
            working_capital,
          },
        },
      } = financials;
      setUserId(userId);
      setBuyerId(buyerId);
      setIdentityId(identityId);
      setFinancialsId(financialsId);
      setFinancials_attachment(financials_attachment);
      setBalance_sheet_attachment(balance_sheet_attachment);
      setIncome_statement_attachment(income_statement_attachment);
      setCurrent_assets(current_assets);
      setCash_flow(cash_flow);
      setCurrent_long_term_debt(current_long_term_debt);
      setCurrent_liabilities(current_liabilities);
      setGross_margin(gross_margin);
      setOperating_income(operating_income);
      setOther_expenses(other_expenses);
      setEbt(ebt);
      //setEbitda(ebitda);
      //setCurrent_ratio(current_ratio);
      //setDebt_equity_ratio(debt_equity_ratio);
      //setDebt_ebitda_ratio(debt_ebitda_ratio);
      setInventory_turnover(inventory_turnover);
      setInterest_coverage(interest_coverage);
      setIncome_tax_expense(income_tax_expense);
      setTotal_liabilities_and_equity(total_liabilities_and_equity);
      setMarketable_securities(marketable_securities);
      setAccounts_receivable(accounts_receivable);
      setInventory(inventory);
      setGoodwill(goodwill);
      setOther_current_assets(other_current_assets);
      setOther_non_current_assets(other_non_current_assets);
      setAccumulated_depreciation(accumulated_depreciation);
      setTotal_assets(total_assets);
      setShort_term_debt(short_term_debt);
      setAccounts_payable(accounts_payable);
      setAccured_expenses(accured_expenses);
      setUnearned_revenue(unearned_revenue);
      setLong_term_debt(long_term_debt);
      setOther_current_liabilities(other_current_liabilities);
      setOther_long_term_liabilities(other_long_term_liabilities);
      setIncome_tax_payable(income_tax_payable);
      setDividends_payable(dividends_payable);
      setTotal_liabilities(total_liabilities);
      setCommon_stock(common_stock);
      setPreferred_stock(preferred_stock);
      setPaid_in_capital(paid_in_capital);
      setRetained_earnings(retained_earnings);
      setTotal_equity(total_equity);
      setEquity_book_value(equity_book_value);
      setEquity_market_value(equity_market_value);
      setSales(sales);
      setCost_of_goods_sold(cost_of_goods_sold);
      setOperating_expenses(operating_expenses);
      setMarketing_expenses(marketing_expenses);
      setBad_debt_expenses(bad_debt_expenses);
      setEbit(ebit);
      setInterest_expenses(interest_expenses);
      setDepreciation_expenses(depreciation_expenses);
      setSale_purchase_of_fixed_asset(sale_purchase_of_fixed_asset);
      setExtraordinary_income(extraordinary_income);
      setTax_expenses(tax_expenses);
      setNet_profit(net_profit);
      setFinancials_rating(financials_rating);
      setFinancials_reporting_period(financials_reporting_period);
      setCash(cash);
      setWorking_capital(working_capital);
    } catch (err) {
      console.log("error fetching data..", err);
    }
  }

  async function handleFinancialsSubmit() {
    setFinancialsSuccess(false);
    setFinancialsLoading(true);
    const ca =
      Number(cash) +
      Number(accounts_receivable) +
      Number(inventory) +
      Number(other_current_assets);
    const current_assets = Number(ca);
    const ta =
      current_assets +
      Number(sale_purchase_of_fixed_asset) +
      Number(goodwill) +
      Number(other_non_current_assets);
    const total_assets = Number(ta);
    const cl =
      Number(accounts_payable) +
      Number(current_long_term_debt) +
      Number(other_current_liabilities);
    const current_liabilities = Number(cl);
    const ll = Number(long_term_debt) + Number(other_long_term_liabilities);
    const total_liabilities = Number(ll) + Number(current_liabilities);
    const total_liabilities_and_equity =
      Number(total_equity) + Number(total_liabilities);

    const gm = Number(sales) - Number(cost_of_goods_sold);
    const gross_margin = Number(gm);
    const oi =
      Number(gross_margin) -
      Number(depreciation_expenses) -
      Number(operating_expenses);
    const operating_income = Number(oi);
    const ebt =
      Number(operating_income) -
      Number(interest_expenses) -
      Number(other_expenses);
    const ebit = Number(ebt) - Number(income_tax_expense);
    const net_profit = Number(ebit) - Number(extraordinary_income);

    const ebitda =
      Number(depreciation_expenses) +
      Number(interest_expenses) +
      Number(income_tax_expense) +
      Number(net_profit);
    const current_ratio = Number(current_assets) / Number(current_liabilities);
    const debt_equity_ratio =
      (Number(long_term_debt) + Number(current_long_term_debt)) /
      Number(total_equity);
    const debt_ebitda_ratio =
      (Number(long_term_debt) + Number(current_long_term_debt)) /
      Number(ebitda);

    try {
      await updateFinancials({
        id,
        userId,
        buyerId,
        financials_attachment,
        balance_sheet_attachment,
        income_statement_attachment,
        current_assets,
        cash_flow,
        current_long_term_debt,
        current_liabilities,
        gross_margin,
        operating_income,
        other_expenses,
        ebt,
        ebitda,
        current_ratio,
        debt_equity_ratio,
        debt_ebitda_ratio,
        inventory_turnover,
        interest_coverage,
        income_tax_expense,
        total_liabilities_and_equity,
        marketable_securities,
        accounts_receivable,
        inventory,
        goodwill,
        other_current_assets,
        other_non_current_assets,
        accumulated_depreciation,
        total_assets,
        short_term_debt,
        accounts_payable,
        accured_expenses,
        unearned_revenue,
        long_term_debt,
        other_current_liabilities,
        other_long_term_liabilities,
        income_tax_payable,
        dividends_payable,
        total_liabilities,
        common_stock,
        preferred_stock,
        paid_in_capital,
        retained_earnings,
        total_equity,
        equity_book_value,
        equity_market_value,
        sales,
        cost_of_goods_sold,
        operating_expenses,
        marketing_expenses,
        bad_debt_expenses,
        ebit,
        interest_expenses,
        depreciation_expenses,
        sale_purchase_of_fixed_asset,
        extraordinary_income,
        tax_expenses,
        net_profit,
        financials_rating,
        financials_reporting_period,
        cash,
        working_capital,
      });
    } catch (e) {
      onError(e);
    }
    setFinancialsSuccess(true);
    setFinancialsLoading(false);
    navigate("/broker/dashboard");
  }

  function updateFinancials(input) {
    return API.graphql(
      graphqlOperation(mutations.updateFinancials, { input: input })
    );
  }

  async function s3Up(file, name) {
    var fileExtension = file.name.split(".").pop();
    const filename = `${userId}${financialsId}${name}.${fileExtension}`;

    const stored = await Storage.put(filename, file, {
      level: "private",
      identityId: identityId,
      contentType: file.type,
    });
    return stored.key;
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
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.get(balance_sheet_attachment, {
            level: "private",
            identityId: identityId,
          });
          setBalanceImg(y);
        }
      }
      getbalanceimgurl();
    }
  }, [balance_sheet_attachment, identityId]);

  useEffect(() => {
    if (balance_sheet_attachment) {
      async function getbalancepdfurl() {
        var uploadext = balance_sheet_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.get(balance_sheet_attachment, {
            level: "private",
            identityId: identityId,
          });
          setBalancepdf(y);
        }
      }
      getbalancepdfurl();
    }
  }, [balance_sheet_attachment, identityId]);

  function balanceisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(balanceimg)) {
      return (
        <>
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
        </>
      );
    } else if (regex.test(balancepdf)) {
      return (
        <>
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
        </>
      );
    } else {
      return (
        <>
          <Grid item md={12} xs={12}>
            <input
              name={balancename}
              id={balancelabel}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handlebalanceChange(event)}
            />
            <label htmlFor={balancelabel}>
              <LoaderButton
                id={balancelabel}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={balanceloading}
                success={balancesuccess}
                loading={balanceloading}
              >
                {" "}
                {balancename}
              </LoaderButton>
            </label>
          </Grid>
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
    setBalanceSuccess(false);
    setBalanceLoading(true);
    try {
      const u = newfile
        ? await s3Up(newfile, "balance_sheet_attachment")
        : null;
      var balance_sheet_attachment = u;
      await updateFinancials({
        id,
        balance_sheet_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setBalanceSuccess(true);
    setBalanceLoading(false);
    navigate("/broker/dashboard");
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
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.get(income_statement_attachment, {
            level: "private",
            identityId: identityId,
          });
          setIncomeImg(y);
        }
      }
      getincomeimgurl();
    }
  }, [income_statement_attachment, identityId]);

  useEffect(() => {
    if (income_statement_attachment) {
      async function getincomepdfurl() {
        var uploadext = income_statement_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.get(income_statement_attachment, {
            level: "private",
            identityId: identityId,
          });
          setIncomepdf(y);
        }
      }
      getincomepdfurl();
    }
  }, [income_statement_attachment, identityId]);

  function incomeisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(incomeimg)) {
      return (
        <>
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
        </>
      );
    } else if (regex.test(incomepdf)) {
      return (
        <>
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
        </>
      );
    } else {
      return (
        <>
          <Grid item md={12} xs={12}>
            <input
              name={incomename}
              id={incomelabel}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handleincomeChange(event)}
            />
            <label htmlFor={incomelabel}>
              <LoaderButton
                id={incomelabel}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={incomeloading}
                success={incomesuccess}
                loading={incomeloading}
              >
                {" "}
                {incomename}
              </LoaderButton>
            </label>
          </Grid>
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
    setIncomeSuccess(false);
    setIncomeLoading(true);
    try {
      const u = newfile
        ? await s3Up(newfile, "income_statement_attachment")
        : null;
      var income_statement_attachment = u;
      await updateFinancials({
        id,
        income_statement_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setIncomeSuccess(true);
    setIncomeLoading(false);
    navigate("/broker/dashboard");
  }

  useEffect(() => {
    if (balance_sheet_attachment) {
      async function getjson() {
        const y = await Storage.get(
          `${userId}${financialsId}${buyerId}balance_sheet_attachment.json`,
          {
            level: "private",
            identityId: identityId,
            download: true,
          }
        );
        const s = await new Response(y.Body).json();
        if (s) {
          const t = s.Blocks.map((item) => item.Text);
          setSheet(t);
        }
      }
      getjson();
    }
  }, [userId, financialsId, balance_sheet_attachment, buyerId, identityId]);

  useEffect(() => {
    if (income_statement_attachment) {
      async function getjson() {
        const y = await Storage.get(
          `${userId}${financialsId}${buyerId}income_statement_attachment.json`,
          {
            level: "private",
            identityId: identityId,
            download: true,
          }
        );
        const s = await new Response(y.Body).json();
        if (s) {
          const t = s.Blocks.map((item) => item.Text);
          setIncome(t);
        } else {
          return;
        }
      }
      getjson();
    }
  }, [userId, financialsId, income_statement_attachment, buyerId, identityId]);

  return (
    <Page title="Update Financials">
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
                <Grid item md={6} xs={12}>
                  <>
                    <Typography>Balance Sheet:</Typography>
                    {balanceisimageorpdf(balancelabel, balancename)}
                  </>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                  style={{ width: "100%", maxWidth: 500, overflow: "auto" }}
                >
                  <Typography>Balance Sheet Text:</Typography>
                  <Typography>{sheet}</Typography>
                </Grid>
                <Divider></Divider>
                <Grid item md={12} xs={12}>
                  <TableContainer component={Paper}>
                    <Table
                      className={classes.table}
                      size="small"
                      aria-label="Balance Sheet Table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell align="left">
                            <Box fontWeight="fontWeightBold">
                              {moment(financials_reporting_period).format(
                                "YYYY"
                              )}
                            </Box>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow className={classes.tableRow}>
                          <TableCell component="th" scope="row">
                            Mandatory Fields
                          </TableCell>
                          <TableCell component="th" scope="row"></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Cash
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) => setCash(e.target.value)}
                              required
                              value={cash || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Accounts Receivable
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setAccounts_receivable(e.target.value)
                              }
                              required
                              value={accounts_receivable || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Inventory
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) => setInventory(e.target.value)}
                              required
                              value={inventory || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Other Current Assets
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setOther_current_assets(e.target.value)
                              }
                              required
                              value={other_current_assets || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            <Box fontWeight="fontWeightBold">
                              Current Assets
                            </Box>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Box fontWeight="fontWeightBold">
                              <TextField
                                type="number"
                                fullWidth
                                required
                                value={current_assets || ""}
                                variant="outlined"
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Fixed Assets (PPE)
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setSale_purchase_of_fixed_asset(e.target.value)
                              }
                              required
                              value={sale_purchase_of_fixed_asset || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Intangibles/Goodwill
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) => setGoodwill(e.target.value)}
                              required
                              value={goodwill || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Other Non-Current Assets
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setOther_non_current_assets(e.target.value)
                              }
                              required
                              value={other_non_current_assets || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            <Box fontWeight="fontWeightBold">Total Assets</Box>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Box fontWeight="fontWeightBold">
                              <TextField
                                type="number"
                                fullWidth
                                required
                                value={total_assets || ""}
                                variant="outlined"
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Accounts Payable
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setAccounts_payable(e.target.value)
                              }
                              required
                              value={accounts_payable || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Current Portion of Long-Term Debt
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setCurrent_long_term_debt(e.target.value)
                              }
                              required
                              value={current_long_term_debt || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Other Current Liabilities
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setOther_current_liabilities(e.target.value)
                              }
                              required
                              value={other_current_liabilities || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            <Box fontWeight="fontWeightBold">
                              Current Liabilities
                            </Box>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Box fontWeight="fontWeightBold">
                              <TextField
                                type="number"
                                fullWidth
                                required
                                value={current_liabilities || ""}
                                variant="outlined"
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Long Term Debt
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setLong_term_debt(e.target.value)
                              }
                              required
                              value={long_term_debt || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Other Long Term Liabilities
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setOther_long_term_liabilities(e.target.value)
                              }
                              required
                              value={other_long_term_liabilities || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            <Box fontWeight="fontWeightBold">
                              Total Liabilities
                            </Box>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Box fontWeight="fontWeightBold">
                              <TextField
                                type="number"
                                fullWidth
                                required
                                value={total_liabilities || ""}
                                variant="outlined"
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Total Equity
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              required
                              onChange={(e) => setTotal_equity(e.target.value)}
                              value={total_equity || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            <Box fontWeight="fontWeightBold">
                              Total Equity and Liabilities
                            </Box>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Box fontWeight="fontWeightBold">
                              <TextField
                                type="number"
                                fullWidth
                                required
                                value={total_liabilities_and_equity || ""}
                                variant="outlined"
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                        <TableRow className={classes.tableRow}>
                          <TableCell component="th" scope="row">
                            Optional Fields
                          </TableCell>
                          <TableCell component="th" scope="row"></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Marketable Securities
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setMarketable_securities(e.target.value)
                              }
                              required
                              value={marketable_securities || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Accumulated Depreciation
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setAccumulated_depreciation(e.target.value)
                              }
                              required
                              value={accumulated_depreciation || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Unearned Revenue
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setUnearned_revenue(e.target.value)
                              }
                              required
                              value={unearned_revenue || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Accured Expenses
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setAccured_expenses(e.target.value)
                              }
                              required
                              value={accured_expenses || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Income Tax Payable
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setIncome_tax_payable(e.target.value)
                              }
                              required
                              value={income_tax_payable || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Dividends Payable
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setDividends_payable(e.target.value)
                              }
                              required
                              value={dividends_payable || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Common Stock
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) => setCommon_stock(e.target.value)}
                              required
                              value={common_stock || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Preferred Stock
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setPreferred_stock(e.target.value)
                              }
                              required
                              value={preferred_stock || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Paid In Capital
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setPaid_in_capital(e.target.value)
                              }
                              required
                              value={paid_in_capital || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Retained Earnings
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setRetained_earnings(e.target.value)
                              }
                              required
                              value={retained_earnings || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Equity Market Value
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setEquity_market_value(e.target.value)
                              }
                              required
                              value={equity_market_value || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box display="flex" justifyContent="flex-end" p={2}>
                    <LoaderButton
                      startIcon={<UploadIcon />}
                      disabled={financialsloading}
                      success={financialssuccess}
                      loading={financialsloading}
                      onClick={handleFinancialsSubmit}
                    >
                      Update Balance Sheet
                    </LoaderButton>
                  </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                  <>
                    <Typography>Income Statement:</Typography>
                    {incomeisimageorpdf(incomelabel, incomename)}
                  </>
                </Grid>

                <Grid
                  item
                  md={6}
                  xs={12}
                  style={{ width: "100%", maxWidth: 500, overflow: "auto" }}
                >
                  <Typography>Income Statement Text:</Typography>
                  <Typography>{income}</Typography>
                </Grid>
                <Grid item md={12} xs={12}>
                  <TableContainer component={Paper}>
                    <Table
                      className={classes.table}
                      size="small"
                      aria-label="Balaance Sheet Table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell align="left">
                            {moment(financials_reporting_period).format("YYYY")}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow className={classes.tableRow}>
                          <TableCell component="th" scope="row">
                            Mandatory Fields
                          </TableCell>
                          <TableCell component="th" scope="row"></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Sales
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) => setSales(e.target.value)}
                              required
                              value={sales || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Cost of Goods Sold
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setCost_of_goods_sold(e.target.value)
                              }
                              required
                              value={cost_of_goods_sold || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            <Box fontWeight="fontWeightBold">Gross Margin</Box>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Box fontWeight="fontWeightBold">
                              <TextField
                                type="number"
                                fullWidth
                                required
                                value={gross_margin || ""}
                                variant="outlined"
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Depreciation Expenses
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setDepreciation_expenses(e.target.value)
                              }
                              required
                              value={depreciation_expenses || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Operating Expenses
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setOperating_expenses(e.target.value)
                              }
                              required
                              value={operating_expenses || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            <Box fontWeight="fontWeightBold">
                              Operating Income
                            </Box>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Box fontWeight="fontWeightBold">
                              <TextField
                                type="number"
                                fullWidth
                                required
                                value={operating_income || ""}
                                variant="outlined"
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Interest Expenses
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setInterest_expenses(e.target.value)
                              }
                              required
                              value={interest_expenses || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Other Expenses
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setOther_expenses(e.target.value)
                              }
                              required
                              value={other_expenses || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            <Box fontWeight="fontWeightBold">EBT</Box>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Box fontWeight="fontWeightBold">
                              <TextField
                                type="number"
                                fullWidth
                                required
                                value={ebt || ""}
                                variant="outlined"
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Income Tax Expense
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setIncome_tax_expense(e.target.value)
                              }
                              required
                              value={income_tax_expense || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            <Box fontWeight="fontWeightBold">EBIT</Box>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Box fontWeight="fontWeightBold">
                              <TextField
                                type="number"
                                fullWidth
                                required
                                value={ebit || ""}
                                variant="outlined"
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Extraordinary Income / Expense
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setExtraordinary_income(e.target.value)
                              }
                              required
                              value={extraordinary_income || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            <Box fontWeight="fontWeightBold">Net Profit</Box>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Box fontWeight="fontWeightBold">
                              <TextField
                                type="number"
                                fullWidth
                                required
                                value={net_profit || ""}
                                variant="outlined"
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Operating Cash Flow
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) => setCash_flow(e.target.value)}
                              required
                              value={cash_flow || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Inventory Turnover (COGS/ Average Inventory current
                            and last year)
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="text"
                              fullWidth
                              onChange={(e) =>
                                setInventory_turnover(e.target.value)
                              }
                              value={inventory_turnover || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Interest Coverage (IE + EBT / IE)
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="text"
                              fullWidth
                              onChange={(e) =>
                                setInterest_coverage(e.target.value)
                              }
                              value={interest_coverage || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow className={classes.tableRow}>
                          <TableCell component="th" scope="row">
                            Optional Fields
                          </TableCell>
                          <TableCell component="th" scope="row"></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Marketing Expenses
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setMarketing_expenses(e.target.value)
                              }
                              required
                              value={marketing_expenses || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Bad Debt Expenses
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) =>
                                setBad_debt_expenses(e.target.value)
                              }
                              required
                              value={bad_debt_expenses || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Tax Expenses
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="number"
                              fullWidth
                              onChange={(e) => setTax_expenses(e.target.value)}
                              required
                              value={tax_expenses || ""}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box display="flex" justifyContent="flex-end" p={2}>
                    <LoaderButton
                      startIcon={<UploadIcon />}
                      disabled={financialsloading}
                      success={financialssuccess}
                      loading={financialsloading}
                      onClick={handleFinancialsSubmit}
                    >
                      Update Income Statement
                    </LoaderButton>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </form>
      </Container>
    </Page>
  );
};

export default UpdateFinancialsForm;
