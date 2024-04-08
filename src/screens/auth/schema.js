import * as yup from 'yup';

export const schemaSignUp = yup.object().shape({
  username: yup.string().required('Username is required').label('User Name'),
  email: yup.string().email().required('Email is required').label('Email'),
  phone: yup.string().required('Phone is required').label('Phone'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'Password must have at least 8 characters, one uppercase, one number',
    )
    .label('Password'),
  // confirmPassword: yup
  //   .string()
  //   .oneOf([yup.ref('password')], 'Passwords must match')
  //   .required('Confirm Password is required')
  //   .label('Confirm Password'),
});

export const schemaSignIn = yup.object().shape({
    username: yup.string().required('Username is required').label('User Name'),
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        'Password must have at least 8 characters, one uppercase, one number',
      )
      .label('Password'),
    // confirmPassword: yup
    //   .string()
    //   .oneOf([yup.ref('password')], 'Passwords must match')
    //   .required('Confirm Password is required')
    //   .label('Confirm Password'),
  });