import * as yup from 'yup'

export const schemaGoal = yup.object().shape({
  GOAL_NAME: yup
    .string(),
    GOAL_AMOUNT: yup
    .number(),
    GOAL_DEADLINE: yup
    .string()
});
