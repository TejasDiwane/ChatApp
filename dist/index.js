/*import WebSocket,{ WebSocketServer } from "ws";

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
*/
import WebSocket, { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });
const users = [];
wss.on("connection", (socket) => {
    console.log("Client connected");
    socket.on("message", (data) => {
        let parsedMessage;
        try {
            parsedMessage = JSON.parse(data.toString());
        }
        catch (err) {
            socket.send(JSON.stringify({ error: "Invalid JSON" }));
            return;
        }
        if (parsedMessage.type === "join") {
            users.push({
                socket,
                room: parsedMessage.payload.roomId,
            });
            socket.send(JSON.stringify({ system: `Joined room ${parsedMessage.payload.roomId}` }));
        }
        if (parsedMessage.type === "chat") {
            const userRoom = users.find((u) => u.socket === socket)?.room;
            if (!userRoom)
                return;
            users.forEach((u) => {
                if (u.room === userRoom) {
                    u.socket.send(JSON.stringify({
                        type: "chat",
                        message: parsedMessage.payload.message,
                    }));
                }
            });
        }
    });
    socket.on("close", () => {
        console.log("Client disconnected");
        const index = users.findIndex((u) => u.socket === socket);
        if (index !== -1)
            users.splice(index, 1);
    });
});
console.log("WebSocket server running on ws://localhost:8080");
//# sourceMappingURL=index.js.map