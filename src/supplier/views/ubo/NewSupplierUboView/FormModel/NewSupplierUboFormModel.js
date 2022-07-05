const model = {
  formId: "NewUbo",
  formField: {
    ubo_name: {
      name: "ubo_name",
      label: "Owner Name*",
      requiredErrorMsg: "Owner Name is required",
    },
    ubo_email: {
      name: "ubo_email",
      label: "Owner Email",
      requiredErrorMsg: "Email is required",
    },
    ubo_phone_number: {
      name: "ubo_phone_number",
      label: "Owner Phone",
      requiredErrorMsg: "Phone is required",
    },
    ubo_id_attachment: {
      name: "ubo_id_attachment",
      label: "Owner ID",
      requiredErrorMsg: "ID is required",
    },
    ubo_id_number: {
      name: "ubo_id_number",
      label: "Owner ID Number",
      requiredErrorMsg: "ID Number is required",
    },
    ubo_id_type: {
      name: "ubo_id_type",
      label: "Owner ID Type",
      requiredErrorMsg: "ID Type is required",
    },
    ubo_nationality: {
      name: "ubo_nationality",
      label: "Owner Nationality",
      requiredErrorMsg: "Nationality is required",
    },
    ubo_poa_attachment: {
      name: "ubo_poa_attachment",
      label: "Owner Proof of Address",
      requiredErrorMsg: "Proof of Address Type is required",
    },
    ubo_country_of_residence: {
      name: "ubo_country_of_residence",
      label: "Owner Country of Residence",
      requiredErrorMsg: "Country of residence is required",
    },
    ubo_date_of_birth: {
      name: "ubo_date_of_birth",
      label: "Date of Birth",
      requiredErrorMsg: "Date of birth is required",
    },
  },
};

export default model;
