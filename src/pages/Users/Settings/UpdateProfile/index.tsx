import { FunctionComponent, useRef } from 'react'
import {
  Avatar,
  Box,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  IconButton,
  SimpleGrid
} from '@chakra-ui/react'
import { FaCamera } from 'react-icons/fa6';

import {
  Button,
  Input,
  TextArea
} from '@components/index'
import { colors } from '../../../../colors'
import AvatarPic from '@assets/images/avatar.jpg'

const UpdateProfile: FunctionComponent = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
            <Avatar size="2xl" name="Segun Adebayo" src={AvatarPic} />
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
              onChange={() => console.log("file clicked")}
            />
 
          </Box>
        </Box>
        <SimpleGrid minChildWidth="300px" spacing={3} mb={6}>
          <FormControl isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              name="fullname"
              placeholder="Full Name"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              placeholder="Username"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Email"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Twitter</FormLabel>
            <Input
              type="text"
              name="twitter"
              placeholder="@"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>GitHub</FormLabel>
            <Input
              type="text"
              name="github"
              placeholder="github username"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Website</FormLabel>
            <Input
              type="url"
              name="website"
              placeholder="www.example.com"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Headlines</FormLabel>
            <Input
              type="text"
              name="headlines"
              placeholder="e.g., Frontend Developer"
            />
          </FormControl>
        </SimpleGrid>
        <Box mb={6}>
          <FormControl isRequired>
            <FormLabel>Short Bio</FormLabel>
            <TextArea
              placeholder="Tell us about yourself..."
              name="bio"
            />
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
          >
            Update Profile
          </Button>
        </Box>
      </CardBody>
    </Card>
  );
};

export default UpdateProfile;
