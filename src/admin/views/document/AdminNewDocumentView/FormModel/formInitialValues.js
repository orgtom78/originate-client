import NewDocumentFormModel from "./NewDocumentFormModel";
const {
  formField: { document_type, document_attachment },
} = NewDocumentFormModel;

const values = {
  [document_type.name]: "",
  [document_attachment.name]: "",
};

export default values;
