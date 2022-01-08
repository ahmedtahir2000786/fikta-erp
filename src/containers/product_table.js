import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/table.css";
import axios from "axios";
import { new_data } from "../store/action";
import { Tab, Tabs } from "react-bootstrap";
import { Button, Modal } from "react-bootstrap";
import fb from "../config/firebase";

class MyVerticallyCenteredModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reason: "",
      reasonErr: "",
    };
  }
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Do you still want to delete {this.props.deleteProduct.name}?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            className="btn-danger"
            onClick={() => {
              //console.log("yes!! Delete")
              this.props.d(this.props.deleteProduct);
              this.props.onHide();
            }}
          >
            Delete
          </Button>
          <Button
            className="btn-primary"
            onClick={() => {
              this.props.onHide();
            }}
          >
            Close
          </Button>
          {/* onClick={this.props.onHide} */}
        </Modal.Footer>
      </Modal>
    );
  }
}

class Products extends Component {
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
    this.s_num = 0;
    this.prev_v = "";
    this.state = {
      render1: false,
      neworders: [],
      modalShow: false,
      s: 0,
      i: 0,
      del_reason: "",
      showDate: "",
      deleteProduct: "",
      prod_type: [],
    };

    this.del = "";
    this.list = [];
  }
  componentDidMount = () => {
    //this.setState({selectedDate:date})
    axios
      .get("https://meatncuts.com.pk/phpfiles/api/view_prods.php")
      .then((response) => {
        this.setState({ neworders: response.data });
      })
      .catch((err) => console.log("Error", err));
    axios
      .get("https://meatncuts.com.pk/phpfiles/api/view_prod_dtl.php")
      .then((res) => {
        //console.log(res.data)
        res.data.map((v, i) => {
          if (v.type == "prod_type") {
            this.state.prod_type[this.state.prod_type.length] = v.data;
          }
        });
        this.setState({ prod_type: this.state.prod_type });
      });
  };
  returnTableHeadings = (e) => {
    //console.log("E", e)

    return (
      <tr style={{ textTransform: "upperCase" }}>
        <th>S.No</th>
        <th>Image</th>
        <th>Name</th>
        <th>Color</th>
        <th>Sole Type</th>
        <th>Banwar Type</th>
        <th>Banwar Color</th>
        <th>Heel Type</th>
        <th>Heel Color</th>
        <th>Pumpy Heel</th>
      </tr>
    );
  };
  updateDelete = (e) => {
    let lst = [];
    e.pic_url.map((v, i) => {
      let x = v.split("/");
      lst.push(x[x.length - 1]);
    });
    axios
      .post(
        "https://meatncuts.com.pk/phpfiles/api/delete_product.php?name=" +
          e.name,
        lst
      )
      .then(
        this.setState({
          render1: true,
        })
      )
      .catch();
  };

  selectedData = (i, k, keyName, v) => {
    console.log("New Orders", this.state.neworders);

    if (keyName == "pic_url") {
      return (
        <td key={i}>
          <img
            style={{ width: "50px" }}
            src={this.state.neworders[k][keyName][v]}
          />
        </td>
      );
    } else {
      if (keyName == "name") {
        if (v == 0) {
          return <td key={i}>{this.state.neworders[k][keyName]}</td>;
        } else {
          return <td key={i}>-</td>;
        }
      } else if (keyName != "type") {
        return <td key={i}>{this.state.neworders[k][keyName][v]}</td>;
      }
    }
  };

  row = (k, v) => {
    let list = [];
    if (this.state.neworders[k]["type"] == v) {
      if (this.prev_v != v) {
        this.prev_v = v;
        this.s_num = 1;
      } else {
        this.s_num = this.s_num + 1;
      }
      this.state.neworders[k].color.map((m, n) => {
        list.push(
          <tr key={k}>
            {n == 0 ? <td>{this.s_num}</td> : <td>-</td>}
            {Object.keys(this.state.neworders[k]).map((keyName, i) => {
              return this.selectedData(i, k, keyName, n);
            })}
            {n == 0 ? (
              <td>
                <button
                  onClick={() => {
                    this.setState({
                      modalShow: true,
                      deleteProduct: this.state.neworders[k],
                    });
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            ) : (
              ""
            )}
          </tr>
        );
      });
      return list;
    }
  };
  showTabs = () => {
    return (
      <div style={{ textAlign: "center", margin: "auto" }}>
        <Tabs
          className="myClass"
          defaultActiveKey={this.state.prod_type[0]}
          className="mb-3"
        >
          {this.state.prod_type.map((v, i) => {
            return (
              <Tab eventKey={v} title={v}>
                <div>
                  <h2>{v}</h2>
                  <div className="table-wrapper">
                    <table className="fl-table">
                      <thead>{this.returnTableHeadings(v)}</thead>
                      <tbody>
                        {this.state.neworders.map((j, k) => {
                          return this.row(k, v);
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Tab>
            );
          })}
        </Tabs>
      </div>
    );
  };
  getButton = () => {};
  render() {
    if (this.state.render1 == true) {
      console.log("I am here");
      axios
        .get("https://meatncuts.com.pk/phpfiles/api/view_prods.php")
        .then((response) => {
          this.setState({ neworders: response.data, render1: false });
        })
        .catch((err) => console.log("Error", err));
    }
    return (
      <div>
        <div style={{ marginTop: "25px" }}>
          <button
            className="btn btn-dark"
            onClick={() => this.props.history.push("/data")}
            style={{ position: "absolute", right: 25 }}
          >
            Back to Dashboard
          </button>
        </div>

        <div>{this.showTabs()}</div>
        <MyVerticallyCenteredModal
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
          deleteProduct={this.state.deleteProduct}
          d={(e) => {
            this.updateDelete(e);
          }}
        />
      </div>
    );
  }
}
// this.setState({del_reason:e})
const mapStateToProps = (state) => ({
  state: state,
});
const mapDispatchToProps = (dispatch) => ({
  new_data: (e) => dispatch(new_data(e)),
  //    facebook_login: () =>dispatch(facebook_login())
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
