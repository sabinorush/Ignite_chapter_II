import { Router } from "express";
import  multer from "multer";

import { CreateUserController } from "../modules/accounts/useCase/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCase/updateUserAvatar/UpdateUserAvatarController"
  ;
import updloadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const usersRoutes = Router();

const updloadAvatar = multer(updloadConfig.upload("./tmp/avatar"))

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  updloadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRoutes };