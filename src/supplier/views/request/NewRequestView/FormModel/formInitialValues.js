import NewTransactionFormModel from "./NewTransactionFormModel";
const {
  formField: {
    purchase_order_attachment,
    sold_goods_description,
    invoice_amount,
    invoice_currency,
    invoice_date,
    invoice_due_date,
    invoice_attachment,
    offer_notice_attachment,
    ipu_attachment,
    invoice_number,
    cargo_insurance_attachment,
    bill_of_lading_attachment,
  },
} = NewTransactionFormModel;

const values = {
  [purchase_order_attachment.name]: "",
  [invoice_amount.name]: "",
  [invoice_currency.name]: "",
  [invoice_date.name]: "",
  [invoice_due_date.name]: "",
  [invoice_attachment.name]: "",
  [offer_notice_attachment.name]: "",
  [ipu_attachment.name]: "",
  [invoice_number.name]: "",
  [cargo_insurance_attachment.name]: "",
  [bill_of_lading_attachment.name]: "",
  [sold_goods_description.name]: "",
};

export default values;
