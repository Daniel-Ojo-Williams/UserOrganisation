import { Request, Response } from "express";
import { IUserService } from "../types";
import { CustomError, HttpCode, genToken } from "../utils";
import { loginUser, newUser } from "../validators";
import bcrypt from 'bcrypt';

class Users {
  constructor(private UserService: IUserService) {}

  async createUser(req: Request, res: Response) {
    try {
      const user = <newUser>req.body;

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(user.password, salt)
      user.password = passwordHash;

      const newUser = await this.UserService.createUser(user);
      const token = genToken({ userId: newUser.userId, email: newUser.email }, '5h');

      // @ts-ignore
      delete newUser.password;

      res
        .status(HttpCode.CREATED)
        .json({
          status: "success",
          message: "Registration successful",
          data: { accessToken: token, user: newUser },
        });
    } catch (error) {
      if (error instanceof CustomError) return res.status(error.status_code).json({ message: error.message, status: error.status, statusCode: error.status_code })

      res.status(HttpCode.BAD_REQUEST).json({ message: 'Registration unsuccessful', status: 'Bad request' })
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = <loginUser>req.body;

      const user = await this.UserService.getUserByEmail(email);

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) return res.status(HttpCode.UNAUTHORISED).json({ status: 'Bad request', message: 'Authentication failed', statusCode: HttpCode.UNAUTHORISED });

      const token = genToken({ userId: user.userId, email: user.email }, '5h');

      // @ts-ignore
      delete user.password;

      res.status(HttpCode.OK).json({ status: 'success', message: 'Registration successful', data: { accessToken: token, user, statusCode: HttpCode.OK } });
    } catch (error) {
      if (error instanceof CustomError) return res.status(error.status_code).json({ message: error.message, status: error.status, statusCode: error.status_code });

      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
        status: "Server error",
        serverMessage: (error as Error).message,
      });
    }
  }

  async getUserProfile(req: Request, res: Response) {
    try {
      const { userId } = req.user;

      const user = await this.UserService.getUserById(userId);

      res.status(HttpCode.OK).json({ status: 'success', message: 'Registration successful', data: { user }, statusCode: HttpCode.OK });      
    } catch (error) {
      if (error instanceof CustomError) return res.status(error.status_code).json({ message: error.message, status: error.status, statusCode: error.status_code });

      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
        status: "Server error",
        serverMessage: (error as Error).message,
      });
    }
  }
}

export default Users;
