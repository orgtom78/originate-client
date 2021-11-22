import * as Yup from "yup";
import NewInsuranceRequestFormModel from "./NewInsuranceRequestFormModel";
const {
  formField: { insurance_buyer_duns, insurance_supplier_duns },
} = NewInsuranceRequestFormModel;

const yup = [
  Yup.object().shape({
    [insurance_buyer_duns.name]: Yup.string().required(`${insurance_buyer_duns.requiredErrorMsg}`),
    [insurance_supplier_duns.name]: Yup.string().required(`${insurance_supplier_duns.requiredErrorMsg}`),
  }),
];

export default yup;
