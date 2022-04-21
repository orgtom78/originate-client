import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TextField,
  MenuItem,
  Select,
  colors,
  Button,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import NumberFormat from "react-number-format";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import { API, graphqlOperation } from "aws-amplify";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56,
  },
  differenceIcon: {
    color: colors.red[900],
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1),
  },
  table: {
    minWidth: "100%",
    maxWidth: "100%",
  },
  tableRow: {
    backgroundColor: colors.teal[400],
  },
  tableRow2: {
    backgroundColor: colors.teal[200],
  },
  tableCellRed: {
    backgroundColor: colors.red[200],
  },
  tableCellOrange: {
    backgroundColor: colors.orange[200],
  },
  Button1: {
    background: colors.green[200],
  },
  Button2: {
    background: colors.orange[200],
  },
  Button3: {
    background: colors.red[200],
  },
}));

const auditType = [
  {
    value: "audited-big4",
    label: "Big 4 Auditor",
  },
  {
    value: "audited-2nd-tier",
    label: "2nd Tier Auditor",
  },
  {
    value: "audited-other",
    label: "Other Auditor",
  },
  {
    value: "management-prepared",
    label: "Management Prepared",
  },
];

const insuranceStatus = [
  {
    value: "insurable-avg-price",
    label: "Insurable (avg.) Price",
  },
  {
    value: "insurable-above-avg-price",
    label: "Insurable (above avg.) Price",
  },
  {
    value: "not-insurable",
    label: "Not Insurable",
  },
];

const boolean = [
  {
    value: "yes",
    label: "Yes",
  },
  {
    value: "no",
    label: "No",
  },
];

const productUse = [
  {
    value: "direct-resale",
    label: "Direct Resale",
  },
  {
    value: "incorporation-into-product",
    label: "Incorporation into Product",
  },
  {
    value: "other",
    label: "Other",
  },
];

