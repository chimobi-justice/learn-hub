import { FormEvent } from 'react'
import { Author, AuthorDetails, CreatedAt } from 'src/types'

export interface IArticleRequest {
  title: string;
  content: string;
  thumbnail: string;
}

export interface IArticleFormProps {
  titleValue: string;
  thumbnailValue: string;
  contentValue: string;
  isEditing: boolean
  id?: string;
}

export interface ArticleActionButtonsProps {
  article: any;
  onLike: () => void;
  onDisLike: () => void;
  onShowComment: () => void;
  isLoggedIn?: boolean;
  is_saved?: boolean;
  isOwner?: boolean;
  saveUnsavedArticle?: () => void;
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
  is_following: boolean;
  isOwner: boolean;
  read_time: string;
  date: string;
  followUser: () => void;
}

export interface Article {
  data: ArticleData;
}

export interface ArticleData {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  isOwner: boolean;
  read_time: string;
  is_saved: boolean;
  author: Author;
  created_at: CreatedAt;
  article_like_counts: number;
  article_comment_counts: number;
  user_liked_article: boolean;
  article_comments: ArticleComment[];
}

export interface ArticleComment {
  id: string;
  article_id: string;
  comment: string;
  created_at: CreatedAt;
  user: CommentUser;
}

 interface CommentUser {
  id: string;
  fullname: string;
  username: string;
  avatar: string | null;
  profile_headlines: string | null;
  followers: string;
  followings: string;
  is_following: boolean;
  info_details: AuthorDetails;
}

export interface IArticlesResponse {
  data: IArticles[];
}

export interface IArticles {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  created_at: CreatedAt;
}