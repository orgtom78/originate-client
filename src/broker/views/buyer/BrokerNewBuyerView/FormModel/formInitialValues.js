import NewBuyerFormModel from "./NewBuyerFormModel";
const {
  formField: {
    buyer_address_city,
    buyer_address_number,
    buyer_address_postalcode,
    buyer_address_street,
    buyer_name,
    buyer_country,
    buyer_website,
    buyer_contact_email,
    buyer_currency,
    buyer_loan_request_amount,
    buyer_one_off_ipu_attachment,
    sales,
    financials_status,
    net_profit,
    total_equity,
    net_operating_loss,
    cash_flow_from_operating_activities,
    current_assets,
    current_liabilities,
    inventory_beginning,
    inventory_end,
    cost_of_goods_sold,
    ebit,
    interest_expenses,
    buyer_existing_disputes,
    buyer_existing_disputes_source,
    buyer_insurance_name,
    buyer_insurance_status,
    buyer_country_year_of_rating_downgrade,
    buyer_finance_department_contact_exists,
    buyer_finance_department_contact_email,
    buyer_field_visit_conducted,
    buyer_supplier_year_business_relation_started,
    financials_reporting_period,
    financials_denomination,
    buyer_previous_year_transaction_amount,
    buyer_reporting_year_transaction_amount,
    buyer_previous_year_number_invoices,
    buyer_next_year_projected_transaction_amount,
    buyer_invoices_paid_on_time,
    buyer_invoices_past_due,
    buyer_invoices_past_due_30_days,
    buyer_invoices_past_due_60_days,
    buyer_invoices_past_due_90_days,
    buyer_use_of_goods_purchased,
    inventory,
    buyer_payment_terms,
    buyer_sample_trading_docs_attachment,
    balance_sheet_attachment,
    income_statement_attachment,
    buyer_date_of_incorporation,
  },
} = NewBuyerFormModel;

const values = {
  [buyer_address_city.name]: "",
  [buyer_address_number.name]: "",
  [buyer_address_street.name]: "",
  [buyer_address_postalcode.name]: "",
  [buyer_country.name]: undefined,
  [buyer_website.name]: "",
  [buyer_name.name]: "",
  [buyer_currency.name]: undefined,
  [buyer_insurance_name.name]: "",
  [buyer_loan_request_amount.name]: "",
  [buyer_one_off_ipu_attachment.name]: "",
  [buyer_next_year_projected_transaction_amount.name]: "",
  [buyer_payment_terms.name]: "",
  [buyer_previous_year_transaction_amount.name]: "",
  [buyer_reporting_year_transaction_amount.name]: "",
  [buyer_previous_year_number_invoices.name]: "",
  [buyer_contact_email.name]: "",
  [buyer_sample_trading_docs_attachment.name]: "",
  [ebit.name]: "",
  [balance_sheet_attachment.name]: "",
  [income_statement_attachment.name]: "",
  [net_profit.name]: "",
  [financials_reporting_period.name]: "",
  [financials_denomination.name]: "",
  [sales.name]: "",
  [financials_status.name]: "",
  [total_equity.name]: "",
  [net_operating_loss.name]: "",
  [cash_flow_from_operating_activities.name]: "",
  [current_assets.name]: "",
  [current_liabilities.name]: "",
  [inventory_beginning.name]: "",
  [inventory_end.name]: "",
  [cost_of_goods_sold.name]: "",
  [interest_expenses.name]: "",
  [buyer_existing_disputes.name]: "",
  [buyer_existing_disputes_source.name]: "",
  [buyer_insurance_name.name]: "",
  [buyer_insurance_status.name]: "",
  [buyer_country_year_of_rating_downgrade.name]: "",
  [buyer_finance_department_contact_exists.name]: "",
  [buyer_finance_department_contact_email.name]: "",
  [buyer_field_visit_conducted.name]: "",
  [buyer_supplier_year_business_relation_started.name]: "",
  [buyer_invoices_paid_on_time.name]: "",
  [buyer_invoices_past_due.name]: "",
  [buyer_invoices_past_due_30_days.name]: "",
  [buyer_invoices_past_due_60_days.name]: "",
  [buyer_invoices_past_due_90_days.name]: "",
  [buyer_use_of_goods_purchased.name]: "",
  [inventory.name]: "",
  [buyer_date_of_incorporation.name]: "",
}
export default values;