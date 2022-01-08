import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/form.css";
import { set_data, storeData, readData, new_data } from "../store/action";
import axios from "axios";
import fb from "../config/firebase";

class Form extends Component {
  constructor(props) {
    super(props);
    const firebase = fb.firebase_;
    let prop = this.props;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        //console.log(user)
      } else {
        prop.history.push("");
      }
    });
    this.state = {
      z1name: "",
      z2phone: 0,
      z3id: 0,
      z4address: "",
      z5amount: 0,
      z6color: "",
      z7size: 0,
      z8designName: "",
      z9status: "Booked",
      z5amounterror: "",
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      name: this.state.z1name,
      cust_id: this.state.z3id,
      phone: this.state.z2phone,
      address: this.state.z4address,
      amount: this.state.z5amount,
      color: this.state.z6color,
      size: this.state.z7size,
      design_name: this.state.z8designName,
      status: this.state.z9status,
    };

    if (obj.amount >= 800) {
      axios
        .post("https://meatncuts.com.pk/phpfiles/api/insert.php", obj)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      this.props.new_data(true);
      console.log("This.Props");
      this.setState({
        z1name: "",
        z2phone: 0,
        z3id: 0,
        z4address: "",
        z5amount: 0,
        z6color: "",
        z7size: 0,
        z8designName: "",
        z9status: "Booked",
        z5amounterror: "",
      });

      this.props.history.push("/view_data");
    } else {
      this.setState({
        z5amounterror: "Amount must be greater than 800",
        z5amount: 0,
      });
    }

    //this.myFormRef.reset();
    //console.log(obj)
  };
  render() {
    return (
      <div>
        <div>
          <div className="container1">
            <h4>Book New Order</h4>
            <form onSubmit={this.onSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <div className="input-group">
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={this.state.z1name}
                          onChange={(e) =>
                            this.setState({ z1name: e.target.value })
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div className="input-group">
                        <input
                          type="tel"
                          placeholder="Phone"
                          value={
                            this.state.z2phone == 0 ? "" : this.state.z2phone
                          }
                          onChange={(e) =>
                            this.setState({ z2phone: e.target.value })
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div className="input-group">
                        <input
                          required
                          type="number"
                          placeholder="ID"
                          value={this.state.z3id == 0 ? "" : this.state.z3id}
                          onChange={(e) =>
                            this.setState({ z3id: e.target.value })
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div className="input-group">
                        <input
                          type="text"
                          placeholder="Address"
                          value={this.state.z4address}
                          onChange={(e) =>
                            this.setState({ z4address: e.target.value })
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="input-group">
                        <input
                          type="number"
                          placeholder="Amount"
                          value={
                            this.state.z5amount == 0 ? "" : this.state.z5amount
                          }
                          onChange={(e) =>
                            this.setState({ z5amount: e.target.value })
                          }
                        />
                        <p style={{ color: "red", fontSize: "10px" }}>
                          {this.state.z5amounterror}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="input-group">
                        <input
                          type="text"
                          placeholder="Color"
                          value={this.state.z6color}
                          onChange={(e) =>
                            this.setState({ z6color: e.target.value })
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div className="input-group">
                        <input
                          type="number"
                          placeholder="Size"
                          value={
                            this.state.z7size == 0 ? "" : this.state.z7size
                          }
                          onChange={(e) =>
                            this.setState({ z7size: e.target.value })
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div className="input-group">
                        <input
                          type="text"
                          placeholder="Design Name"
                          value={this.state.z8designName}
                          onChange={(e) =>
                            this.setState({
                              z8designName: e.target.value,
                              z9status: "Booked",
                            })
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div
                        className="input-group"
                        style={{
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="submit"
                          value="Submit Order"
                          className="btn btn-primary"
                          style={{ width: "40%", margin: "5px" }}
                        />
                        <button
                          className="btn btn-primary"
                          onClick={() => this.props.p(false)}
                          style={{ width: "40%", margin: "5px" }}
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
            {/* <button onClick={() =>{

      this.props.storeData(this.state, this.props.state)
      this.props.set_data(this.state)
    }}>Submit</button> */}

            {/* <button onClick={()=>this.props.readData()}> Read Data
    </button> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  storeData: (e, f) => dispatch(storeData(e, f)),
  set_data: (e) => dispatch(set_data(e)),
  readData: () => dispatch(readData()),
  new_data: (e) => dispatch(new_data(e)),
  //    facebook_login: () =>dispatch(facebook_login())
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
