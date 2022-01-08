import fb from '../../config/firebase';
const set_data = (e) => {
    return (dispatch) => {
        dispatch({type: "SET_DATA", payload:e})
    }
}

const new_data = (e) => {
  return (dispatch) => {
      dispatch({type: "NEW_DATA_RCV", payload:e})
  }
}

const facebook_login = () => {
    return (dispatch) => {
    const firebase = fb.firebase_
    var provider = new firebase.auth.FacebookAuthProvider();
         console.log("FB AUTH", provider)
        firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;
    let create_user={
      name: user.displayName,
      email: user.email,
      profile: user.photoURL,
      uid: user.uid
    }
    //firebase.database().ref('/').child(`todos/${user.uid}`).set(create_user)
    .then(()=>{
      console.log("Successful login")
    })
    //dispatch({type: "USERJOINED", payload:{name:user.displayName, email:user.email, login: true}})
    // ...
  })
  .catch((error) => {
   
    console.log("Error => ", error)

    // ...
  });
console.log("Working")
        
}
}

const storeData = (e, state_pram) => {
  let list = []
  state_pram.entry.map((v, k) => {  
    list.push(v)
  })
  list.push(e)
  return (dispatch) => {
  const firebase = fb.firebase_
  //firebase.database().ref('/').child(`new_order/${e.id}`).set(e)
  firebase.database().ref('/').child(`globalState/entry`).set(list)
  }
}

const readData =  () => {
  return (dispatch) => {
  const firebase = fb.firebase_
  const dbRef = firebase.database().ref('/').child("globalState/entry").get();
dbRef.then((snapshot) => {
  if (snapshot.exists()) {
    dispatch({type: "UPDATE_STATE_FROM_DB", payload:snapshot.val()})
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
  }
}

export { 
    set_data,
    storeData, 
    readData,
    new_data
}