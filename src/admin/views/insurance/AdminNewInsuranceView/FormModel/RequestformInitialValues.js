import RequestFormModel from "./RequestFormModel";
const {
  formField2: { buyer_eulerid, supplier_eulerid },
} = RequestFormModel;

const values = {
  [buyer_eulerid.name]: "",
  [supplier_eulerid.name]: "",
};

export default values;
