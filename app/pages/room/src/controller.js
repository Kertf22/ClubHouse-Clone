import { constants } from "../../_shered/constants.js"
import Attendee from "./entities/attendee.js"

export default class RoomController {
    constructor({ view, socketBuilder, roomInfo, peerBuilder, roomService}) {
        this.socketBuilder = socketBuilder
        this.roomService = roomService
        this.peerBuilder = peerBuilder
        this.roomInfo = roomInfo
        this.view = view

        
        this.socket = {}
    }

    static async initialize(deps){
        return new RoomController(deps).initialize()
    }

    async initialize() {
        this._stepViewEvent()
        this.roomService.init()
        this.socket = this._setupSocket()
        this.roomService.setCurrentPeer(await this._setupWebRTC()) 
    }


    _stepViewEvent(){
        this.view.configureMicrophoneActivation(this.OnMicrophoneActivation())
        this.view.configureLeaveButton()
        this.view.configureClapButton(this.onClapPressed())
        this.view.updateUserImage(this.roomInfo.user)
        this.view.updateRoomTopic(this.roomInfo.room)
    }
    OnMicrophoneActivation() {
        return  async () => {
            await this.roomService.toggleAudioActivation()
        }
    }

    onClapPressed() {
        return () => {
            this.socket.emit(constants.events.SPEAK_REQUEST, this.roomInfo.user)
        }
    }
    _setupSocket() {
        return this.socketBuilder
            .setOnUserConnected(this.onUserConnected())
            .setOnUserDisconnected(this.onUserDisconnected())
            .setOnRoomUpdated(this.onRoomUpdated())
            .setOnUserProfileUpgrade(this.OnUserProfileUpgrade())
            .setOnSpeakRequested(this.OnSpeakRequested())
            .build()

    }

    OnSpeakRequested() {
        return (data) => { 
            const attendee = new Attendee(data);
            const result = prompt(`${attendee.username} pediu para falar! Para aceitar 1 para recusar 0`)
            this.socket.emit(constants.events.SPEAK_ANSWER, { answer: !!Number(result), user: attendee})
        }
    }

    async _setupWebRTC() {
        return this.peerBuilder
            .setOnError(this.OnPeerError())
            .setOnConnectionioOpened(this.OnPeerConnectionioOpnened())
            .setOnCallError(this.OnCallError())
            .setOnCallClose(this.OnCallClose())
            .setOnCallReeceived(this.OnCallReceeceived())
            .setOnStreamReceived(this.OnStreamReceived())
            .build()
    }

    OnStreamReceived() {
        return (call, stream) =>{
            const callerId = call.peer
            console.log("OnStreamReceiven", call, stream)
            const { isCurrentId } = this.roomService.addReceivedPeer(call)

            this.view.renderAudioElement({
                callerId,
                stream,
                isCurrentId
            })
        }
    }

    OnCallReceeceived() {
        return async (call) =>{
            const stream = await this.roomService.getCurrentStream()
            console.log("answering call", call)
            call.answer(stream)
        }
    }

    OnCallClose() {
        return (call) =>{
            console.log("OnCallClose", call)
            const peerId = call.peer
            this.roomService.disconnectPeer({peerId})
        }
    }

    OnCallError() {
        return (call, error) => {
            console.log("OnCallError", call, error)
            const peerId = call.peer
            this.roomService.disconnectPeer({peerId})
        }
    }

    //// quando a conexão for aberta ele pede para entrar na sala
    OnPeerConnectionioOpnened() {
        return (peer) => {
            console.log("peer",peer)
            this.roomInfo.user.peerId = peer.id
            this.socket.emit(constants.events.JOIN_ROOM, this.roomInfo)
         }
    }

    OnPeerError() {
        return (error) => { 
            console.log("Bad call",error)

        }
    }

    OnUserProfileUpgrade() {
        return (data) => {
            const attendee = new Attendee(data)
            console.log("onUserProfileUpgrade", attendee )


            if(attendee.isSpeaker) {
                this.roomService.upgradeUserPermission(attendee)
                this.view.addAttendeeOnGrid(attendee, true)
            }

            this.activateUserFeatures()
        }
    }

    onRoomUpdated() {
        return (data) => {
            const users = data.map(item => new Attendee(item))
            console.log("room list!", users)
            this.view.updateAttendeesOnGrid(users)
            this.roomService.updateCurrentUserProfile(users)
            this.activateUserFeatures()

        }

    }

    onUserDisconnected() {
        return (data) => {
            const attendee = new Attendee(data)
            console.log(`${attendee.fisrtName} disconnected!`)
            this.view.removeItemFromGrid(attendee.id)

            this.roomService.disconnectPeer(attendee)
        }
    }

    onUserConnected() {
        return (data) => {
            const attendee = new Attendee(data)
            console.log("user connected!", attendee)
            this.view.addAttendeeOnGrid(attendee)

            //vamos liga
            this.roomService.callNewUser(attendee)
        }
    }

    activateUserFeatures() {
        const currentUser = this.roomService.getCurrentUser()
        this.view.showUserFeatures(currentUser.isSpeaker)
    }
}