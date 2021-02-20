import * as Yup from "yup";
import NewDocumentFormModel from "./NewDocumentFormModel";
const {
  formField: { document_type, document_attachment },
} = NewDocumentFormModel;

export default [
  Yup.object().shape({
    [document_type.name]: Yup.string().required(
      `${document_type.requiredErrorMsg}`
    ),
    [document_attachment.name]: Yup.string().required(
      `${document_attachment.requiredErrorMsg}`
    ),
  }),
];
