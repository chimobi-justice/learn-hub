export interface Search {
  hasMore: boolean;
  fetchNext: () => void;
  isFetching: boolean;
}

export interface ISearchThreads extends Search {
  threads: any;
}

export interface ISearchUsers extends Search {
  users: any;
}

export interface ISearchArticles extends Search {
  articles: any;
}

export interface SearchLoadButtonProps extends Search {}