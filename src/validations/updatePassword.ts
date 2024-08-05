import * as Yup from 'yup'

export const updatePasswordvalidateSchema = () => Yup.object({
  current_password: Yup.string()
    .required("Required"),
  password: Yup.string()
    .required("Required"),
    password_confirmation: Yup.string()
    .required("Required")
});