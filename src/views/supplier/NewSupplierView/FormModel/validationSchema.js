import * as Yup from 'yup';
import moment from 'moment';
import NewSupplierFormModel from './NewSupplierFormModel';
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
    supplier_industry,
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
    ebit,
    financials_attachment,
    net_profit,
    financials_rating,
    financials_reporting_period,
    sales,
    total_assets,
    bank_account_number,
    bank_account_sortcode,
    bank_country,
    bank_name,
    bank_routing_number,
    bic_swift_code,
    iban,
  }
} = NewSupplierFormModel;


export default [
  Yup.object().shape({
    [supplier_logo.name]: Yup.string(),
    [supplier_name.name]: Yup.string().required(`${supplier_name.requiredErrorMsg}`),
    [supplier_type.name]: Yup.string().required(`${supplier_type.requiredErrorMsg}`),
    [supplier_date_of_incorporation.name]: Yup.string()
      .required(`${supplier_date_of_incorporation.requiredErrorMsg}`)
      .test('incdate', supplier_date_of_incorporation.invalidErrorMsg, val => {
        if (val) {
          const startDate = new Date(1900, 12, 31);
          const endDate = new Date();
          if (moment(val, moment.ISO_8601).isValid()) {
            return moment(val).isBetween(startDate, endDate);
          }
          return false;
        }
        return false;
      }),
    [supplier_address_city.name]: Yup.string().required(`${supplier_address_city.requiredErrorMsg}`),
    [supplier_address_street.name]: Yup.string().required(`${supplier_address_street.requiredErrorMsg}`),
    [supplier_address_number.name]: Yup.number().required(`${supplier_address_number.requiredErrorMsg}`),
    [supplier_address_postalcode.name]: Yup.string()
      .required(`${supplier_address_postalcode.requiredErrorMsg}`)
      .test(
        'len',
        `${supplier_address_postalcode.invalidErrorMsg}`,
        val => val && val.length === 5
      ),
    [supplier_country.name]: Yup.string().required(`${supplier_country.requiredErrorMsg}`),
    [supplier_industry.name]: Yup.string().required(`${supplier_industry.requiredErrorMsg}`),
    [supplier_registration_cert_attachment.name]: Yup.string().required(`${supplier_registration_cert_attachment.requiredErrorMsg}`),
  }),

  Yup.object().shape({
    [director_name.name]: Yup.string().required(`${director_name.requiredErrorMsg}`),
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
    [financials_attachment.name]: Yup.string(),
    [net_profit.name]: Yup.number(),
    [financials_rating.name]: Yup.string(),
    [financials_reporting_period.name]: Yup.string()
    .required(`${financials_reporting_period.requiredErrorMsg}`)
    .test('incdate', financials_reporting_period.invalidErrorMsg, val => {
      if (val) {
        const startDate = new Date(2018, 12, 31);
        const endDate = new Date();
        if (moment(val, moment.ISO_8601).isValid()) {
          return moment(val).isBetween(startDate, endDate);
        }
        return false;
      }
      return false;
    }),
    [sales.name]: Yup.number(),
    [total_assets.name]: Yup.number(),
    [bank_account_number.name]: Yup.string(),
    [bank_account_sortcode.name]: Yup.string(),
    [bank_country.name]: Yup.string(),
    [bank_name.name]: Yup.string(),
    [bank_routing_number.name]: Yup.string(),
    [bic_swift_code.name]: Yup.string(),
    [iban.name]: Yup.string(),
  })
];