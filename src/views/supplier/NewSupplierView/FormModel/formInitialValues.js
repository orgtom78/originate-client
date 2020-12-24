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

export default { 
  [supplier_logo.name]: '',
  [supplier_name.name]: '',
  [supplier_type.name]: '',
  [supplier_date_of_incorporation.name]: '',
  [supplier_address_city.name]: '',
  [supplier_address_street.name]: '',
  [supplier_address_number.name]: '',
  [supplier_address_postalcode.name]: '',
  [supplier_country.name]: undefined,
  [supplier_industry.name]: undefined,
  [supplier_registration_cert_attachment.name]: '',
  [director_name.name]: '',
  [director_email.name]: '',
  [director_phone_number.name]: '',
  [director_id_attachment.name]: '',
  [director_id_number.name]: '',
  [director_id_type.name]: '',
  [director_nationality.name]: undefined,
  [director_poa_attachment.name]: '',
  [director_country_of_residence.name]: undefined,
  [ubo_name.name]: '',
  [ubo_email.name]: '',
  [ubo_phone_number.name]: '',
  [ubo_id_attachment.name]: '',
  [ubo_id_number.name]: '',
  [ubo_id_type.name]: '',
  [ubo_nationality.name]: undefined,
  [ubo_poa_attachment.name]: '',
  [ubo_country_of_residence.name]: undefined,
  [ebit.name]: '',
  [financials_attachment.name]: '',
  [net_profit.name]: '',
  [financials_rating.name]: '',
  [financials_reporting_period.name]: '',
  [sales.name]: '',
  [total_assets.name]: '',
  [bank_account_number.name]: '',
  [bank_account_sortcode.name]: '',
  [bank_country.name]: undefined,
  [bank_name.name]: '',
  [bank_routing_number.name]: '',
  [bic_swift_code.name]: '',
  [iban.name]: '',
};