import { constants } from "../../_shered/constants.js";
import RoomSocketBuilder from "./util/roomSocket.js";

const socketBuilder = new RoomSocketBuilder({
    socketUrl: constants.socketUrl,
    namespace: constants.socketNamespace.room
})

const socket = socketBuilder
    .setOnUserConnected((user) => console.log("user connected!", user))
    .setOnUserDisconnected((user) => console.log("user disconnected!", user))
    .setOnRoomUpdated((room) => console.log("room list!", room))
    .build()


const room = {
    id: "0001",
    topic:"blue"
};

const user = {
    img:"https://img-premium.flaticon.com/png/512/3135/3135715.png?token=exp=1621267863~hmac=586a74ae32379feb006b434c056b6c5d",
    username:"Paulo Hercílio" + Date.now()
}

socket.emit(constants.events.JOIN_ROOM, { user, room })
