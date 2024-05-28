import * as yup from 'yup'

export const schemaSignin = yup.object().shape({
  USER_EMAIL: yup
    .string()
    .email('Invalid email')
    .required('Required'),
    USER_PASSWORD: yup
    .string()
    .required('Required')
});