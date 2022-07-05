import * as Yup from "yup";
import NewInsuranceRequestFormModel from "./IDFormModel";
const {
  formField: { buyer_country, buyer_name },
} = NewInsuranceRequestFormModel;

const yup = [
  Yup.object().shape({
    [buyer_name.name]: Yup.string().required(`${buyer_name.requiredErrorMsg}`),
    [buyer_country.name]: Yup.string().required(`${buyer_country.requiredErrorMsg}`),
  }),
];

export default yup;
