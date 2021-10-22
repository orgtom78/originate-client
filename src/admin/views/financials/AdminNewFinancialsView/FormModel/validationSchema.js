import * as Yup from "yup";
import NewFinancialsFormModel from "./NewFinancialsFormModel";
const {
  formField: {
    supplierId,
    buyerId,
    identityId,
    financials_attachment,
    balance_sheet_attachment,
    income_statement_attachment,
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
} = NewFinancialsFormModel;

export default [
  Yup.object().shape({
    [supplierId.name]: Yup.string(),
    [buyerId.name]: Yup.string(),
    [identityId.name]: Yup.string(),
    [financials_attachment.name]: Yup.string(),
    [balance_sheet_attachment.name]: Yup.string(),
    [income_statement_attachment.name]: Yup.string(),
    [marketable_securities.name]: Yup.string(),
    [accounts_receivable.name]: Yup.string(),
    [inventory.name]: Yup.string(),
    [goodwill.name]: Yup.string(),
    [other_current_assets.name]: Yup.string(),
    [other_non_current_assets.name]: Yup.string(),
    [accumulated_depreciation.name]: Yup.string(),
    [total_assets.name]: Yup.string(),
    [short_term_debt.name]: Yup.string(),
    [accounts_payable.name]: Yup.string(),
    [accured_expenses.name]: Yup.string(),
    [unearned_revenue.name]: Yup.string(),
    [long_term_debt.name]: Yup.string(),
    [other_current_liabilities.name]: Yup.string(),
    [other_long_term_liabilities.name]: Yup.string(),
    [income_tax_payable.name]: Yup.string(),
    [dividends_payable.name]: Yup.string(),
    [total_liabilities.name]: Yup.string(),
    [common_stock.name]: Yup.string(),
    [preferred_stock.name]: Yup.string(),
    [paid_in_capital.name]: Yup.string(),
    [retained_earnings.name]: Yup.string(),
    [total_equity.name]: Yup.string(),
    [equity_book_value.name]: Yup.string(),
    [equity_market_value.name]: Yup.string(),
  }),

  Yup.object().shape({
    [sales.name]: Yup.string(),
    [cost_of_goods_sold.name]: Yup.string(),
    [operating_expenses.name]: Yup.string(),
    [marketing_expenses.name]: Yup.string(),
    [bad_debt_expenses.name]: Yup.string(),
    [ebit.name]: Yup.string(),
    [interest_expenses.name]: Yup.string(),
    [depreciation_expenses.name]: Yup.string(),
    [sale_purchase_of_fixed_asset.name]: Yup.string(),
    [extraordinary_income.name]: Yup.string(),
    [tax_expenses.name]: Yup.string(),
    [net_profit.name]: Yup.string(),
    [financials_rating.name]: Yup.string(),
    [financials_reporting_period.name]: Yup.string(),
    [cash.name]: Yup.string(),
    [working_capital.name]: Yup.string(),
  }),
];