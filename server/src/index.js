import RoomsController from "./controlers/roomsController.js";
import SocketServer from "./util/socket.js";
import Event from "events"
import { constants } from './util/constants.js'

const port = process.env.PORT || 3000
const socketServer = new SocketServer({port})
const server = await socketServer.start()

const roomsController = new RoomsController()

const namespaces = {
    room: { controller: roomsController, eventEmitter: new Event() },
}

const routeConfig = Object.entries(namespaces)
.map(([namespace, {controller, eventEmitter}]) => {

    const controllerEvents = controller.getEvents()
    eventEmitter.on(
        constants.events.USER_CONNECTED,
        controller.onNewConnection.bind(controller)
    )

    return {
        [namespace]: { events: controllerEvents, eventEmitter}
    }
})

socketServer.attachEvents({ routeConfig })
console.log("scoket server is running at", server.address().port)