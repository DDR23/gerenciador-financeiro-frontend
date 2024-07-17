import * as yup from 'yup'

export const schemaEditUser = yup.object().shape({
  USER_NAME: yup
    .string()
    .optional(),
  USER_EMAIL: yup
    .string()
    .optional(),
  USER_PASSWORD: yup
    .string()
    .optional(),
  USER_DELETED: yup
    .boolean()
    .optional()
});
