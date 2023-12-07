import { IncomingMessage, ServerResponse } from 'http';
import i18n from 'i18n';
import { getLanguagePreference } from './userService';

i18n.configure({
 locales: ['en', 'es'],
 defaultLocale: 'en',
 directory: './locales',
 objectNotation: true,
 register: global,
});

async function setLanguagePreference(req: IncomingMessage) {
 const userId = req.cookies.userId;

 if (userId) {
    try {
      const language = await getLanguagePreference(userId);
      i18n.setLocale(language || 'en');
    } catch (err) {
      console.error(err);
      i18n.setLocale('en');
    }
 } else {
    i18n.setLocale('en');
 }
}

export default function i18nMiddleware(req: IncomingMessage, res: ServerResponse, next: Function) {
 setLanguagePreference(req).finally(() => next());
}