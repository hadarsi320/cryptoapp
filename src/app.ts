import express from 'express';
import userRouter from './routers/users';
// import githubRouter from './routers/github';
// import guestRouter from './routers/guests';
import path from 'path';

const PORT = 8080;
const server = express();
server.set('views', path.resolve(__dirname, 'views'));
server.set('view engine', 'ejs');

server.use('/users', userRouter);
// server.use('/github', githubRouter);
// server.use('/guest', guestRouter);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})