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
    spv_address_number,
    spv_address_postalcode,
    spv_country,
    spv_industry,
    spv_registration_cert_attachment,
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
} = NewSpvFormModel;

const yup = [
  Yup.object().shape({
    [spv_logo.name]: Yup.string(),
    [spv_name.name]: Yup.string().required(
      `${spv_name.requiredErrorMsg}`
    ),
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
    [spv_address_number.name]: Yup.number(),
    [spv_address_postalcode.name]: Yup.string()
      .required(`${spv_address_postalcode.requiredErrorMsg}`)
      .test(
        "len",
        `${spv_address_postalcode.invalidErrorMsg}`,
        (val) => val && val.length === 5
      ),
    [spv_country.name]: Yup.string().required(
      `${spv_country.requiredErrorMsg}`
    ),
    [spv_industry.name]: Yup.string().required(
      `${spv_industry.requiredErrorMsg}`
    ),
    [spv_registration_cert_attachment.name]: Yup.string().required(
      `${spv_registration_cert_attachment.requiredErrorMsg}`
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
