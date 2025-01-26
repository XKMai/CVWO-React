import { User } from "./User";

export interface Post {
  ID: number;
  title: string;
  content: string;
  category: string[];
  userID: number;
  user: User;
  picture: string;
  comments: Comment[];
}
