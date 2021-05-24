import { constants } from "../../_shered/constants.js";
import UserDb from "../../_shered/userDb.js";

function redirectToLobby() {
    window.location = constants.pages.lobby
}

function onLogin({ provider, firebase }) {
    return async () => {
        try
        {
            const result = await firebase
                .auth()
                .signInWithPopup(provider)
            const { user } = result;
            const userData = {
                img: user.photoURL,
                username: user.displayName
            }

            UserDb.insert(userData)
            redirectToLobby()

        }
        catch (error)
        {
  
            alert(JSON.stringify(error))
            console.log('error', error)
        }
    }
}


const currentUser = UserDb.get()
if(Object.keys(currentUser).length){
    redirectToLobby()
}
// Initialize Firebase
firebase.initializeApp(constants.firebaseConfig);
firebase.analytics();

var provider = new firebase.auth.GithubAuthProvider();
provider.addScope('read:user');


const btnLogin = document.getElementById("btnLogin")
btnLogin.addEventListener("click", onLogin({ provider, firebase }))