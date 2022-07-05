const model = {
  formId2: "SupplierBuyerRequest",
  formField2: {
    buyer_eulerid: {
      name: "buyer_eulerid",
      label: "Buyer Euler ID",
      requiredErrorMsg: "Can't be empty",
    },
    supplier_eulerid: {
      name: "supplier_eulerid",
      label: "Supplier Euler ID",
      requiredErrorMsg: "Can't be empty",
    },
    invoice_amount: {
      name: "invoice_amount",
      label: "Invoice Amount",
      requiredErrorMsg: "Can't be empty",
    },
    invoice_currency: {
      name: "invoice_currency",
      label: "Invoice Currency",
      requiredErrorMsg: "Can't be empty",
    },
    invoice_number: {
      name: "invoice_number",
      label: "Invoice Number",
      requiredErrorMsg: "Can't be empty",
    },
    invoice_issue_date: {
      name: "invoice_issue_date",
      label: "Invoice Issue Date",
      requiredErrorMsg: "Can't be empty",
    },
    invoice_due_date: {
      name: "invoice_due_date",
      label: "Invoice Due Date",
      requiredErrorMsg: "Can't be empty",
    },
  },
};
export default model;
