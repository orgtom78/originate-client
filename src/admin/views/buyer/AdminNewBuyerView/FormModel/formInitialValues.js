import NewBuyerFormModel from "./NewBuyerFormModel";
const {
  formField: {
    userId,
    investorId,
    identityId,
    supplierId,
    buyer_address_city,
    buyer_address_number,
    buyer_address_postalcode,
    buyer_address_street,
    buyer_name,
    buyer_country,
    buyer_website,
    buyer_currency,
    buyer_insurance_name,
    buyer_loan_request_amount,
    buyer_one_off_ipu_attachment,
    buyer_next_year_projected_transaction_amount,
    buyer_payment_terms,
    buyer_previous_year_transaction_amount,
    buyer_reporting_year,
    buyer_reporting_year_transaction_amount,
    buyer_previous_year_number_invoices,
    buyer_sample_trading_docs_attachment,
    buyer_sold_goods_description,
    ebit,
    financials_attachment,
    net_profit,
    financials_rating,
    financials_reporting_period,
    sales,
    total_assets,
  },
} = NewBuyerFormModel;

export default {
  [userId.name]: "",
  [identityId.name]: "",
  [investorId.name]: "",
  [supplierId.name]: "",
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
  [buyer_reporting_year.name]: "",
  [buyer_reporting_year_transaction_amount.name]: "",
  [buyer_previous_year_number_invoices.name]: "",
  [buyer_sample_trading_docs_attachment.name]: "",
  [buyer_sold_goods_description.name]: "",
  [ebit.name]: "",
  [financials_attachment.name]: "",
  [net_profit.name]: "",
  [financials_rating.name]: "",
  [financials_reporting_period.name]: "",
  [sales.name]: "",
  [total_assets.name]: "",
};