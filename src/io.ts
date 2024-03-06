import { Server } from "socket.io";
import config from "config";

const io = new Server({
    cors: {
        origin: '*'
    }
});

io.on('connection', socket => {
    socket.on('update from worker', message => {
        console.log(`message received from allegedly the worker: ${message}`);
        
        io.emit('update your list', message)
    })
})

const port = config.get<number>('io.port');
io.listen(port)