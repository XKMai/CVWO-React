import { User } from "./User";

export interface Post {
  id: number;
  title: string;
  content: string;
  category: string[];
  userId: number;
  user: User;
  dateTime: string;
  score: number;
  picture: string;
}
