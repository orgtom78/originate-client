import NewInsuranceRequestFormModel from "./NewInsuranceRequestFormModel";
const {
  formField: { insurance_buyer_duns, insurance_supplier_duns },
} = NewInsuranceRequestFormModel;

const values = {
  [insurance_buyer_duns.name]: "",
  [insurance_supplier_duns.name]: "",
};

export default values;
