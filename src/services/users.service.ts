import { prisma } from "../config";
import { CustomError, HttpCode, genId } from "../utils";
import { newUser } from "../validators";
import { IUserService } from "../types";

class UserService implements IUserService {
  async createUser(user: newUser) {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email }
    });

    if (existingUser) throw new CustomError(HttpCode.UNPROCESSABLE_ENTITY, 'An account with this email already exists', 'Conflict');

    const capitaliseName = user.firstName[0].toUpperCase() + user.firstName.slice(1);
    const orgName = `${capitaliseName}'${user.firstName[user.firstName.length - 1] === 's' ? '' : 's'} organisation`;

    const newUser = await prisma.user.create({
      data: {
        userId: genId(),
        ...user,
        organisations: {
          create: [
            {
              organisation: {
                create: {
                  name: orgName,
                  orgId: genId()
                }
              }
            }
          ]
        }
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

    // @ts-ignore
    delete user.password;
    return user;
  }
}

export default UserService;
