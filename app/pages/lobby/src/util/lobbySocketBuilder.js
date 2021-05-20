import { constants } from "../../../_shered/constants.js";
import SocketBuilder from "../../../_shered/sokcetBuilder.js";



export default class LobbySocketBuilder extends SocketBuilder{
    constructor({ socketUrl, namespace }){
        super({socketUrl, namespace})
        this.OnLobbyUpdated = () => {}


    }

    setOnLobbyUpdated(fn) {
        this.OnLobbyUpdated = fn

        return this
    }

    build() {
        const socket = super.build()

        socket.on(constants.events.LOBBY_UPDATED, this.OnLobbyUpdated)
        
        return socket;
    }
}