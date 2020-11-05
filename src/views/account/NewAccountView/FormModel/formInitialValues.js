import NewAccountFormModel from './NewAccountFormModel';
const {
  formField: {
    company_name,
    company_address_city,
    company_address_street,
    company_address_postalcode,
    company_country,
    date_of_incorporation,
    registration_cert_attachment,
    company_industry,
    company_director_name,
    company_ubo_name,
    company_type,
    reporting_start_date,
    reporting_end_date,
    reporting_period,
    termsandconditions
  }
} = NewAccountFormModel;

export default {
  [company_name.name]: '',
  [company_address_city.name]: '',
  [company_address_street.name]: '',
  [company_address_postalcode.name]: '',
  [company_country.name]: '',
  [date_of_incorporation.name]: '',
  [company_industry.name]: '',
  [registration_cert_attachment.name]: '',
  [termsandconditions.name]: false,
  [company_director_name.name]: '',
  [company_ubo_name.name]: '',
  [company_type.name]: '',
  [reporting_start_date.name]: '',
  [reporting_end_date.name]: '',
  [reporting_period.name]: ''
};
