import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Box, Flex, HStack, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import { MdOutlineQuickreply, MdOutlineThumbDown, MdOutlineThumbUp } from 'react-icons/md'
import { BsSave } from 'react-icons/bs'
import { IoPlayCircleOutline, IoSaveSharp } from 'react-icons/io5'
import { RiShareForwardLine } from 'react-icons/ri'
import { FaFacebook, FaXTwitter, FaLinkedin } from 'react-icons/fa6'
import { getFacebookUrl, getTwitterUrl, getLinkedinUrl } from '@phntms/react-share'

import { useUser } from '@context/userContext'
import { ShowLoginModal, TextSpeech } from '@components/index'
import { ArticleActionButtonsProps } from 'src/types'

const ArticleActionButtons: FunctionComponent<ArticleActionButtonsProps> = ({
  article,
  onLike,
  onDisLike,
  onShowComment,
  isLoggedIn,
  is_saved,
  isOwner,
  saveUnsavedArticle
}) => {
  const { user } = useUser();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const url = window.location.href;

  const renderSaveButton = () => (
    !isOwner && isLoggedIn && (
      <Tooltip label={is_saved ? 'Article Saved' : 'Save'} placement='top'>
        <Text as="span">
          {is_saved ? (
            <IoSaveSharp size="21px" onClick={saveUnsavedArticle} cursor="pointer" />
          ) : (
            <BsSave size="21px" onClick={saveUnsavedArticle} cursor="pointer" />
          )}
        </Text>
      </Tooltip>
    )
  );

  const renderShareMenu = () => (
    <Menu isLazy>
      <MenuButton mb={"0px"} pt={"4px"}>
        <RiShareForwardLine size="25px" cursor="pointer" />
      </MenuButton>
      <MenuList>
        <Link to={getFacebookUrl({ url })} target="_blank">
          <MenuItem gap={2}><FaFacebook /> Share on Facebook</MenuItem>
        </Link>
        <Link to={getTwitterUrl({ url })} target="_blank">
          <MenuItem gap={2}><FaXTwitter /> Share on X</MenuItem>
        </Link>
        <Link to={getLinkedinUrl({ url })} target="_blank">
          <MenuItem gap={2}><FaLinkedin /> Share on LinkedIn</MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );

  const renderActionButtons = () => (
    <Flex gap={5} alignItems={"center"}>
      {renderSaveButton()}
      <TextSpeech title={article?.title} content={article?.content} />
      <Tooltip label="Share" placement="top">
        <Text as="span">{renderShareMenu()}</Text>
      </Tooltip>
    </Flex>
  );

  const renderLikesSection = () => (
    <Text fontSize={{ base: "15px", md: "18px" }} display="flex" gap={3} alignItems="center">
      {!article?.user_liked_article ? (
        <MdOutlineThumbUp size="21px" cursor="pointer" onClick={onLike} />
      ) : (
        <MdOutlineThumbDown size="21px" cursor="pointer" onClick={onDisLike} />
      )}
      {article?.article_like_counts}
    </Text>
  );

  const renderCommentSection = () => (
    <Text fontSize={{ base: "15px", md: "18px" }} display="flex" gap={3} alignItems="center">
      <MdOutlineQuickreply size="21px" onClick={onShowComment} cursor="pointer" />
      {article?.article_comment_counts}
    </Text>
  );

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" borderTop="2px solid #f1f1f1" borderBottom="2px solid #f1f1f1" mb="20px" p="15px">
      {user ? renderActionButtons() : (
        <Flex gap={5}>
          <Tooltip label="Save" placement="top">
            <Text as="span"><BsSave size="21px" onClick={onOpen} cursor="pointer" /></Text>
          </Tooltip>
          <Tooltip label="Listen" placement="top">
            <Text as="span"><IoPlayCircleOutline size="21px" onClick={onOpen} cursor="pointer" /></Text>
          </Tooltip>
          <Tooltip label="Share" placement="top">
            <Text as="span"><RiShareForwardLine size="21px" onClick={onOpen} cursor="pointer" /></Text>
          </Tooltip>
        </Flex>
      )}

      <HStack spacing={5} justifyContent="center">
        {renderCommentSection()}
        {user ? renderLikesSection() : (
          <Text fontSize={{ base: "15px", md: "18px" }} display="flex" gap={3} alignItems="center">
            <MdOutlineThumbUp size="21px" onClick={onOpen} cursor="pointer" />
            {article?.article_like_counts}
          </Text>
        )}
      </HStack>

      <ShowLoginModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default ArticleActionButtons;