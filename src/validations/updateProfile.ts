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
  bio: Yup.string().nullable(),
  twitter: Yup.string().nullable(),
  gitHub: Yup.string().nullable(),
  website: Yup.string().nullable()
});