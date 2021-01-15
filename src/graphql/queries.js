/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSupplier = /* GraphQL */ `
  query GetSupplier($sortkey: String!, $userId: String!) {
    getSupplier(sortkey: $sortkey, userId: $userId) {
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
export const getBank = /* GraphQL */ `
  query GetBank($sortkey: String!, $userId: String!) {
    getBank(sortkey: $sortkey, userId: $userId) {
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
export const getFinancials = /* GraphQL */ `
  query GetFinancials($sortkey: String!, $userId: String!) {
    getFinancials(sortkey: $sortkey, userId: $userId) {
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
export const getTransaction = /* GraphQL */ `
  query GetTransaction($sortkey: String!, $userId: String!) {
    getTransaction(sortkey: $sortkey, userId: $userId) {
      transactionId
      buyerId
      supplierId
      investorId
      identityId
      authorized_date
      category
      iso_currency_code
      location
      merchant_name
      payment_channel
      pending
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
      sortkey
    }
  }
`;
export const getBuyer = /* GraphQL */ `
  query GetBuyer($sortkey: String!, $userId: String!) {
    getBuyer(sortkey: $sortkey, userId: $userId) {
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
export const getDirector = /* GraphQL */ `
  query GetDirector($sortkey: String!, $userId: String!) {
    getDirector(sortkey: $sortkey, userId: $userId) {
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
export const getInvestor = /* GraphQL */ `
  query GetInvestor($sortkey: String!, $userId: String!) {
    getInvestor(sortkey: $sortkey, userId: $userId) {
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
export const getUbo = /* GraphQL */ `
  query GetUbo($sortkey: String!, $userId: String!) {
    getUBO(sortkey: $sortkey, userId: $userId) {
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
export const getUsergroup = /* GraphQL */ `
  query GetUsergroup($sortkey: String!, $userId: String!) {
    getUsergroup(sortkey: $sortkey, userId: $userId) {
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
export const getRequest = /* GraphQL */ `
  query GetRequest($sortkey: String!, $userId: String!) {
    getRequest(sortkey: $sortkey, userId: $userId) {
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
export const listsDirector = /* GraphQL */ `
  query ListsDirector(
    $filter: TableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listsDirector(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const listsInvestor = /* GraphQL */ `
  query ListsInvestor(
    $filter: TableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listsInvestor(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const listsUbo = /* GraphQL */ `
  query ListsUbo($filter: TableFilterInput, $limit: Int, $nextToken: String) {
    listsUBO(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const listsUsergroup = /* GraphQL */ `
  query ListsUsergroup(
    $filter: TableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listsUsergroup(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const listsRequest = /* GraphQL */ `
  query ListsRequest(
    $filter: TableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listsRequest(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const listsSupplier = /* GraphQL */ `
  query ListsSupplier(
    $filter: TableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listsSupplier(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const listsBank = /* GraphQL */ `
  query ListsBank($filter: TableFilterInput, $limit: Int, $nextToken: String) {
    listsBank(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const listsFinancials = /* GraphQL */ `
  query ListsFinancials(
    $filter: TableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listsFinancials(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const listsTransaction = /* GraphQL */ `
  query ListsTransaction(
    $filter: TableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listsTransaction(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        transactionId
        buyerId
        supplierId
        investorId
        identityId
        authorized_date
        category
        iso_currency_code
        location
        merchant_name
        payment_channel
        pending
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
        sortkey
      }
      nextToken
    }
  }
`;
export const listsBuyer = /* GraphQL */ `
  query ListsBuyer($filter: TableFilterInput, $limit: Int, $nextToken: String) {
    listsBuyer(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
