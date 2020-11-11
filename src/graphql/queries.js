/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCompany = /* GraphQL */ `
  query GetCompany($sortkey: String!, $userId: String!) {
    getCompany(sortkey: $sortkey, userId: $userId) {
      companyId
      company_address_city
      company_address_number
      company_address_postalcode
      company_address_refinment
      company_country
      company_director_appointment_date
      company_director_country_of_residence
      company_director_date_of_birth
      company_director_email
      company_director_id_attachment
      company_director_id_expiry_date
      company_director_id_issue_date
      company_director_id_issuer_country
      company_director_id_issuer_state
      company_director_id_number
      company_director_id_type
      company_director_jobtitle
      company_director_name
      company_director_nationality
      company_director_pep_status
      company_director_phone_number
      company_director_poa_attachment
      company_director_ubo_status
      company_industry
      company_industry_code
      company_name
      company_register_number
      company_trading_name
      company_type
      company_ubo_appointment_date
      company_ubo_country_of_residence
      company_ubo_date_of_birth
      company_ubo_email
      company_ubo_id_attachment
      company_ubo_id_expiry_date
      company_ubo_id_issue_date
      company_ubo_id_issuer_country
      company_ubo_id_issuer_state
      company_ubo_id_number
      company_ubo_id_type
      company_ubo_jobtitle
      company_ubo_name
      company_ubo_nationality
      company_ubo_ownership_percentage
      company_ubo_pep_status
      company_ubo_phone_number
      company_ubo_poa_attachment
      company_website
      companyaddress_street
      createdAt
      date_of_incorporation
      registration_cert_attachment
      sortkey
      userId
    }
  }
`;
export const getCompanyBank = /* GraphQL */ `
  query GetCompanyBank($sortkey: String!, $userId: String!) {
    getCompanyBank(sortkey: $sortkey, userId: $userId) {
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
export const getCompanyFinancials = /* GraphQL */ `
  query GetCompanyFinancials($sortkey: String!, $userId: String!) {
    getCompanyFinancials(sortkey: $sortkey, userId: $userId) {
      accounts_payable
      accounts_receivable
      cash
      createdAt
      ebit
      equity_book_value
      equity_market_value
      financial_accounts_attachment
      financialsId
      interest_expenses
      inventory
      net_profit
      reporting_period
      retained_earnings
      sales
      short_term_debt
      sortkey
      total_assets
      total_liabilities
      userId
      working_capital
    }
  }
`;
export const getCompanyTransaction = /* GraphQL */ `
  query GetCompanyTransaction($sortkey: String!, $userId: String!) {
    getCompanyTransaction(sortkey: $sortkey, userId: $userId) {
      authorized_date
      category
      createdAt
      iso_currency_code
      location
      merchant_name
      payment_channel
      pending
      pending_transactionId
      recipient_account_name
      recipient_bank_account_number
      recipient_bank_account_sortcode
      recipient_bank_address_city
      recipient_bank_address_number
      recipient_bank_address_postalcode
      recipient_bank_address_refinment
      recipient_bank_address_street
      recipient_bank_branch
      recipient_bank_country
      recipient_bank_name
      recipient_bank_routing_number
      recipient_bic_swift_code
      recipient_iban
      recipientaccountId
      sender_account_name
      sender_bank_account_number
      sender_bank_account_sortcode
      sender_bank_branch
      sender_bank_name
      sender_bank_routing_number
      sender_bic_swift_code
      sender_iban
      senderaccountId
      sortkey
      transaction_code
      transaction_date
      transaction_description
      transaction_exchange_rate
      transaction_exchange_rate_fee
      transaction_source_amount
      transaction_source_currency
      transaction_status
      transaction_target_amount
      transaction_target_currency
      userId
    }
  }
`;
export const getProject = /* GraphQL */ `
  query GetProject($sortkey: String!, $userId: String!) {
    getProject(sortkey: $sortkey, userId: $userId) {
      buyerId
      buyer_address_city
      buyer_address_number
      buyer_address_postalcode
      buyer_address_refinment
      buyer_address_street
      buyer_company_name
      buyer_country
      buyer_rating
      createdAt
      currency
      insurance_name
      insurance_rating
      insurance_status
      loan_amount
      loan_attachment
      loan_collateral
      loan_covenants
      loan_fees
      loan_purpose
      loan_rate
      loan_type
      next_year_projected_transaction_amount
      payment_terms
      previous_year_transaction_amount
      projectId
      purchase_order_amount
      purchase_order_attachment
      purchase_order_date
      reporting_year
      reporting_year_transaction_amount
      sales_contract_attachment
      sold_goods_description
      sortkey
      title
      userId
    }
  }
