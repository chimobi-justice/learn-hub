import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Box, HStack, Text } from '@chakra-ui/react'
import { FaGithub, FaXTwitter } from 'react-icons/fa6'
import { GiWorld } from 'react-icons/gi'

import { IUser } from 'src/types'

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
        {data?.twitter && (
          <Text fontSize={"14px"}>Connect with <Text as={"span"} fontWeight={"bold"}>{data?.fullname}</Text></Text>
        )}

        <HStack
          spacing={3}
          my={"15px"}
        >
          {data?.gitHub && (
            <Link
              to={`https://www.github.com/${data?.gitHub}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text
                fontSize={{ base: "15px", md: "18px" }}
              >
                <FaGithub style={{ fontSize: "24px", marginBottom: "5px" }} />
              </Text>
            </Link>
          )}

          {data?.twitter && (
            <Link
              to={`https://x.com/${data?.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text
                fontSize={{ base: "15px", md: "18px" }}
              >
                <FaXTwitter style={{ fontSize: "24px", marginBottom: "5px" }} />
              </Text>
            </Link>
          )}

          {data?.website && (
            <Link
              to={data?.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text
                fontSize={{ base: "15px", md: "18px" }}
              >
                <GiWorld style={{ fontSize: "24px", marginBottom: "5px" }} />
              </Text>
            </Link>
          )}
        </HStack>
      </Box>
    </Box>
  )
}

export default PublicUserAboutDetails;