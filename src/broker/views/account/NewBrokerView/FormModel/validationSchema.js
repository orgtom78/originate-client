import * as Yup from "yup";
import moment from "moment";
import NewBrokerFormModel from "./NewBrokerFormModel";
const {
  formField: {
    broker_logo,
    broker_name,
    broker_type,
    broker_date_of_incorporation,
    broker_address_city,
    broker_address_street,
    broker_address_number,
    broker_address_postalcode,
    broker_country,
    broker_industry,
    broker_registration_cert_attachment,
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
    ebit,
    income_statement_attachment,
    balance_sheet_attachment,
    net_profit,
    financials_reporting_period,
    sales,
    retained_earnings,
    working_capital,
    total_assets,
    bank_account_number,
    bank_account_sortcode,
    bank_country,
    bank_name,
    bank_routing_number,
    bic_swift_code,
    iban,
  },
} = NewBrokerFormModel;

const yup = [
  Yup.object().shape({
    [broker_logo.name]: Yup.string(),
    [broker_name.name]: Yup.string().required(
      `${broker_name.requiredErrorMsg}`
    ),
    [broker_type.name]: Yup.string().required(
      `${broker_type.requiredErrorMsg}`
    ),
    [broker_date_of_incorporation.name]: Yup.string()
      .required(`${broker_date_of_incorporation.requiredErrorMsg}`)
      .test(
        "incdate",
        broker_date_of_incorporation.invalidErrorMsg,
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
    [broker_address_city.name]: Yup.string().required(
      `${broker_address_city.requiredErrorMsg}`
    ),
    [broker_address_street.name]: Yup.string().required(
      `${broker_address_street.requiredErrorMsg}`
    ),
    [broker_address_number.name]: Yup.number(),
    [broker_address_postalcode.name]: Yup.string()
      .required(`${broker_address_postalcode.requiredErrorMsg}`),
    [broker_country.name]: Yup.string().required(
      `${broker_country.requiredErrorMsg}`
    ),
    [broker_industry.name]: Yup.string().required(
      `${broker_industry.requiredErrorMsg}`
    ),
    [broker_registration_cert_attachment.name]: Yup.string().required(
      `${broker_registration_cert_attachment.requiredErrorMsg}`
    ),
  }),

  Yup.object().shape({
    [director_name.name]: Yup.string().required(
      `${director_name.requiredErrorMsg}`
    ),
    [director_email.name]: Yup.string().email(),
    [director_phone_number.name]: Yup.string(),
    [director_id_attachment.name]: Yup.string(),
    [director_id_number.name]: Yup.string(),
    [director_id_type.name]: Yup.string(),
    [director_nationality.name]: Yup.string(),
    [director_poa_attachment.name]: Yup.string(),
    [director_country_of_residence.name]: Yup.string(),
    [ubo_name.name]: Yup.string().required(`${ubo_name.requiredErrorMsg}`),
    [ubo_email.name]: Yup.string().email(),
    [ubo_phone_number.name]: Yup.string(),
    [ubo_id_attachment.name]: Yup.string(),
    [ubo_id_number.name]: Yup.string(),
    [ubo_id_type.name]: Yup.string(),
    [ubo_nationality.name]: Yup.string(),
    [ubo_poa_attachment.name]: Yup.string(),
    [ubo_country_of_residence.name]: Yup.string(),
  }),

  Yup.object().shape({
    [ebit.name]: Yup.number(),
    [balance_sheet_attachment.name]: Yup.string().required(
      `${balance_sheet_attachment.requiredErrorMsg}`
    ),
    [income_statement_attachment.name]: Yup.string().required(
      `${income_statement_attachment.requiredErrorMsg}`
    ),
    [net_profit.name]: Yup.number().required(`${net_profit.requiredErrorMsg}`),
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
    [sales.name]: Yup.number().required(`${sales.requiredErrorMsg}`),
    [total_assets.name]: Yup.number().required(
      `${total_assets.requiredErrorMsg}`
    ),
    [retained_earnings.name]: Yup.number().required(
      `${retained_earnings.requiredErrorMsg}`
    ),
    [working_capital.name]: Yup.number().required(
      `${working_capital.requiredErrorMsg}`
    ),
    [bank_account_number.name]: Yup.string(),
    [bank_account_sortcode.name]: Yup.string(),
    [bank_country.name]: Yup.string(),
    [bank_name.name]: Yup.string(),
    [bank_routing_number.name]: Yup.string(),
    [bic_swift_code.name]: Yup.string(),
    [iban.name]: Yup.string(),
  }),
];
export default yup;
