import * as yup from 'yup'

export const schemaGoal = yup.object().shape({
  GOAL_NAME: yup
    .string()
    .required('Required'),
    GOAL_AMOUNT: yup
    .number()
    .required('Required'),
    GOAL_DEADLINE: yup
    .string()
    .required('Required')
});
