import * as Yup from 'yup';
import moment from 'moment';
import NewBuyerFormModel from './NewBuyerFormModel';
const {
  formField: {
    buyer_address_city,	
    buyer_address_number,
    buyer_address_postalcode,
    buyer_address_street,
    buyer_name,
    buyer_country,
    buyer_website,
    buyer_currency,
    buyer_loan_amount,
    buyer_payment_terms,
    buyer_sample_trading_docs_attachment,
    buyer_sold_goods_description,

    ebit,
    financials_attachment,
    net_profit,
    financials_rating,
    financials_reporting_period,
    sales,
    total_assets,

    buyer_insurance_name,
    buyer_one_off_ipu_attachment,
    buyer_next_year_projected_transaction_amount,
    buyer_previous_year_transaction_amount,
    buyer_reporting_year,
    buyer_reporting_year_transaction_amount,
  }
} = NewBuyerFormModel;


export default [
  Yup.object().shape({
    [buyer_address_city.name]: Yup.string().required(`${buyer_address_city.requiredErrorMsg}`),
    [buyer_address_number.name]: Yup.string().required(`${buyer_address_number.requiredErrorMsg}`),
    [buyer_address_postalcode.name]: Yup.string()
    .required(`${buyer_address_postalcode.requiredErrorMsg}`)
    .test(
      'len',
      `${buyer_address_postalcode.invalidErrorMsg}`,
      val => val && val.length === 5
    ),
    [buyer_address_street.name]: Yup.string().required(`${buyer_address_street.requiredErrorMsg}`),
    [buyer_name.name]: Yup.string().required(`${buyer_name.requiredErrorMsg}`), 
    [buyer_country.name]: Yup.string().required(`${buyer_country.requiredErrorMsg}`),
    [buyer_website.name]: Yup.string().required(`${buyer_website.requiredErrorMsg}`),
    [buyer_currency.name]: Yup.string().nullable(),
    [buyer_loan_amount.name]: Yup.string().required(`${buyer_loan_amount.requiredErrorMsg}`), 
    [buyer_payment_terms.name]: Yup.string().required(`${buyer_payment_terms.requiredErrorMsg}`), 
    [buyer_sample_trading_docs_attachment.name]: Yup.string().nullable(),
    [buyer_sold_goods_description.name]: Yup.string().nullable(),
  }),

  Yup.object().shape({
    [ebit.name]: Yup.string().nullable(),
    [financials_attachment.name]: Yup.string(),
    [net_profit.name]: Yup.string().nullable(),
    [financials_rating.name]: Yup.string().nullable(),
    [financials_reporting_period.name]: Yup.string()
    .nullable()
    .required(`${financials_reporting_period.requiredErrorMsg}`)
    .test('incdate', financials_reporting_period.invalidErrorMsg, val => {
      if (val) {
        const startDate = new Date(2018, 12, 31);
        const endDate = new Date();
        if (moment(val, moment.ISO_8601).isValid()) {
          return moment(val).isBetween(startDate, endDate);
        }
        return false;
      }
      return false;
    }),
    [sales.name]: Yup.string().nullable(),
    [total_assets.name]: Yup.string().nullable(),
  }),

  Yup.object().shape({
    [buyer_insurance_name.name]: Yup.string().required(`${buyer_insurance_name.requiredErrorMsg}`),
    [buyer_one_off_ipu_attachment.name]: Yup.string().nullable(),
    [buyer_next_year_projected_transaction_amount.name]: Yup.string().required(`${buyer_next_year_projected_transaction_amount.requiredErrorMsg}`),
    [buyer_previous_year_transaction_amount.name]: Yup.string().required(`${buyer_previous_year_transaction_amount.requiredErrorMsg}`),
    [buyer_reporting_year.name]: Yup.string().required(`${buyer_reporting_year.requiredErrorMsg}`),
    [buyer_reporting_year_transaction_amount.name]: Yup.string().required(`${buyer_reporting_year_transaction_amount.requiredErrorMsg}`),
  }),
];