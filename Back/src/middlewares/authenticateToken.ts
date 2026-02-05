import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/UserRepository';

type JwtPayload = {
  userId: number;
}

const secret = process.env.SECRET_KEY as string;

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  let token = authHeader && authHeader.split(' ')[1];

  if (!token && req.cookies) {
    token = req.cookies['accessToken'];
  }

  if (!token) {
    res.status(401).json({ error: 'Token not received.' });
    return;
  }

  const { userId } = jwt.verify(token, secret ?? '') as JwtPayload;

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    res.status(401).json({ error: 'Invalid or expired Token.' });
    return;
  }

  const { password: _, ...loggedUser } = user;

  req.user = loggedUser;

  next();
}