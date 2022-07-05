import NewUserGroupFormModel from "./NewUserGroupFormModel";
const {
  formField: { email, password, confirmpassword, group_name, group_type },
} = NewUserGroupFormModel;

const values = {
  [email.name]: "",
  [password.name]: "",
  [confirmpassword.name]: "",
  [group_name.name]: "",
  [group_type.name]: "",
};

export default values;
