import { serialize } from 'cookie';

export default async (req, res) => {
  /* remove cookies from request header */
  res.setHeader('Set-Cookie', [
    serialize('TodoJWT', '', {
      maxAge: -1,
      path: '/',
    })
  ]);

  //res.writeHead(302, { Location: '/api/login' });
  return res.send({message: "You have been logged out!"});
}