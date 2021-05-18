import { constants } from "../../../_shered/constants.js";
import SocketBuilder from "../../../_shered/sokcetBuilder.js";

export default class RoomSocketBuilder extends SocketBuilder{
    constructor({ socketUrl, namespace }){
        super({socketUrl, namespace})
        this.OnRoomUpdated = () => {}
    }

    setOnRoomUpdated(fn) {
        this.OnRoomUpdated = fn

        return this
    }


    build() {
        const socket = super.build()

        socket.on(constants.events.LOBBY_UPDATED, this.OnRoomUpdated)

        return socket;
    }
}