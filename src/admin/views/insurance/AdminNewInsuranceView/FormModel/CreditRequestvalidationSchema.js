import * as Yup from "yup";
import CreditRequestFormModel from "./CreditRequestFormModel";
const {
  formField3: { debtor_eulerid, credit_amount, credit_currency },
} = CreditRequestFormModel;

const yup = [
  Yup.object().shape({
    [debtor_eulerid.name]: Yup.string().required(
      `${debtor_eulerid.requiredErrorMsg}`
    ),
    [credit_amount.name]: Yup.string().required(
      `${credit_amount.requiredErrorMsg}`
    ),
    [credit_currency.name]: Yup.string().required(
      `${credit_currency.requiredErrorMsg}`
    ),
  }),
];

export default yup;
