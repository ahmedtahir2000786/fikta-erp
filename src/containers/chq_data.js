import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/table.css";
import axios from "axios";
import { new_data } from "../store/action";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import fb from "../config/firebase";
import { Modal, Button } from "react-bootstrap";
class Resolved extends Component {
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
        backdrop="static" 
        keyboard = {false}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Resolved Issue of {this.props.cn}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <em>You won't be able to change again!</em>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-danger"
            onClick={() => {
              this.props.resolve_func();
            }}
          >
            Resolved
          </Button>
          <Button
            className="btn-primary"
            onClick={() => {
              //console.log(this.props)
              this.props.onHide();
            }}
          >
            Cancel
          </Button>
          {/* onClick={this.props.onHide} */}
        </Modal.Footer>
      </Modal>
    );
  }
}

class ChequeData extends Component {
  constructor(props) {
    super(props);
    const firebase = fb.firebase_;
    let prop = this.props;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // console.log(user)
      } else {
        prop.history.push("");
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
      fromDate: "",
      showDate: "",
      toDate: date,
      chqNames: [],
      getChqName: "all",
      url: "",
      name: "",
      prod_type: "",
      sole_type: "",
      b_type: "",
      b_color: "",
      h_type: "",
      h_color: "",
      pumpy_heel: "",
      color: [],
      data: {},
      showData: false,
      getCat: "all",
      response: [],
      resolveCnfm: false,
      consignmentRes: 0,
      statusRes: "",
      rerender: false,
    };
    this.key = 0;
    this.url = "";
    this.cat = ["neworder", "replacement", "return"];
  }

  componentDidMount = () => {
    axios
      .get("https://meatncuts.com.pk/phpfiles/api/viewchq.php")
      .then((response) => {
        this.setState({ chqNames: response.data });
      })
      .catch((err) => console.log("Error", err));
  };
  getChqNames = () => {
    let list = [];
    list.push(<option value="all">All</option>);
    this.state.chqNames.map((v, i) => {
      list.push(<option value={v}>{v}</option>);
    });
    return list;
  };

  getCat = () => {
    let list = [];
    list.push(<option value="all">All</option>);
    this.cat.map((v, i) => {
      list.push(<option value={v}>{v}</option>);
    });
    return list;
  };

  updateDatabase = () => {
    this.state.response.map((v, i) => {
      console.log(typeof v.status_reason);
      let s = parseInt(v.sno);
      axios
        .post(
          "https://meatncuts.com.pk/phpfiles/api/update_chq.php?sno=" + s,
          v.status_reason
        )
        .then((res) => {
          //this.setState({response:res.data})
        })
        .catch((err) => console.log(err));
    });
  };

  resolve = (status, cn_got_payment) => {
    console.log("Sgtatus", status);
    if (status == "amount_issue") {
      axios
        .get(
          "https://meatncuts.com.pk/phpfiles/api/update_payment.php?cn=" +
            parseInt(cn_got_payment) +
            " &cnd=getdate"
        )
        .then((res) => {
          axios
            .get(
              "https://meatncuts.com.pk/phpfiles/api/update_payment.php?cn=" +
                parseInt(cn_got_payment) +
                "&cnd=updatepayment&date=" +
                res.data
            )
            .then((res) => {
              this.setState({ rerender: true });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(
          "https://meatncuts.com.pk/phpfiles/api/update_payment.php?cn=" +
            parseInt(cn_got_payment) +
            "&cnd=onlyresolve"
        )
        .then((res) => {
          this.setState({ rerender: true });
        })
        .catch((err) => console.log(err));
    }
  };
  showTableData = () => {
    //console.log("Data",this.state.data[k])
    let list = [];

    this.state.response.map((v, i) => {
      //console.log(v.consignmentnum);
      if (v.resolved != 1) {
        list.push(
          <tr>
            <td>{v.consignmentnum}</td>
            <td>{v.status}</td>
            <td>
              <textarea
                style={{ width: "80%" }}
                value={v.status_reason}
                onChange={(e) => {
                  v.status_reason = e.target.value;
                  this.setState({ response: this.state.response });
                }}
              />
            </td>
            <td>
              <button
                className="btn btn-primary"
                onClick={() =>
                  this.setState({
                    resolveCnfm: true,
                    consignmentRes: parseInt(v.consignmentnum),
                    statusRes: v.status,
                  })
                }
              >
                Click if Resolved
              </button>
            </td>
          </tr>
        );
      } else {
        list.push(
          <tr style={{ background: "rgb(255, 204, 203)" }}>
            <td>{v.consignmentnum}</td>
            <td>{v.status}</td>
            <td>{v.status_reason}</td>
            <td></td>
          </tr>
        );
      }
    });
    return list;
  };

  getData = () => {
    console.log("get data again");
    axios
      .get(
        "https://meatncuts.com.pk/phpfiles/api/getchqdata.php?cat=" +
          this.state.getCat +
          "&date=" +
          this.state.toDate +
          "&fromDate=" +
          this.state.fromDate +
          "&chqname=" +
          this.state.getChqName
      )
      .then((res) => {
        console.log("resolved");
        this.setState({ response: res.data });
      })
      .catch((err) => console.log(err));
  };

  render() {
    if (this.state.rerender == true) {
      this.getData();
      this.setState({ rerender: false });
    }
    return (
      <div style={{ textAlign: "center", margin: "auto" }}>
        <div style={{ marginTop: "25px" }}>
          <button
            className="btn btn-dark"
            onClick={() => this.props.history.push("/data")}
            style={{ position: "absolute", right: 25, width: "20%" }}
          >
            Back to Dashboard
          </button>
        </div>
        <div
          style={{
            textAlign: "center",
            margin: "auto",
            display: "inline-block",
          }}
        >
          <label style={{ color: "white" }}>From: </label>
          <input
            type="date"
            value={this.state.fromDate}
            onChange={(e) => this.setState({ fromDate: e.target.value })}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            margin: "auto",
            marginTop: "10px",
            display: "inline-block",
          }}
        >
          <label style={{ color: "white" }}>To: </label>
          <input
            type="date"
            value={this.state.toDate}
            onChange={(e) => this.setState({ toDate: e.target.value })}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            margin: "auto",
            marginTop: "10px",
            display: "inline-block",
          }}
        >
          <label style={{ color: "white" }}>Cheque Name: </label>
          <select
            style={{ textAlign: "center", width: "100%" }}
            onChange={(e) => {
              this.setState({ getChqName: e.target.value });
            }}
          >
            {this.getChqNames()}
          </select>
        </div>
        <div
          style={{
            textAlign: "center",
            margin: "auto",
            marginTop: "10px",
            display: "inline-block",
          }}
        >
          <label style={{ color: "white" }}>Category: </label>
          <select
            style={{ textAlign: "center", width: "100%" }}
            onChange={(e) => {
              this.setState({ getCat: e.target.value });
            }}
          >
            {this.getCat()}
          </select>
        </div>
        <div
          style={{
            textAlign: "center",
            margin: "auto",
            marginTop: "10px",
            display: "inline-block",
          }}
        >
          <button
            className="btn btn-dark"
            onClick={() => {
              this.getData();
            }}
          >
            Get Details
          </button>
        </div>
        {this.state.response.length > 0 ? (
          <div className="table-wrapper">
            <h2>Status</h2>
            <table className="fl-table">
              <thead>
                <tr style={{ textTransform: "upperCase" }}>
                  <th>Consignment Number</th>
                  <th>Comment</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>{this.showTableData()}</tbody>
            </table>

            <button
              onClick={() => {
                this.updateDatabase();
              }}
              className="btn btn-dark"
              style={{ margin: "20px" }}
            >
              Update Database
            </button>
          </div>
        ) : (
          ""
        )}
        {this.state.resolveCnfm ? (
          <Resolved
            resolve_func={() => {
              this.resolve(this.state.statusRes, this.state.consignmentRes);
              this.setState({ resolveCnfm: false, rerender: true });
            }}
            show={this.state.resolveCnfm}
            onHide={() => this.setState({ resolveCnfm: false })}
            cn={this.state.consignmentRes}
          />
        ) : (
          ""
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ChequeData);
