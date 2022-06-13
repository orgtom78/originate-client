import * as Yup from "yup";
import OneClickRequestFormModel from "./OneClickRequestFormModel";
const {
  formField4: {
    buyer_eulerid,
  },
} = OneClickRequestFormModel;

const yup = [
  Yup.object().shape({
    [buyer_eulerid.name]: Yup.string().required(
      `${buyer_eulerid.requiredErrorMsg}`
    ),
  }),
];

export default yup;
