import NewInsuranceRequestFormModel from "./IDFormModel";
const {
  formField: { buyer_name, buyer_country },
} = NewInsuranceRequestFormModel;

const values = {
  [buyer_name.name]: "",
  [buyer_country.name]: "",
};

export default values;
