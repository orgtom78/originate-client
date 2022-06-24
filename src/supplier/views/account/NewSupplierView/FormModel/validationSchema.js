import * as Yup from "yup";
import moment from "moment";
import NewSupplierFormModel from "./NewSupplierFormModel";
const {
  formField: {
    supplier_logo,
    supplier_name,
    supplier_type,
    supplier_date_of_incorporation,
    supplier_address_city,
    supplier_address_street,
    supplier_address_number,
    supplier_address_postalcode,
    supplier_country,
    supplier_register_number,
    supplier_website,
    supplier_registration_cert_attachment,
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
    cash,
    income_statement_attachment,
    balance_sheet_attachment,
    net_profit,
    financials_reporting_period,
    sales,
    total_equity,
    total_assets,
    bank_account_number,
    bank_account_sortcode,
    bank_country,
    bank_name,
    bank_routing_number,
    bic_swift_code,
    iban,
  },
} = NewSupplierFormModel;

const yup = [
  Yup.object().shape({
    [supplier_logo.name]: Yup.string(),
    [supplier_name.name]: Yup.string().required(
      `${supplier_name.requiredErrorMsg}`
    ),
    [supplier_type.name]: Yup.string().required(
      `${supplier_type.requiredErrorMsg}`
    ),
    [supplier_date_of_incorporation.name]: Yup.string()
      .required(`${supplier_date_of_incorporation.requiredErrorMsg}`)
      .test(
        "incdate",
        supplier_date_of_incorporation.invalidErrorMsg,
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
    [supplier_address_city.name]: Yup.string().required(
      `${supplier_address_city.requiredErrorMsg}`
    ),
    [supplier_address_street.name]: Yup.string().required(
      `${supplier_address_street.requiredErrorMsg}`
    ),
    [supplier_address_number.name]: Yup.string().required(
      `${supplier_address_number.requiredErrorMsg}`
    ),
    [supplier_address_postalcode.name]: Yup.string()
      .required(`${supplier_address_postalcode.requiredErrorMsg}`),
    [supplier_country.name]: Yup.string().required(
      `${supplier_country.requiredErrorMsg}`
    ),
    [supplier_register_number.name]: Yup.string().required(
      `${supplier_register_number.requiredErrorMsg}`
    ),
    [supplier_website.name]: Yup.string().required(
      `${supplier_website.requiredErrorMsg}`
    ),
    [supplier_registration_cert_attachment.name]: Yup.string().required(
      `${supplier_registration_cert_attachment.requiredErrorMsg}`
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
    [cash.name]: Yup.number().required(`${cash.requiredErrorMsg}`),
    [balance_sheet_attachment.name]: Yup.string().required(
      `${balance_sheet_attachment.requiredErrorMsg}`
    ),
    [income_statement_attachment.name]: Yup.string().required(
      `${income_statement_attachment.requiredErrorMsg}`
    ),
    [net_profit.name]: Yup.number().required(`${net_profit.requiredErrorMsg}`),
    [financials_reporting_period.name]: Yup.string()
      .required(`${financials_reporting_period.requiredErrorMsg}`),
    [sales.name]: Yup.number().required(`${sales.requiredErrorMsg}`),
    [total_assets.name]: Yup.number().required(
      `${total_assets.requiredErrorMsg}`
    ),
    [total_equity.name]: Yup.number().required(
      `${total_equity.requiredErrorMsg}`
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
