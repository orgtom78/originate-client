/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSupplier = /* GraphQL */ `
  subscription OnCreateSupplier($sortkey: String, $userId: String) {
    onCreateSupplier(sortkey: $sortkey, userId: $userId) {
      supplierId
      identityId
      supplier_address_city
      supplier_address_number
      supplier_address_postalcode
      supplier_address_refinment
      supplier_articles_of_association_attachment
      supplier_shareholder_list_attachment
      supplier_description
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
      investorId
      identityId
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
      bank_status
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
      investorId
      identityId
      financials_attachment
      balance_sheet_attachment
      income_statement_attachment
      cash
      marketable_securities
      accounts_receivable
      inventory
      property
      goodwill
      other_current_assets
      other_non_current_assets
      accumulated_depreciation
      total_assets
      short_term_debt
      accounts_payable
      accured_expenses
      unearned_revenue
      long_term_debt
      other_current_liabilities
      other_long_term_liabilities
      income_tax_payable
      dividends_payable
      total_liabilities
      common_stock
      preferred_stock
      paid_in_capital
      retained_earnings
      total_equity
      equity_book_value
      equity_market_value
      sales
      cost_of_goods_sold
      operating_expenses
      marketing_expenses
      bad_debt_expenses
      createdAt
      ebit
      interest_expenses
      depreciation_expenses
      sale_purchase_of_fixed_asset
      extraordinary_income
      tax_expenses
      net_profit
      financials_rating
      financials_reporting_period
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
      investorId
      identityId
      buyer_address_city
      buyer_address_number
      buyer_address_postalcode
      buyer_address_refinment
      buyer_address_street
      buyer_name
      buyer_trading_name
      buyer_country
      buyer_contact_name
      buyer_contact_email
      buyer_contact_phone
      buyer_contact_position
      buyer_website
      createdAt
      buyer_currency
      buyer_date_of_incorporation
      buyer_description
      buyer_industry
      buyer_industry_code
      buyer_insurance_name
      buyer_insurance_rating
      buyer_insurance_status
      buyer_loan_request_amount
      buyer_loan_approved_amount
      buyer_one_off_ipu_attachment
      buyer_loan_collateral
      buyer_loan_covenants
      buyer_loan_transaction_fee
      buyer_loan_discount_fee
      buyer_loan_purpose
      buyer_loan_rate
      buyer_loan_type
      buyer_next_year_projected_transaction_amount
      buyer_next_year_projected_number_invoices
      buyer_payment_terms
      buyer_previous_year_transaction_amount
      buyer_previous_year_number_invoices
      buyer_reporting_year
      buyer_reporting_year_transaction_amount
      buyer_reporting_year_number_invoices
      buyer_sample_trading_docs_attachment
      buyer_sold_goods_description
      buyer_supplier_year_business_relation_started
      buyer_status
      buyer_type
      buyer_registration_cert_attachment
      buyer_shareholder_list_attachment
      buyer_director_list_attachment
      buyer_articles_of_association_attachment
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
      investorId
      identityId
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
export const onCreateInvestor = /* GraphQL */ `
  subscription OnCreateInvestor($sortkey: String, $userId: String) {
    onCreateInvestor(sortkey: $sortkey, userId: $userId) {
      investorId
      identityId
      investor_address_city
      investor_address_number
      investor_address_postalcode
      investor_address_refinment
      investor_articles_of_association_attachment
      investor_shareholder_list_attachment
      investor_director_list_attachment
      investor_country
      investor_industry
      investor_industry_code
      investor_logo
      investor_name
      investor_register_number
      investor_trading_name
      investor_type
      investor_website
      investor_address_street
      createdAt
      investor_date_of_incorporation
      investor_registration_cert_attachment
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
      investorId
      identityId
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
export const onCreateUsergroup = /* GraphQL */ `
  subscription OnCreateUsergroup($sortkey: String, $userId: String) {
    onCreateUsergroup(sortkey: $sortkey, userId: $userId) {
      groupId
      userId
      user_name
      investorId
      supplierId
      brokerId
      sub
      identityId
      group_type
      group_name
      group_contact_name
      group_contact_email
      group_contact_phone
      user_email
      user_role
      createdAt
      sortkey
    }
  }
`;
export const onCreateRequest = /* GraphQL */ `
  subscription OnCreateRequest($sortkey: String, $userId: String) {
    onCreateRequest(sortkey: $sortkey, userId: $userId) {
      requestId
      buyerId
      supplierId
      investorId
      identityId
      buyer_name
      supplier_name
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
      payout_date
      payback_date
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
      identityId
      supplier_address_city
      supplier_address_number
      supplier_address_postalcode
      supplier_address_refinment
      supplier_articles_of_association_attachment
      supplier_shareholder_list_attachment
      supplier_description
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
      investorId
      identityId
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
      bank_status
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
      investorId
      identityId
      financials_attachment
      balance_sheet_attachment
      income_statement_attachment
      cash
      marketable_securities
      accounts_receivable
      inventory
      property
      goodwill
      other_current_assets
      other_non_current_assets
      accumulated_depreciation
      total_assets
      short_term_debt
      accounts_payable
      accured_expenses
      unearned_revenue
      long_term_debt
      other_current_liabilities
      other_long_term_liabilities
      income_tax_payable
      dividends_payable
      total_liabilities
      common_stock
      preferred_stock
      paid_in_capital
      retained_earnings
      total_equity
      equity_book_value
      equity_market_value
      sales
      cost_of_goods_sold
      operating_expenses
      marketing_expenses
      bad_debt_expenses
      createdAt
      ebit
      interest_expenses
      depreciation_expenses
      sale_purchase_of_fixed_asset
      extraordinary_income
      tax_expenses
      net_profit
      financials_rating
      financials_reporting_period
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
      investorId
      identityId
      buyer_address_city
      buyer_address_number
      buyer_address_postalcode
      buyer_address_refinment
      buyer_address_street
      buyer_name
      buyer_trading_name
      buyer_country
      buyer_contact_name
      buyer_contact_email
      buyer_contact_phone
      buyer_contact_position
      buyer_website
      createdAt
      buyer_currency
      buyer_date_of_incorporation
      buyer_description
      buyer_industry
      buyer_industry_code
      buyer_insurance_name
      buyer_insurance_rating
      buyer_insurance_status
      buyer_loan_request_amount
      buyer_loan_approved_amount
      buyer_one_off_ipu_attachment
      buyer_loan_collateral
      buyer_loan_covenants
      buyer_loan_transaction_fee
      buyer_loan_discount_fee
      buyer_loan_purpose
      buyer_loan_rate
      buyer_loan_type
      buyer_next_year_projected_transaction_amount
      buyer_next_year_projected_number_invoices
      buyer_payment_terms
      buyer_previous_year_transaction_amount
      buyer_previous_year_number_invoices
      buyer_reporting_year
      buyer_reporting_year_transaction_amount
      buyer_reporting_year_number_invoices
      buyer_sample_trading_docs_attachment
      buyer_sold_goods_description
      buyer_supplier_year_business_relation_started
      buyer_status
      buyer_type
      buyer_registration_cert_attachment
      buyer_shareholder_list_attachment
      buyer_director_list_attachment
      buyer_articles_of_association_attachment
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
      investorId
      identityId
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
export const onDeleteInvestor = /* GraphQL */ `
  subscription OnDeleteInvestor($sortkey: String, $userId: String) {
    onDeleteInvestor(sortkey: $sortkey, userId: $userId) {
      investorId
      identityId
      investor_address_city
      investor_address_number
      investor_address_postalcode
      investor_address_refinment
      investor_articles_of_association_attachment
      investor_shareholder_list_attachment
      investor_director_list_attachment
      investor_country
      investor_industry
      investor_industry_code
      investor_logo
      investor_name
      investor_register_number
      investor_trading_name
      investor_type
      investor_website
      investor_address_street
      createdAt
      investor_date_of_incorporation
      investor_registration_cert_attachment
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
      investorId
      identityId
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
export const onDeleteUsergroup = /* GraphQL */ `
  subscription OnDeleteUsergroup($sortkey: String, $userId: String) {
    onDeleteUsergroup(sortkey: $sortkey, userId: $userId) {
      groupId
      userId
      user_name
      investorId
      supplierId
      brokerId
      sub
      identityId
      group_type
      group_name
      group_contact_name
      group_contact_email
      group_contact_phone
      user_email
      user_role
      createdAt
      sortkey
    }
  }
`;
export const onDeleteRequest = /* GraphQL */ `
  subscription OnDeleteRequest($sortkey: String, $userId: String) {
    onDeleteRequest(sortkey: $sortkey, userId: $userId) {
      requestId
      buyerId
      supplierId
      investorId
      identityId
      buyer_name
      supplier_name
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
      payout_date
      payback_date
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
      identityId
      supplier_address_city
      supplier_address_number
      supplier_address_postalcode
      supplier_address_refinment
      supplier_articles_of_association_attachment
      supplier_shareholder_list_attachment
      supplier_description
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
      investorId
      identityId
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
      bank_status
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
      investorId
      identityId
      financials_attachment
      balance_sheet_attachment
      income_statement_attachment
      cash
      marketable_securities
      accounts_receivable
      inventory
      property
      goodwill
      other_current_assets
      other_non_current_assets
      accumulated_depreciation
      total_assets
      short_term_debt
      accounts_payable
      accured_expenses
      unearned_revenue
      long_term_debt
      other_current_liabilities
      other_long_term_liabilities
      income_tax_payable
      dividends_payable
      total_liabilities
      common_stock
      preferred_stock
      paid_in_capital
      retained_earnings
      total_equity
      equity_book_value
      equity_market_value
      sales
      cost_of_goods_sold
      operating_expenses
      marketing_expenses
      bad_debt_expenses
      createdAt
      ebit
      interest_expenses
      depreciation_expenses
      sale_purchase_of_fixed_asset
      extraordinary_income
      tax_expenses
      net_profit
      financials_rating
      financials_reporting_period
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
      investorId
      identityId
      buyer_address_city
      buyer_address_number
      buyer_address_postalcode
      buyer_address_refinment
      buyer_address_street
      buyer_name
      buyer_trading_name
      buyer_country
      buyer_contact_name
      buyer_contact_email
      buyer_contact_phone
      buyer_contact_position
      buyer_website
      createdAt
      buyer_currency
      buyer_date_of_incorporation
      buyer_description
      buyer_industry
      buyer_industry_code
      buyer_insurance_name
      buyer_insurance_rating
      buyer_insurance_status
      buyer_loan_request_amount
      buyer_loan_approved_amount
      buyer_one_off_ipu_attachment
      buyer_loan_collateral
      buyer_loan_covenants
      buyer_loan_transaction_fee
      buyer_loan_discount_fee
      buyer_loan_purpose
      buyer_loan_rate
      buyer_loan_type
      buyer_next_year_projected_transaction_amount
      buyer_next_year_projected_number_invoices
      buyer_payment_terms
      buyer_previous_year_transaction_amount
      buyer_previous_year_number_invoices
      buyer_reporting_year
      buyer_reporting_year_transaction_amount
      buyer_reporting_year_number_invoices
      buyer_sample_trading_docs_attachment
      buyer_sold_goods_description
      buyer_supplier_year_business_relation_started
      buyer_status
      buyer_type
      buyer_registration_cert_attachment
      buyer_shareholder_list_attachment
      buyer_director_list_attachment
      buyer_articles_of_association_attachment
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
      investorId
      identityId
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
export const onUpdateInvestor = /* GraphQL */ `
  subscription OnUpdateInvestor($sortkey: String, $userId: String) {
    onUpdateInvestor(sortkey: $sortkey, userId: $userId) {
      investorId
      identityId
      investor_address_city
      investor_address_number
      investor_address_postalcode
      investor_address_refinment
      investor_articles_of_association_attachment
      investor_shareholder_list_attachment
      investor_director_list_attachment
      investor_country
      investor_industry
      investor_industry_code
      investor_logo
      investor_name
      investor_register_number
      investor_trading_name
      investor_type
      investor_website
      investor_address_street
      createdAt
      investor_date_of_incorporation
      investor_registration_cert_attachment
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
      investorId
      identityId
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
export const onUpdateUsergroup = /* GraphQL */ `
  subscription OnUpdateUsergroup($sortkey: String, $userId: String) {
    onUpdateUsergroup(sortkey: $sortkey, userId: $userId) {
      groupId
      userId
      user_name
      investorId
      supplierId
      brokerId
      sub
      identityId
      group_type
      group_name
      group_contact_name
      group_contact_email
      group_contact_phone
      user_email
      user_role
      createdAt
      sortkey
    }
  }
`;
export const onUpdateRequest = /* GraphQL */ `
  subscription OnUpdateRequest($sortkey: String, $userId: String) {
    onUpdateRequest(sortkey: $sortkey, userId: $userId) {
      requestId
      buyerId
      supplierId
      investorId
      identityId
      buyer_name
      supplier_name
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
      payout_date
      payback_date
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
