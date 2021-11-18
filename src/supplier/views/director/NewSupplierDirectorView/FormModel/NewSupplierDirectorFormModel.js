const model = {
  formId: "NewDirector",
  formField: {
    director_name: {
      name: "director_name",
      label: "Director Name*",
      requiredErrorMsg: "Director Name is required",
    },
    director_email: {
      name: "director_email",
      label: "Director Email",
      requiredErrorMsg: "Email is required",
    },
    director_phone_number: {
      name: "director_phone_number",
      label: "Director Phone",
      requiredErrorMsg: "Phone is required",
    },
    director_id_attachment: {
      name: "director_id_attachment",
      label: "Director ID",
      requiredErrorMsg: "ID is required",
    },
    director_id_number: {
      name: "director_id_number",
      label: "Director ID Number",
      requiredErrorMsg: "ID Number is required",
    },
    director_id_type: {
      name: "director_id_type",
      label: "Director ID Type",
      requiredErrorMsg: "ID Type is required",
    },
    director_nationality: {
      name: "director_nationality",
      label: "Director Nationality",
      requiredErrorMsg: "Nationality is required",
    },
    director_poa_attachment: {
      name: "director_poa_attachment",
      label: "Director Proof of Address",
      requiredErrorMsg: "Proof of Address Type is required",
    },
    director_country_of_residence: {
      name: "director_country_of_residence",
      label: "Director Country of Residence",
      requiredErrorMsg: "Country of residence is required",
    },
  },
};

export default model;
