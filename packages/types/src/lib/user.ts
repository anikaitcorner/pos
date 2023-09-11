import { IBusiness } from "./business";

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  business: IBusiness | null;
  createdAt: Date;
  updatedAt: Date;
}
