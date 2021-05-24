class PeerCustomModule extends globalThis.Peer {
    constructor({config, onCall}) {
        super(...config)

        this.onCall = onCall
    }

    call(...args) {
        const originalCallResult = super.call(...args)

        // Interceptamos o call e adicionamos o 
        // comportamento do call para todos os objetos
        this.onCall(originalCallResult)

        return originalCallResult
    }
}


export default class PeerBuilder {
    constructor({ peerConfig }) {
        this.peerConfig = peerConfig
        this.OnErro = () => { }
        this.OnConnectionioOpened = () => { }
        this.OnCallError = () => { }
        this.OnCallClose = () => { }
        this.OnCallReeceived = () => { }
        this.OnStreamReceived = () => { }
    }

    setOnError(fn) {
        this.OnErro = fn

        return this
    }

    setOnConnectionioOpened(fn) {
        this.OnConnectionioOpened = fn

        return this
    }

    setOnCallError(fn) {
        this.OnCallError = fn

        return this
        
    }
    setOnCallClose(fn) {
        this.OnCallClose = fn

        return this
    }
    setOnCallReeceived(fn) {
        this.OnCallReeceived = fn

        return this
    }
    setOnStreamReceived(fn) {
        this.OnStreamReceived = fn

        return this
    }

    _prepareCallEvent(call) {
        call.on('stream', (stream) => this.OnStreamReceived(call, stream))
        call.on('error', (error) => this.OnCallError(call, error))
        call.on('close', () => this.OnCallClose(call))

        this.OnCallReeceived(call)

    }
    async build() {
        //o peer recebe uma lista de argumentos
  
        const peer = new PeerCustomModule({
            config:[...this.peerConfig],
            onCall: this._prepareCallEvent.bind(this)})

        peer.on('error', this.OnErro)
        peer.on('call', this._prepareCallEvent.bind(this))
        
        return new Promise((resolve) => peer.on('open', () => {
            this.OnConnectionioOpened(peer)
            return resolve(peer)
        }))

    }
}