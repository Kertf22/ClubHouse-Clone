export default class Attendee {
    constructor({id, username, img, isSpeaker, roomId, peerId }) {
        this.id = id
        this.img = img || ""
        this.isSpeaker = isSpeaker
        this.roomId = roomId
        this.peerId = peerId

        const name = username || "Usuário Anônimimo"
        this.username = name
        
        const [fisrtName, lastName] = name.split(/\s/)
        this.fisrtName = fisrtName
        this.lastName = lastName

    }
}