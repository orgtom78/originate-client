import * as Yup from "yup";
import moment from "moment";
import NewBuyerFormModel from "./NewBuyerFormModel";
const {
  formField: {
    investorId,
    buyer_address_city,
    buyer_address_number,
    buyer_address_postalcode,
    buyer_address_street,
    buyer_name,
    buyer_country,
    buyer_website,
    buyer_currency,
    buyer_loan_request_amount,
    buyer_one_off_ipu_attachment,
    buyer_contact_email,
    sales,
    financials_status,
    financials_denomination,
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
    buyer_reporting_year,
    financials_reporting_period,
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

const yup = [
  Yup.object().shape({
    [investorId.name]: Yup.string().required(`${investorId.requiredErrorMsg}`),
    [buyer_address_city.name]: Yup.string().required(
      `${buyer_address_city.requiredErrorMsg}`
    ),
    [buyer_address_number.name]: Yup.string(),
    [buyer_address_postalcode.name]: Yup.string()
      .required(`${buyer_address_postalcode.requiredErrorMsg}`),
    [buyer_address_street.name]: Yup.string().required(
      `${buyer_address_street.requiredErrorMsg}`
    ),
    [buyer_name.name]: Yup.string().required(`${buyer_name.requiredErrorMsg}`),
    [buyer_country.name]: Yup.string().required(
      `${buyer_country.requiredErrorMsg}`
    ),
    [buyer_website.name]: Yup.string().required(
      `${buyer_website.requiredErrorMsg}`
    ),
    [buyer_currency.name]: Yup.string().nullable(),
    [buyer_loan_request_amount.name]: Yup.number().required(
      `${buyer_loan_request_amount.requiredErrorMsg}`
    ),
    [buyer_payment_terms.name]: Yup.string().required(
      `${buyer_payment_terms.requiredErrorMsg}`
    ),
    [buyer_sample_trading_docs_attachment.name]: Yup.string(),
    [buyer_date_of_incorporation.name]: Yup.string().required(
      `${buyer_date_of_incorporation.requiredErrorMsg}`
    ),
    [buyer_contact_email.name]: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required(
      `${buyer_date_of_incorporation.requiredErrorMsg}`
    ),
  }),

  Yup.object().shape({
    [ebit.name]: Yup.number().nullable(),
    [balance_sheet_attachment.name]: Yup.string(),
    [income_statement_attachment.name]: Yup.string(),
    [net_profit.name]: Yup.number().nullable(),
    [financials_reporting_period.name]: Yup.string()
      .nullable()
      .required(`${financials_reporting_period.requiredErrorMsg}`)
      .test("incdate", financials_reporting_period.invalidErrorMsg, (val) => {
        if (val) {
          const startDate = new Date(2018, 11, 31);
          const endDate = new Date();
          if (moment(val, moment.ISO_8601).isValid()) {
            return moment(val).isBetween(startDate, endDate);
          }
          return false;
        }
        return false;
      }),
    [financials_denomination.name]: Yup.string(),
    [sales.name]: Yup.number().nullable(),
    [financials_status.name]: Yup.string(),
    [net_profit.name]: Yup.number().nullable(),
    [total_equity.name]: Yup.number().nullable(),
    [net_operating_loss.name]: Yup.number().nullable(),
    [cash_flow_from_operating_activities.name]: Yup.number().nullable(),
    [current_assets.name]: Yup.number().nullable(),
    [current_liabilities.name]: Yup.number().nullable(),
    [inventory_beginning.name]: Yup.number().nullable(),
    [inventory_end.name]: Yup.number().nullable(),
    [cost_of_goods_sold.name]: Yup.number().nullable(),
    [interest_expenses.name]: Yup.number().nullable(),
    [inventory.name]: Yup.number().nullable(),
  }),

  Yup.object().shape({
    [buyer_insurance_name.name]: Yup.string(),
    [buyer_one_off_ipu_attachment.name]: Yup.string(),
    [buyer_next_year_projected_transaction_amount.name]: Yup.number().required(
      `${buyer_next_year_projected_transaction_amount.requiredErrorMsg}`
    ),
    [buyer_previous_year_transaction_amount.name]: Yup.number().required(
      `${buyer_previous_year_transaction_amount.requiredErrorMsg}`
    ),
    [buyer_reporting_year.name]: Yup.string().required(
      `${buyer_reporting_year.requiredErrorMsg}`
    ),
    [buyer_reporting_year_transaction_amount.name]: Yup.number().required(
      `${buyer_reporting_year_transaction_amount.requiredErrorMsg}`
    ),
    [buyer_previous_year_number_invoices.name]: Yup.number().required(
      `${buyer_previous_year_number_invoices.requiredErrorMsg}`
    ),
    [buyer_existing_disputes.name]: Yup.string(),
    [buyer_existing_disputes_source.name]: Yup.string(),
    [buyer_insurance_status.name]: Yup.string(),
    [buyer_country_year_of_rating_downgrade.name]: Yup.string().nullable(),
    [buyer_finance_department_contact_exists.name]: Yup.string(),
    [buyer_finance_department_contact_email.name]: Yup.string(),
    [buyer_field_visit_conducted.name]: Yup.string().nullable(),
    [buyer_supplier_year_business_relation_started.name]:
      Yup.string().nullable(),
    [buyer_invoices_paid_on_time.name]: Yup.number().nullable(),
    [buyer_invoices_past_due.name]: Yup.number().nullable(),
    [buyer_invoices_past_due_30_days.name]: Yup.number().nullable(),
    [buyer_invoices_past_due_60_days.name]: Yup.number().nullable(),
    [buyer_invoices_past_due_90_days.name]: Yup.number().nullable(),
    [buyer_use_of_goods_purchased.name]: Yup.string().nullable(),
  }),
];

export default yup;
