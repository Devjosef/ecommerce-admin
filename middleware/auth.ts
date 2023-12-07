import { IncomingMessage, ServerResponse } from 'http';
import jwt from 'jsonwebtoken';

const secret = 'your_secret_key';

export default function auth(req: IncomingMessage, res: ServerResponse, next: Function) {
 const token = req.headers['authorization'];

 if (!token) {
    res.statusCode = 401;
    res.end('Access denied. No token provided.');
    return;
 }

 jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.statusCode = 500;
      res.end('Failed to authenticate token.');
      return;
    }

    req.headers['authorization'] = decoded;
    next();
 });
}