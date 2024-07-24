import * as yup from 'yup'

export const schemaCategory = yup.object().shape({
  CATEGORY_NAME: yup
    .string()
    .optional(),
  CATEGORY_DELETED: yup
    .boolean()
    .optional()
});
