import { FormEvent, FunctionComponent, useEffect, useRef, useState } from 'react'
import {
  Box,
  FormControl,
  Image,
  Input,
  Text
} from '@chakra-ui/react'
import { FaUpload, FaImage } from 'react-icons/fa6'
import { Helmet } from 'react-helmet-async'

import { Button, Editor } from '@components/index'
import { useCreateArticle } from '@hooks/article/useCreateArticle'
import { useEditArticle } from '@hooks/article/useEditArticle'
import { useImageUpload } from '@hooks/useImageUpload'
import { errorNotification } from '@helpers/notification'
import { IArticle, IArticleFormProps } from 'src/types'

const ArticleForm: FunctionComponent<IArticleFormProps> = ({
  titleValue = '',
  thumbnailValue = '',
  contentValue = '',
  isEditing,
  id
}) => {
  const [title, setTitle] = useState<string>(titleValue);
  const [content, setContent] = useState<string>(contentValue);
  const [thumbnail, setThumbnail] = useState<string>(thumbnailValue);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { createArticleMutation } = useCreateArticle();
  const { editArticleMutation } = useEditArticle();

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const { handleFileUpload, loading: imageUploadLoading } = useImageUpload({
    onSuccess: (data) => {
      setThumbnail(data?.data?.imageUploadUrl)
      console.log(data?.data?.imageUploadUrl);
      
    },
  });

  const handleSubmitArticle = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!thumbnail) {
      errorNotification("Please select a file to upload!")
      return;
    }

    const articleData: IArticle = {
      thumbnail,
      title,
      content
    };

    if (isEditing && id) {
      editArticleMutation.mutate({ data: articleData, id });
    } else {
      createArticleMutation.mutate(articleData);
    }

    setContent('')
    setTitle('')
    setThumbnail('')
  };

  useEffect(() => {
    if (isEditing && titleValue && thumbnailValue && contentValue) {
      setContent(contentValue || '');
      setTitle(titleValue || '');
      setThumbnail(thumbnailValue || '');
    }
  }, [titleValue, thumbnailValue, contentValue, isEditing]);

  return (
    <>
      <Helmet>
        <title>{`${title || 'Create'} | learn-hub`}</title>
      </Helmet>

      <Box width={{ base: "98%", md: "50%" }} m={"2rem auto"}>
        <form onSubmit={handleSubmitArticle}>
          <Box borderRadius="9px" p="10px" bg="#f1f1f1">
            {thumbnail ? (
              <Image
                src={thumbnail}
                width={"100%"}
                height={"250px"}
                objectFit={"cover"}
              />
            ) : (
              <Box
                textAlign="center"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="200px"
                flexDirection="column"
              >
                <Box mb="15px">
                  <FaImage style={{ fontSize: "35px" }} />
                </Box>

                <Text fontSize="17px" mb="15px">
                  We recommend uploading an image that is 1920x1080 pixels
                </Text>

                <Button
                  variant="outline"
                  size={{ base: "md", lg: "lg" }}
                  width={{ base: "100%", lg: "auto" }}
                  type="button"
                  fontWeight="semibold"
                  rounded="sm"
                  leftIcon={<FaUpload />}
                  onClick={handleUploadClick}
                  isloading={imageUploadLoading}
                >
                  Upload from computer
                </Button>

                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                />
              </Box>

            )}
          </Box>

          <FormControl my={"2.5rem"}>
            <Input
              type="text"
              py="60px"
              size="lg"
              fontSize="3rem"
              variant="flushed"
              colorScheme="gray"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>

          <Box height={"400px"} mb={"25px"}>
            <Editor
              content={content}
              setContent={setContent}
              placeholder="write here to post threads"
            />
          </Box>

          <Box textAlign={"right"} py={"25px"}>
            <Button
              variant="solid"
              size={{ base: "md", lg: "lg" }}
              width={{ base: "100%", lg: "auto" }}
              type="submit"
              fontWeight={"semibold"}
              rounded="sm"
              isDisabled={!title || !content}
              isloading={isEditing ? editArticleMutation.isPending : createArticleMutation.isPending}
            >
              {isEditing ? "Update" : "Save"}
            </Button>
          </Box>
        </form>
      </Box>
    </>
  )
}

export default ArticleForm