import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class VerifyTokeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
      jwt.verify(token, SECRET_KEY);
      next();
    } catch (error) {
      res.status(401).json({ ...error });
    }
  }
}