const Limits = ({ className, value, data, ...rest }) => {
  const classes = useStyles();
  const { id } = useParams();
  const [buyer, setBuyer] = useState([]);
  const [financials, setFinancials] = useState([]);
  const [financialsid, setFinancialsid] = useState("");
  const [sales, setSales] = useState("");
  const [sales_risk, setSales_risk] = useState("");
  const [buyer_date_of_incorporation, setBuyer_date_of_incorporation] =
    useState("");
  const [
    buyer_date_of_incorporation_risk,
    setBuyer_date_of_incorporation_risk,
  ] = useState("");
  const [financials_status, setFinancials_status] = useState("");
  const [financials_status_risk, setFinancials_status_risk] = useState("");
  const [net_profit, setNet_profit] = useState("");
  const [net_profit_risk, setNet_profit_risk] = useState("");
  const [net_profit_previous_year, setNet_profit_previous_year] = useState("");
  const [total_equity, setTotal_equity] = useState("");
  const [net_operating_loss, setNet_operating_loss] = useState("");
  const [equity_net_operating_loss_ratio, setEquity_net_operating_loss_ratio] =
    useState("");
  const [
    equity_net_operating_loss_ratio_risk,
    setEquity_net_operating_loss_ratio_risk,
  ] = useState("");
  const [
    cash_flow_from_operating_activities,
    setCash_flow_from_operating_activities,
  ] = useState("");
  const [
    cash_flow_from_operating_activities_risk,
    setCash_flow_from_operating_activities_risk,
  ] = useState("");
  const [current_ratio, setCurrent_ratio] = useState("");
  const [current_ratio_risk, setCurrent_ratio_risk] = useState("");
  const [inventory_turnover, setInventory_turnover] = useState("");
  const [inventory_turnover_risk, setInventory_turnover_risk] = useState("");
  const [inventory_turnover_trend, setInventory_turnover_trend] = useState("");
  const [inventory_turnover_trend_risk, setInventory_turnover_trend_risk] =
    useState("");
  const [interest_coverage, setInterest_coverage] = useState("");
  const [interest_coverage_risk, setInterest_coverage_risk] = useState("");
  const [buyer_existing_disputes, setBuyer_existing_disputes] = useState("");
  const [buyer_existing_disputes_risk, setBuyer_existing_disputes_risk] =
    useState("");
  const [buyer_insurance_status, setBuyer_insurance_status] = useState("");
  const [buyer_insurance_status_risk, setBuyer_insurance_status_risk] =
    useState("");
  const [
    buyer_country_year_of_rating_downgrade,
    setBuyer_country_year_of_rating_downgrade,
  ] = useState("");
  const [
    buyer_country_year_of_rating_downgrade_risk,
    setBuyer_country_year_of_rating_downgrade_risk,
  ] = useState("");
  const [
    buyer_supplier_year_business_relation_started,
    setBuyer_supplier_year_business_relation_started,
  ] = useState("");
  const [
    buyer_supplier_year_business_relation_started_risk,
    setBuyer_supplier_year_business_relation_started_risk,
  ] = useState("");
  const [
    buyer_reporting_year_number_invoices,
    setBuyer_reporting_year_number_invoices,
  ] = useState("");
  const [
    buyer_reporting_year_number_invoices_risk,
    setBuyer_reporting_year_number_invoices_risk,
  ] = useState("");
  const [buyer_invoices_paid_on_time, setBuyer_invoices_paid_on_time] =
    useState("");
  const [
    buyer_invoices_paid_on_time_risk,
    setBuyer_invoices_paid_on_time_risk,
  ] = useState("");
  const [buyer_invoices_past_due_30_days, setBuyer_invoices_past_due_30_days] =
    useState("");
  const [
    buyer_invoices_past_due_30_days_risk,
    setBuyer_invoices_past_due_30_days_risk,
  ] = useState("");
  const [buyer_invoices_past_due_60_days, setBuyer_invoices_past_due_60_days] =
    useState("");
  const [
    buyer_invoices_past_due_60_days_risk,
    setBuyer_invoices_past_due_60_days_risk,
  ] = useState("");
  const [buyer_use_of_goods_purchased, setBuyer_use_of_goods_purchased] =
    useState("");
  const [
    buyer_use_of_goods_purchased_risk,
    setBuyer_use_of_goods_purchased_risk,
  ] = useState("");
  const [inventory, setInventory] = useState("");
  const [cost_of_goods_sold, setCost_of_goods_sold] = useState("");
  const [
    inventory_cost_of_goods_sold_ratio,
    setInventory_cost_of_goods_sold_ratio,
  ] = useState("");
  const [
    inventory_cost_of_goods_sold_ratio_risk,
    setInventory_cost_of_goods_sold_ratio_risk,
  ] = useState("");
  const [
    buyer_reporting_year_transaction_amount,
    setBuyer_reporting_year_transaction_amount,
  ] = useState("");
  const [
    inventory_buyer_transaction_amount_ratio,
    setInventory_buyer_transaction_amount_ratio,
  ] = useState("");
  const [
    inventory_buyer_transaction_amount_ratio_risk,
    setInventory_buyer_transaction_amount_ratio_risk,
  ] = useState("");

  useEffect(() => {
    async function get() {
      try {
        const data = await value;
        if (data) {
          const d = data.sort(function (a, b) {
            return (
              new Date(b.financials_reporting_period) -
              new Date(a.financials_reporting_period)
            );
          });
          if (d[0]) {
            setFinancials(d[0]);
            setFinancialsid(d[0].id);
            setSales(d[0].sales);
            setSales_risk(d[0].sales_risk);
            setFinancials_status(d[0].financials_status);
            setFinancials_status_risk(d[0].financials_status_risk);
            setNet_profit(d[0].net_profit);
            setNet_profit_risk(d[0].net_profit_risk);
            setNet_profit_previous_year(d[0].net_profit_previous_year);
            setTotal_equity(d[0].total_equity);
            setNet_operating_loss(d[0].net_operating_loss);
            setEquity_net_operating_loss_ratio(
              d[0].equity_net_operating_loss_ratio
            );
            setEquity_net_operating_loss_ratio_risk(
              d[0].equity_net_operating_loss_ratio_risk
            );
            setCash_flow_from_operating_activities(
              d[0].cash_flow_from_operating_activities
            );
            setCash_flow_from_operating_activities_risk(
              d[0].cash_flow_from_operating_activities_risk
            );
            setCurrent_ratio(d[0].current_ratio);
            setCurrent_ratio_risk(d[0].current_ratio_risk);
            setInventory_turnover(d[0].inventory_turnover);
            setInventory_turnover_risk(d[0].inventory_turnover_risk);
            setInventory_turnover_trend(d[0].inventory_turnover_trend);
            setInventory_turnover_trend_risk(
              d[0].inventory_turnover_trend_risk
            );
            setInterest_coverage(d[0].interest_coverage);
            setInterest_coverage_risk(d[0].interest_coverage_risk);
            setInventory(d[0].inventory);
            setCost_of_goods_sold(d[0].cost_of_goods_sold);
            setInventory_cost_of_goods_sold_ratio(
              d[0].inventory_cost_of_goods_sold_ratio
            );
            setInventory_cost_of_goods_sold_ratio_risk(
              d[0].inventory_cost_of_goods_sold_ratio_risk
            );
            setInventory_buyer_transaction_amount_ratio(
              d[0].inventory_buyer_transaction_amount_ratio
            );
            setInventory_buyer_transaction_amount_ratio_risk(
              d[0].inventory_buyer_transaction_amount_ratio_risk
            );
          } else {
            return;
          }
          if (d[1]) {
            return;
          }
        }
        return;
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    get();
  }, [value]);

  useEffect(() => {
    async function get() {
      try {
        const d = await data.data.getBuyer;
        if (d) {
          setBuyer(d);
          setBuyer_date_of_incorporation(d.buyer_date_of_incorporation);
          setBuyer_date_of_incorporation_risk(
            d.buyer_date_of_incorporation_risk
          );
          setBuyer_existing_disputes(d.buyer_existing_disputes);
          setBuyer_existing_disputes_risk(d.buyer_existing_disputes_risk);
          setBuyer_insurance_status(d.buyer_insurance_status);
          setBuyer_insurance_status_risk(d.buyer_insurance_status_risk);
          setBuyer_country_year_of_rating_downgrade(
            d.buyer_country_year_of_rating_downgrade
          );
          setBuyer_country_year_of_rating_downgrade_risk(
            d.buyer_country_year_of_rating_downgrade_risk
          );
          setBuyer_supplier_year_business_relation_started(
            d.buyer_supplier_year_business_relation_started
          );
          setBuyer_supplier_year_business_relation_started_risk(
            d.buyer_supplier_year_business_relation_started_risk
          );
          setBuyer_reporting_year_number_invoices(
            d.buyer_reporting_year_number_invoices
          );
          setBuyer_reporting_year_number_invoices_risk(
            d.buyer_reporting_year_number_invoices_risk
          );
          setBuyer_invoices_paid_on_time(d.buyer_invoices_paid_on_time);
          setBuyer_invoices_paid_on_time_risk(
            d.buyer_invoices_paid_on_time_risk
          );
          setBuyer_invoices_past_due_30_days(d.buyer_invoices_past_due_30_days);
          setBuyer_invoices_past_due_30_days_risk(
            d.buyer_invoices_past_due_30_days_risk
          );
          setBuyer_invoices_past_due_60_days(d.buyer_invoices_past_due_60_days);
          setBuyer_invoices_past_due_60_days_risk(
            d.buyer_invoices_past_due_60_days_risk
          );
          setBuyer_use_of_goods_purchased(d.buyer_use_of_goods_purchased);
          setBuyer_use_of_goods_purchased_risk(
            d.buyer_use_of_goods_purchased_risk
          );
          setBuyer_reporting_year_transaction_amount(
            d.buyer_reporting_year_transaction_amount
          );
        }
        return;
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    get();
  }, [data]);

  function checkstatusSales(currentRisk, staticRisk, label) {
    if (sales_risk === "Low") {
      return (
        <>
          <Button
            className={classes.Button1}
            variant="outlined"
            onClick={() => handleclickSales(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (sales_risk === "Medium") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button2}
            onClick={() => handleclickSales(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (sales_risk === "High") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button3}
            onClick={() => handleclickSales(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            variant="outlined"
            onClick={() => handleclickSales(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    }
  }

  async function handleclickSales(riskStatus) {
    try {
      setSales_risk(riskStatus);
      const input = {
        id: financialsid,
        sales_risk: riskStatus,
        sales: sales,
      };
      await API.graphql(
        graphqlOperation(mutations.updateFinancials, { input: input })
      );
    } catch (e) {
      onError(e);
    }
  }

  function checkstatusDate(currentRisk, staticRisk, label) {
    if (buyer_date_of_incorporation_risk === "Low") {
      return (
        <>
          <Button
            className={classes.Button1}
            variant="outlined"
            onClick={() => handleclickDate(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (buyer_date_of_incorporation_risk === "Medium") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button2}
            onClick={() => handleclickDate(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (buyer_date_of_incorporation_risk === "High") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button3}
            onClick={() => handleclickDate(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            variant="outlined"
            onClick={() => handleclickDate(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    }
  }

  async function handleclickDate(riskStatus) {
    try {
      setBuyer_date_of_incorporation_risk(riskStatus);
      const input = {
        id: id,
        buyer_date_of_incorporation_risk: riskStatus,
        buyer_date_of_incorporation: buyer_date_of_incorporation,
      };
      await API.graphql(
        graphqlOperation(mutations.updateBuyer, { input: input })
      );
    } catch (e) {
      onError(e);
    }
  }

  function checkstatusFinancials(currentRisk, staticRisk, label) {
    if (financials_status_risk === "Low") {
      return (
        <>
          <Button
            className={classes.Button1}
            variant="outlined"
            onClick={() => handleclickFinancials(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (financials_status_risk === "Medium") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button2}
            onClick={() => handleclickFinancials(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (financials_status_risk === "High") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button3}
            onClick={() => handleclickFinancials(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            variant="outlined"
            onClick={() => handleclickFinancials(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    }
  }

  async function handleclickFinancials(riskStatus) {
    try {
      setFinancials_status_risk(riskStatus);
      const input = {
        id: financialsid,
        financials_status_risk: riskStatus,
        financials_status: financials_status,
      };
      await API.graphql(
        graphqlOperation(mutations.updateFinancials, { input: input })
      );
    } catch (e) {
      onError(e);
    }
  }

  function checkstatusProfit(currentRisk, staticRisk, label) {
    if (net_profit_risk === "Low") {
      return (
        <>
          <Button
            className={classes.Button1}
            variant="outlined"
            onClick={() => handleclickProfit(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (net_profit_risk === "Medium") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button2}
            onClick={() => handleclickProfit(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (net_profit_risk === "High") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button3}
            onClick={() => handleclickProfit(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            variant="outlined"
            onClick={() => handleclickProfit(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    }
  }

  async function handleclickProfit(riskStatus) {
    try {
      setNet_profit_risk(riskStatus);
      const input = {
        id: financialsid,
        net_profit_risk: riskStatus,
        net_profit: net_profit,
      };
      await API.graphql(
        graphqlOperation(mutations.updateFinancials, { input: input })
      );
    } catch (e) {
      onError(e);
    }
  }

  function checkstatusEquityRatio(currentRisk, staticRisk, label) {
    if (equity_net_operating_loss_ratio_risk === "Low") {
      return (
        <>
          <Button
            className={classes.Button1}
            variant="outlined"
            onClick={() => handleclickEquityRatio(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (equity_net_operating_loss_ratio_risk === "Medium") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button2}
            onClick={() => handleclickEquityRatio(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (equity_net_operating_loss_ratio_risk === "High") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button3}
            onClick={() => handleclickEquityRatio(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            variant="outlined"
            onClick={() => handleclickEquityRatio(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    }
  }

  async function handleclickEquityRatio(riskStatus) {
    try {
      setEquity_net_operating_loss_ratio_risk(riskStatus);
      const input = {
        id: financialsid,
        equity_net_operating_loss_ratio_risk: riskStatus,
        equity_net_operating_loss_ratio: equity_net_operating_loss_ratio,
      };
      await API.graphql(
        graphqlOperation(mutations.updateFinancials, { input: input })
      );
    } catch (e) {
      onError(e);
    }
  }

  function checkstatusCashFlow(currentRisk, staticRisk, label) {
    if (cash_flow_from_operating_activities_risk === "Low") {
      return (
        <>
          <Button
            className={classes.Button1}
            variant="outlined"
            onClick={() => handleclickCashFlow(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (cash_flow_from_operating_activities_risk === "Medium") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button2}
            onClick={() => handleclickCashFlow(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (cash_flow_from_operating_activities_risk === "High") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button3}
            onClick={() => handleclickCashFlow(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            variant="outlined"
            onClick={() => handleclickCashFlow(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    }
  }
  async function handleclickCashFlow(riskStatus) {
    try {
      setCash_flow_from_operating_activities_risk(riskStatus);
      const input = {
        id: financialsid,
        cash_flow_from_operating_activities_risk: riskStatus,
        cash_flow_from_operating_activities:
          cash_flow_from_operating_activities,
      };
      await API.graphql(
        graphqlOperation(mutations.updateFinancials, { input: input })
      );
    } catch (e) {
      onError(e);
    }
  }

  function checkstatusCurrentRatio(currentRisk, staticRisk, label) {
    if (current_ratio_risk === "Low") {
      return (
        <>
          <Button
            className={classes.Button1}
            variant="outlined"
            onClick={() => handleclickCurrentRatio(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (current_ratio_risk === "Medium") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button2}
            onClick={() => handleclickCurrentRatio(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (current_ratio_risk === "High") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button3}
            onClick={() => handleclickCurrentRatio(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            variant="outlined"
            onClick={() => handleclickCurrentRatio(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    }
  }

  async function handleclickCurrentRatio(riskStatus) {
    try {
      setCurrent_ratio_risk(riskStatus);
      const input = {
        id: financialsid,
        current_ratio_risk: riskStatus,
        current_ratio: current_ratio,
      };
      await API.graphql(
        graphqlOperation(mutations.updateFinancials, { input: input })
      );
    } catch (e) {
      onError(e);
    }
  }

  function checkstatusInventoryTurnover(currentRisk, staticRisk, label) {
    if (inventory_turnover_risk === "Low") {
      return (
        <>
          <Button
            className={classes.Button1}
            variant="outlined"
            onClick={() => handleclickInventoryTurnover(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (inventory_turnover_risk === "Medium") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button2}
            onClick={() => handleclickInventoryTurnover(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (inventory_turnover_risk === "High") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button3}
            onClick={() => handleclickInventoryTurnover(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            variant="outlined"
            onClick={() => handleclickInventoryTurnover(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    }
  }

  async function handleclickInventoryTurnover(riskStatus) {
    try {
      setInventory_turnover_risk(riskStatus);
      const input = {
        id: financialsid,
        inventory_turnover_risk: riskStatus,
        inventory_turnover: inventory_turnover,
      };
      await API.graphql(
        graphqlOperation(mutations.updateFinancials, { input: input })
      );
    } catch (e) {
      onError(e);
    }
  }

  function checkstatusInventoryTurnoverTrend(currentRisk, staticRisk, label) {
    if (inventory_turnover_trend_risk === "Low") {
      return (
        <>
          <Button
            className={classes.Button1}
            variant="outlined"
            onClick={() => handleclickInventoryTurnoverTrend(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (inventory_turnover_trend_risk === "Medium") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button2}
            onClick={() => handleclickInventoryTurnoverTrend(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (inventory_turnover_trend_risk === "High") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button3}
            onClick={() => handleclickInventoryTurnoverTrend(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            variant="outlined"
            onClick={() => handleclickInventoryTurnoverTrend(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    }
  }

  async function handleclickInventoryTurnoverTrend(riskStatus) {
    try {
      setInventory_turnover_trend_risk(riskStatus);
      const input = {
        id: financialsid,
        inventory_turnover_trend_risk: riskStatus,
        inventory_turnover_trend: inventory_turnover_trend,
      };
      await API.graphql(
        graphqlOperation(mutations.updateFinancials, { input: input })
      );
    } catch (e) {
      onError(e);
    }
  }

  function checkstatusInterestCoverage(currentRisk, staticRisk, label) {
    if (interest_coverage_risk === "Low") {
      return (
        <>
          <Button
            className={classes.Button1}
            variant="outlined"
            onClick={() => handleclickInterestCoverage(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (interest_coverage_risk === "Medium") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button2}
            onClick={() => handleclickInterestCoverage(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (interest_coverage_risk === "High") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button3}
            onClick={() => handleclickInterestCoverage(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            variant="outlined"
            onClick={() => handleclickInterestCoverage(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    }
  }

  async function handleclickInterestCoverage(riskStatus) {
    try {
      setInterest_coverage_risk(riskStatus);
      const input = {
        id: financialsid,
        interest_coverage_risk: riskStatus,
        interest_coverage: interest_coverage,
      };
      await API.graphql(
        graphqlOperation(mutations.updateFinancials, { input: input })
      );
    } catch (e) {
      onError(e);
    }
  }

  function checkstatusBuyerDisputes(currentRisk, staticRisk, label) {
    if (buyer_existing_disputes_risk === "Low") {
      return (
        <>
          <Button
            className={classes.Button1}
            variant="outlined"
            onClick={() => handleclickBuyerDisputes(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (buyer_existing_disputes_risk === "Medium") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button2}
            onClick={() => handleclickBuyerDisputes(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (buyer_existing_disputes_risk === "High") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button3}
            onClick={() => handleclickBuyerDisputes(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            variant="outlined"
            onClick={() => handleclickBuyerDisputes(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    }
  }

  async function handleclickBuyerDisputes(riskStatus) {
    try {
      setBuyer_existing_disputes_risk(riskStatus);
      const input = {
        id: id,
        buyer_existing_disputes_risk: riskStatus,
        buyer_existing_disputes: buyer_existing_disputes,
      };
      await API.graphql(
        graphqlOperation(mutations.updateBuyer, { input: input })
      );
    } catch (e) {
      onError(e);
    }
  }

  function checkstatusInsurance(currentRisk, staticRisk, label) {
    if (buyer_insurance_status_risk === "Low") {
      return (
        <>
          <Button
            className={classes.Button1}
            variant="outlined"
            onClick={() => handleclickInsurance(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (buyer_insurance_status_risk === "Medium") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button2}
            onClick={() => handleclickInsurance(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (buyer_insurance_status_risk === "High") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button3}
            onClick={() => handleclickInsurance(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            variant="outlined"
            onClick={() => handleclickInsurance(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    }
  }

  async function handleclickInsurance(riskStatus) {
    try {
      setBuyer_insurance_status_risk(riskStatus);
      const input = {
        id: id,
        buyer_insurance_status_risk: riskStatus,
        buyer_insurance_status: buyer_insurance_status,
      };
      await API.graphql(
        graphqlOperation(mutations.updateBuyer, { input: input })
      );
    } catch (e) {
      onError(e);
    }
  }

  function checkstatusDowngrade(currentRisk, staticRisk, label) {
    if (buyer_country_year_of_rating_downgrade_risk === "Low") {
      return (
        <>
          <Button
            className={classes.Button1}
            variant="outlined"
            onClick={() => handleclickDowngrade(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (buyer_country_year_of_rating_downgrade_risk === "Medium") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button2}
            onClick={() => handleclickDowngrade(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (buyer_country_year_of_rating_downgrade_risk === "High") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button3}
            onClick={() => handleclickDowngrade(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            variant="outlined"
            onClick={() => handleclickDowngrade(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    }
  }

  async function handleclickDowngrade(riskStatus) {
    try {
      setBuyer_country_year_of_rating_downgrade_risk(riskStatus);
      const input = {
        id: id,
        buyer_country_year_of_rating_downgrade_risk: riskStatus,
        buyer_country_year_of_rating_downgrade:
          buyer_country_year_of_rating_downgrade,
      };
      await API.graphql(
        graphqlOperation(mutations.updateBuyer, { input: input })
      );
    } catch (e) {
      onError(e);
    }
  }

  function checkstatusRelationship(currentRisk, staticRisk, label) {
    if (buyer_supplier_year_business_relation_started_risk === "Low") {
      return (
        <>
          <Button
            className={classes.Button1}
            variant="outlined"
            onClick={() => handleclickRelationship(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (
      buyer_supplier_year_business_relation_started_risk === "Medium"
    ) {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button2}
            onClick={() => handleclickRelationship(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (buyer_supplier_year_business_relation_started_risk === "High") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button3}
            onClick={() => handleclickRelationship(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            variant="outlined"
            onClick={() => handleclickRelationship(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    }
  }

  async function handleclickRelationship(riskStatus) {
    try {
      setBuyer_supplier_year_business_relation_started_risk(riskStatus);
      const input = {
        id: id,
        buyer_supplier_year_business_relation_started_risk: riskStatus,
        buyer_supplier_year_business_relation_started:
          buyer_supplier_year_business_relation_started,
      };
      await API.graphql(
        graphqlOperation(mutations.updateBuyer, { input: input })
      );
    } catch (e) {
      onError(e);
    }
  }

  function checkstatusNumberInvoices(currentRisk, staticRisk, label) {
    if (buyer_reporting_year_number_invoices_risk === "Low") {
      return (
        <>
          <Button
            className={classes.Button1}
            variant="outlined"
            onClick={() => handleclickNumberInvoices(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (buyer_reporting_year_number_invoices_risk === "Medium") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button2}
            onClick={() => handleclickNumberInvoices(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (buyer_reporting_year_number_invoices_risk === "High") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button3}
            onClick={() => handleclickNumberInvoices(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            variant="outlined"
            onClick={() => handleclickNumberInvoices(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    }
  }
  async function handleclickNumberInvoices(riskStatus) {
    try {
      setBuyer_reporting_year_number_invoices_risk(riskStatus);
      const input = {
        id: id,
        buyer_reporting_year_number_invoices_risk: riskStatus,
        buyer_reporting_year_number_invoices:
          buyer_reporting_year_number_invoices,
      };
      await API.graphql(
        graphqlOperation(mutations.updateBuyer, { input: input })
      );
    } catch (e) {
      onError(e);
    }
  }

  function checkstatusInvoicesOT(currentRisk, staticRisk, label) {
    if (buyer_invoices_paid_on_time_risk === "Low") {
      return (
        <>
          <Button
            className={classes.Button1}
            variant="outlined"
            onClick={() => handleclickInvoicesOT(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (buyer_invoices_paid_on_time_risk === "Medium") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button2}
            onClick={() => handleclickInvoicesOT(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (buyer_invoices_paid_on_time_risk === "High") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button3}
            onClick={() => handleclickInvoicesOT(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            variant="outlined"
            onClick={() => handleclickInvoicesOT(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    }
  }
  async function handleclickInvoicesOT(riskStatus) {
    try {
      setBuyer_invoices_paid_on_time_risk(riskStatus);
      const input = {
        id: id,
        buyer_invoices_paid_on_time_risk: riskStatus,
        buyer_invoices_paid_on_time: buyer_invoices_paid_on_time,
      };
      await API.graphql(
        graphqlOperation(mutations.updateBuyer, { input: input })
      );
    } catch (e) {
      onError(e);
    }
  }

  function checkstatusInvoicesPD30(currentRisk, staticRisk, label) {
    if (buyer_invoices_past_due_30_days_risk === "Low") {
      return (
        <>
          <Button
            className={classes.Button1}
            variant="outlined"
            onClick={() => handleclickInvoicesPD30(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (buyer_invoices_past_due_30_days_risk === "Medium") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button2}
            onClick={() => handleclickInvoicesPD30(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (buyer_invoices_past_due_30_days_risk === "High") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button3}
            onClick={() => handleclickInvoicesPD30(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            variant="outlined"
            onClick={() => handleclickInvoicesPD30(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    }
  }
  async function handleclickInvoicesPD30(riskStatus) {
    try {
      setBuyer_invoices_past_due_30_days_risk(riskStatus);
      const input = {
        id: id,
        buyer_invoices_past_due_30_days_risk: riskStatus,
        buyer_invoices_past_due_30_days: buyer_invoices_past_due_30_days,
      };
      await API.graphql(
        graphqlOperation(mutations.updateBuyer, { input: input })
      );
    } catch (e) {
      onError(e);
    }
  }

  function checkstatusInvoicesPD60(currentRisk, staticRisk, label) {
    if (buyer_invoices_past_due_60_days_risk === "Low") {
      return (
        <>
          <Button
            className={classes.Button1}
            variant="outlined"
            onClick={() => handleclickInvoicesPD60(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (buyer_invoices_past_due_60_days_risk === "Medium") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button2}
            onClick={() => handleclickInvoicesPD60(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (buyer_invoices_past_due_60_days_risk === "High") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button3}
            onClick={() => handleclickInvoicesPD60(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            variant="outlined"
            onClick={() => handleclickInvoicesPD60(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    }
  }
  async function handleclickInvoicesPD60(riskStatus) {
    try {
      setBuyer_invoices_past_due_60_days_risk(riskStatus);
      const input = {
        id: id,
        buyer_invoices_past_due_60_days_risk: riskStatus,
        buyer_invoices_past_due_60_days: buyer_invoices_past_due_60_days,
      };
      await API.graphql(
        graphqlOperation(mutations.updateBuyer, { input: input })
      );
    } catch (e) {
      onError(e);
    }
  }

  function checkstatusProductUse(currentRisk, staticRisk, label) {
    if (buyer_use_of_goods_purchased_risk === "Low") {
      return (
        <>
          <Button
            className={classes.Button1}
            variant="outlined"
            onClick={() => handleclickProductUse(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (buyer_use_of_goods_purchased_risk === "Medium") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button2}
            onClick={() => handleclickProductUse(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (buyer_use_of_goods_purchased_risk === "High") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button3}
            onClick={() => handleclickProductUse(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            variant="outlined"
            onClick={() => handleclickProductUse(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    }
  }
  async function handleclickProductUse(riskStatus) {
    try {
      setBuyer_use_of_goods_purchased_risk(riskStatus);
      const input = {
        id: id,
        buyer_use_of_goods_purchased_risk: riskStatus,
        buyer_use_of_goods_purchased: buyer_use_of_goods_purchased,
      };
      await API.graphql(
        graphqlOperation(mutations.updateBuyer, { input: input })
      );
    } catch (e) {
      onError(e);
    }
  }

  function checkstatusIVSalesRatio(currentRisk, staticRisk, label) {
    if (inventory_buyer_transaction_amount_ratio_risk === "Low") {
      return (
        <>
          <Button
            className={classes.Button1}
            variant="outlined"
            onClick={() => handleclickIVSalesRatio(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (inventory_buyer_transaction_amount_ratio_risk === "Medium") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button2}
            onClick={() => handleclickIVSalesRatio(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (inventory_buyer_transaction_amount_ratio_risk === "High") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button3}
            onClick={() => handleclickIVSalesRatio(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            variant="outlined"
            onClick={() => handleclickIVSalesRatio(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    }
  }
  async function handleclickIVSalesRatio(riskStatus) {
    try {
      setInventory_buyer_transaction_amount_ratio_risk(riskStatus);
      const input = {
        id: financialsid,
        inventory_buyer_transaction_amount_ratio_risk: riskStatus,
        inventory_buyer_transaction_amount_ratio:
          inventory_buyer_transaction_amount_ratio,
      };
      await API.graphql(
        graphqlOperation(mutations.updateFinancials, { input: input })
      );
    } catch (e) {
      onError(e);
    }
  }

  function checkstatusIVCogsRatio(currentRisk, staticRisk, label) {
    if (inventory_cost_of_goods_sold_ratio_risk === "Low") {
      return (
        <>
          <Button
            className={classes.Button1}
            variant="outlined"
            onClick={() => handleclickIVCogsRatio(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (inventory_cost_of_goods_sold_ratio_risk === "Medium") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button2}
            onClick={() => handleclickIVCogsRatio(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else if (inventory_cost_of_goods_sold_ratio_risk === "High") {
      return (
        <>
          <Button
            variant="outlined"
            className={classes.Button3}
            onClick={() => handleclickIVCogsRatio(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            variant="outlined"
            onClick={() => handleclickIVCogsRatio(staticRisk)}
          >
            {label}
          </Button>
        </>
      );
    }
  }
  async function handleclickIVCogsRatio(riskStatus) {
    try {
      setInventory_cost_of_goods_sold_ratio_risk(riskStatus);
      const input = {
        id: financialsid,
        inventory_cost_of_goods_sold_ratio_risk: riskStatus,
        inventory_cost_of_goods_sold_ratio: inventory_cost_of_goods_sold_ratio,
      };
      await API.graphql(
        graphqlOperation(mutations.updateFinancials, { input: input })
      );
    } catch (e) {
      onError(e);
    }
  }

  async function updateProfitabilityPY() {
    try {
      const input = {
        id: financialsid,
        net_profit_previous_year: net_profit_previous_year,
        total_equity: total_equity,
        net_operating_loss: net_operating_loss,
        inventory: inventory,
        cost_of_goods_sold: cost_of_goods_sold,
      };
      await API.graphql(
        graphqlOperation(mutations.updateFinancials, { input: input })
      );
    } catch (e) {
      onError(e);
    }
  }

  async function updateBuyer() {
    try {
      const input = {
        id: id,
        buyer_reporting_year_transaction_amount:
          buyer_reporting_year_transaction_amount,
      };
      await API.graphql(
        graphqlOperation(mutations.updateBuyer, { input: input })
      );
    } catch (e) {
      onError(e);
    }
  }

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid item>
          <Table
            className={classes.table}
            size="small"
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Box fontWeight="fontWeightBold">{""}</Box>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Box fontWeight="fontWeightBold">{"Actual"}</Box>
                </TableCell>
                <TableCell align="right" className={classes.tableRow}>
                  <Box fontWeight="fontWeightBold">{"Low"}</Box>
                </TableCell>
                <TableCell align="right" className={classes.tableCellOrange}>
                  <Box fontWeight="fontWeightBold">{"Medium"}</Box>
                </TableCell>
                <TableCell align="right" className={classes.tableCellRed}>
                  <Box fontWeight="fontWeightBold">{"High"}</Box>
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow2}>
                <TableCell component="th" scope="row">
                  <Box fontWeight="fontWeightBold">
                    Account Debtor Size and Time in Operation
                  </Box>
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Business Classification / Revenue
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    fullWidth
                    variant="standard"
                    value={sales || ""}
                    thousandSeparator={true}
                    decimalScale="2"
                    prefix={"$"}
                    customInput={TextField}
                    type="text"
                    onValueChange={(values) => {
                      const { formattedValue, value } = values;
                      setSales(value);
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  {checkstatusSales(
                    sales_risk,
                    "Low",
                    "Large 250+ Employees orn $50mm+ Revenue"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusSales(
                    sales_risk,
                    "Medium",
                    "Medium 50-250 Employees or $10.0-$50.0mm Rev."
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusSales(
                    sales_risk,
                    "High",
                    "Small 0-50 Employees or $10.0mm Rev."
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Time in Business
                </TableCell>
                <TableCell align="right">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      fullWidth
                      value={buyer_date_of_incorporation || new Date()}
                      margin="normal"
                      variant="standard"
                      id="date_of_incorporation"
                      views={["year"]}
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
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </TableCell>
                <TableCell align="right">
                  {checkstatusDate(
                    buyer_date_of_incorporation_risk,
                    "Low",
                    "10+ Years"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusDate(
                    buyer_date_of_incorporation_risk,
                    "Medium",
                    "5-10 Years"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusDate(
                    buyer_date_of_incorporation_risk,
                    "High",
                    "0-2 Years"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Financial Statements
                </TableCell>
                <TableCell align="right">
                  <Select
                    fullWidth
                    id="supplier_type"
                    onChange={(e) => setFinancials_status(e.target.value)}
                    required
                    value={financials_status || ""}
                    variant="standard"
                  >
                    {auditType.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell align="right">
                  {checkstatusFinancials(
                    financials_status_risk,
                    "Low",
                    "Audit: Big 4 / 2nd Tier"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusFinancials(
                    financials_status_risk,
                    "Medium",
                    "Audit: Other"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusFinancials(
                    financials_status_risk,
                    "High",
                    "Management Prepared"
                  )}
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow2}>
                <TableCell component="th" scope="row">
                  <Box fontWeight="fontWeightBold">
                    Account Debtor Financial Condition
                  </Box>
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Company Profitability - RY
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    fullWidth
                    variant="standard"
                    value={net_profit || ""}
                    thousandSeparator={true}
                    decimalScale="2"
                    prefix={"$"}
                    customInput={TextField}
                    type="text"
                    onValueChange={(values) => {
                      const { formattedValue, value } = values;
                      setNet_profit(value);
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  {checkstatusProfit(net_profit_risk, "Low", "Positive in RY")}
                </TableCell>
                <TableCell align="right">
                  {checkstatusProfit(
                    net_profit_risk,
                    "Medium",
                    "Neg in PY / Pos YOY Trend"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusProfit(
                    net_profit_risk,
                    "High",
                    "Neg in PY / Neg YOY Trend"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Company Profitability - PY
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    fullWidth
                    variant="standard"
                    value={net_profit_previous_year || ""}
                    thousandSeparator={true}
                    decimalScale="2"
                    prefix={"$"}
                    customInput={TextField}
                    type="text"
                    onValueChange={(values) => {
                      const { formattedValue, value } = values;
                      setNet_profit_previous_year(value);
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    onClick={() => updateProfitabilityPY()}
                  >
                    Update
                  </Button>
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Ending Equity
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    fullWidth
                    variant="standard"
                    value={total_equity || ""}
                    thousandSeparator={true}
                    decimalScale="2"
                    prefix={"$"}
                    customInput={TextField}
                    type="text"
                    onValueChange={(values) => {
                      const { formattedValue, value } = values;
                      setTotal_equity(value);
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    onClick={() => updateProfitabilityPY()}
                  >
                    Update
                  </Button>
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Net Operating Loss
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    fullWidth
                    variant="standard"
                    value={net_operating_loss || ""}
                    thousandSeparator={true}
                    decimalScale="2"
                    prefix={"$"}
                    customInput={TextField}
                    type="text"
                    onValueChange={(values) => {
                      const { formattedValue, value } = values;
                      setNet_operating_loss(value);
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    onClick={() => updateProfitabilityPY()}
                  >
                    Update
                  </Button>
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Ending Equity / PY NOL
                </TableCell>
                <TableCell align="right">
                  <TextField
                    fullWidth
                    id="equity_net_operating_loss_ratio"
                    onChange={(e) =>
                      setEquity_net_operating_loss_ratio(e.target.value)
                    }
                    required
                    value={equity_net_operating_loss_ratio || ""}
                    variant="standard"
                  />
                </TableCell>
                <TableCell align="right">
                  {checkstatusEquityRatio(
                    equity_net_operating_loss_ratio_risk,
                    "Low",
                    "2+"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusEquityRatio(
                    equity_net_operating_loss_ratio_risk,
                    "Medium",
                    "1-2"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusEquityRatio(
                    equity_net_operating_loss_ratio_risk,
                    "High",
                    "0-1"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Operating Activity Cash Flows - RY
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    fullWidth
                    variant="standard"
                    value={cash_flow_from_operating_activities || ""}
                    thousandSeparator={true}
                    decimalScale="2"
                    prefix={"$"}
                    customInput={TextField}
                    type="text"
                    onValueChange={(values) => {
                      const { formattedValue, value } = values;
                      setCash_flow_from_operating_activities(value);
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  {checkstatusCashFlow(
                    cash_flow_from_operating_activities_risk,
                    "Low",
                    "Positive"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusCashFlow(
                    cash_flow_from_operating_activities_risk,
                    "Medium",
                    "Neg CF <= PY NOL"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusCashFlow(
                    cash_flow_from_operating_activities_risk,
                    "High",
                    "Neg CF >= PY NOL"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Current Ratio
                </TableCell>
                <TableCell align="right">
                  <TextField
                    fullWidth
                    id="current_ratio"
                    onChange={(e) => setCurrent_ratio(e.target.value)}
                    required
                    value={current_ratio || ""}
                    variant="standard"
                  />
                </TableCell>
                <TableCell align="right">
                  {checkstatusCurrentRatio(current_ratio_risk, "Low", "1.5+")}
                </TableCell>
                <TableCell align="right">
                  {checkstatusCurrentRatio(
                    current_ratio_risk,
                    "Medium",
                    "1.0 - 1.5 or <1 but Consist. w/ Ind. Avg"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusCurrentRatio(current_ratio_risk, "High", "0-1")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Inventory Turnover Ratio
                </TableCell>
                <TableCell align="right">
                  <TextField
                    fullWidth
                    id="inventory_turnover"
                    onChange={(e) => setInventory_turnover(e.target.value)}
                    required
                    value={inventory_turnover || ""}
                    variant="standard"
                  />
                </TableCell>
                <TableCell align="right">
                  {checkstatusInventoryTurnover(
                    inventory_turnover_risk,
                    "Low",
                    "At or Above Ind. Avg. (w/in 5%)"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusInventoryTurnover(
                    inventory_turnover_risk,
                    "Medium",
                    "Mod. Below Ind. Avg. (>= 75%)"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusInventoryTurnover(
                    inventory_turnover_risk,
                    "High",
                    "Sig. Below Ind. Avg. (< 75%)"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Inventory Turnover Ratio / YOY Trend
                </TableCell>
                <TableCell align="right">
                  <TextField
                    fullWidth
                    id="inventory_turnover_trend"
                    onChange={(e) =>
                      setInventory_turnover_trend(e.target.value)
                    }
                    required
                    value={inventory_turnover_trend || ""}
                    variant="standard"
                  />
                </TableCell>
                <TableCell align="right">
                  {checkstatusInventoryTurnoverTrend(
                    inventory_turnover_trend_risk,
                    "Low",
                    "Flat or Increasing (<5% YOY Decline)"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusInventoryTurnoverTrend(
                    inventory_turnover_trend_risk,
                    "Medium",
                    "Mod. Decline (5%-25% YOY)"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusInventoryTurnoverTrend(
                    inventory_turnover_trend_risk,
                    "High",
                    "Sig. Decline (>25% YOY)"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Interest Coverage Ratio
                </TableCell>
                <TableCell align="right">
                  <TextField
                    fullWidth
                    id="interest_coverage"
                    onChange={(e) => setInterest_coverage(e.target.value)}
                    required
                    value={interest_coverage || ""}
                    variant="standard"
                  />
                </TableCell>
                <TableCell align="right">
                  {checkstatusInterestCoverage(
                    interest_coverage_risk,
                    "Low",
                    "3+"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusInterestCoverage(
                    interest_coverage_risk,
                    "Medium",
                    "2-3"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusInterestCoverage(
                    interest_coverage_risk,
                    "High",
                    "0-2"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Indications of emerging or existing financial difficulty not
                  visible on FS
                </TableCell>
                <TableCell align="right">
                  <Select
                    fullWidth
                    id="supplier_type"
                    onChange={(e) => setBuyer_existing_disputes(e.target.value)}
                    required
                    value={buyer_existing_disputes || ""}
                    variant="standard"
                  >
                    {boolean.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell align="right">
                  {checkstatusBuyerDisputes(
                    buyer_existing_disputes_risk,
                    "Low",
                    "No: Disc. w/ AD; Pub. Sources"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusBuyerDisputes(
                    buyer_existing_disputes_risk,
                    "Medium",
                    "No: Disc. with Sup.; Pub. Sources"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusBuyerDisputes(
                    buyer_existing_disputes_risk,
                    "High",
                    "Yes"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Insurability by Our Carriers
                </TableCell>
                <TableCell align="right">
                  <Select
                    fullWidth
                    id="supplier_type"
                    onChange={(e) => setBuyer_insurance_status(e.target.value)}
                    required
                    value={buyer_insurance_status || ""}
                    variant="standard"
                  >
                    {insuranceStatus.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell align="right">
                  {checkstatusInsurance(
                    buyer_insurance_status_risk,
                    "Low",
                    "Standard Terms"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusInsurance(
                    buyer_insurance_status_risk,
                    "Medium",
                    "Restrictive Terms"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusInsurance(
                    buyer_insurance_status_risk,
                    "High",
                    "No insurance available"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Most Recent Country Downgrade
                </TableCell>
                <TableCell align="right">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      fullWidth
                      value={
                        buyer_country_year_of_rating_downgrade || new Date()
                      }
                      margin="normal"
                      variant="standard"
                      id="date_of_incorporation"
                      views={["year"]}
                      maxDate={new Date()}
                      onChange={(date) => {
                        setBuyer_country_year_of_rating_downgrade(date);
                      }}
                      required
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </TableCell>
                <TableCell align="right">
                  {checkstatusDowngrade(
                    buyer_country_year_of_rating_downgrade_risk,
                    "Low",
                    "2+ years ago"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusDowngrade(
                    buyer_country_year_of_rating_downgrade_risk,
                    "Medium",
                    "1-2 years ago"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusDowngrade(
                    buyer_country_year_of_rating_downgrade_risk,
                    "High",
                    "0-1 year ago"
                  )}
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow2}>
                <TableCell component="th" scope="row">
                  <Box fontWeight="fontWeightBold">
                    Supplier / Account Debtor Relationship
                  </Box>
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Length of Supplier/A/D Relationship
                </TableCell>
                <TableCell align="right">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      fullWidth
                      value={
                        buyer_supplier_year_business_relation_started ||
                        new Date()
                      }
                      margin="normal"
                      variant="standard"
                      id="date_of_incorporation"
                      views={["year"]}
                      maxDate={new Date()}
                      onChange={(date) => {
                        setBuyer_supplier_year_business_relation_started(date);
                      }}
                      required
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </TableCell>
                <TableCell align="right">
                  {checkstatusRelationship(
                    buyer_supplier_year_business_relation_started_risk,
                    "Low",
                    "5+ years"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusRelationship(
                    buyer_supplier_year_business_relation_started_risk,
                    "Medium",
                    "1-5 years"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusRelationship(
                    buyer_supplier_year_business_relation_started_risk,
                    "High",
                    "0-1 year"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Number of Invoices - RY
                </TableCell>
                <TableCell align="right">
                  <TextField
                    fullWidth
                    id="buyer_reporting_year_number_invoices"
                    onChange={(e) =>
                      setBuyer_reporting_year_number_invoices(e.target.value)
                    }
                    required
                    value={buyer_reporting_year_number_invoices || ""}
                    variant="standard"
                  />
                </TableCell>
                <TableCell align="right">
                  {checkstatusNumberInvoices(
                    buyer_reporting_year_number_invoices_risk,
                    "Low",
                    "12+"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusNumberInvoices(
                    buyer_reporting_year_number_invoices_risk,
                    "Medium",
                    "4-12"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusNumberInvoices(
                    buyer_reporting_year_number_invoices_risk,
                    "High",
                    "0-4"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Invoices Paid by ASD / Past 24 Mo
                </TableCell>
                <TableCell align="right">
                  <TextField
                    fullWidth
                    id="buyer_invoices_paid_on_time"
                    onChange={(e) =>
                      setBuyer_invoices_paid_on_time(e.target.value)
                    }
                    required
                    value={buyer_invoices_paid_on_time || ""}
                    variant="standard"
                  />
                </TableCell>
                <TableCell align="right">
                  {checkstatusInvoicesOT(
                    buyer_invoices_paid_on_time_risk,
                    "Low",
                    "100%"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusInvoicesOT(
                    buyer_invoices_paid_on_time_risk,
                    "Medium",
                    "90-100%"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusInvoicesOT(
                    buyer_invoices_paid_on_time_risk,
                    "High",
                    "0-90%"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Invoices Currently 30 Days PD{" "}
                </TableCell>
                <TableCell align="right">
                  <TextField
                    fullWidth
                    id="buyer_invoices_past_due_30_days"
                    onChange={(e) =>
                      setBuyer_invoices_past_due_30_days(e.target.value)
                    }
                    required
                    value={buyer_invoices_past_due_30_days || ""}
                    variant="standard"
                  />
                </TableCell>
                <TableCell align="right">
                  {checkstatusInvoicesPD30(
                    buyer_invoices_past_due_30_days_risk,
                    "Low",
                    "0-1%"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusInvoicesPD30(
                    buyer_invoices_past_due_30_days_risk,
                    "Medium",
                    "1-4%"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusInvoicesPD30(
                    buyer_invoices_past_due_30_days_risk,
                    "High",
                    "5+%"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Invoices Currently 60 Days PD
                </TableCell>
                <TableCell align="right">
                  <TextField
                    fullWidth
                    id="buyer_invoices_past_due_60_days"
                    onChange={(e) =>
                      setBuyer_invoices_past_due_60_days(e.target.value)
                    }
                    required
                    value={buyer_invoices_past_due_60_days || ""}
                    variant="standard"
                  />
                </TableCell>
                <TableCell align="right">
                  {checkstatusInvoicesPD60(
                    buyer_invoices_past_due_60_days_risk,
                    "Low",
                    "0-1%"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusInvoicesPD60(
                    buyer_invoices_past_due_60_days_risk,
                    "Medium",
                    "1-2%"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusInvoicesPD60(
                    buyer_invoices_past_due_60_days_risk,
                    "High",
                    "2+%"
                  )}
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow2}>
                <TableCell component="th" scope="row">
                  <Box fontWeight="fontWeightBold">
                    Importance of Purchased Goods to Account Debtor
                  </Box>
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Use of Purchased Goods
                </TableCell>
                <TableCell align="right">
                  <Select
                    fullWidth
                    id="buyer_use_of_goods_purchased"
                    onChange={(e) =>
                      setBuyer_use_of_goods_purchased(e.target.value)
                    }
                    required
                    value={buyer_use_of_goods_purchased || ""}
                    variant="standard"
                  >
                    {productUse.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell align="right">
                  {checkstatusProductUse(
                    buyer_use_of_goods_purchased_risk,
                    "Low",
                    "Direct Resale"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusProductUse(
                    buyer_use_of_goods_purchased_risk,
                    "Medium",
                    "Incorporation into Product"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusProductUse(
                    buyer_use_of_goods_purchased_risk,
                    "High",
                    "Other"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Inv. Total
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    fullWidth
                    variant="standard"
                    value={inventory || ""}
                    thousandSeparator={true}
                    decimalScale="2"
                    prefix={"$"}
                    customInput={TextField}
                    type="text"
                    onValueChange={(values) => {
                      const { formattedValue, value } = values;
                      setInventory(value);
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    onClick={() => updateProfitabilityPY()}
                  >
                    Update
                  </Button>
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  COGS
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    fullWidth
                    variant="standard"
                    value={cost_of_goods_sold || ""}
                    thousandSeparator={true}
                    decimalScale="2"
                    prefix={"$"}
                    customInput={TextField}
                    type="text"
                    onValueChange={(values) => {
                      const { formattedValue, value } = values;
                      setCost_of_goods_sold(value);
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    onClick={() => updateProfitabilityPY()}
                  >
                    Update
                  </Button>
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Inv. Total / AD COGS - RY
                </TableCell>
                <TableCell align="right">
                  <TextField
                    fullWidth
                    id="inventory_cost_of_goods_sold_ratio"
                    onChange={(e) =>
                      setInventory_cost_of_goods_sold_ratio(e.target.value)
                    }
                    required
                    value={inventory_cost_of_goods_sold_ratio || ""}
                    variant="standard"
                  />
                </TableCell>
                <TableCell align="right">
                  {checkstatusIVCogsRatio(
                    inventory_cost_of_goods_sold_ratio_risk,
                    "Low",
                    "5-20%"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusIVCogsRatio(
                    inventory_cost_of_goods_sold_ratio_risk,
                    "Medium",
                    "1-5% or 20-50%"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusIVCogsRatio(
                    inventory_cost_of_goods_sold_ratio_risk,
                    "High",
                    "0-1% or 50+%"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Sup. Sales - RY
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    fullWidth
                    variant="standard"
                    value={buyer_reporting_year_transaction_amount || ""}
                    thousandSeparator={true}
                    decimalScale="2"
                    prefix={"$"}
                    customInput={TextField}
                    type="text"
                    onValueChange={(values) => {
                      const { formattedValue, value } = values;
                      setBuyer_reporting_year_transaction_amount(value);
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Button variant="outlined" onClick={() => updateBuyer()}>
                    Update
                  </Button>
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Inv. Total / Sup. Sales - RY
                </TableCell>
                <TableCell align="right">
                  <TextField
                    fullWidth
                    id="inventory_buyer_transaction_amount_ratio"
                    onChange={(e) =>
                      setInventory_buyer_transaction_amount_ratio(
                        e.target.value
                      )
                    }
                    required
                    value={inventory_buyer_transaction_amount_ratio || ""}
                    variant="standard"
                  />
                </TableCell>
                <TableCell align="right">
                  {checkstatusIVSalesRatio(
                    inventory_buyer_transaction_amount_ratio_risk,
                    "Low",
                    "5-20%"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusIVSalesRatio(
                    inventory_buyer_transaction_amount_ratio_risk,
                    "Medium",
                    "1-5% or 20-50%"
                  )}
                </TableCell>
                <TableCell align="right">
                  {checkstatusIVSalesRatio(
                    inventory_buyer_transaction_amount_ratio_risk,
                    "High",
                    "0-1% or 50+%"
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </CardContent>
    </Card>
  );
};

Limits.propTypes = {
  className: PropTypes.string,
};

export default Limits;
