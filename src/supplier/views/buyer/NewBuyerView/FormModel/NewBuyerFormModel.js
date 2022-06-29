const model = {
  formId: "NewBuyer",
  formField: {
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
    buyer_address_postalcode: {
      name: "buyer_address_postalcode",
      label: "Zipcode*",
      requiredErrorMsg: "Zipcode is required",
    },
    buyer_address_city: {
      name: "buyer_address_city",
      label: "City*",
      requiredErrorMsg: "City is required",
    },
    buyer_address_street: {
      name: "buyer_address_street",
      label: "Street/Exact Legal Address*",
      requiredErrorMsg: "Exact legal address is required",
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
    buyer_website: {
      name: "buyer_website",
      label: "Website/URL*",
      requiredErrorMsg: "URL is required",
    },
    buyer_sold_goods_description: {
      name: "buyer_sold_goods_description",
      label: "Goods/Service Description*",
      requiredErrorMsg: "Description is required",
    },
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
    buyer_currency: {
      name: "buyer_currency",
      label: "Invoicing Currency*",
      requiredErrorMsg: "Currency is required",
    },
    buyer_sample_trading_docs_attachment: {
      name: "buyer_sample_trading_docs_attachment",
      requiredErrorMsg: "Sample Trading Documents are required",
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
    ebit: {
      name: "ebit",
      label: "Earnings before Interest & Tax",
      requiredErrorMsg: "EBIT is required",
    },
    net_profit: {
      name: "net_profit",
      label: "Net Profit",
      requiredErrorMsg: "Net Profit is required",
    },
    cost_of_goods_sold: {
      name: "cost_of_goods_sold",
      label: "Cost of Goods Sold",
      requiredErrorMsg: "Cost of Goods Sold is required",
    },
    current_assets: {
      name: "current_assets",
      label: "Current Assets",
      requiredErrorMsg: "Current Assets is required",
    },
    current_liabilities: {
      name: "current_liabilities",
      label: "Current Liabilities",
      requiredErrorMsg: "Current Liabilities is required",
    },
    total_equity: {
      name: "total_equity",
      label: "Total Equity",
      requiredErrorMsg: "Total Equity is required",
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
    buyer_supplier_year_business_relation_started: {
      name: "buyer_supplier_year_business_relation_started",
      label: "Year Business Relation started*",
      requiredErrorMsg:
        "The year in which your business relation with your buyer/client started is required",
    },
    buyer_previous_year_transaction_amount: {
      name: "buyer_previous_year_transaction_amount",
      label: "Whole Year (2020) Invoice Amount ($)*",
      requiredErrorMsg: "Previous Invoice Amount is required",
    },
    buyer_reporting_year_transaction_amount: {
      name: "buyer_reporting_year_transaction_amount",
      label: "Whole Year (2021) Invoice Amount ($)*",
      requiredErrorMsg: "Invoice Amount for 2021 is required",
    },
    buyer_next_year_projected_transaction_amount: {
      name: "buyer_next_year_projected_transaction_amount",
      label: "Whole Year (2022) Anticipated Invoice Amount ($)*",
      requiredErrorMsg: "Anticipated Invoice Amount is required",
    }, 
    buyer_previous_year_number_invoices: {
      name: "buyer_previous_year_number_invoices",
      label: "Whole Year (2020) Number of Invoices issued*",
      requiredErrorMsg:
        "The Number of Invoices issued in the previous year (2020) is required",
    },
    buyer_insurance_name: {
      name: "buyer_insurance_name",
      label: "Credit Insurance Name (if applicable)",
      requiredErrorMsg: "Insurance Name is required",
    },
    buyer_existing_disputes: {
      name: "buyer_existing_disputes",
      label: "Do Invoice Disputes with the Buyer exist?*",
      requiredErrorMsg:
        "Existing disputes between your company and your buyer/client is a required field",
    },
    buyer_finance_department_contact_email: {
      name: "buyer_finance_department_contact_email",
      label: "Finance Department Contact Email Address",
      requiredErrorMsg:
      "Finance Department Contact Email Address is required",
    },
    buyer_use_of_goods_purchased: {
      name: "buyer_use_of_goods_purchased",
      label: "How is your Buyer using the purchased Goods?",
      requiredErrorMsg:
      "Buyer usage of purchased goods is required",
    },
    buyer_invoices_paid_on_time: {
      name: "buyer_invoices_paid_on_time",
      label: "Buyer invoices paid on time",
      requiredErrorMsg:
      "Buyer invoices paid on time is required",
    },
    buyer_invoices_past_due_30_days: {
      name: "buyer_invoices_past_due_30_days",
      label: "Invoices overdue for more than 30 Days",
      requiredErrorMsg:
      "Buyer Invoices past due 30 days is required",
    },
    buyer_invoices_past_due_60_days: {
      name: "buyer_invoices_past_due_60_days",
      label: "Invoices overdue for more than 60 Days",
      requiredErrorMsg:
      "Buyer Invoices past due 60 days is required",
    },
    buyer_invoices_past_due_90_days: {
      name: "buyer_invoices_past_due_90_days",
      label: "Invoices overdue for more than 90 Days",
      requiredErrorMsg:
      "Buyer Invoices past due 90 days is required",
    },
  },
};

export default model;
