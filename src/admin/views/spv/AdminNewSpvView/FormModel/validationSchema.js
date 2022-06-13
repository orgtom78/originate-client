import * as Yup from "yup";
import moment from "moment";
import NewSpvFormModel from "./NewSpvFormModel";
const {
  formField: {
    spv_logo,
    spv_name,
    spv_type,
    spv_date_of_incorporation,
    spv_address_city,
    spv_address_street,
    spv_address_postalcode,
    spv_country,
    spv_industry,
    spv_registration_cert_attachment,
    spv_articles_of_association_attachment,
    spv_shareholder_list_attachment,
    spv_director_list_attachment,
    spv_register_number,
    spv_trading_name,
    spv_website,
    spv_address_refinment,
    spv_industry_code,
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
} = NewSpvFormModel;

const yup = [
  Yup.object().shape({
    [spv_logo.name]: Yup.string(),
    [spv_name.name]: Yup.string().required(
      `${spv_name.requiredErrorMsg}`
    ),
    [spv_trading_name.name]: Yup.string(),
    [spv_website.name]: Yup.string(),
    [spv_type.name]: Yup.string().required(
      `${spv_type.requiredErrorMsg}`
    ),
    [spv_date_of_incorporation.name]: Yup.string()
      .required(`${spv_date_of_incorporation.requiredErrorMsg}`)
      .test(
        "incdate",
        spv_date_of_incorporation.invalidErrorMsg,
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
    [spv_address_city.name]: Yup.string().required(
      `${spv_address_city.requiredErrorMsg}`
    ),
    [spv_address_street.name]: Yup.string().required(
      `${spv_address_street.requiredErrorMsg}`
    ),
    [spv_address_postalcode.name]: Yup.string()
      .required(`${spv_address_postalcode.requiredErrorMsg}`),
    [spv_address_refinment.name]: Yup.string(),
    [spv_country.name]: Yup.string().required(
      `${spv_country.requiredErrorMsg}`
    ),
    [spv_industry.name]: Yup.string().required(
      `${spv_industry.requiredErrorMsg}`
    ),
    [spv_industry_code.name]: Yup.string(),
    [spv_register_number.name]: Yup.string(),
    [spv_registration_cert_attachment.name]: Yup.string(),
    [spv_articles_of_association_attachment.name]: Yup.string(),
    [spv_shareholder_list_attachment.name]: Yup.string(),
    [spv_director_list_attachment.name]: Yup.string(),
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
