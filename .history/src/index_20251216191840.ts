import WebSocket,{ WebSocketServer } from "ws";

const  wss=new WebSocketServer({port:8080});
interface User{
    socket:WebSocket;
    room:String;
}
let user:User[]=[];
wss.on("connection", (socket)=>{
    socket.on("message", (message)=>{
       const parsedMessage=JSON.parse(message as unknown as string);
       if(parsedMessage.type==="join"){
        user.push({
            socket:socket,
            room:parsedMessage.payload.roomId
        })
       }
    })
})

wss.on("disconect", (socket)=>{
    user.filter((s)=> s!=socket);
})