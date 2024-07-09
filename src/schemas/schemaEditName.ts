import * as yup from 'yup'

export const schemaEditName = yup.object().shape({
  USER_NAME: yup
    .string()
    .optional(),
  USER_PASSWORD: yup
    .string()
    .optional()
});