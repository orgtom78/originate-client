import NewInvestorFormModel from "./NewInvestorFormModel";
const {
  formField: {
    userId,
    identityId,
    investor_logo,
    investor_name,
    investor_type,
    investor_date_of_incorporation,
    investor_address_city,
    investor_address_street,
    investor_address_postalcode,
    investor_country,
    investor_industry,
    investor_registration_cert_attachment,
    investor_articles_of_association_attachment,
    investor_shareholder_list_attachment,
    investor_director_list_attachment,
    investor_register_number,
    investor_trading_name,
    investor_website,
    investor_address_refinment,
    investor_industry_code,
    director_name,
    director_email,
    director_phone_number,
    director_id_attachment,
    director_id_number,
    director_id_type,
    director_nationality,
    director_poa_attachment,
    director_country_of_residence,
    ubo_name,
    ubo_email,
    ubo_phone_number,
    ubo_id_attachment,
    ubo_id_number,
    ubo_id_type,
    ubo_nationality,
    ubo_poa_attachment,
    ubo_country_of_residence,
    buyerId,
    accounts_payable,
    accounts_receivable,
    cash,
    equity_book_value,
    equity_market_value,
    interest_expenses,
    inventory,
    retained_earnings,
    short_term_debt,
    working_capital,
    ebit,
    financials_attachment,
    net_profit,
    financials_rating,
    financials_reporting_period,
    sales,
    total_assets,
    total_liabilities,
  },
} = NewInvestorFormModel;

export default {
  [userId.name]: "",
  [identityId.name]: "",
  [investor_logo.name]: "",
  [investor_name.name]: "",
  [investor_trading_name.name]: "",
  [investor_website.name]: "",
  [investor_type.name]: "",
  [investor_date_of_incorporation.name]: "",
  [investor_address_city.name]: "",
  [investor_address_street.name]: "",
  [investor_address_postalcode.name]: "",
  [investor_address_refinment.name]: "",
  [investor_country.name]: undefined,
  [investor_industry.name]: undefined,
  [investor_industry_code.name]: undefined,
  [investor_register_number.name]: "",
  [investor_registration_cert_attachment.name]: "",
  [investor_articles_of_association_attachment.name]: "",
  [investor_shareholder_list_attachment.name]: "",
  [investor_director_list_attachment.name]: "",
  [director_name.name]: "",
  [director_email.name]: "",
  [director_phone_number.name]: "",
  [director_id_attachment.name]: "",
  [director_id_number.name]: "",
  [director_id_type.name]: "",
  [director_nationality.name]: undefined,
  [director_poa_attachment.name]: "",
  [director_country_of_residence.name]: undefined,
  [ubo_name.name]: "",
  [ubo_email.name]: "",
  [ubo_phone_number.name]: "",
  [ubo_id_attachment.name]: "",
  [ubo_id_number.name]: "",
  [ubo_id_type.name]: "",
  [ubo_nationality.name]: undefined,
  [ubo_poa_attachment.name]: "",
  [ubo_country_of_residence.name]: undefined,
  [ebit.name]: "",
  [financials_attachment.name]: "",
  [buyerId.name]: "",
  [net_profit.name]: "",
  [financials_rating.name]: "",
  [financials_reporting_period.name]: "",
  [sales.name]: "",
  [total_assets.name]: "",
  [total_liabilities.name]: "",
  [accounts_payable.name]: "",
  [accounts_receivable.name]: "",
  [cash.name]: "",
  [equity_book_value.name]: "",
  [equity_market_value.name]: "",
  [interest_expenses.name]: "",
  [inventory.name]: "",
  [retained_earnings.name]: "",
  [short_term_debt.name]: "",
  [working_capital.name]: "",
};
