import { ISocial } from "./user";

export interface AuthorDetails {
  bio: string | null;
  socials: ISocial[];
}

export interface CreatedAt {
  human: string;
  date_time: string;
  human_short: string;
}
