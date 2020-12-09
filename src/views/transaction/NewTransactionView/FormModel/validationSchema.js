import * as Yup from 'yup';
import moment from 'moment';
import NewTransactionFormModel from './NewTransactionFormModel';
const {
  formField: {
    invoice_attachment,
    purchase_order_attachment,
    offer_notice_attachment,
    ipu_attachment,
    bill_of_lading_attachment,
    cargo_insurance_attachment,
    invoice_amount,
    invoice_date,
    invoice_due_date,
    sold_goods_description,
    invoice_currency,
    cargo_insurance_name,
  }
} = NewTransactionFormModel;


export default [
  Yup.object().shape({
    [invoice_attachment.name]: Yup.string(),
    [purchase_order_attachment.name]: Yup.string(),
    [offer_notice_attachment.name]: Yup.string(),
    [ipu_attachment.name]: Yup.string(),
    [bill_of_lading_attachment.name]: Yup.string(), 
    [cargo_insurance_attachment.name]: Yup.string(),   
    [invoice_amount.name]: Yup.number().required(`${invoice_amount.requiredErrorMsg}`), 
    [invoice_currency.name]: Yup.string().required(`${invoice_currency.requiredErrorMsg}`),
    [invoice_date.name]: Yup.string()
    .nullable()
    .required(`${invoice_date.requiredErrorMsg}`), 
    [invoice_due_date.name]: Yup.string()
    .nullable()
    .required(`${invoice_due_date.requiredErrorMsg}`),  
    [sold_goods_description.name]: Yup.string(),
    [cargo_insurance_name.name]: Yup.string(),
  }),
];