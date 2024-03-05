import express from 'express';
import userRouter from './routers/users';
import githubRouter from './routers/github';
import guestRouter from './routers/guests';

const server = express();
const PORT = 8080;

server.use('/users', userRouter)
server.use('/github', githubRouter)
server.use('/guest', guestRouter)

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})