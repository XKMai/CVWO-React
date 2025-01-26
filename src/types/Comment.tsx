import { User } from "./User";

export interface Comment {
  ID: number;
  content: string;
  userID: number;
  user: User;
}
