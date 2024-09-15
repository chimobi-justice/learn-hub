import * as Yup from 'yup'

export const updateProfileValidationSchema = () => Yup.object({
  fullname: Yup.string()
    .required("Required"),
  username: Yup.string()
    .required("Required"),
  twitter: Yup.string()
    .required("Required"),
  gitHub: Yup.string()
    .required("Required"),
  website: Yup.string()
    .required("Required"),
  profile_headlines: Yup.string()
    .required("Required"),
  state: Yup.string()
    .required("Required"),
  country: Yup.string()
    .required("Required"),
  bio: Yup.string()
    .required("Required")
});