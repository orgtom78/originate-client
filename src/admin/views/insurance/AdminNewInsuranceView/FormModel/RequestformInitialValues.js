import RequestFormModel from "./RequestFormModel";
const {
  formField2: {
    buyer_eulerid,
    supplier_eulerid,
    invoice_amount,
    invoice_currency,
    invoice_number,
    invoice_issue_date,
    invoice_due_date,
  },
} = RequestFormModel;

const values = {
  [buyer_eulerid.name]: "",
  [supplier_eulerid.name]: "",
  [invoice_currency.name]: "",
  [invoice_amount.name]: "",
  [invoice_number.name]: "",
  [invoice_issue_date.name]: "",
  [invoice_due_date.name]: "",
};

export default values;
