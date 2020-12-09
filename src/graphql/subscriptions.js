/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSupplier = /* GraphQL */ `
  subscription OnCreateSupplier($sortkey: String, $userId: String) {
    onCreateSupplier(sortkey: $sortkey, userId: $userId) {
      supplierId
      supplier_address_city
      supplier_address_number
      supplier_address_postalcode
      supplier_address_refinment
      supplier_articles_of_association_attachment
      supplier_shareholder_list_attachment
      supplier_director_list_attachment
      supplier_country
      supplier_industry
      supplier_industry_code
      supplier_logo
      supplier_name
      supplier_register_number
      supplier_trading_name
      supplier_type
      supplier_website
      supplier_address_street
      createdAt
      supplier_date_of_incorporation
      supplier_registration_cert_attachment
      sortkey
      userId
    }
  }
`;
export const onCreateBank = /* GraphQL */ `
  subscription OnCreateBank($sortkey: String, $userId: String) {
    onCreateBank(sortkey: $sortkey, userId: $userId) {
      bankId
      buyerId
      supplierId
      account_statement_attachment
      balance
      balance_available
      bank_account_name
      bank_account_number
      bank_account_sortcode
      bank_address_city
      bank_address_number
      bank_address_postalcode
      bank_address_refinment
      bank_address_street
      bank_branch
      bank_country
      bank_name
      bank_routing_number
      bic_swift_code
      createdAt
      iban
      iso_currency_code
      overdraft
      payments_incoming
      payments_outgoing
      pre_auth_amount
      reporting_end_date
      reporting_start_date
      sortkey
      userId
    }
  }
`;
export const onCreateFinancials = /* GraphQL */ `
  subscription OnCreateFinancials($sortkey: String, $userId: String) {
    onCreateFinancials(sortkey: $sortkey, userId: $userId) {
      financialsId
      supplierId
      buyerId
      accounts_payable
      accounts_receivable
      cash
      createdAt
      ebit
      equity_book_value
      equity_market_value
      financials_attachment
      interest_expenses
      inventory
      net_profit
      financials_rating
      financials_reporting_period
      retained_earnings
      sales
      short_term_debt
      total_assets
      total_liabilities
      working_capital
      financials_status
      userId
      sortkey
    }
  }
`;
export const onCreateBuyer = /* GraphQL */ `
  subscription OnCreateBuyer($sortkey: String, $userId: String) {
    onCreateBuyer(sortkey: $sortkey, userId: $userId) {
      buyerId
      supplierId
      buyer_address_city
      buyer_address_number
      buyer_address_postalcode
      buyer_address_refinment
      buyer_address_street
      buyer_name
      buyer_country
      buyer_website
      createdAt
      buyer_currency
      buyer_insurance_name
      buyer_insurance_rating
      buyer_insurance_status
      buyer_loan_amount
      buyer_one_off_ipu_attachment
      buyer_loan_collateral
      buyer_loan_covenants
      buyer_loan_transaction_fee
      buyer_loan_discount_fee
      buyer_loan_purpose
      buyer_loan_rate
      buyer_loan_type
      buyer_next_year_projected_transaction_amount
      buyer_payment_terms
      buyer_previous_year_transaction_amount
      buyer_reporting_year
      buyer_reporting_year_transaction_amount
      buyer_sample_trading_docs_attachment
      buyer_sold_goods_description
      buyer_status
      sortkey
      userId
    }
  }
`;
export const onCreateDirector = /* GraphQL */ `
  subscription OnCreateDirector($sortkey: String, $userId: String) {
    onCreateDirector(sortkey: $sortkey, userId: $userId) {
      directorId
      supplierId
      buyerId
      director_appointment_date
      director_country_of_residence
      director_date_of_birth
      director_email
      director_id_attachment
      director_id_expiry_date
      director_id_issue_date
      director_id_issuer_country
      director_id_issuer_state
      director_id_number
      director_id_type
      director_jobtitle
      director_name
      director_nationality
      director_pep_status
      director_phone_number
      director_poa_attachment
      director_ubo_status
      createdAt
      director_status
      sortkey
      userId
    }
  }
`;
export const onCreateUbo = /* GraphQL */ `
  subscription OnCreateUbo($sortkey: String, $userId: String) {
    onCreateUBO(sortkey: $sortkey, userId: $userId) {
      uboId
      supplierId
      buyerId
      ubo_appointment_date
      ubo_country_of_residence
      ubo_date_of_birth
      ubo_email
      ubo_id_attachment
      ubo_id_expiry_date
      ubo_id_issue_date
      ubo_id_issuer_country
      ubo_id_issuer_state
      ubo_id_number
      ubo_id_type
      ubo_jobtitle
      ubo_name
      ubo_nationality
      ubo_ownership_percentage
      ubo_pep_status
      ubo_phone_number
      ubo_poa_attachment
      createdAt
      ubo_status
      sortkey
      userId
    }
  }
`;
export const onCreateRequest = /* GraphQL */ `
  subscription OnCreateRequest($sortkey: String, $userId: String) {
    onCreateRequest(sortkey: $sortkey, userId: $userId) {
      requestId
      buyerId
      supplierId
      buyer_name
      purchase_order_amount
      purchase_order_attachment
      purchase_order_date
      sold_goods_description
      invoice_amount
      invoice_currency
      invoice_date
      invoice_due_date
      invoice_attachment
      offer_notice_attachment
      ipu_attachment
      cargo_insurance_name
      cargo_insurance_attachment
      bill_of_lading_no
      bill_of_lading_attachment
      container_no
      packing_list_attachment
      createdAt
      request_status
      sortkey
      userId
    }
  }
`;
export const onDeleteSupplier = /* GraphQL */ `
  subscription OnDeleteSupplier($sortkey: String, $userId: String) {
    onDeleteSupplier(sortkey: $sortkey, userId: $userId) {
      supplierId
      supplier_address_city
      supplier_address_number
      supplier_address_postalcode
      supplier_address_refinment
      supplier_articles_of_association_attachment
      supplier_shareholder_list_attachment
      supplier_director_list_attachment
      supplier_country
      supplier_industry
      supplier_industry_code
      supplier_logo
      supplier_name
      supplier_register_number
      supplier_trading_name
      supplier_type
      supplier_website
      supplier_address_street
      createdAt
      supplier_date_of_incorporation
      supplier_registration_cert_attachment
      sortkey
      userId
    }
  }
`;
export const onDeleteBank = /* GraphQL */ `
  subscription OnDeleteBank($sortkey: String, $userId: String) {
    onDeleteBank(sortkey: $sortkey, userId: $userId) {
      bankId
      buyerId
      supplierId
      account_statement_attachment
      balance
      balance_available
      bank_account_name
      bank_account_number
      bank_account_sortcode
      bank_address_city
      bank_address_number
      bank_address_postalcode
      bank_address_refinment
      bank_address_street
      bank_branch
      bank_country
      bank_name
      bank_routing_number
      bic_swift_code
      createdAt
      iban
      iso_currency_code
      overdraft
      payments_incoming
      payments_outgoing
      pre_auth_amount
      reporting_end_date
      reporting_start_date
      sortkey
      userId
    }
  }
`;
export const onDeleteFinancials = /* GraphQL */ `
  subscription OnDeleteFinancials($sortkey: String, $userId: String) {
    onDeleteFinancials(sortkey: $sortkey, userId: $userId) {
      financialsId
      supplierId
      buyerId
      accounts_payable
      accounts_receivable
      cash
      createdAt
      ebit
      equity_book_value
      equity_market_value
      financials_attachment
      interest_expenses
      inventory
      net_profit
      financials_rating
      financials_reporting_period
      retained_earnings
      sales
      short_term_debt
      total_assets
      total_liabilities
      working_capital
      financials_status
      userId
      sortkey
    }
  }
`;
export const onDeleteBuyer = /* GraphQL */ `
  subscription OnDeleteBuyer($sortkey: String, $userId: String) {
    onDeleteBuyer(sortkey: $sortkey, userId: $userId) {
      buyerId
      supplierId
      buyer_address_city
      buyer_address_number
      buyer_address_postalcode
      buyer_address_refinment
      buyer_address_street
      buyer_name
      buyer_country
      buyer_website
      createdAt
      buyer_currency
      buyer_insurance_name
      buyer_insurance_rating
      buyer_insurance_status
      buyer_loan_amount
      buyer_one_off_ipu_attachment
      buyer_loan_collateral
      buyer_loan_covenants
      buyer_loan_transaction_fee
      buyer_loan_discount_fee
      buyer_loan_purpose
      buyer_loan_rate
      buyer_loan_type
      buyer_next_year_projected_transaction_amount
      buyer_payment_terms
      buyer_previous_year_transaction_amount
      buyer_reporting_year
      buyer_reporting_year_transaction_amount
      buyer_sample_trading_docs_attachment
      buyer_sold_goods_description
      buyer_status
      sortkey
      userId
    }
  }
`;
export const onDeleteDirector = /* GraphQL */ `
  subscription OnDeleteDirector($sortkey: String, $userId: String) {
    onDeleteDirector(sortkey: $sortkey, userId: $userId) {
      directorId
      supplierId
      buyerId
      director_appointment_date
      director_country_of_residence
      director_date_of_birth
      director_email
      director_id_attachment
      director_id_expiry_date
      director_id_issue_date
      director_id_issuer_country
      director_id_issuer_state
      director_id_number
      director_id_type
      director_jobtitle
      director_name
      director_nationality
      director_pep_status
      director_phone_number
      director_poa_attachment
      director_ubo_status
      createdAt
      director_status
      sortkey
      userId
    }
  }
`;
export const onDeleteUbo = /* GraphQL */ `
  subscription OnDeleteUbo($sortkey: String, $userId: String) {
    onDeleteUBO(sortkey: $sortkey, userId: $userId) {
      uboId
      supplierId
      buyerId
      ubo_appointment_date
      ubo_country_of_residence
      ubo_date_of_birth
      ubo_email
      ubo_id_attachment
      ubo_id_expiry_date
      ubo_id_issue_date
      ubo_id_issuer_country
      ubo_id_issuer_state
      ubo_id_number
      ubo_id_type
      ubo_jobtitle
      ubo_name
      ubo_nationality
      ubo_ownership_percentage
      ubo_pep_status
      ubo_phone_number
      ubo_poa_attachment
      createdAt
      ubo_status
      sortkey
      userId
    }
  }
`;
export const onDeleteRequest = /* GraphQL */ `
  subscription OnDeleteRequest($sortkey: String, $userId: String) {
    onDeleteRequest(sortkey: $sortkey, userId: $userId) {
      requestId
      buyerId
      supplierId
      buyer_name
      purchase_order_amount
      purchase_order_attachment
      purchase_order_date
      sold_goods_description
      invoice_amount
      invoice_currency
      invoice_date
      invoice_due_date
      invoice_attachment
      offer_notice_attachment
      ipu_attachment
      cargo_insurance_name
      cargo_insurance_attachment
      bill_of_lading_no
      bill_of_lading_attachment
      container_no
      packing_list_attachment
      createdAt
      request_status
      sortkey
      userId
    }
  }
`;
export const onUpdateSupplier = /* GraphQL */ `
  subscription OnUpdateSupplier($sortkey: String, $userId: String) {
    onUpdateSupplier(sortkey: $sortkey, userId: $userId) {
      supplierId
      supplier_address_city
      supplier_address_number
      supplier_address_postalcode
      supplier_address_refinment
      supplier_articles_of_association_attachment
      supplier_shareholder_list_attachment
      supplier_director_list_attachment
      supplier_country
      supplier_industry
      supplier_industry_code
      supplier_logo
      supplier_name
      supplier_register_number
      supplier_trading_name
      supplier_type
      supplier_website
      supplier_address_street
      createdAt
      supplier_date_of_incorporation
      supplier_registration_cert_attachment
      sortkey
      userId
    }
  }
`;
export const onUpdateBank = /* GraphQL */ `
  subscription OnUpdateBank($sortkey: String, $userId: String) {
    onUpdateBank(sortkey: $sortkey, userId: $userId) {
      bankId
      buyerId
      supplierId
      account_statement_attachment
      balance
      balance_available
      bank_account_name
      bank_account_number
      bank_account_sortcode
      bank_address_city
      bank_address_number
      bank_address_postalcode
      bank_address_refinment
      bank_address_street
      bank_branch
      bank_country
      bank_name
      bank_routing_number
      bic_swift_code
      createdAt
      iban
      iso_currency_code
      overdraft
      payments_incoming
      payments_outgoing
      pre_auth_amount
      reporting_end_date
      reporting_start_date
      sortkey
      userId
    }
  }
`;
export const onUpdateFinancials = /* GraphQL */ `
  subscription OnUpdateFinancials($sortkey: String, $userId: String) {
    onUpdateFinancials(sortkey: $sortkey, userId: $userId) {
      financialsId
      supplierId
      buyerId
      accounts_payable
      accounts_receivable
      cash
      createdAt
      ebit
      equity_book_value
      equity_market_value
      financials_attachment
      interest_expenses
      inventory
      net_profit
      financials_rating
      financials_reporting_period
      retained_earnings
      sales
      short_term_debt
      total_assets
      total_liabilities
      working_capital
      financials_status
      userId
      sortkey
    }
  }
`;
export const onUpdateBuyer = /* GraphQL */ `
  subscription OnUpdateBuyer($sortkey: String, $userId: String) {
    onUpdateBuyer(sortkey: $sortkey, userId: $userId) {
      buyerId
      supplierId
      buyer_address_city
      buyer_address_number
      buyer_address_postalcode
      buyer_address_refinment
      buyer_address_street
      buyer_name
      buyer_country
      buyer_website
      createdAt
      buyer_currency
      buyer_insurance_name
      buyer_insurance_rating
      buyer_insurance_status
      buyer_loan_amount
      buyer_one_off_ipu_attachment
      buyer_loan_collateral
      buyer_loan_covenants
      buyer_loan_transaction_fee
      buyer_loan_discount_fee
      buyer_loan_purpose
      buyer_loan_rate
      buyer_loan_type
      buyer_next_year_projected_transaction_amount
      buyer_payment_terms
      buyer_previous_year_transaction_amount
      buyer_reporting_year
      buyer_reporting_year_transaction_amount
      buyer_sample_trading_docs_attachment
      buyer_sold_goods_description
      buyer_status
      sortkey
      userId
    }
  }
`;
export const onUpdateDirector = /* GraphQL */ `
  subscription OnUpdateDirector($sortkey: String, $userId: String) {
    onUpdateDirector(sortkey: $sortkey, userId: $userId) {
      directorId
      supplierId
      buyerId
      director_appointment_date
      director_country_of_residence
      director_date_of_birth
      director_email
      director_id_attachment
      director_id_expiry_date
      director_id_issue_date
      director_id_issuer_country
      director_id_issuer_state
      director_id_number
      director_id_type
      director_jobtitle
      director_name
      director_nationality
      director_pep_status
      director_phone_number
      director_poa_attachment
      director_ubo_status
      createdAt
      director_status
      sortkey
      userId
    }
  }
`;
export const onUpdateUbo = /* GraphQL */ `
  subscription OnUpdateUbo($sortkey: String, $userId: String) {
    onUpdateUBO(sortkey: $sortkey, userId: $userId) {
      uboId
      supplierId
      buyerId
      ubo_appointment_date
      ubo_country_of_residence
      ubo_date_of_birth
      ubo_email
      ubo_id_attachment
      ubo_id_expiry_date
      ubo_id_issue_date
      ubo_id_issuer_country
      ubo_id_issuer_state
      ubo_id_number
      ubo_id_type
      ubo_jobtitle
      ubo_name
      ubo_nationality
      ubo_ownership_percentage
      ubo_pep_status
      ubo_phone_number
      ubo_poa_attachment
      createdAt
      ubo_status
      sortkey
      userId
    }
  }
`;
export const onUpdateRequest = /* GraphQL */ `
  subscription OnUpdateRequest($sortkey: String, $userId: String) {
    onUpdateRequest(sortkey: $sortkey, userId: $userId) {
      requestId
      buyerId
      supplierId
      buyer_name
      purchase_order_amount
      purchase_order_attachment
      purchase_order_date
      sold_goods_description
      invoice_amount
      invoice_currency
      invoice_date
      invoice_due_date
      invoice_attachment
      offer_notice_attachment
      ipu_attachment
      cargo_insurance_name
      cargo_insurance_attachment
      bill_of_lading_no
      bill_of_lading_attachment
      container_no
      packing_list_attachment
      createdAt
      request_status
      sortkey
      userId
    }
  }
`;
export const onCreateOriginate = /* GraphQL */ `
  subscription OnCreateOriginate($sortkey: String, $userId: String) {
    onCreateOriginate(sortkey: $sortkey, userId: $userId) {
      sortkey
      userId
    }
  }
`;
export const onUpdateOriginate = /* GraphQL */ `
  subscription OnUpdateOriginate($sortkey: String, $userId: String) {
    onUpdateOriginate(sortkey: $sortkey, userId: $userId) {
      sortkey
      userId
    }
  }
`;
export const onDeleteOriginate = /* GraphQL */ `
  subscription OnDeleteOriginate($sortkey: String, $userId: String) {
    onDeleteOriginate(sortkey: $sortkey, userId: $userId) {
      sortkey
      userId
    }
  }
`;