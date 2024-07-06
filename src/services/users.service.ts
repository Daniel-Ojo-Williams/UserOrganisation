import { prisma } from "../config";
import { CustomError, HttpCode, genId } from "../utils";
import { newUser } from "../validators";
import { IUserService } from "../types";

class UserService implements IUserService {
  async createUser(user: newUser) {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email }
    });

    if (existingUser) throw new CustomError(HttpCode.CONFLICT, 'An account with this email already exists', 'Conflict');

    const newUser = await prisma.user.create({
      data: {
        userId: genId(),
        ...user
      }
    })

    return newUser;
  }

  async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) throw new CustomError(HttpCode.NOT_FOUND, 'User not found', 'Not Found');

    return user;
  }

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { userId: id }
    })

    if (!user) throw new CustomError(HttpCode.NOT_FOUND, "User not found", 'Not Found');

    return user;
  }
}

export default UserService;
