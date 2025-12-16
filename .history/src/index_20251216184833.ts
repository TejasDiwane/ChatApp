import WebSocket,{ WebSocketServer } from "ws";

const  wss=new WebSocketServer({port:8080});
let user:WebSocket[]=[];
wss.on("connection", (socket)=>{
      user.push(socket);
    socket.on("message", (message)=>{
        user.forEach((s)=>{
            s.send(message.toString());
        })
    })
})

wss.on("disconect", (socket)=>{
    user.filter((s)=> s!=socket);
})