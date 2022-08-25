import React, { useState, useEffect } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { Box, Card, CardContent, Grid } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const Limits = ({ className, value, ...rest }) => {
  const [financials, setFinancials] = useState([]);
  const [financials2, setFinancials2] = useState([]);
  const [financials3, setFinancials3] = useState([]);

  useEffect(() => {
    async function get1() {
      try {
        const data = await value;
        const s = data.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return (
            new Date(b.financials_reporting_period) -
            new Date(a.financials_reporting_period)
          );
        });
        console.log(s);
        const a = await s[0];
        if (a !== undefined) {
          setFinancials(a);
        }
        return;
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    get1();
  }, [value]);

  useEffect(() => {
    async function get2() {
      try {
        const data = await value;
        const s = data.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return (
            new Date(b.financials_reporting_period) -
            new Date(a.financials_reporting_period)
          );
        });
        const a = await s[1];
        if (a !== undefined) {
          setFinancials2(a);
        }
        return;
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    get2();
  }, [value]);

  useEffect(() => {
    async function get3() {
      try {
        const data = await value;
        const s = data.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return (
            new Date(b.financials_reporting_period) -
            new Date(a.financials_reporting_period)
          );
        });
        const a = await s[2];
        if (a !== undefined) {
          setFinancials3(a);
        }
        return;
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    get3();
  }, [value]);

  const columns = [
    {
      field: "value",
      headerName: "",
      minWidth: 300,
      editable: false,
    },
    {
      field: "year1",
      headerName: moment(financials.financials_reporting_period).format("YYYY"),
      type: "number",
      minWidth: 300,
      editable: false,
    },
    {
      field: "year2",
      headerName: moment(financials2.financials_reporting_period).format(
        "YYYY"
      ),
      type: "number",
      minWidth: 300,
      editable: false,
    },
    {
      field: "year3",
      headerName: moment(financials3.financials_reporting_period).format(
        "YYYY"
      ),
      type: "number",
      minWidth: 300,
      editable: false,
    },
  ];

  const rows = [
    { id: 1, value: "Balance Sheet", year1: "", year2: "", year3: "" },
    {
      id: 2,
      value: "Cash",
      year1: Number(financials.cash),
      year2: Number(financials2.cash),
      year3: Number(financials3.cash),
    },
    {
      id: 3,
      value: "Accounts Receivable",
      year1: Number(financials.accounts_receivable),
      year2: Number(financials2.accounts_receivable),
      year3: Number(financials3.accounts_receivable),
    },
    {
      id: 4,
      value: "Inventory",
      year1: Number(financials.inventory),
      year2: Number(financials2.inventory),
      year3: Number(financials3.inventory),
    },
    {
      id: 5,
      value: "Other Current Assets",
      year1: Number(financials.other_current_assets),
      year2: Number(financials2.other_current_assets),
      year3: Number(financials3.other_current_assets),
    },
    {
      id: 6,
      value: "Current Assets",
      year1: Number(financials.current_assets),
      year2: Number(financials2.current_assets),
      year3: Number(financials3.current_assets),
    },
    {
      id: 7,
      value: "Fixed Assets (PPE)",
      year1: Number(financials.sale_purchase_of_fixed_asset),
      year2: Number(financials2.sale_purchase_of_fixed_asset),
      year3: Number(financials3.sale_purchase_of_fixed_asset),
    },
    {
      id: 8,
      value: "Goodwill/Intangibles",
      year1: Number(financials.goodwill),
      year2: Number(financials2.goodwill),
      year3: Number(financials3.goodwill),
    },
    {
      id: 9,
      value: "Other Non-current Assets",
      year1: Number(financials.other_non_current_assets),
      year2: Number(financials2.other_non_current_assets),
      year3: Number(financials3.other_non_current_assets),
    },
    {
      id: 10,
      value: "Total Assets",
      year1: Number(financials.total_assets),
      year2: Number(financials2.total_assets),
      year3: Number(financials3.total_assets),
    },
    {
      id: 11,
      value: "Accounts Payable",
      year1: Number(financials.accounts_payable),
      year2: Number(financials2.accounts_payable),
      year3: Number(financials3.accounts_payable),
    },
    {
      id: 12,
      value: "Current Portion of Long-Term Debt",
      year1: Number(financials.current_long_term_debt),
      year2: Number(financials2.current_long_term_debt),
      year3: Number(financials3.current_long_term_debt),
    },
    {
      id: 13,
      value: "Other Current Liabilities",
      year1: Number(financials.other_current_liabilities),
      year2: Number(financials2.other_current_liabilities),
      year3: Number(financials3.other_current_liabilities),
    },
    {
      id: 14,
      value: "Current Liabilities",
      year1: Number(financials.current_liabilities),
      year2: Number(financials2.current_liabilities),
      year3: Number(financials3.current_liabilities),
    },
    {
      id: 15,
      value: "Long Term Debt",
      year1: Number(financials.long_term_debt),
      year2: Number(financials2.long_term_debt),
      year3: Number(financials3.long_term_debt),
    },
    {
      id: 16,
      value: "Other Long Term Liabilities",
      year1: Number(financials.other_long_term_liabilities),
      year2: Number(financials2.other_long_term_liabilities),
      year3: Number(financials3.other_long_term_liabilities),
    },
    {
      id: 17,
      value: "Total Liabilities",
      year1: Number(financials.total_liabilities),
      year2: Number(financials2.total_liabilities),
      year3: Number(financials3.total_liabilities),
    },
    {
      id: 18,
      value: "Equity",
      year1: Number(financials.total_equity),
      year2: Number(financials2.total_equity),
      year3: Number(financials3.total_equity),
    },
    {
      id: 19,
      value: "Total Liabilities and Equity",
      year1: Number(financials.total_liabilities_and_equity),
      year2: Number(financials2.total_liabilities_and_equity),
      year3: Number(financials3.total_liabilities_and_equity),
    },
    {
      id: 20,
      value: "Income Statement",
      year1: "",
      year2: "",
      year3: "",
    },
    {
      id: 21,
      value: "Sales",
      year1: Number(financials.sales),
      year2: Number(financials2.sales),
      year3: Number(financials3.sales),
    },
    {
      id: 22,
      value: "Cost of Goods Sold",
      year1: Number(financials.cost_of_goods_sold),
      year2: Number(financials2.cost_of_goods_sold),
      year3: Number(financials3.cost_of_goods_sold),
    },
    {
      id: 23,
      value: "Gross Margin",
      year1: Number(financials.gross_margin),
      year2: Number(financials2.gross_margin),
      year3: Number(financials3.gross_margin),
    },
    {
      id: 24,
      value: "Depreciation",
      year1: Number(financials.depreciation_expenses),
      year2: Number(financials2.depreciation_expenses),
      year3: Number(financials3.depreciation_expenses),
    },
    {
      id: 25,
      value: "Operating Expenses",
      year1: Number(financials.operating_expenses),
      year2: Number(financials2.operating_expenses),
      year3: Number(financials3.operating_expenses),
    },
    {
      id: 26,
      value: "Operating Income",
      year1: Number(financials.operating_income),
      year2: Number(financials2.operating_income),
      year3: Number(financials3.operating_income),
    },
    {
      id: 27,
      value: "Other Expenses",
      year1: Number(financials.other_expenses),
      year2: Number(financials2.other_expenses),
      year3: Number(financials3.other_expenses),
    },
    {
      id: 28,
      value: "EBIT",
      year1: Number(financials.ebit),
      year2: Number(financials2.ebit),
      year3: Number(financials3.ebit),
    },
    {
      id: 29,
      value: "Interest Expenses",
      year1: Number(financials.interest_expenses),
      year2: Number(financials2.interest_expenses),
      year3: Number(financials3.interest_expenses),
    },
    {
      id: 30,
      value: "EBT",
      year1: Number(financials.ebt),
      year2: Number(financials2.ebt),
      year3: Number(financials3.ebt),
    },
    {
      id: 31,
      value: "Income Tax Expenses",
      year1: Number(financials.income_tax_expense),
      year2: Number(financials2.income_tax_expense),
      year3: Number(financials3.income_tax_expense),
    },
    {
      id: 32,
      value: "Extraordinary Income/Expense",
      year1: Number(financials.extraordinary_income),
      year2: Number(financials2.extraordinary_income),
      year3: Number(financials3.extraordinary_income),
    },
    {
      id: 33,
      value: "Net Profit",
      year1: Number(financials.net_profit),
      year2: Number(financials2.net_profit),
      year3: Number(financials3.net_profit),
    },
    {
      id: 34,
      value: "Cash Flow from Operations",
      year1: Number(financials.cash_flow_from_operating_activities),
      year2: Number(financials2.cash_flow_from_operating_activitiest),
      year3: Number(financials3.cash_flow_from_operating_activities),
    },
  ];

  return (
    <Card>
      <CardContent>
        <Grid item>
          <Box sx={{ height: 400, width: "100%" }}>
            <div style={{ display: "flex", height: "100%" }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid
                  components={{
                    Toolbar: GridToolbar,
                  }}
                  componentsProps={{
                    toolbar: { showQuickFilter: true },
                  }}
                  rows={rows}
                  columns={columns}
                  pageSize={40}
                  rowsPerPageOptions={[20]}
                  checkboxSelection
                  disableSelectionOnClick
                />
              </div>
            </div>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};

Limits.propTypes = {
  className: PropTypes.string,
};

export default Limits;
