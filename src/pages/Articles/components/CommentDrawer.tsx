import { Fragment, FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'

import { Button, ContentBlockContent, Editor, ShowLoginModal } from '@components/index'
import { useUser } from '@context/userContext'
import { colors } from '../../../colors'
import { CommentDrawerProps } from 'src/types'

const CommentDrawer: FunctionComponent<CommentDrawerProps> = ({
  isOpen,
  onClose,
  comments,
  commentCounts,
  comment,
  setComment,
  handleSubmit,
  isSubmitting
}) => {
  const { user } = useUser();
  const { onClose: onCloseShowLoginModal, onOpen: onOpenShowLoginModal, isOpen: isOpenShowLoginModal } = useDisclosure();

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        size={"sm"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Responses ({commentCounts})
          </DrawerHeader>

          <DrawerBody pb={"10px"}>
            <Stack spacing='24px'>
              <Box my={5}>
                {user && (
                  <form onSubmit={handleSubmit}>
                    <Box height={"250px"} mb={"30px"}>
                      <Editor
                        content={comment}
                        setContent={setComment}
                        placeholder="write your thought here..."
                      />
                    </Box>

                    <Box textAlign={"right"} py={"25px"}>
                      <Button
                        variant="solid"
                        size={"md"}
                        width={{ base: "100%", lg: "auto" }}
                        type="submit"
                        fontWeight={"semibold"}
                        rounded="sm"
                        isDisabled={!comment}
                        isloading={isSubmitting}
                      >
                        Submit
                      </Button>
                    </Box>
                  </form>
                )}

                {!user && (
                  <Box>
                    <Text fontSize={"18px"}>
                      Sign in to participate!
                      <Text
                        as={"span"}
                        fontSize={"16px"}
                        ml={"5px"}
                        color={colors.primary}
                        cursor={"pointer"}
                        _hover={{
                          color: colors.primaryDark
                        }}
                        onClick={onOpenShowLoginModal}
                      >
                        Sign in here
                      </Text>
                    </Text>
                  </Box>
                )}
              </Box>

              <Divider />

              {comments?.map((comment: any, index: number) => (
                <Fragment key={index}>
                  <Box mb={"5px"}>
                    <Box
                      display={"flex"}
                      justifyContent={"flex-start"}
                      gap={3}
                      mb={"15px"}
                    >
                      <Box>
                        <Link to={`/user/${comment?.user?.username}`}>
                          <Avatar
                            src={comment?.user?.avatar}
                            name={comment?.user?.fullname}
                            size={"sm"}
                          />
                        </Link>
                      </Box>

                      <Box>
                        <Text
                          color={"#000"}
                          fontSize={"16px"}
                          mb={"2px"}
                          _hover={{ textDecoration: "underline" }}
                        >
                          <Link to={`/user/${comment?.user?.username}`}>
                            {comment?.user?.fullname}
                          </Link>
                        </Text>
                        <Text
                          color={"#0009"}
                          fontSize={"14px"}
                        >
                          about {comment?.created_at?.human}
                        </Text>
                      </Box>
                    </Box>

                    <ContentBlockContent fontSize='12.5px' content={comment?.comment} />
                  </Box>

                  <Divider />
                </Fragment>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <ShowLoginModal
        isOpen={isOpenShowLoginModal}
        onClose={onCloseShowLoginModal}
      />
    </>
  )
}

export default CommentDrawer;