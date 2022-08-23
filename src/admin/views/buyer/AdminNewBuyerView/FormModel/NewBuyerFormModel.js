const model = {
  formId: "NewBuyer",
  formField: {
    investorId: {
      name: "investorId",
      label: "Investor",
      requiredErrorMsg:
        "Please select the corresponding investor to associate an ID!",
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
    buyer_contact_email: {
      name: "buyer_contact_email",
      label: "Main Contact Email*",
      requiredErrorMsg: "Main email address is required",
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
      label: "Whole Year (2022) Anticipated Invoice Amount ($)*",
      requiredErrorMsg: "Anticipated Invoice Amount is required",
    }, 
    buyer_previous_year_transaction_amount: {
      name: "buyer_previous_year_transaction_amount",
      label: "Whole Year (2020) Invoice Amount ($)*",
      requiredErrorMsg: "Previous Invoice Amount is required",
    },
    buyer_reporting_year: {
      name: "buyer_reporting_year",
      label: "Invoice Reporting Year (2021)",
      requiredErrorMsg: "The Reporting Year (2021) is required",
    },
    buyer_reporting_year_transaction_amount: {
      name: "buyer_reporting_year_transaction_amount",
      label: "Whole Year (2021) Invoice Amount ($)*",
      requiredErrorMsg: "Invoice Amount for 2021 is required",
    },
    buyer_previous_year_number_invoices: {
      name: "buyer_previous_year_number_invoices",
      label: "Whole Year (2020) Number of Invoices issued*",
      requiredErrorMsg:
        "The Number of Invoices issued in the previous year (2020) is required",
    },
    ebit: {
      name: "ebit",
      label: "Earnings before Interest & Tax",
      requiredErrorMsg: "EBIT is required",
    },
    balance_sheet_attachment: {
      name: "balance_sheet_attachment",
      label: "Balance Sheet",
      requiredErrorMsg: "Balance Sheets are required",
    },
    income_statement_attachment: {
      name: "income_statement_attachment",
      label: "Income Statement",
      requiredErrorMsg: "Income Statements are required",
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
      label: "Financial Reporting Period*",
      requiredErrorMsg: "Financial Reporting Period is required",
    },
    financials_denomination: {
      name: "financials_denomination",
      label: "Financial Denomination",
      requiredErrorMsg: "Financial Denomination is required",
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
    financials_status: {
      name: "financials_status",
      label: "Financials Type of Audit",
      requiredErrorMsg: "Tyype of audit for financials is required",
    },
    total_equity: {
      name: "total_equity",
      label: "Ending total equity",
      requiredErrorMsg: "Total equity is required",
    },
    net_operating_loss: {
      name: "net_operating_loss",
      label: "Net Operating Loss",
      requiredErrorMsg: "Net operating loss is required",
    },
    cash_flow_from_operating_activities: {
      name: "cash_flow_from_operating_activities",
      label: "Cash Flow from operating activities",
      requiredErrorMsg: "Cash flow from operating activities loss is required",
    },
    current_assets: {
      name: "current_assets",
      label: "Current Assets",
      requiredErrorMsg: "Current assets is required",
    },
    current_liabilities: {
      name: "current_liabilities",
      label: "Current Liabilities",
      requiredErrorMsg: "Current liabilities is required",
    },
    inventory_beginning: {
      name: "inventory_beginning",
      label: "Inventory beginning",
      requiredErrorMsg: "Inventory beginning is required",
    },
    inventory_end: {
      name: "inventory_end",
      label: "Inventory end",
      requiredErrorMsg: "Inventory end is required",
    },
    cost_of_goods_sold: {
      name: "cost_of_goods_sold",
      label: "Cost of goods sold",
      requiredErrorMsg: "Cost of goods sold is required",
    },
    interest_expenses: {
      name: "interest_expenses",
      label: "Interest Expenses",
      requiredErrorMsg: "Interest Expenses is required",
    },
    buyer_existing_disputes: {
      name: "buyer_existing_disputes",
      label: "Existing Disputes",
      requiredErrorMsg: "Existing Disputes is required",
    },
    buyer_existing_disputes_source: {
      name: "buyer_existing_disputes_source",
      label: "Existing Disputes Source",
      requiredErrorMsg: "Existing Disputes Source is required",
    },
    buyer_insurance_status: {
      name: "buyer_insurance_status",
      label: "Credit Insurance Status",
      requiredErrorMsg: "Credit Insurance Status is required",
    },
    buyer_country_year_of_rating_downgrade: {
      name: "buyer_country_year_of_rating_downgrade",
      label: "Country Year of Rating Downgrade",
      requiredErrorMsg: "Country Year of Rating Downgrade is required",
    },
    buyer_finance_department_contact_exists: {
      name: "buyer_finance_department_contact_exists",
      label: "Finance Department Contacted (Call/Email)",
      requiredErrorMsg: "Finance Department Contact Status is required",
    },
    buyer_field_visit_conducted: {
      name: "buyer_field_visit_conducted",
      label: "Field Visit Conducted",
      requiredErrorMsg: "Field Visit Conducted is required",
    },
    buyer_finance_department_contact_email: {
      name: "buyer_finance_departmment_contact_email",
      label: "Finance Department Contact Email",
      requiredErrorMsg: "Finance Department Contact Email is required",
    },
    buyer_supplier_year_business_relation_started: {
      name: "buyer_supplier_year_business_relation_started",
      label: "Supplier Year Business Relation Started",
      requiredErrorMsg: "Supplier Year Business Relation Started is required",
    },
    buyer_invoices_paid_on_time: {
      name: "buyer_invoices_paid_on_time",
      label: "Invoices paid on time (%)",
      requiredErrorMsg: "Invoices paid is required",
    },
    buyer_invoices_past_due: {
      name: "buyer_invoices_past_due",
      label: "Invoices past due (%)",
      requiredErrorMsg: "Invoices past due is required",
    },
    buyer_invoices_past_due_30_days: {
      name: "buyer_invoices_past_due_30_days",
      label: "Invoices past due 30 days (%)",
      requiredErrorMsg: "Invoices past due 30 days is required",
    },
    buyer_invoices_past_due_60_days: {
      name: "buyer_invoices_past_due_60_days",
      label: "Invoices past due 60 days (%)",
      requiredErrorMsg: "Invoices past due 60 days is required",
    },
    buyer_invoices_past_due_90_days: {
      name: "buyer_invoices_past_due_90_days",
      label: "Invoices past due 90 days (%)",
      requiredErrorMsg: "Invoices past due 90 days is required",
    },
    buyer_use_of_goods_purchased: {
      name: "buyer_use_of_goods_purchased",
      label: "Use of goods purchased",
      requiredErrorMsg: "Use of goods purchased is required",
    },
    inventory: {
      name: "inventory",
      label: "Inventory",
      requiredErrorMsg: "Inventory is required",
    },
    buyer_date_of_incorporation: {
      name: "buyer_date_of_incorporation",
      label: "Date of incorporation",
      requiredErrorMsg: "Date of incorporation is required",
    },
  },
};

export default model;
