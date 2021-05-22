import { Router } from 'express';
import multer from 'multer';

import upload from '@config/upload';
import { CreateUserController } from '@modules/accounts/useCases/createUser/createUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/updateUserAvatarController';
import { ensureAuthenticated } from '@shared/infra/middlewares/ensureAuthenticated';
import { ProfileUserController } from '@modules/accounts/useCases/profileUser/ProfileUserController';

const uploader = multer(upload.multer);

const usersRoutes = Router();

const createUserController = new CreateUserController();

const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploader.single('avatar'),
  updateUserAvatarController.handle,
);
usersRoutes.get('/profile', ensureAuthenticated, profileUserController.handle);

export { usersRoutes };
