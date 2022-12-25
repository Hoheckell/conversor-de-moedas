import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

export async function auth(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const secret = process.env.JWT_SECRET;
    const now = moment().unix();

    const access_token = authHeader && authHeader.split(' ')[1];
    if (access_token === null) res.status(401).send();

    jwt.verify(access_token, secret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Acesso Negado.' });
      }
      const duration = moment.duration(
        moment.unix(now).diff(moment.unix(user?.expiresAt)),
      );
      if (
        user?.expiresAt &&
        Number.parseInt(duration.asMinutes().toString()) > 120
      ) {
        return res.status(403).json({ message: 'Token expired.' });
      }
      req.user = user;
      next();
    });
  } catch (e) {
    throw e;
  }
}
