import { IncomingMessage, ServerResponse } from 'http';
import jwt, { JwtPayload, verify, VerifyOptions } from 'jsonwebtoken';

const secret = 'your_secret_key';

export default function auth(req: IncomingMessage, res: ServerResponse, next: Function) {
  const token = req.headers['authorization'];

  if (!token) {
    res.statusCode = 401;
    res.end('Access denied. No token provided.');
    return;
  }

  const options: VerifyOptions = {
   algorithms: ['HS256'],
   issuer: 'your_issuer',
   subject: 'your_subject',
   audience: 'your_audience',
   ignoreExpiration: false,
   maxAge: '30m',
   };

  try {
    const decoded = verify(token, secret, options) as JwtPayload;
    req['user'] = decoded;
    next();
  } catch (err) {
    res.statusCode = 401;
    res.end('Failed to authenticate token.');
  }
}

