export default {
  formId: 'NewUser',
  formField: {
    email: {
      name: 'email',
      label: 'Email',
      requiredErrorMsg: 'Please get the userId from your admin and dont make one up!'
    },
    password: {
      name: 'password',
      label: 'Password',
      requiredErrorMsg: 'Password is required'
    },
    confirmpassword: {
      name: 'confirmpassword',
      label: 'Confirm Password',
    },
  }
};
