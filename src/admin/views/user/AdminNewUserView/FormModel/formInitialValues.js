import NewUserFormModel from "./NewUserFormModel";
const {
  formField: { email, password, confirmpassword },
} = NewUserFormModel;

const values = {
  [email.name]: "",
  [password.name]: "",
  [confirmpassword.name]: "",
};

export default values;
