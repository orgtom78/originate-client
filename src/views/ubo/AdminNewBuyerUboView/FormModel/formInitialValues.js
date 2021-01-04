import NewBuyerUboFormModel from './NewBuyerUboFormModel';
const {
  formField: {
    ubo_name,
    ubo_email,
    ubo_phone_number, 
    ubo_id_attachment, 
    ubo_id_number, 
    ubo_id_type, 
    ubo_nationality,
    ubo_poa_attachment, 
    ubo_country_of_residence,
  }
} = NewBuyerUboFormModel;

export default {
  [ubo_name.name]: '',
  [ubo_email.name]: '',
  [ubo_phone_number.name]: '',
  [ubo_id_attachment.name]: '',
  [ubo_id_number.name]: '',
  [ubo_id_type.name]: '',
  [ubo_nationality.name]: undefined,
  [ubo_poa_attachment.name]: '',
  [ubo_country_of_residence.name]: undefined,
};
