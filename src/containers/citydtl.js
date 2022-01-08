import React, { Component } from "react";
import { Container, Col } from "react-bootstrap";
import { connect } from "react-redux";
import fb from "../config/firebase";
import axios from "axios";
class CityDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curr: "",
      new: "",
      error: "",
      user: "",
      citylist: [],
      name: "",
      short: "",
      err: false,
      errreason: "One of items already listed!",
      render: false,
    };
    this.city_name = [];
    this.city_short = [];
    const firebase = fb.firebase_;
    let prop = this.props;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        //console.log(user)
      } else {
        prop.history.push("");
      }
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (
      this.city_name.includes(this.state.name) ||
      this.city_short.includes(this.state.short)
    ) {
      this.setState({ err: true });
    } else {
      axios
        .get(
          "https://meatncuts.com.pk/phpfiles/api/city.php?cnd=add" +
            "&name=" +
            this.state.name +
            "&short=" +
            this.state.short
        )
        .then((res) => {
          this.setState({ render: true, citylist: [], name: "", short: "" });
        })
        .catch((err) => console.log(err));
    }
  };
  deleteCity = (n, s) => {
    axios
      .get(
        "https://meatncuts.com.pk/phpfiles/api/city.php?cnd=del" +
          "&name=" +
          n +
          "&short=" +
          s
      )
      .then((res) => {
        this.setState({ render: true, citylist: [], name: "", short: "" });
      })
      .catch((err) => console.log(err));
  };
  componentDidMount() {
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
  }

  getData = () => {
    let list = [];
    this.city_name.map((v, i) => {
      list.push(
        <Col
          style={{
            display: "inline-block",
            background: "white",
            textAlign: "left",
            padding: "20px",
            width: "30%",
            borderRadius: "10px",
            marginTop: "15px",
            marginRight: "10px",
          }}
        >
          <div style={{ display: "inline-block", width: "70%" }}>
            <strong>
              {" "}
              {this.city_name[i]} | {this.city_short[i]}
            </strong>
          </div>
          <div style={{ display: "inline-block", width: "20%" }}>
            <span style={{ marginLeft: "auto" }}>
              <button
                className="btn-xs btn-danger"
                onClick={() => {
                  this.deleteCity(this.city_name[i], this.city_short[i]);
                }}
              >
                Delete
              </button>
            </span>
          </div>
        </Col>
      );
    });
    return list;
  };
  render() {
    if (this.state.render == true) {
      axios
        .get(
          "https://meatncuts.com.pk/phpfiles/api/shipperdtl_city.php?cnd=city"
        )
        .then((response) => {
          this.city_name = [];
          this.city_short = [];
          response.data.map((v, i) => {
            this.city_name.push(v.city_name);
            this.city_short.push(v.city_short);
          });
          this.setState({ citylist: response.data, render: false, err: false });
        })
        .catch((err) => console.log("Error", err));
    }
    return (
      <Container>
        <div style={{ marginTop: "25px" }}>
          <button
            className="btn btn-dark"
            onClick={() => this.props.history.push("/data")}
            style={{
              position: "absolute",
              right: 25,
              width: "20%",
              marginTop: "25px",
            }}
          >
            Back to Dashboard
          </button>
        </div>
        <form
          style={{ margin: "auto", textAlign: "center", marginBottom: "10px" }}
          onSubmit={this.onSubmit}
        >
          <table style={{ margin: "auto" }}>
            <tr>
              <td>
                <div className="input-group" style={{ color: "white" }}>
                  <label>City Name:</label>
                  <input
                    required
                    type="text"
                    placeholder="City Name"
                    value={this.state.name}
                    onChange={(e) =>
                      this.setState({ name: e.target.value.toUpperCase() })
                    }
                  />
                </div>
              </td>
              <td>
                <div className="input-group" style={{ color: "white" }}>
                  <label>City Short Name:</label>
                  <input
                    required
                    type="text"
                    placeholder="City Short Form"
                    value={this.state.short}
                    onChange={(e) =>
                      this.setState({ short: e.target.value.toUpperCase() })
                    }
                  />
                </div>
              </td>
            </tr>

            <tr>
              <td colSpan="2">
                {this.state.err ? (
                  <div style={{ color: "red" }}>{this.state.errreason}</div>
                ) : (
                  ""
                )}
                <input
                  type="submit"
                  value="Add City"
                  style={{ width: "30%" }}
                />
              </td>
            </tr>
          </table>
        </form>

        {this.getData()}
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(CityDetail);
