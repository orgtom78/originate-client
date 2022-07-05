import * as Yup from "yup";
import RequestFormModel from "./RequestFormModel";
const {
  formField2: {
    buyer_eulerid,
    supplier_eulerid,
    invoice_amount,
    invoice_currency,
    invoice_due_date,
    invoice_issue_date,
    invoice_number,
  },
} = RequestFormModel;

const yup = [
  Yup.object().shape({
    [buyer_eulerid.name]: Yup.string().required(
      `${buyer_eulerid.requiredErrorMsg}`
    ),
    [supplier_eulerid.name]: Yup.string().required(
      `${supplier_eulerid.requiredErrorMsg}`
    ),
    [invoice_amount.name]: Yup.string().required(
      `${invoice_amount.requiredErrorMsg}`
    ),
    [invoice_currency.name]: Yup.string().required(
      `${invoice_currency.requiredErrorMsg}`
    ),
    [invoice_due_date.name]: Yup.string().required(
      `${supplier_eulerid.requiredErrorMsg}`
    ),
    [invoice_issue_date.name]: Yup.string().required(
      `${supplier_eulerid.requiredErrorMsg}`
    ),
    [invoice_number.name]: Yup.string().required(
      `${supplier_eulerid.requiredErrorMsg}`
    ),
  }),
];

export default yup;
