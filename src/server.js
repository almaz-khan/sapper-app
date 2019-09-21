import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import sessionFileStore from 'session-file-store';
import session from 'express-session';
import bodyParser from 'body-parser';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV, SECRET, NOW } = process.env;
const dev = NODE_ENV === 'development';
const FileStore = sessionFileStore(session);
const app = express();

// Setting default values and for debugging purposes
app
  .use(bodyParser.json())
  .use(
    session({
      secret: SECRET ? SECRET : 'dev-secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 31536000
      },
      store: new FileStore({
        path: NOW ? `/tmp/sessions` : `.sessions`
      })
    })
  )
  // Initiates Sapper and adds the session variable to the Store.
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: req => {
        return {
          token: req.session && req.session.token
        };
      }
    })
  )
  .listen(PORT, err => {
    if (err) console.log('error', err);
  });
