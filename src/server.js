import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = express()

// Configures the express session.
// app.use(session({
//   // store: new RedisStore({host: 'redis', port: 6379}),
//   cookie: {
//     maxAge: 604800000,
//   },
//   secret: 'keyboard cat',
//   resave: false,
//   rolling: true
// }))

// Setting default values and for debugging purposes
app.use(function(req, res, next) {
  // console.log(req.headers);

  // if (typeof req.session.user === 'undefined') {
  //   req.session.user = false;
  // }
  next()
})

// Initiates Sapper and adds the session variable to the Store.
app.use(
  compression({ threshold: 0 }),
  sirv('static', { dev }),
  sapper.middleware({
    session: (req, res) => ({
      headers: req.headers
    })
  })
)
.listen(PORT, err => {
  if (err) console.log('error', err);
});
