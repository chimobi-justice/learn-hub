import { FunctionComponent } from 'react'

import ThreadForm from '@pages/Threads/components/threadForm'

const CreateThread: FunctionComponent = () => {
  return (
    <ThreadForm isEditing={false} />    
  )
}

export default CreateThread;