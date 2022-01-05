import * as Yup from "yup";
import RequestFormModel from "./RequestFormModel";
const {
  formField2: { buyer_eulerid, supplier_eulerid},
} = RequestFormModel;

const yup = [
  Yup.object().shape({
    [buyer_eulerid.name]: Yup.string().required(`${buyer_eulerid.requiredErrorMsg}`),
    [supplier_eulerid.name]: Yup.string().required(`${supplier_eulerid.requiredErrorMsg}`),
  }),
];

export default yup;
