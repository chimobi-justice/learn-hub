import { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'

import ArticleForm from '@pages/Articles/components/ArticleForm'
import { useGetSingleArticle } from '@hooks/article/useGetSingleArticle'

const EditArticle: FunctionComponent = () => {
  const { id } = useParams();

  const { data } = useGetSingleArticle(id!);

  return (
    <ArticleForm
      titleValue={data?.data?.title ?? ""}
      thumbnailValue={data?.data?.thumbnail ?? ""}
      contentValue={data?.data?.content ?? ""}
      id={id}
      isEditing={true}
    />
  )
}

export default EditArticle