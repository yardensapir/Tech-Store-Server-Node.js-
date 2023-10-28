import { Document } from "mongoose";

export type Type_User = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  matchPassword: (password: any) => Promise<boolean>;
};

export interface User extends Document {
  name: String;
  email: String;
  password: String;
  isAdmin: Boolean;
}
