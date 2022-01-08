import React, { Component } from "react";
import { connect } from "react-redux";
import fb from "../config/firebase";
import axios from "axios";
class ShipperDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curr: "",
      new: "",
      error: "",
      user: "",
      name: "",
      email: "",
      phone: 0,
      address: "",
      city: "Select City",
      citylist: [],
      city_short: "",
    };
    this.city_name = [];
    this.city_short = [];
    axios
      .get("https://meatncuts.com.pk/phpfiles/api/shipperdtl_city.php?cnd=city")
      .then((response) => {
        response.data.map((v, i) => {
          this.city_name.push(v.city_name);
          this.city_short.push(v.city_short);
        });
        this.setState({ citylist: response.data });
      })
      .catch((err) => console.log("Error", err));

    const firebase = fb.firebase_;
    let prop = this.props;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        //console.log(user)
      } else {
        prop.history.push("/");
      }
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    let obj = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      phone: this.state.phone,
      city: this.state.city,
      city_short: this.state.city_short,
    };

    axios
      .post("https://meatncuts.com.pk/phpfiles/api/update_shipper.php", obj)
      .then((response) => {})
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    axios
      .get(
        "https://meatncuts.com.pk/phpfiles/api/shipperdtl_city.php?cnd=shipper"
      )
      .then((response) => {
        this.setState({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          address: response.data.address,
          city: response.data.city,
          city_short: response.data.city_short,
        });
      })
      .catch((err) => console.log("Error", err));

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

  getCity = () => {
    let list = [];
    this.state.citylist.map((v, i) => {
      list.push(<option value={v.city_name}>{v.city_name}</option>);
    });
    return list;
  };
  render() {
    return (
      <div className="container1">
        <h4>Shipper Detail</h4>
        <form onSubmit={this.onSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <div className="input-group">
                    <label>Name:</label>
                    <input
                      required
                      type="text"
                      placeholder="Full Name"
                      value={this.state.name}
                      onChange={(e) =>
                        this.setState({ name: e.target.value.toUpperCase() })
                      }
                    />
                  </div>
                </td>
                <td>
                  <div className="input-group">
                    <label>Phone:</label>
                    <input
                      required
                      type="number"
                      placeholder="Phone"
                      value={this.state.phone == 0 ? "" : this.state.phone}
                      onChange={(e) => this.setState({ phone: e.target.value })}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label>City:</label>
                  <div>
                    <select
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        let idx = this.city_name.indexOf(e.target.value);

                        this.setState({
                          city_short: this.city_short[idx],
                          city: e.target.value,
                        });
                      }}
                    >
                      {this.getCity()}
                    </select>
                  </div>
                </td>
                <td>
                  <div className="input-group">
                    <label>Email:</label>
                    <input
                      required
                      type="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <div className="input-group">
                    <label>Address:</label>
                    <input
                      required
                      type="text"
                      placeholder="Address"
                      value={this.state.address}
                      onChange={(e) =>
                        this.setState({ address: e.target.value.toUpperCase() })
                      }
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td colSpan={3}>
                  <br />
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
                      value="Update Detail"
                      className="btn btn-primary"
                      style={{ width: "40%", margin: "5px" }}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={() => this.props.history.push("/data")}
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

export default connect(mapStateToProps, mapDispatchToProps)(ShipperDetail);
