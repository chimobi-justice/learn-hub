import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Box, HStack, Text } from '@chakra-ui/react'

import { ISocial, IUser } from 'src/types'
import { getSocialMediaIcon } from '@helpers/getSocialMediaIcon'

interface PublicUserAboutDetailsProps {
  data: IUser['data'];
}

const PublicUserAboutDetails: FunctionComponent<PublicUserAboutDetailsProps> = ({ data }) => {
  return (
    <Box my={"25px"} p={"2px"}>
      <Text
        fontSize={"14px"}
        color={"#0009"}
        lineHeight={"1.8em"}
      >
        {data?.bio ?? "No Bio available for this user"}
      </Text>

      <Box mt={"30px"}>
        {data?.socials && data?.socials.length > 0 && (
          <Text fontSize={"14px"}>Connect with <Text as={"span"} fontWeight={"bold"}>{data?.fullname}</Text></Text>
        )}

        <HStack
          spacing={3}
          my={"15px"}
        >
          {data?.socials?.map((social: ISocial) => (
            <Link
              to={social?.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text
                fontSize={{ base: "15px", md: "18px" }}
              >
                {getSocialMediaIcon(social.platform, "24px")}
              </Text>
            </Link>
          ))}
        </HStack>
      </Box>
    </Box>
  )
}

export default PublicUserAboutDetails;