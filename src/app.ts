import session from 'express-session';
import express from 'express';
import config from 'config';
import path from 'path';

import errorHandler from "./middleware/error/error-handler"
import userRouter from './routers/users';
import githubRouter from './routers/github';
import guestRouter from './routers/guests';
import auth from './middleware/github-auth';


const server = express();
server.set('views', path.resolve(__dirname, 'views'));
server.set('view engine', 'ejs');

// general middlewares
server.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 5,
    },
}));
server.use(auth.initialize());
server.use(auth.session());

server.use(express.urlencoded());

// routing
server.use('/', guestRouter);
server.use('/users', userRouter);
server.use('/github', githubRouter);

// error middlewares
server.use(errorHandler)

const port = config.get<number>('app.port');
server.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})