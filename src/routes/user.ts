import { Router } from "express";
import { authMid, validate } from "../middlewares";
import { createUser, login } from "../validators";
import { UserService } from "../services";
import { UserController } from "../controllers";

const route = Router();

const userService = new UserService();
const userController = new UserController(userService);

route.post('/register', validate(createUser), userController.createUser.bind(userController));
route.post('/login', validate(login), userController.login.bind(userController));
route.get('/profile', authMid, userController.getUserProfile.bind(userController));

export default route;
