import { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'

import ThreadForm from '@pages/Threads/components/threadForm'
import { useGetSingleThread } from '@hooks/thread/useGetSingleThread'
import { useUser } from '@context/userContext'
import { NotFound, Skeleton } from '@components/index'

const EditThread: FunctionComponent = () => {
  const { id } = useParams();

  const { user } = useUser();
  const { data, isLoading } = useGetSingleThread(id!);

  const isOwner = data?.data?.author?.id === user?.data?.id;

  if (isLoading) return <Skeleton count={3} />;

  if (!isOwner) return <NotFound />;

  return (
    <ThreadForm
      titleValue={data?.data?.title ?? ""}
      contentValue={data?.data?.content ?? ""}
      id={id}
      isEditing={true}
    />
  )
}

export default EditThread