import express from 'express';
import userRouter from './routers/users';
import githubRouter from './routers/github';
import guestRouter from './routers/guests';
import path from 'path';
import config from 'config';
import errorHandler from "./middleware/error/error-handler"

const server = express();
server.set('views', path.resolve(__dirname, 'views'));
server.set('view engine', 'ejs');

// general middlewares
server.use(express.urlencoded());

// routing
server.use('/users', userRouter);
server.use('/github', githubRouter);
server.use('/guest', guestRouter);

// error middlewares
server.use(errorHandler)

const port = config.get<number>('app.port');
server.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})