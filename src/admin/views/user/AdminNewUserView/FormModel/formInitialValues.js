import NewUserFormModel from "./NewUserFormModel";
const {
  formField: { email, password, confirmpassword },
} = NewUserFormModel;

export default {
  [email.name]: "",
  [password.name]: "",
  [confirmpassword.name]: "",
};
