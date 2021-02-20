import NewDocumentFormModel from "./NewDocumentFormModel";
const {
  formField: { document_type, document_attachment },
} = NewDocumentFormModel;

export default {
  [document_type.name]: "",
  [document_attachment.name]: "",
};
