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
       if(parsedMessage.type==="chat"){
          const roomUser=user.find((s)=>s.socket==socket)?.room;
          if(roomUser !== undefined){
           user.forEach((s)=>{
            if(roomUser==s.room){
                s.socket.send(JSON.stringify(parsedMessage.payload.message));
            }
           })
          }
       }
    })
})

wss.on("disconect", (socket)=>{
    user.filter((s)=> s!=socket);
})


