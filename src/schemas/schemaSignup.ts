import * as yup from 'yup'

export const schemaSignup = yup.object().shape({
  USER_EMAIL: yup
    .string()
    .email('Invalid email')
    .required('Required'),
    USER_NAME: yup
    .string()
    .required('Required'),
    USER_PASSWORD: yup
    .string()
    .min(6)
    .required('Required')
    .matches(/[0-9]/)
    .matches(/[a-z]/)
    .matches(/[A-Z]/)
    .matches(/[$&+,:;=?@#|'<>.^*()%!-]/),
});