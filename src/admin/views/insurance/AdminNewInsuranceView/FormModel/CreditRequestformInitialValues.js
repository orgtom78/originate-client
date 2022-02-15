import CreditRequestFormModel from "./CreditRequestFormModel";
const {
  formField3: {
    debtor_eulerid,
    credit_amount,
    credit_currency,
  },
} = CreditRequestFormModel;

const values = {
  [debtor_eulerid.name]: "",
  [credit_currency.name]: "",
  [credit_amount.name]: "",
};

export default values;
