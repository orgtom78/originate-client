import * as Yup from 'yup';
import moment from 'moment';
import NewAccountFormModel from './NewAccountFormModel';
const {
  formField: {
    company_name,
    company_address_city,
    company_address_street,
    company_address_postalcode,
    company_country,
    date_of_incorporation,
    company_industry,
    registration_cert_attachment,
    company_director_name,
    company_ubo_name,
    company_type,
    reporting_start_date,
    reporting_end_date,
    reporting_period

  }
} = NewAccountFormModel;


export default [
  Yup.object().shape({
    [company_name.name]: Yup.string().required(`${company_name.requiredErrorMsg}`),
    [company_address_city.name]: Yup.string().required(`${company_address_city.requiredErrorMsg}`),
    [company_address_street.name]: Yup.string().required(`${company_address_street.requiredErrorMsg}`),
    [company_address_postalcode.name]: Yup.string()
      .required(`${company_address_postalcode.requiredErrorMsg}`)
      .test(
        'len',
        `${company_address_postalcode.invalidErrorMsg}`,
        val => val && val.length === 5
      ),
    [company_country.name]: Yup.string()
      .nullable()
      .required(`${company_country.requiredErrorMsg}`),
    [date_of_incorporation.name]: Yup.string()
      .nullable()
      .required(`${date_of_incorporation.requiredErrorMsg}`)
      .test('incdate', date_of_incorporation.invalidErrorMsg, val => {
        if (val) {
          const startDate = new Date(1500, 12, 31);
          const endDate = new Date();
          if (moment(val, moment.ISO_8601).isValid()) {
            return moment(val).isBetween(startDate, endDate);
          }
          return false;
        }
        return false;
      }),
    [company_industry.name]: Yup.string()
    .nullable()
    .required(`${company_industry.requiredErrorMsg}`),
    [registration_cert_attachment.name]: Yup.string()
    .nullable(),
  }),

  Yup.object().shape({
    [company_director_name.name]: Yup.string().required(`${company_director_name.requiredErrorMsg}`),
    [company_ubo_name.name]: Yup.string()
      .required(`${company_ubo_name.requiredErrorMsg}`),
    [company_type.name]: Yup.string()
      .required(`${company_type.requiredErrorMsg}`)
  }),

  Yup.object().shape({
    [reporting_start_date.name]: Yup.string()
    .nullable()
    .required(`${reporting_start_date.requiredErrorMsg}`)
    .test('incdate', reporting_start_date.invalidErrorMsg, val => {
      if (val) {
        const startDate = new Date(2000, 12, 31);
        const endDate = new Date();
        if (moment(val, moment.ISO_8601).isValid()) {
          return moment(val).isBetween(startDate, endDate);
        }
        return false;
      }
      return false;
    }),
    [reporting_end_date.name]: Yup.string()
    .nullable()
    .required(`${reporting_end_date.requiredErrorMsg}`)
    .test('incdate', reporting_end_date.invalidErrorMsg, val => {
      if (val) {
        const startDate = new Date(2000, 12, 31);
        const endDate = new Date();
        if (moment(val, moment.ISO_8601).isValid()) {
          return moment(val).isBetween(startDate, endDate);
        }
        return false;
      }
      return false;
    }),
    [reporting_period.name]: Yup.string()
    .nullable()
    .required(`${reporting_period.requiredErrorMsg}`)
    .test('incdate', reporting_period.invalidErrorMsg, val => {
      if (val) {
        const startDate = new Date(2000, 12, 31);
        const endDate = new Date();
        if (moment(val, moment.ISO_8601).isValid()) {
          return moment(val).isBetween(startDate, endDate);
        }
        return false;
      }
      return false;
    })
  })
];