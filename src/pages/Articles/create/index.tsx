import { useRef, useState } from 'react'
import {
  Box,
  FormControl,
  Input,
  Text
} from '@chakra-ui/react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { FaUpload, FaImage } from 'react-icons/fa6'

import Button from '@components/Button'

const CreateArticle = () => {
  const [value, setValue] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box width={{ base: "98%", md: "50%"}} m={"2rem auto"}>
      <form>
        <Box borderRadius="9px" p="10px" bg="#f1f1f1">
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
            >
              Upload from computer
            </Button>
          </Box>

          <input 
            type="file"
            ref={fileInputRef} 
            style={{ display: 'none' }}
          />
        </Box>


        <FormControl my={"2.5rem"}>
          <Input type='email' py={"60px"} size={"lg"} fontSize={"3rem"} variant='flushed' colorScheme="gray" placeholder="Title" />
        </FormControl>

        <Box height={"400px"}>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="editor-input"
            placeholder="write here to post threads"
          />

        </Box>

        <Box textAlign={"right"} my={"25px"}>
          <Button
            variant="solid"
            size={{ base: "md", lg: "lg" }}
            width={{ base: "100%", lg: "auto" }}
            type="button"
            fontWeight={"semibold"}
            rounded="sm"
          >
            Save
          </Button>
        </Box>
      </form>

    </Box>
  )
}

export default CreateArticle