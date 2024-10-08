import { FormEvent } from 'react'

export interface IArticle {
  title: string;
  content: string;
  thumbnail: string;
}

export interface IArticleFormProps {
  titleValue?: string;
  thumbnailValue?: string;
  contentValue?: string;
  isEditing?: boolean
  id?: any
}

export interface ArticleActionButtonsProps {
  article: any;
  onLike: () => void;
  onDisLike: () => void;
  onShowComment: () => void;
}

export interface CommentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  comments: any[];
  commentCounts: number;
  comment: string;
  setComment: (value: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}

export interface IArticleHeroProps {
  title: string;
  authorAvatar: string;
  authorName: string;
  authorUsername: string;
  read_time: string;
  date: string;
}