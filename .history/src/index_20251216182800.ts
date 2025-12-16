import { WebSocketServer } from "ws";

const  wss=new WebSocketServer({port:8080});
let user=[];
wss.on("connection", (socket)=>{
      user.push(socket);
    socket.on("message",(message)=>{
        for(let i=0;i<user.length;i++){
        console.log(message.toString());
        }
    })
})