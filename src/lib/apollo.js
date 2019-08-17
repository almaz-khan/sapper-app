import cookie from 'cookie'

export default function parseCookies (req, options) {
  return cookie.parse(req.headers ? req.headers.cookie || '' : document.cookie, options);
}
