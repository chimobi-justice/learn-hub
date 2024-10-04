export interface IThread {
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
  isEditing?: boolean
  id?: any
}
