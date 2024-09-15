import * as Yup from 'yup'

export const articleValidationSchema = () => Yup.object({
  title: Yup.string()
    .required("Required"),
  constent: Yup.string()
    .required("Required"),
  // thumbnail: Yup.string()
  //   .required("Required"),
});