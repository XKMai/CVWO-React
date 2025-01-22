import { Post } from "./Post";
import { User } from "./User";

export interface Comment {
  id: number;
  content: string;
  userId: number;
  user: User;
  dateTime: string;
  score: number;
}
