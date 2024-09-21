import { FunctionComponent } from 'react'

import { Alert } from '@components/index'

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  handleDeleteThread: () => void;
  isLoading: boolean;
}

const DeleteConfirmation: FunctionComponent<DeleteConfirmationProps> = ({ 
  isOpen, 
  onClose, 
  handleDeleteThread, 
  isLoading 
}) => (
  <Alert
    isOpen={isOpen}
    onClose={onClose}
    alertHeader="Delete Thread"
    alertBody="Are you sure? You can't undo this action afterwards."
    handleDelete={handleDeleteThread}
    isLoading={isLoading}
  />
);

export default DeleteConfirmation;
