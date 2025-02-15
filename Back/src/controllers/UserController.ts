import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/UserRepository';
import { IUser } from '../interfaces/IUser';


type JwtPayload ={
   userId: number;
}

export class UserController {


   async newRegister(req: Request, res: Response) {
      try {
         const { name, email, password, password2 } = req.body;

         if(!name) {
            res.status(404).json({ error: "Name field is required" });
            return;
         }

         if(password !== password2) {
            res.status(404).json({ error: 'Password not matches' });
            return;
         }

         const existentUser = await userRepository.findOneBy({ email: email });
         if(existentUser) {
            res.status(404).json({ error: 'Email already registered' });
            return;
         }

         const hashedPassword = await bcrypt.hash(password, 10);

         const newUser: IUser = {
            name,
            email,
            password: hashedPassword
         };

         await userRepository.save(newUser);

         const createdUser = await userRepository.findOneBy({ email: newUser.email });
         if(!createdUser) {
            res.status(404).json({ error: 'Error in User Register' });
            return;
         }

         const secret = process.env.SECRET_KEY as string;

         const token = jwt.sign({ userId: createdUser.id }, secret, {
            expiresIn:'7d'
         });

         res.status(201).json({ msg: 'User succesfully registered', token });
      } catch {
         res.status(500).json({ error: 'Error in User Register' });
      }
   }

   async userLogin(req: Request, res: Response) {
      try {
         const { email, password } = req.body;

         const existentUser = await userRepository.findOneBy({ email: email });
         if(existentUser) {
            const isPasswordMatch: boolean = await bcrypt.compare(password, existentUser.password);

            if(!isPasswordMatch) {
               res.status(404).json({ error: 'Invalid password!' });
               return;
            }

         } else {
            res.status(404).json({ error: 'Email not registered' });
            return;
         }
         
         const secret = process.env.SECRET_KEY as string;

         const token = jwt.sign({ userId: existentUser.id }, secret, {
            expiresIn:'7d'
         });

         res.status(201).json({ msg: 'Authentication succesfully done', token });
      } catch {
         res.status(500).json({ error: 'Error in login' });
      }
   }

   async editUser(req: Request, res:Response) {
      try {
         const { name, password, currentPassword } = req.body;

         const user = await userRepository.findOneBy({ id: req.user?.id });
         if(!user) {
            res.status(404).json({ error: 'User not found' });
            return;
         } else {
            if(name) {
               user.name = name;
            }

            if(password && currentPassword) {
               const iscurrentPasswordValida: boolean = await bcrypt.compare(currentPassword, user.password);
               if(!iscurrentPasswordValida) {
                  res.status(400).json({ error: 'Senha atual incorreta' });
                  return;
               }

               user.password = await bcrypt.hash(password, 10);
            } else if(password && !currentPassword) {
               res.status(400).json({ error: 'Its necessary fill current password to create a new password' });
               return;
            }

            await userRepository.save(user);

         }
         
         res.status(200).json({ msg: 'User succesfully updated' })
      } catch {
         res.status(500).json({ error: 'Error in user edit' });
      }
   }
}