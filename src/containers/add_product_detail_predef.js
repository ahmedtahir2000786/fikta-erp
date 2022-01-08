import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/table.css";
import axios from "axios";
import { new_data } from "../store/action";
import { Link } from "react-router-dom";
import fb from "../config/firebase";
import { ThemeProvider } from "react-bootstrap";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

class AddProductDtl extends Component {
  constructor(props) {
    super(props);
    const firebase = fb.firebase_;
    let prop = this.props;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        //console.log(user)
      } else {
        prop.history.push("/");
      }
    });
    let date = new Date();
    date =
      date.getFullYear() +
      "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2);
    this.state = {
      response: [],
      addVal: "",
      showForm: false,
      data: "",
      emptyErrbool: false,
      emptyErrReason: "Field is required!",
      existErrBool: false,
      existErrReason: "Item Already Exist!",
      nilErrBool: false,
      nilErrReason: "'NIL' not allowed!",
      render: false,
      banwar_typearr: [],
      banwar_clrarr: [],
      sole_typearr: [],
      heel_clrarr: [],
      heel_typearr: [],
      pumpy_heelarr: [],
      prod_typearr: [],
      prod_clrarr: [],
    };
  }
  componentDidMount = () => {
    axios
      .get("https://meatncuts.com.pk/phpfiles/api/view_prod_dtl.php")
      .then((res) => {
        //console.log(res.data)
        res.data.map((v, i) => {
          if (v.type == "prod_type") {
            this.state.prod_typearr[i] = v.data;
          } else if (v.type == "prod_color") {
            this.state.prod_clrarr[i] = v.data;
          } else if (v.type == "banwar_color") {
            this.state.banwar_clrarr[i] = v.data;
          } else if (v.type == "banwar_type") {
            this.state.banwar_typearr[i] = v.data;
          } else if (v.type == "sole_type") {
            this.state.sole_typearr[i] = v.data;
          } else if (v.type == "heel_color") {
            this.state.heel_clrarr[i] = v.data;
          } else if (v.type == "heel_type") {
            this.state.heel_typearr[i] = v.data;
          } else if (v.type == "pumpy_heel") {
            this.state.pumpy_heelarr[i] = v.data;
          }
        });
        this.setState({
          response: res.data,
          prod_typearr: this.state.prod_typearr,
        });
      })
      .catch((err) => console.log("Error", err));
  };
  onSubmit = (e) => {
    e.preventDefault();
  };
  deleteData = (pt, v) => {
    axios
      .get(
        "https://meatncuts.com.pk/phpfiles/api/add_prod_dtl.php?type=" +
          pt +
          "&data=" +
          v +
          "&process=delete"
      )
      .then((res) => {
        this.setState({ render: true });
      })
      .catch((err) => console.log("Error", err));
  };
  onAdd = () => {
    //console.log(this.state.addVal)
    axios
      .get(
        "https://meatncuts.com.pk/phpfiles/api/add_prod_dtl.php?type=" +
          this.state.addVal +
          "&data=" +
          this.state.data +
          "&process=add"
      )
      .then((res) => {
        // console.log("Data Done")
        this.setState({
          data: "",
          emptyErrbool: false,
          existErrBool: false,
          render: true,
        });
      })
      .catch((err) => console.log("Error", err));
  };

  getData = (arr, pt) => {
    let list = [];
    arr.map((v, i) => {
      list.push(
        <li
          key={i}
          style={{
            listStyleType: "none",
            background: "white",
            textAlign: "left",
            padding: "20px",
            width: "100%",
            borderRadius: "10px",
            marginTop: "15px",
          }}
        >
          <div style={{ display: "inline-block", width: "80%" }}>
            <strong>{v}</strong>
          </div>
          <div style={{ display: "inline-block", width: "20%" }}>
            <span style={{ marginLeft: "auto" }}>
              <button
                className="btn-xs btn-danger"
                onClick={() => {
                  this.deleteData(pt, v);
                }}
              >
                Delete
              </button>
            </span>
          </div>
        </li>
      );
    });
    return <ul className="proddtlclass">{list}</ul>;
  };
  render() {
    if (this.state.render == true) {
      axios
        .get("https://meatncuts.com.pk/phpfiles/api/view_prod_dtl.php")
        .then((res) => {
          console.log(res.data);
          this.state.prod_typearr = [];
          this.state.prod_clrarr = [];
          this.state.banwar_clrarr = [];
          this.state.banwar_typearr = [];
          this.state.heel_clrarr = [];
          this.state.sole_typearr = [];
          this.state.heel_typearr = [];
          this.state.pumpy_heelarr = [];

          res.data.map((v, i) => {
            if (v.type == "prod_type") {
              this.state.prod_typearr[i] = v.data;
            } else if (v.type == "prod_color") {
              this.state.prod_clrarr[i] = v.data;
            } else if (v.type == "banwar_color") {
              this.state.banwar_clrarr[i] = v.data;
            } else if (v.type == "banwar_type") {
              this.state.banwar_typearr[i] = v.data;
            } else if (v.type == "sole_type") {
              this.state.sole_typearr[i] = v.data;
            } else if (v.type == "heel_color") {
              this.state.heel_clrarr[i] = v.data;
            } else if (v.type == "heel_type") {
              this.state.heel_typearr[i] = v.data;
            } else if (v.type == "pumpy_heel") {
              this.state.pumpy_heelarr[i] = v.data;
            }
          });
          this.setState({
            response: res.data,
            prod_typearr: this.state.prod_typearr,
            render: false,
          });
        })
        .catch((err) => console.log("Error", err));
    }

    return (
      <div style={{ textAlign: "center", margin: "auto" }}>
        <div style={{ marginTop: "25px", textAlign: "right" }}>
          <button
            className="btn-xs btn-dark"
            onClick={() => this.props.history.push("/data")}
            style={{ marginRight: 25 }}
          >
            Back to Dashboard
          </button>
        </div>
        <div
          style={{
            background: "white",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          {this.state.addVal == "prod_type" ? (
            <button
              style={{ margin: "10px" }}
              className="btn btn-dark"
              onClick={() =>
                this.setState({
                  addVal: "",
                  showForm: false,
                  data: "",
                  emptyErrbool: false,
                  existErrBool: false,
                })
              }
            >
              Add Product Type
            </button>
          ) : (
            <button
              style={{ margin: "10px" }}
              className="btn btn-primary"
              onClick={() => {
                this.setState({ addVal: "prod_type", showForm: true });
              }}
            >
              Add Product Type
            </button>
          )}
          {this.state.addVal == "prod_color" ? (
            <button
              style={{ margin: "10px" }}
              className="btn btn-dark"
              onClick={() =>
                this.setState({
                  addVal: "",
                  showForm: false,
                  data: "",
                  emptyErrbool: false,
                  existErrBool: false,
                })
              }
            >
              Add Product Color
            </button>
          ) : (
            <button
              style={{ margin: "10px" }}
              className="btn btn-primary"
              onClick={() => {
                this.setState({ addVal: "prod_color", showForm: true });
              }}
            >
              Add Product Color
            </button>
          )}
          {this.state.addVal == "banwar_type" ? (
            <button
              style={{ margin: "10px" }}
              className="btn btn-dark"
              onClick={() =>
                this.setState({
                  addVal: "",
                  showForm: false,
                  data: "",
                  emptyErrbool: false,
                  existErrBool: false,
                })
              }
            >
              Add Banwar Type
            </button>
          ) : (
            <button
              style={{ margin: "10px" }}
              className="btn btn-primary"
              onClick={() => {
                this.setState({ addVal: "banwar_type", showForm: true });
              }}
            >
              Add Banwar Type
            </button>
          )}
          {this.state.addVal == "banwar_color" ? (
            <button
              style={{ margin: "10px" }}
              className="btn btn-dark"
              onClick={() =>
                this.setState({
                  addVal: "",
                  showForm: false,
                  data: "",
                  emptyErrbool: false,
                  existErrBool: false,
                })
              }
            >
              Add Banwar Color
            </button>
          ) : (
            <button
              style={{ margin: "10px" }}
              className="btn btn-primary"
              onClick={() => {
                this.setState({ addVal: "banwar_color", showForm: true });
              }}
            >
              Add Banwar Color
            </button>
          )}

          {this.state.addVal == "sole_type" ? (
            <button
              style={{ margin: "10px" }}
              className="btn btn-dark"
              onClick={() =>
                this.setState({
                  addVal: "",
                  showForm: false,
                  data: "",
                  emptyErrbool: false,
                  existErrBool: false,
                })
              }
            >
              Add Sole Type
            </button>
          ) : (
            <button
              style={{ margin: "10px" }}
              className="btn btn-primary"
              onClick={() => {
                this.setState({ addVal: "sole_type", showForm: true });
              }}
            >
              Add Sole Type
            </button>
          )}
          {this.state.addVal == "heel_color" ? (
            <button
              style={{ margin: "10px" }}
              className="btn btn-dark"
              onClick={() =>
                this.setState({
                  addVal: "",
                  showForm: false,
                  data: "",
                  emptyErrbool: false,
                  existErrBool: false,
                })
              }
            >
              Add Heel Color
            </button>
          ) : (
            <button
              style={{ margin: "10px" }}
              className="btn btn-primary"
              onClick={() => {
                this.setState({ addVal: "heel_color", showForm: true });
              }}
            >
              Add Heel Color
            </button>
          )}
          {this.state.addVal == "heel_type" ? (
            <button
              style={{ margin: "10px" }}
              className="btn btn-dark"
              onClick={() =>
                this.setState({
                  addVal: "",
                  showForm: false,
                  data: "",
                  emptyErrbool: false,
                  existErrBool: false,
                })
              }
            >
              Add Heel Type
            </button>
          ) : (
            <button
              style={{ margin: "10px" }}
              className="btn btn-primary"
              onClick={() => {
                this.setState({ addVal: "heel_type", showForm: true });
              }}
            >
              Add Heel Type
            </button>
          )}
          {this.state.addVal == "pumpy_heel" ? (
            <button
              style={{ margin: "10px" }}
              className="btn btn-dark"
              onClick={() =>
                this.setState({
                  addVal: "",
                  showForm: false,
                  data: "",
                  emptyErrbool: false,
                  existErrBool: false,
                })
              }
            >
              Add Pumpy Heel
            </button>
          ) : (
            <button
              style={{ margin: "10px" }}
              className="btn btn-primary"
              onClick={() => {
                this.setState({ addVal: "pumpy_heel", showForm: true });
              }}
            >
              Add Pumpy Heel
            </button>
          )}
        </div>
        {this.state.showForm ? (
          <div>
            <input
              style={{ width: "20%", marginBottom: "10px" }}
              placeholder="Enter details to add..."
              type="text"
              value={this.state.data}
              onChange={(e) => {
                //console.log(this.state.addVal)
                let a = e.target.value;
                let z = a.toUpperCase();
                this.setState({ data: z });
              }}
            />
            <br />
            {this.state.existErrBool ? (
              <div style={{ color: "red" }}>{this.state.existErrReason}</div>
            ) : (
              ""
            )}
            {this.state.nilErrBool ? (
              <div style={{ color: "red" }}>{this.state.nilErrReason}</div>
            ) : (
              ""
            )}
            {this.state.emptyErrbool ? (
              <div style={{ color: "red" }}>{this.state.emptyErrReason}</div>
            ) : (
              ""
            )}
            <button
              className="btn-dark btn-xs"
              onClick={() => {
                //console.log("check",this.state.addVal)
                if (this.state.data == "") {
                  this.setState({ emptyErrbool: true });
                } else if (this.state.data == "NIL") {
                  this.setState({ nilErrBool: true });
                } else if (
                  this.state.addVal == "prod_type" &&
                  this.state.prod_typearr.includes(this.state.data) == true
                ) {
                  this.setState({ existErrBool: true });
                } else if (
                  this.state.addVal == "prod_color" &&
                  this.state.prod_clrarr.includes(this.state.data) == true
                ) {
                  this.setState({ existErrBool: true });
                } else if (
                  this.state.addVal == "banwar_color" &&
                  this.state.banwar_clrarr.includes(this.state.data) == true
                ) {
                  this.setState({ existErrBool: true });
                } else if (
                  this.state.addVal == "banwar_type" &&
                  this.state.banwar_typearr.includes(this.state.data) == true
                ) {
                  this.setState({ existErrBool: true });
                } else if (
                  this.state.addVal == "sole_type" &&
                  this.state.sole_typearr.includes(this.state.data) == true
                ) {
                  this.setState({ existErrBool: true });
                } else if (
                  this.state.addVal == "heel_color" &&
                  this.state.heel_clrarr.includes(this.state.data) == true
                ) {
                  this.setState({ existErrBool: true });
                } else if (
                  this.state.addVal == "heel_type" &&
                  this.state.heel_typearr.includes(this.state.data) == true
                ) {
                  this.setState({ existErrBool: true });
                } else if (
                  this.state.addVal == "pumpy_heel" &&
                  this.state.pumpy_heelarr.includes(this.state.data) == true
                ) {
                  this.setState({ existErrBool: true });
                } else {
                  //console.log("check",this.state.addVal)

                  this.onAdd();
                }
              }}
            >
              ADD
            </button>
          </div>
        ) : (
          ""
        )}
        <Container style={{ marginBottom: "30px" }}>
          <Row>
            <Col>
              <div>
                <h2>Product Type</h2>
              </div>
              <div>{this.getData(this.state.prod_typearr, "prod_type")}</div>
            </Col>
            <Col>
              <div>
                <h2>Product Color</h2>
              </div>
              <div>{this.getData(this.state.prod_clrarr, "prod_color")}</div>
            </Col>
            <Col>
              <div>
                <h2>Banwar Type</h2>
              </div>
              <div>
                {this.getData(this.state.banwar_typearr, "banwar_type")}
              </div>
            </Col>
            <Col>
              <div>
                <h2>Banwar Color</h2>
              </div>
              <div>
                {this.getData(this.state.banwar_clrarr, "banwar_color")}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <h2>Sole Type</h2>
              </div>
              <div>{this.getData(this.state.sole_typearr, "sole_type")}</div>
            </Col>
            <Col>
              <div>
                <h2>Heel Color</h2>
              </div>
              <div>{this.getData(this.state.heel_clrarr, "heel_color")}</div>
            </Col>
            <Col>
              <div>
                <h2>Heel Type</h2>
              </div>
              <div>{this.getData(this.state.heel_typearr, "heel_type")}</div>
            </Col>
            <Col>
              <div>
                <h2>Pumpy Heel</h2>
              </div>
              <div>{this.getData(this.state.pumpy_heelarr, "pumpy_heel")}</div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state,
});
const mapDispatchToProps = (dispatch) => ({
  //new_data: (e) => dispatch(new_data(e)),
  //    facebook_login: () =>dispatch(facebook_login())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProductDtl);
