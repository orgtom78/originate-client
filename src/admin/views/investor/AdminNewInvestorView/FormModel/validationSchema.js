import * as Yup from "yup";
import moment from "moment";
import NewInvestorFormModel from "./NewInvestorFormModel";
const {
  formField: {
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

const yup = [
  Yup.object().shape({
    [investor_logo.name]: Yup.string(),
    [investor_name.name]: Yup.string().required(
      `${investor_name.requiredErrorMsg}`
    ),
    [investor_trading_name.name]: Yup.string(),
    [investor_website.name]: Yup.string(),
    [investor_type.name]: Yup.string().required(
      `${investor_type.requiredErrorMsg}`
    ),
    [investor_date_of_incorporation.name]: Yup.string()
      .required(`${investor_date_of_incorporation.requiredErrorMsg}`)
      .test(
        "incdate",
        investor_date_of_incorporation.invalidErrorMsg,
        (val) => {
          if (val) {
            const startDate = new Date(1900, 11, 31);
            const endDate = new Date();
            if (moment(val, moment.ISO_8601).isValid()) {
              return moment(val).isBetween(startDate, endDate);
            }
            return false;
          }
          return false;
        }
      ),
    [investor_address_city.name]: Yup.string().required(
      `${investor_address_city.requiredErrorMsg}`
    ),
    [investor_address_street.name]: Yup.string().required(
      `${investor_address_street.requiredErrorMsg}`
    ),
    [investor_address_postalcode.name]: Yup.string()
      .required(`${investor_address_postalcode.requiredErrorMsg}`)
      .test(
        "len",
        `${investor_address_postalcode.invalidErrorMsg}`,
        (val) => val && val.length === 5
      ),
    [investor_address_refinment.name]: Yup.string(),
    [investor_country.name]: Yup.string().required(
      `${investor_country.requiredErrorMsg}`
    ),
    [investor_industry.name]: Yup.string().required(
      `${investor_industry.requiredErrorMsg}`
    ),
    [investor_industry_code.name]: Yup.string(),
    [investor_register_number.name]: Yup.string(),
    [investor_registration_cert_attachment.name]: Yup.string(),
    [investor_articles_of_association_attachment.name]: Yup.string(),
    [investor_shareholder_list_attachment.name]: Yup.string(),
    [investor_director_list_attachment.name]: Yup.string(),
  }),

  Yup.object().shape({
    [director_name.name]: Yup.string(),
    [director_email.name]: Yup.string(),
    [director_phone_number.name]: Yup.string(),
    [director_id_attachment.name]: Yup.string(),
    [director_id_number.name]: Yup.string(),
    [director_id_type.name]: Yup.string(),
    [director_nationality.name]: Yup.string(),
    [director_poa_attachment.name]: Yup.string(),
    [director_country_of_residence.name]: Yup.string(),
    [ubo_name.name]: Yup.string(),
    [ubo_email.name]: Yup.string(),
    [ubo_phone_number.name]: Yup.string(),
    [ubo_id_attachment.name]: Yup.string(),
    [ubo_id_number.name]: Yup.string(),
    [ubo_id_type.name]: Yup.string(),
    [ubo_nationality.name]: Yup.string(),
    [ubo_poa_attachment.name]: Yup.string(),
    [ubo_country_of_residence.name]: Yup.string(),
  }),

  Yup.object().shape({
    [accounts_payable.name]: Yup.string(),
    [accounts_receivable.name]: Yup.string(),
    [cash.name]: Yup.string(),
    [equity_book_value.name]: Yup.string(),
    [equity_market_value.name]: Yup.string(),
    [interest_expenses.name]: Yup.string(),
    [inventory.name]: Yup.string(),
    [retained_earnings.name]: Yup.string(),
    [short_term_debt.name]: Yup.string(),
    [working_capital.name]: Yup.string(),
    [ebit.name]: Yup.string(),
    [financials_attachment.name]: Yup.string(),
    [net_profit.name]: Yup.string(),
    [financials_rating.name]: Yup.string(),
    [financials_reporting_period.name]: Yup.string()
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
    [sales.name]: Yup.string(),
    [total_assets.name]: Yup.string(),
    [total_liabilities.name]: Yup.string(),
  }),
];

export default yup;
