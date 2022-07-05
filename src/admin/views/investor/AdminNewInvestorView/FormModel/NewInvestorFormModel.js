const model = {
  formId: "NewInvestor",
  formField: {
    investor_logo: {
      name: "investor_logo",
      label: "Company Logo",
    },
    investor_name: {
      name: "investor_name",
      label: "Company Legal Name*",
      requiredErrorMsg: "Company Legal name is required",
    },
    investor_trading_name: {
      name: "investor_trading_name",
      label: "Company Trading Name*",
      requiredErrorMsg: "Company Trading name is required",
    },
    investor_website: {
      name: "investor_website",
      label: "Company Website",
      requiredErrorMsg: "Company Website is required",
    },
    investor_type: {
      name: "investor_type",
      label: "Company Legal Form*",
      requiredErrorMsg: "Legal Form is required",
    },
    investor_date_of_incorporation: {
      name: "investor_date_of_incorporation",
      label: "Date of incorporation*",
      requiredErrorMsg: "Date of incorporation is required",
    },
    investor_address_city: {
      name: "investor_address_city",
      label: "City*",
      requiredErrorMsg: "City is required",
    },
    investor_address_street: {
      name: "investor_address_street",
      label: "Street*",
      requiredErrorMsg: "Street is required",
    },
    investor_address_postalcode: {
      name: "investor_address_postalcode",
      label: "Zipcode*",
      requiredErrorMsg: "Zipcode is required",
      invalidErrorMsg: "Zipcode is not valid (e.g. 70000)",
    },
    investor_address_refinment: {
      name: "investor_address_refinment",
      label: "Refinment*",
      requiredErrorMsg: "Refinment is required",
    },
    investor_country: {
      name: "investor_country",
      label: "Country*",
      requiredErrorMsg: "Country is required",
    },
    investor_industry: {
      name: "investor_industry",
      label: "Industry",
    },
    investor_industry_code: {
      name: "investor_industry_code",
      label: "Industry Code",
      requiredErrorMsg: "Industry Code is required",
    },
    investor_register_number: {
      name: "investor_register_number",
      label: "Company Registration Number",
      requiredErrorMsg: "Registration Number is required",
    },
    investor_articles_of_association_attachment: {
      name: "investor_articles_of_association_attachment",
      requiredErrorMsg: "Articles of Association is required",
    },
    investor_shareholder_list_attachment: {
      name: "investor_shareholder_list_attachment",
      requiredErrorMsg: "Shareholder List is required",
    },
    investor_director_list_attachment: {
      name: "investor_director_list_attachment",
      requiredErrorMsg: "Director List is required",
    },
    investor_registration_cert_attachment: {
      name: "investor_registration_cert_attachment",
      requiredErrorMsg: "Registration certificate is required",
    },
    director_name: {
      name: "director_name",
      label: "Director Name*",
      requiredErrorMsg: "Director Name is required",
    },
    director_email: {
      name: "director_email",
      label: "Director Email",
      requiredErrorMsg: "Email is required",
    },
    director_phone_number: {
      name: "director_phone_number",
      label: "Director Phone",
      requiredErrorMsg: "Phone is required",
    },
    director_id_attachment: {
      name: "director_id_attachment",
      label: "Director ID",
    },
    director_id_number: {
      name: "director_id_number",
      label: "Director ID Number",
      requiredErrorMsg: "ID Number is required",
    },
    director_id_type: {
      name: "director_id_type",
      label: "Director ID Type",
      requiredErrorMsg: "ID Type is required",
    },
    director_nationality: {
      name: "director_nationality",
      label: "Director Nationality",
      requiredErrorMsg: "Nationality is required",
    },
    director_poa_attachment: {
      name: "director_poa_attachment",
      label: "Director Proof of Address",
      requiredErrorMsg: "Proof of Address Type is required",
    },
    director_country_of_residence: {
      name: "director_country_of_residence",
      label: "Director Country of Residence",
      requiredErrorMsg: "Country of residence is required",
    },
    ubo_name: {
      name: "ubo_name",
      label: "Owner Name*",
      requiredErrorMsg: "Owner Name is required",
    },
    ubo_email: {
      name: "ubo_email",
      label: "Owner Email",
      requiredErrorMsg: "Email is required",
    },
    ubo_phone_number: {
      name: "ubo_phone_number",
      label: "Owner Phone",
      requiredErrorMsg: "Phone is required",
    },
    ubo_id_attachment: {
      name: "ubo_id_attachment",
      label: "Owner ID",
    },
    ubo_id_number: {
      name: "ubo_id_number",
      label: "Owner ID Number",
      requiredErrorMsg: "ID Number is required",
    },
    ubo_id_type: {
      name: "ubo_id_type",
      label: "Owner ID Type",
      requiredErrorMsg: "ID Type is required",
    },
    ubo_nationality: {
      name: "ubo_nationality",
      label: "Owner Nationality",
      requiredErrorMsg: "Nationality is required",
    },
    ubo_poa_attachment: {
      name: "ubo_poa_attachment",
      label: "Owner Proof of Address",
      requiredErrorMsg: "Proof of Address Type is required",
    },
    ubo_country_of_residence: {
      name: "ubo_country_of_residence",
      label: "Owner Country of Residence",
      requiredErrorMsg: "Country of residence is required",
    },
    buyerId: {
      name: "buyerId",
      label: "Buyer ID",
      requiredErrorMsg: "Buyer ID is required",
    },
    accounts_payable: {
      name: "accounts_payable",
      label: "Accounts Payable",
      requiredErrorMsg: "Accounts Payable is required",
    },
    accounts_receivable: {
      name: "accounts_receivable",
      label: "Accounts Receivable",
      requiredErrorMsg: "Accounts Receivable is required",
    },
    cash: {
      name: "cash",
      label: "Cash Balance",
      requiredErrorMsg: "Cash is required",
    },
    equity_book_value: {
      name: "equity_book_value",
      label: "Equity Book Value",
      requiredErrorMsg: "Equity Book Value is required",
    },
    equity_market_value: {
      name: "equity_market_value",
      label: "Equity Market Value",
      requiredErrorMsg: "Equity Market Value is required",
    },
    interest_expenses: {
      name: "interest_expenses",
      label: "Interest Expenses",
      requiredErrorMsg: "Interest Expenses is required",
    },
    inventory: {
      name: "inventory",
      label: "Inventory",
      requiredErrorMsg: "Inventory is required",
    },
    retained_earnings: {
      name: "retained_earnings",
      label: "Retained Earnings",
      requiredErrorMsg: "Retained Earnings is required",
    },
    short_term_debt: {
      name: "short_term_debt",
      label: "Short Term Debt",
      requiredErrorMsg: "Short Term Debt is required",
    },
    working_capital: {
      name: "working_capital",
      label: "Working Capital",
      requiredErrorMsg: "Working Capital is required",
    },
    ebit: {
      name: "ebit",
      label: "Earnings before Interest & Tax",
      requiredErrorMsg: "EBIT is required",
    },
    financials_attachment: {
      name: "financials_attachment",
      label: "Financial Accounts",
      requiredErrorMsg: "Financial Accounts are required",
    },
    net_profit: {
      name: "net_profit",
      label: "Net Profit",
      requiredErrorMsg: "Net Profit is required",
    },
    financials_rating: {
      name: "financials_rating",
      label: "Financial Rating",
      requiredErrorMsg: "Rating is required",
    },
    financials_reporting_period: {
      name: "financials_reporting_period",
      label: "Reporting Period",
      requiredErrorMsg: "Reporting Period is required",
    },
    sales: {
      name: "sales",
      label: "Sales/Revenue",
      requiredErrorMsg: "Sales/Revenue is required",
    },
    total_assets: {
      name: "total_assets",
      label: "Total Assets",
      requiredErrorMsg: "Total Assets is required",
    },
    total_liabilities: {
      name: "total_liabilities",
      label: "Total Liabilities",
      requiredErrorMsg: "Total Liabiliities is required",
    },
  },
};

export default model;
