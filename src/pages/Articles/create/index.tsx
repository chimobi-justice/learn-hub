import { FunctionComponent } from 'react'
import ArticleForm from '@pages/Articles/ArticleForm'

const CreateArticle: FunctionComponent = () => {
  return (
    <ArticleForm isEditing={false} />
  )
}

export default CreateArticle