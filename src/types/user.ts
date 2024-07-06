import { User } from "@prisma/client";
import { newUser } from "../validators";

export interface IUserService {
  createUser: (user: newUser) => Promise<User>;
  getUserByEmail: (email: string) => Promise<User>;
  getUserById: (id: string) => Promise<User>;
}
