export default {
  formId: 'NewAccount',
  formField: {
    company_name: {
      name: 'company_name',
      label: 'Company Legal Name*',
      requiredErrorMsg: 'Company Legal name is required'
    },
    company_address_city: {
      name: 'company_address_city',
      label: 'Company City',
      requiredErrorMsg: 'City is required'
    },
    company_address_street: {
      name: 'company_address_street',
      label: 'Street*',
      requiredErrorMsg: 'Street is required'
    },
    company_address_postalcode: {
      name: 'company_address_postalcode',
      label: 'Zipcode*',
      requiredErrorMsg: 'Zipcode is required',
      invalidErrorMsg: 'Zipcode is not valid (e.g. 70000)'
    },
    company_country: {
      name: 'company_country',
      label: 'Country*',
      requiredErrorMsg: 'Country is required'
    },
    company_industry: {
      name: 'company_industry',
      label: 'Industry'
    },
    registration_cert_attachment: {
      name: 'registration_cert_attachment',
    },
    date_of_incorporation: {
      name: 'date_of_incorporation',
      label: 'Date of Incorporation*',
      requiredErrorMsg: 'Incorporation date is required',
    },
    company_director_name: {
      name: 'company_director_name,',
      label: 'Director Name*',
      requiredErrorMsg: 'Director Name is required'
    },
    company_ubo_name: {
      name: 'company_ubo_name',
      label: 'Ultimate Beneficial Owner Name',
      requiredErrorMsg: 'Ultimate Beneficial Owner Name is required'
    },
    termsandconditions: {
      name: 'termsandconditions',
      label: 'termsandconditions'
    },
    company_type: {
      name: 'company_type',
      label: 'Type of Company*',
      requiredErrorMsg: 'Company Type is required'
    },
    reporting_start_date: {
      name: 'reporting_start_date',
      label: 'Bank Account Reporting Start Date*',
      requiredErrorMsg: 'Start Date is required',
    },
    reporting_end_date: {
      name: 'reporting_end_date',
      label: 'Bank Account Reporting End Date*',
      requiredErrorMsg: 'End Date is required',
    },
    reporting_period: {
      name: 'reporting_period',
      label: 'Financial Accounts Reporting Year*',
      requiredErrorMsg: 'Reporting Year is required',
    }
  }
};
