import { Author, CommentUser, CreatedAt } from 'src/types'

export interface IThreadRequest {
  title: string;
  content: string;
}

export interface IThreadRepliesCardProps {
  data: Array<{
    id: string;
    comment: string;
    created_at?: {
      human: string;
    };
    user?: {
      fullname: string;
      username: string;
      avatar: string | null;
      profile_headlines?: string | null;
    };
  }>;
}

export interface ThreadFormProps {
  titleValue?: string;
  contentValue?: string;
  isEditing?: boolean;
  id?: string
}

export interface ThreadData  {
  id: string;
  title: string;
  slug: string;
  content: string;
  isOwner: boolean;
  author: Author;
  thread_comment_counts: number;
  thread_like_counts: number;
  created_at: CreatedAt;
  thread_comments: ThreadComment[];
};

export interface ThreadComment {
  id: string;
  thread_id: string;
  comment: string;
  created_at: CreatedAt;
  user: CommentUser;
}

export interface Thread {
  data: ThreadData;
};

export interface IThreadResponse {
  data: IThreads[];
}

export interface IThreads {
  id: string;
  title: string;
  slug: string
  content: string;
  author: Author
  created_at: CreatedAt;
}