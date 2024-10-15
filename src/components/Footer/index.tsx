import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Box, Heading, List, ListItem, SimpleGrid, Text } from '@chakra-ui/react'
import { FaXTwitter } from 'react-icons/fa6'
import { IoLogoLinkedin } from 'react-icons/io'
import { FaGithub } from 'react-icons/fa'

import { colors } from '../../colors'

const Footer: FunctionComponent = () => {
  return (
    <Box
      as="footer"
      bg={colors.primaryDark}
      height={"auto"}
      color={"#fff"}
    >
      <Box
        width={"90%"}
        m={"0px auto"}
        pt={"4rem"}
        pb={"3rem"}
      >
        <SimpleGrid
          minChildWidth="250px"
          spacing={10}
          color={"#f1f1f1"}
        >
          <Box>
            <Heading
              as="h6"
              size={"md"}
              color={colors.primary}
            >
              Learn Hub
            </Heading>
            <Text
              my={"25px"}
              fontSize={"14px"}
              fontWeight={"normal"}
              lineHeight={"1.7rem"}
            >
              A portal for problem solving, knowledge sharing and community builders, join others for sharing knowledge.
            </Text>
          </Box>
          <Box>
            <Heading
              as="h6"
              size={"md"}
              color={colors.primary}
            >
              Main
            </Heading>
            <List
              my={"25px"}
              fontSize={"14px"}
              fontWeight={"normal"}
              spacing={3}
            >
              <ListItem><Link to="/">Home</Link></ListItem>
              <ListItem><Link to="/threads">Threads</Link></ListItem>
              <ListItem><Link to="/articles">Articles</Link></ListItem>
            </List>
          </Box>
          <Box>
            <Heading
              as="h6"
              size={"md"}
              color={colors.primary}
            >
              Support
            </Heading>
            <List
              my={"25px"}
              fontSize={"14px"}
              fontWeight={"normal"}
              spacing={3}
            >
              <ListItem><Link to="/">Feedback</Link></ListItem>
              <ListItem><Link to="/">Contact Us</Link></ListItem>
            </List>
          </Box>
          <Box>
            <Heading
              as="h6"
              size={"md"}
              color={colors.primary}
            >
              Socials
            </Heading>
            <List
              my={"25px"}
              fontSize={"14px"}
              fontWeight={"normal"}
              spacing={3}
            >
              <ListItem>
                <Link
                  to=""
                  style={{
                    display: "flex",
                    gap: "3px"
                  }}
                >
                  <FaXTwitter style={{ fontSize: "20px" }} />Twitter
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  to=""
                  style={{
                    display: "flex",
                    gap: "3px"
                  }}>
                  <IoLogoLinkedin style={{ fontSize: "20px" }} />LinkedIn
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  to="https://github.com/chimobi-justice/learn-hub"
                  target='_blank'
                  style={{
                    display: "flex",
                    gap: "3px"
                  }}>
                  <FaGithub style={{ fontSize: "20px" }} />Github
                </Link>
              </ListItem>
            </List>
          </Box>
        </SimpleGrid>

        <Box mt={"20px"} pt={"20px"} borderTop={"1px solid gray"} textAlign={{base: "center", md: "left"}}>
          <Text fontSize={"13px"}>&copy; 2024 Learn Hub. All right reserved. Made in 🇳🇬.</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer;