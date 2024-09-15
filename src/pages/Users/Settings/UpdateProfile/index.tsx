import { FunctionComponent, useRef } from 'react'
import {
  Avatar,
  Box,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  SimpleGrid,
  Spinner
} from '@chakra-ui/react'
import { Formik, Field } from 'formik'
import { FaCamera } from 'react-icons/fa6'

import { Button, Input, TextArea } from '@components/index'
import { colors } from '../../../../colors'
import { useUpdateProfile } from '@hooks/user/useUpdateProfile'
import { useUpdateAvatar } from '@hooks/user/useUpdateAvatar'
import { useImageUpload } from '@hooks/useImageUpload'
import { UpdateProfileRequest } from '@api/index'
import { updateProfileValidationSchema } from '@validations/updateProfile'
import { useUser } from '@context/userContext'
import { capitalizeFirstLetter } from '@helpers/capitalize'

const UpdateProfile: FunctionComponent = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const userContext = useUser();
  const { updateProfileMutation } = useUpdateProfile();
  const { updateProfileAvatarMutation } = useUpdateAvatar();
  const res = userContext?.user?.data;

  const initialValues: UpdateProfileRequest = {
    fullname: res?.fullname ?? '',
    username: res?.username ?? '',
    email: res?.email ?? '',
    avatar: res?.avatar ?? '',
    twitter: res?.twitter ?? '',
    gitHub: res?.gitHub ?? '',
    website: res?.website ?? '',
    profile_headlines: res?.profile_headlines ?? '',
    state: res?.state ?? '',
    country: res?.country ?? '',
    bio: res?.bio ?? '',
  };

  const { handleFileUpload, loading: imageUploadLoading } = useImageUpload({
    onSuccess: (data) => {
      updateProfileAvatarMutation.mutate({ avatar: data.imageUploadUrl });
    },
  });

  const handleUpdateProfile = (values: UpdateProfileRequest) => {
    updateProfileMutation.mutate(values);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card>
      <CardBody position="relative">
        <Box textAlign="center" mb={12}>
          <Box
            position="absolute"
            top="-13%"
            left="50%"
            transform="translateX(-50%)"
            border="4px solid white"
            borderRadius="full"
            boxShadow="md"
            zIndex={1}
          >
            {imageUploadLoading ? (
              <Spinner
                size="xl"
                thickness="4px"
                speed="0.65s"
                color={colors.primary}
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                zIndex={2}
              />
            ) : (
              <>
                <Avatar size="2xl" name={res?.fullname} src={res?.avatar} />

                <IconButton
                  aria-label="Change avatar"
                  icon={<FaCamera />}
                  onClick={handleClick}
                  position="absolute"
                  bottom="0"
                  right="0"
                  borderRadius="full"
                  bg={colors.primary}
                  boxShadow="md"
                  size="lg"
                  m={2}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                />
              </>
            )}
          </Box>
        </Box>
        <Formik
          initialValues={initialValues}
          onSubmit={handleUpdateProfile}
          validationSchema={updateProfileValidationSchema}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <SimpleGrid minChildWidth="300px" spacing={3} mb={6}>
                {[
                  { name: 'fullname', type: 'text', placeholder: 'eg, John Doe' },
                  { name: 'username', type: 'text', placeholder: 'eg, john-doe' },
                  { name: 'email', type: 'email', disabled: true },
                  { name: 'twitter', type: 'text', placeholder: 'eg, @johndoe' },
                  { name: 'gitHub', type: 'text', placeholder: 'eg, doejohn_' },
                  { name: 'website', type: 'text', placeholder: 'eg, www.johndoe.com' },
                  { name: 'profile_headlines', type: 'text', placeholder: 'eg, Frontend Developer || React' },
                  { name: 'state', type: 'text', placeholder: 'Ebonyi' },
                  { name: 'country', type: 'text', placeholder: 'Nigeria' },
                ].map(({ name, type, disabled, placeholder }) => (
                  <FormControl
                    key={name}
                    isRequired
                    isInvalid={!!errors[name as keyof typeof errors] && touched[name as keyof typeof touched]}
                  >
                    <FormLabel htmlFor={name}>
                      {capitalizeFirstLetter(name.replace('_', ' '))}
                    </FormLabel>
                    <Field
                      as={Input}
                      id={name}
                      name={name}
                      type={type}
                      placeholder={placeholder}
                      disabled={disabled}
                    />
                    <FormErrorMessage>{errors[name as keyof typeof errors]}</FormErrorMessage>
                  </FormControl>
                ))}
              </SimpleGrid>

              <Box mb={6}>
                <FormControl
                  isRequired
                  isInvalid={!!errors.bio && touched.bio}
                >
                  <FormLabel htmlFor="bio">Bio</FormLabel>
                  <Field
                    as={TextArea}
                    id="bio"
                    name="bio"
                    type="text"
                    placeholder="Write a bio"
                  />
                  <FormErrorMessage>{errors.bio}</FormErrorMessage>
                </FormControl>
              </Box>

              <Box textAlign="right">
                <Button
                  variant="solid"
                  size={{ base: "sm", lg: "md" }}
                  width={{ base: "100%", lg: "auto" }}
                  type="submit"
                  fontWeight="semibold"
                  rounded="sm"
                  isloading={updateProfileMutation.isPending}
                >
                  Update Profile
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

export default UpdateProfile;
