import {io} from 'socket.io-client'

export async function initSocket(){
    const option={
        'force new connection':true,
        recoonectionAttempt:Infinity,
        'timeout':180000,
        'transports':['websocket']
    }

    return io("http://localhost:7001", option);
}
