import { Router } from 'express';
import { getUser, getUsers } from '../controllers/user.controller.js';
import autherize from '../middlewares/auth.middleware.js';

const userRouter = Router();
import errormiddleware from '../middlewares/error.middleware.js';
userRouter.get('/', getUsers);

userRouter.get('/:id', autherize, errormiddleware, getUser);

userRouter.post('/', (req, res) => res.send({ title: "CREATE new user" }));

userRouter.put('/:id', (req, res) => res.send({ title: "UPDATE user by id " }));

userRouter.delete('/:id', (req, res) => res.send({ title: "DELETE A USER " }));


export default userRouter;





