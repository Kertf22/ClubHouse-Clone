import { constants } from "../../../_shered/constants.js";
import SocketBuilder from "../../../_shered/sokcetBuilder.js";

export default class RoomSocketBuilder extends SocketBuilder{
    constructor({ socketUrl, namespace }){
        super({socketUrl, namespace})
        this.OnRoomUpdated = () => {}
        this.OnUserProfileUpgrade = () => {}
        this.OnSpeakRequested = () => {} 
    }

    setOnRoomUpdated(fn) {
        this.OnRoomUpdated = fn

        return this
    }

    setOnUserProfileUpgrade(fn) {
        this.OnUserProfileUpgrade = fn

        return this
    }

    setOnSpeakRequested(fn) {
        this.OnSpeakRequested = fn
        
        return this
    }

    build() {
        const socket = super.build()

        socket.on(constants.events.LOBBY_UPDATED, this.OnRoomUpdated)
        socket.on(constants.events.UPGRADE_USER_PERMISSION,this.OnUserProfileUpgrade)
        socket.on(constants.events.SPEAK_REQUEST,this.OnSpeakRequested)

        return socket;
    }
}