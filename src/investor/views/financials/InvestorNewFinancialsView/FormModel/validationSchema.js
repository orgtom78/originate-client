import * as Yup from "yup";
import NewFinancialsFormModel from "./NewFinancialsFormModel";
const {
  formField: {
    supplierId,
    buyerId,
    identityId,
    balance_sheet_attachment,
    income_statement_attachment,
    financials_reporting_period,
    cash,
    accounts_receivable,
    inventory,
    other_current_assets,
    sale_purchase_of_fixed_asset,
    goodwill,
    other_non_current_assets,
    accounts_payable,
    current_long_term_debt,
    other_current_liabilities,
    long_term_debt,
    other_long_term_liabilities,
    total_equity,
    total_liabilities_and_equity,
    sales,
    cost_of_goods_sold,
    depreciation_expenses,
    operating_expenses,
    interest_expenses,
    other_expenses,
    income_tax_expense,
    extraordinary_income,
    cash_flow_from_operating_activities,
    inventory_turnover
  },
} = NewFinancialsFormModel;

const yup = [
  Yup.object().shape({
    [financials_reporting_period.name]: Yup.string().required(
      `${financials_reporting_period.requiredErrorMsg}`
    ),
    [supplierId.name]: Yup.string(),
    [buyerId.name]: Yup.string(),
    [identityId.name]: Yup.string(),
    [balance_sheet_attachment.name]: Yup.string(),
    [cash.name]: Yup.string(),
    [accounts_receivable.name]: Yup.string(),
    [inventory.name]: Yup.string(),
    [other_current_assets.name]: Yup.string(),
    [sale_purchase_of_fixed_asset.name]: Yup.string(),
    [goodwill.name]: Yup.string(),
    [other_non_current_assets.name]: Yup.string(),
    [accounts_payable.name]: Yup.string(),
    [current_long_term_debt.name]: Yup.string(),
    [other_current_liabilities.name]: Yup.string(),
    [long_term_debt.name]: Yup.string(),
    [other_long_term_liabilities.name]: Yup.string(),
    [total_equity.name]: Yup.string(),
    [total_liabilities_and_equity.name]: Yup.string(),
  }),

  Yup.object().shape({
    [income_statement_attachment.name]: Yup.string(),
    [sales.name]: Yup.string(),
    [cost_of_goods_sold.name]: Yup.string(),
    [depreciation_expenses.name]: Yup.string(),
    [operating_expenses.name]: Yup.string(),
    [interest_expenses.name]: Yup.string(),
    [other_expenses.name]: Yup.string(),
    [income_tax_expense.name]: Yup.string(),
    [extraordinary_income.name]: Yup.string(),
    [cash_flow_from_operating_activities.name]: Yup.string(),
    [inventory_turnover.name]: Yup.string(),
  }),
];

export default yup;