`;
export const listsCompany = /* GraphQL */ `
  query ListsCompany(
    $filter: TableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listsCompany(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        companyId
        company_address_city
        company_address_number
        company_address_postalcode
        company_address_refinment
        company_country
        company_director_appointment_date
        company_director_country_of_residence
        company_director_date_of_birth
        company_director_email
        company_director_id_attachment
        company_director_id_expiry_date
        company_director_id_issue_date
        company_director_id_issuer_country
        company_director_id_issuer_state
        company_director_id_number
        company_director_id_type
        company_director_jobtitle
        company_director_name
        company_director_nationality
        company_director_pep_status
        company_director_phone_number
        company_director_poa_attachment
        company_director_ubo_status
        company_industry
        company_industry_code
        company_name
        company_register_number
        company_trading_name
        company_type
        company_ubo_appointment_date
        company_ubo_country_of_residence
        company_ubo_date_of_birth
        company_ubo_email
        company_ubo_id_attachment
        company_ubo_id_expiry_date
        company_ubo_id_issue_date
        company_ubo_id_issuer_country
        company_ubo_id_issuer_state
        company_ubo_id_number
        company_ubo_id_type
        company_ubo_jobtitle
        company_ubo_name
        company_ubo_nationality
        company_ubo_ownership_percentage
        company_ubo_pep_status
        company_ubo_phone_number
        company_ubo_poa_attachment
        company_website
        companyaddress_street
        createdAt
        date_of_incorporation
        registration_cert_attachment
        sortkey
        userId
      }
      nextToken
    }
  }
`;
export const listsCompanyBank = /* GraphQL */ `
  query ListsCompanyBank(
    $filter: TableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listsCompanyBank(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const listsCompanyFinancials = /* GraphQL */ `
  query ListsCompanyFinancials(
    $filter: TableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listsCompanyFinancials(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        accounts_payable
        accounts_receivable
        cash
        createdAt
        ebit
        equity_book_value
        equity_market_value
        financial_accounts_attachment
        financialsId
        interest_expenses
        inventory
        net_profit
        reporting_period
        retained_earnings
        sales
        short_term_debt
        sortkey
        total_assets
        total_liabilities
        userId
        working_capital
      }
      nextToken
    }
  }
`;
export const listsCompanyTransaction = /* GraphQL */ `
  query ListsCompanyTransaction(
    $filter: TableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listsCompanyTransaction(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        authorized_date
        category
        createdAt
        iso_currency_code
        location
        merchant_name
        payment_channel
        pending
        pending_transactionId
        recipient_account_name
        recipient_bank_account_number
        recipient_bank_account_sortcode
        recipient_bank_address_city
        recipient_bank_address_number
        recipient_bank_address_postalcode
        recipient_bank_address_refinment
        recipient_bank_address_street
        recipient_bank_branch
        recipient_bank_country
        recipient_bank_name
        recipient_bank_routing_number
        recipient_bic_swift_code
        recipient_iban
        recipientaccountId
        sender_account_name
        sender_bank_account_number
        sender_bank_account_sortcode
        sender_bank_branch
        sender_bank_name
        sender_bank_routing_number
        sender_bic_swift_code
        sender_iban
        senderaccountId
        sortkey
        transaction_code
        transaction_date
        transaction_description
        transaction_exchange_rate
        transaction_exchange_rate_fee
        transaction_source_amount
        transaction_source_currency
        transaction_status
        transaction_target_amount
        transaction_target_currency
        userId
      }
      nextToken
    }
  }
`;
export const listsProject = /* GraphQL */ `
  query ListsProject(
    $filter: TableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listsProject(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        buyerId
        buyer_address_city
        buyer_address_number
        buyer_address_postalcode
        buyer_address_refinment
        buyer_address_street
        buyer_company_name
        buyer_country
        buyer_rating
        createdAt
        currency
        insurance_name
        insurance_rating
        insurance_status
        loan_amount
        loan_attachment
        loan_collateral
        loan_covenants
        loan_fees
        loan_purpose
        loan_rate
        loan_type
        next_year_projected_transaction_amount
        payment_terms
        previous_year_transaction_amount
        projectId
        purchase_order_amount
        purchase_order_attachment
        purchase_order_date
        reporting_year
        reporting_year_transaction_amount
        sales_contract_attachment
        sold_goods_description
        sortkey
        title
        userId
      }
      nextToken
    }
  }
`;
export const getOriginate = /* GraphQL */ `
  query GetOriginate($userId: String!, $sortkey: String!) {
    getOriginate(userId: $userId, sortkey: $sortkey) {
      sortkey
      userId
    }
  }
`;
export const listOriginates = /* GraphQL */ `
  query ListOriginates(
    $filter: TableOriginateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOriginates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        sortkey
        userId
      }
      nextToken
    }
  }
`;
