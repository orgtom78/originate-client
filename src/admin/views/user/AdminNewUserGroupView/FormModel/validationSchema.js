import * as Yup from "yup";
import NewUserGroupFormModel from "./NewUserGroupFormModel";
const {
  formField: { email, password, confirmpassword, group_name, group_type },
} = NewUserGroupFormModel;

export default [
  Yup.object().shape({
    [group_type.name]: Yup.string().required(`${group_type.requiredErrorMsg}`),
    [group_name.name]: Yup.string().required(`${group_name.requiredErrorMsg}`),
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
