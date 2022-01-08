import React, { Component } from "react";
import { connect } from "react-redux";
import fb from "../config/firebase";
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: "",
      user: "",
    };
  }
  handleSignup = () => {
    ////console.log("Check")
    const firebase = fb.firebase_;
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        //console.log(user)
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        //console.log(errorMessage)
        // ..
      });
  };

  handleSignin = () => {
    const email = this.state.email + "@admin.com";
    const firebase = fb.firebase_;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, this.state.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        //console.log(user)
        this.props.history.push("/data");
        //console.log('token', userCredential.data.token)
        localStorage.setItem("token", userCredential.data.token);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.setState({
          error: "Invalid Email or Password!",
          email: "",
          password: "",
        });
      });
  };

  setpersistence = () => {
    const firebase = fb.firebase_;

    const email = this.state.email + "@admin.com";
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        //console.log("I am here")
        this.handleSignin();
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return;
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };

  handleSignout = () => {
    const firebase = fb.firebase_;
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    ////console.log("State", this.state);
    // const firebase = fb.firebase_
    this.setpersistence();
    // let x = this.setpersistence()
    // //console.log(x)
    //this.handleSignin();
  };
  componentDidMount() {
    // const firebase = fb.firebase_
    // let c=0
    // let u
    // firebase.auth().onAuthStateChanged(function(user) {
    //     if(user){
    //         c=1;
    //         u=user
    //         //console.log(u)
    //     }else{
    //         c=0;
    //     }
    //   });
    //   if(c===1){
    //     this.setState({ user: u });
    //   }else{
    //     this.setState({ user: "" });
    //   }
  }
  render() {
    return (
      <div style={{ width: "30%", margin: "Auto", color: "white" }}>
        <h2>Login Please</h2>
        <form onSubmit={this.onSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              required
              type="text"
              className="form-control"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <p style={{ color: "Red" }}>{this.state.error}</p>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-danger">
            Login
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  //     set_data: () => dispatch(set_data()),
  //    facebook_login: () =>dispatch(facebook_login())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
