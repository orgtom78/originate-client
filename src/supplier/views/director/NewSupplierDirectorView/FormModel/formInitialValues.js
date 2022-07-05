import NewSupplierDirectorFormModel from "./NewSupplierDirectorFormModel";
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
    director_date_of_birth
  },
} = NewSupplierDirectorFormModel;

const values = {
  [director_name.name]: "",
  [director_email.name]: "",
  [director_phone_number.name]: "",
  [director_id_attachment.name]: "",
  [director_id_number.name]: "",
  [director_id_type.name]: "",
  [director_nationality.name]: undefined,
  [director_poa_attachment.name]: "",
  [director_country_of_residence.name]: undefined,
  [director_date_of_birth.name]: undefined,
};

export default values;