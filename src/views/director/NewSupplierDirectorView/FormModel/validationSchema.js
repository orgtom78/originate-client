import * as Yup from 'yup';
import NewSupplierDirectorFormModel from './NewSupplierDirectorFormModel';
const {
  formField: {
    director_name,
    director_email,
    director_phone_number, 
    director_id_attachment, 
    director_id_number, 
    director_id_type, 
    director_nationality,
    director_poa_attachment, 
    director_country_of_residence,
  }
} = NewSupplierDirectorFormModel;


export default [
  Yup.object().shape({
    [director_name.name]: Yup.string().required(`${director_name.requiredErrorMsg}`),
    [director_email.name]: Yup.string().email().required(`${director_email.requiredErrorMsg}`),
    [director_phone_number.name]: Yup.string(),
    [director_id_attachment.name]: Yup.string().required(`${director_id_attachment.requiredErrorMsg}`),
    [director_id_number.name]: Yup.string(),
    [director_id_type.name]: Yup.string(),
    [director_nationality.name]: Yup.string(),
    [director_poa_attachment.name]: Yup.string(),
    [director_country_of_residence.name]: Yup.string(),
  }),
];