import * as Yup from "yup";
import NewUserFormModel from "./NewUserFormModel";
const {
  formField: { email, password, confirmpassword },
} = NewUserFormModel;

export default [
  Yup.object().shape({
    [email.name]: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required(`${email.requiredErrorMsg}`),
    [password.name]: Yup.string()
      .max(255)
      .required(`${password.requiredErrorMsg}`),
    [confirmpassword.name]: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  }),
];
