import { FormEvent } from 'react'
import { Box } from '@chakra-ui/react'

import { Button, Editor } from '@components/index'

interface ThreadCommentFormProps {
  comment: string;
  setComment: (value: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}

const ThreadCommentForm: React.FC<ThreadCommentFormProps> = ({ 
  comment, 
  setComment, 
  handleSubmit, 
  isSubmitting 
}) => (
  <Box my={5}>
    <form onSubmit={handleSubmit}>
      <Box height={"300px"}>
        <Editor
          content={comment}
          setContent={setComment}
          placeholder="write here to post threads"
        />
      </Box>

      <Box textAlign={"right"} my={"25px"}>
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
  </Box>
);

export default ThreadCommentForm;
