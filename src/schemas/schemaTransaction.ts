import * as yup from 'yup'

export const schemaTransaction = yup.object().shape({
  TRANSACTION_ID: yup
    .number()
    .optional(),
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
    .oneOf(['revenue', 'expense'])
    .optional(),
  FK_USER_ID: yup
    .number()
    .optional(),
  FK_CATEGORY_ID: yup
    .number()
    .optional()
});
