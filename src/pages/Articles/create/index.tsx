import { FunctionComponent } from 'react'
import ArticleForm from '@pages/Articles/components/ArticleForm'

const CreateArticle: FunctionComponent = () => {
  return (
    <ArticleForm isEditing={false} />
  )
}

export default CreateArticle