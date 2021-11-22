const model = {
  formId: "NewInsuranceRequest",
  formField: {
    insurance_buyer_duns: {
      name: "insurance_buyer_duns",
      label: "Buyer DUNS",
      requiredErrorMsg: "Can't be empty",
    },
    insurance_supplier_duns: {
      name: "insurance_supplier_duns",
      label: "Supplier DUNS",
      requiredErrorMsg:
        "Can't be empty",
    },
  },
};
export default model;
