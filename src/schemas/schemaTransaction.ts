import * as yup from 'yup'

export const schemaCategory = yup.object().shape({
  TRANSACTION_DESCRIPTION: yup
    .string()
    .optional(),
  TRANSACTION_AMOUNT: yup
    .number()
    .optional(),
  TRANSACTION_DATE: yup
    .string()
    .optional(),
  TRANSACTION_TYPE: yup
    .string()
    .oneOf(['receita', 'despesa'])
    .optional(),
  FK_USER_ID: yup
    .number()
    .optional(),
  FK_CATEGORY_ID: yup
    .number()
    .optional()
});
