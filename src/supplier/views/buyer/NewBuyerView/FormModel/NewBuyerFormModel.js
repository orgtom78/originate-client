export default {
  formId: "NewBuyer",
  formField: {
    buyer_loan_request_amount: {
      name: "buyer_loan_request_amount",
      label: "Desired Loan Amount*",
      requiredErrorMsg: "Loan Amount is required",
    },
    buyer_payment_terms: {
      name: "buyer_payment_terms",
      label: "Payment Terms*",
      requiredErrorMsg: "Payment Terms is required",
    },
    buyer_address_city: {
      name: "buyer_address_city",
      label: "City*",
      requiredErrorMsg: "City is required",
    },
    buyer_address_number: {
      name: "buyer_address_number",
      label: "Street Number*",
      requiredErrorMsg: "Street Number is required",
    },
    buyer_address_postalcode: {
      name: "buyer_address_postalcode",
      label: "Zipcode*",
      requiredErrorMsg: "Zipcode is required",
      invalidErrorMsg: "Zipcode is not valid (e.g. 70000)",
    },
    buyer_address_street: {
      name: "buyer_address_street",
      label: "Street*",
      requiredErrorMsg: "Street is required",
    },
    buyer_name: {
      name: "buyer_name",
      label: "Client Exact Legal Name*",
      requiredErrorMsg: "Name is required",
    },
    buyer_country: {
      name: "buyer_country",
      label: "Country*",
      requiredErrorMsg: "Country is required",
    },
    buyer_website: {
      name: "buyer_website",
      label: "Website/URL*",
      requiredErrorMsg: "URL is required",
    },
    buyer_contact_name: {
      name: "buyer_contact_name",
      label: "Client Contact Person Name*",
      requiredErrorMsg: "Contact Person Name is required",
    },
    buyer_contact_email: {
      name: "buyer_contact_email",
      label: "Client Contact Person Email*",
      requiredErrorMsg: "Contact Person Email is required",
    },
    buyer_currency: {
      name: "buyer_currency",
      label: "Invoicing Currency*",
      requiredErrorMsg: "Currency is required",
    },
    buyer_sold_goods_description: {
      name: "buyer_sold_goods_description",
      label: "Goods/Service Description*",
      requiredErrorMsg: "Description is required",
    },
    buyer_sample_trading_docs_attachment: {
      name: "buyer_sample_trading_docs_attachment",
      requiredErrorMsg: "Sample Trading Documents are required",
    },
    buyer_insurance_name: {
      name: "buyer_insurance_name",
      label: "Credit Insurance Name (if applicable)",
      requiredErrorMsg: "Insurance Name is required",
    },
    buyer_one_off_ipu_attachment: {
      name: "buyer_one_off_ipu_attachment",
      requiredErrorMsg: "IPU is required",
    },
    buyer_next_year_projected_transaction_amount: {
      name: "buyer_next_year_projected_transaction_amount",
      label: "Next Year Anticipated Invoicing Amount",
      requiredErrorMsg: "Anticipated Invoice Amount is required",
    },
    buyer_previous_year_transaction_amount: {
      name: "buyer_previous_year_transaction_amount",
      label: "Previous Year Invoicing Amount",
      requiredErrorMsg: "Previous Invoice Amount is required",
    },
    buyer_reporting_year: {
      name: "buyer_reporting_year",
      label: "Invoicing Reporting Year*",
      requiredErrorMsg: "Transaction Reporting Year is required",
    },
    buyer_reporting_year_transaction_amount: {
      name: "buyer_reporting_year_transaction_amount",
      label: "Reporting Year Invoicing Amount*",
      requiredErrorMsg: "Invoicing Amount is required",
    },
    buyer_previous_year_number_invoices: {
      name: "buyer_previous_year_number_invoices",
      label: "Previous Year Number of Invoices issued*",
      requiredErrorMsg:
        "The Number of Invoices issued in the previous year is required",
    },
    ebit: {
      name: "ebit",
      label: "Earnings before Interest & Tax",
      requiredErrorMsg: "EBIT is required",
    },
    balance_sheet_attachment: {
      name: "balance_sheet_attachment",
      label: "Balance Sheet",
      requiredErrorMsg: "Balance Sheet is required",
    },
    income_statement_attachment: {
      name: "income_statement_attachment",
      label: "Income Statement",
      requiredErrorMsg: "Income Statement is required",
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
      label: "Financial Reporting Period",
      requiredErrorMsg: "Financial Reporting Period is required",
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
    retained_earnings: {
      name: "retained_earnings",
      label: "Retained Earnings",
      requiredErrorMsg: "Retained Earnings is required",
    },
    working_capital: {
      name: "working_capital",
      label: "Working Capital",
      requiredErrorMsg: "Working Capital is required",
    },
  },
};
