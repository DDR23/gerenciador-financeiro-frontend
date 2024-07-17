import * as yup from 'yup'

export const schemaSignup = yup.object().shape({
  USER_EMAIL: yup
    .string()
    .required('Required')
    .email('Invalid email'),
    USER_NAME: yup
    .string()
    .required('Required'),
    USER_PASSWORD: yup
    .string()
    .required('Required')
});
