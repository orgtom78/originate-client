export default {
  formId: "NewUserGroup",
  formField: {
    group_type: {
      name: "group_type",
      label: "Group Type",
      requiredErrorMsg: "Please select one option",
    },
    group_name: {
      name: "group_name",
      label: "Group Name (identical to company name)",
      requiredErrorMsg:
        "Please make sure that the group name matches the company name!",
    },
    email: {
      name: "email",
      label: "Email",
      requiredErrorMsg:
        "Please get the userId from your admin and dont make one up!",
    },
    password: {
      name: "password",
      label: "Password",
      requiredErrorMsg: "Password is required",
    },
    confirmpassword: {
      name: "confirmpassword",
      label: "Confirm Password",
    },
  },
};
