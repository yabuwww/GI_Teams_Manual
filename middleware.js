import { next } from '@vercel/edge';

export const config = {
  matcher: '/(.*)', // すべてのページに適用
};

export default function middleware(req) {
  const authHeader = req.headers.get('authorization');

  // ID: user / PW: password123 で設定する場合
  if (authHeader !== 'bW9ldGE6bW9lbW9la3l1bg==') {
    return new Response('認証が必要です', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  return next();
}