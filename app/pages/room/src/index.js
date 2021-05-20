import { constants } from "../../_shered/constants.js";
import Media from "../../_shered/media.js";
import PeerBuilder from "../../_shered/peerbuilder.js";
import RoomController from "./controller.js";
import Attendee from "./entities/attendee.js";
import RoomService from "./service.js";
import RoomSocketBuilder from "./util/roomSocket.js";
import View from "./view.js";

const urlParams = new URLSearchParams(window.location.search)

const keys = ['id','topic']

const urlData = keys.map((key) => [key,urlParams.get(key)])

const user = {
    img: "../../assets/favicon.jpeg",
    username: "Paulo Hercílio" + Date.now()
}

const roomInfo = {room : {...Object.fromEntries(urlData)}, user}

const peerBuilder = new PeerBuilder({
    peerConfig:constants.peerConfig
})



const socketBuilder = new RoomSocketBuilder({
    socketUrl: constants.socketUrl,
    namespace: constants.socketNamespace.room
})

const roomService = new RoomService({
    media:Media
})


const dependencies = {
    view: View,
    socketBuilder,
    roomInfo,
    peerBuilder,
    roomService
}

RoomController.initialize(dependencies).catch(error => {
    alert(error.message)
})


