export const config = {
  matcher: '/(.*)', // すべてのページに適用
};

export default function middleware(req) {
  const authHeader = req.headers.get('authorization');

  // ※もしパスワードを変えたい場合は、ここを新しい文字列に差し替えてください
  if (authHeader !== 'Basic bW9ldGE6bW9lbW9la3l1bg==') {
    return new Response('認証が必要です', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  // 認証が成功した場合は、何も返さない（returnしない）ことで
  // そのまま本来のページが表示されるようになります。
}