const model = {
  formId3: "CreditRequest",
  formField3: {
    debtor_eulerid: {
      name: "debtor_eulerid",
      label: "Debtor Euler ID",
      requiredErrorMsg: "Can't be empty",
    },
    credit_amount: {
      name: "credit_amount",
      label: "Credit Amount",
      requiredErrorMsg: "Can't be empty",
    },
    credit_currency: {
      name: "credit_currency",
      label: "CreditCurrency",
      requiredErrorMsg: "Can't be empty",
    },
  },
};
export default model;
