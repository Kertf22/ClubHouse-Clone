
export const constants = {
    socketUrl : "http://localhost:3000",
    //socketUrl: "https://ew-socket-server32.herokuapp.com/",
    socketNamespace: {
        room: "room",
        lobby: "lobby"
    },

    peerConfig: Object.values({
        id: undefined,
        /*config: {
            host:'http:localhost:9000',
            secure: true,
            path: '/'
        } */
        port: 9000,
        host: 'localhost',
        path: '/'
    }),
    pages: {
        lobby: '/pages/lobby',
        login: '/pages/login'
    },
    events: {
        USER_CONNECTED : "userConnection",
        USER_DISCONNECTED : "userDisconnection",

        JOIN_ROOM : "joinRoom",
        
        LOBBY_UPDATED: "lobbyUpdated",
        UPGRADE_USER_PERMISSION: "upgadeUserPermission",
             
        SPEAK_REQUEST: 'speakRequest',
        SPEAK_ANSWER: 'speakAnswer'
    },
    firebaseConfig: {
        apiKey: "AIzaSyDJfYixyYfrs7Aw_Zwvm0I7rNOEfpc8m9A",
        authDomain: "clone-clubhouse.firebaseapp.com",
        projectId: "clone-clubhouse",
        storageBucket: "clone-clubhouse.appspot.com",
        messagingSenderId: "128087179689",
        appId: "1:128087179689:web:c6e555e5d3fc6594a884b8",
        measurementId: "G-G9VDFSYT5R"
    },
    storageKey: "cloneclub:storage:user"
}