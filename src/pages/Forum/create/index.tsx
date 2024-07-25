import { useState } from 'react'
import { 
  Box, 
  FormControl, 
  Input 
} from '@chakra-ui/react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import Button from '@components/Button'

const CreateForum = () => {
  const [value, setValue] = useState('');

  return (
    <Box width={"50%"} m={"2rem auto"}>

      <form>
        <FormControl my={"2.5rem"}>
          <Input type='email' py={"60px"}  size={"lg"} fontSize={"3rem"} variant='flushed' colorScheme="gray" placeholder="Title" />
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

export default CreateForum;