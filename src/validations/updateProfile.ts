import * as Yup from 'yup'

export const updateProfileValidationSchema = () => Yup.object({
  fullname: Yup.string()
    .required("Required"),
  username: Yup.string()
    .required("Required"),
  profile_headlines: Yup.string()
    .required("Required"),
  state: Yup.string()
    .required("Required"),
  country: Yup.string()
    .required("Required"),
  bio: Yup.string()
    .required("Required"),
  twitter: Yup.string()
    .nullable("Required"),
  gitHub: Yup.string()
    .nullable("Required"),
  website: Yup.string()
    .nullable("Required")
});