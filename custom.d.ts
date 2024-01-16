import { JwtPayload } from 'jsonwebtoken';

declare module 'http' {
  interface IncomingMessage {
    user?: JwtPayload;
    cookies: { [key: string]: string };
  }
}

