
import { constants } from "../../_shered/constants.js";
import LobbyController from "./controller.js";
import LobbySocketBuilder from "./util/lobbySocketBuilder.js";
import View from "./view.js";

const user = {
    img:"../../assets/favicon.jpeg",
    username:"Paulo Hercílio" + Date.now()
}

const socketBuilder = new LobbySocketBuilder({
    socketUrl: constants.socketUrl,
    namespace: constants.socketNamespace.lobby
})

const dependencies = {
    socketBuilder,
    user,
    view: View
}

LobbyController.initialize(dependencies).catch(error => {
    alert(error.message)
})