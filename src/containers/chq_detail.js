import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/table.css";
import axios from "axios";
import { new_data } from "../store/action";
import { Link } from "react-router-dom";
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
            Do you still want to delete {this.props.deleteChq}?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            className="btn-danger"
            onClick={() => {
              //console.log("yes!! Delete")
              this.props.d(this.props.deleteChq);
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

class ChequeDetail extends Component {
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
    let date = new Date();
    date =
      date.getFullYear() +
      "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2);
    this.state = {
      addchq: false,
      newchqName: "",
      neworderchq: false,
      neworderchqAmount: 0,
      neworderchqCn: "",
      chqNames: [],
      modalShow: false,
      deleteChq: "",
      render: false,
      newchqerr: "",
      newchqerrbool: false,
    };
  }

  updateDelete = (e) => {
    axios
      .get("https://meatncuts.com.pk/phpfiles/api/delete_chq.php?name=" + e)
      .then((res) => this.setState({ render: true }))
      .catch();
  };
  componentDidMount = () => {
    axios
      .get("https://meatncuts.com.pk/phpfiles/api/viewchq.php")
      .then((res) => {
        this.setState({ chqNames: res.data });
        console.log(this.state.chqNames);
      })
      .catch();
  };

  addChqName = () => {
    if (this.state.chqNames.includes(this.state.newchqName)) {
      this.setState({
        newchqerr: "Cheque Name already registered!",
        newchqerrbool: true,
      });
    } else {
      axios
        .post(
          "https://meatncuts.com.pk/phpfiles/api/add_chq.php",
          this.state.newchqName
        )
        .then((res) => {
          this.setState({ newchqName: "" });
          axios
            .get("https://meatncuts.com.pk/phpfiles/api/viewchq.php")
            .then((res) => {
              this.setState({ chqNames: res.data, newchqerrbool: false });
            })
            .catch();
        })
        .catch();
    }
  };
  getChqName = () => {
    let list = [];
    this.state.chqNames.map((v, i) => {
      list.push(
        <tr key={i}>
          <td>{v}</td>
          <td>
            <button
              onClick={() => {
                this.setState({ modalShow: true, deleteChq: v });
              }}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });

    return list;
  };
  render() {
    if (this.state.render == true) {
      axios
        .get("https://meatncuts.com.pk/phpfiles/api/viewchq.php")
        .then((res) => {
          this.setState({ chqNames: res.data, render: false });
        })
        .catch();
    }
    return (
      <div style={{ textAlign: "center", margin: "auto" }}>
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
        <button
          className="btn btn-dark"
          style={{ margin: "10px" }}
          onClick={(e) => {
            this.setState({ addchq: true });
          }}
        >
          Create Cheque
        </button>

        {this.state.addchq ? (
          <div>
            <input
              style={{ width: "10%", marginBottom: "10px" }}
              type="text"
              required
              value={this.state.newchqName}
              onChange={(e) => {
                let a = e.target.value;
                let z = a.toUpperCase();
                this.setState({ newchqName: z });
              }}
            />
            <br />
            <button
              className="btn-dark btn-xs"
              onClick={() => this.addChqName()}
            >
              ADD
            </button>
          </div>
        ) : (
          ""
        )}
        {this.state.newchqerrbool ? (
          <div style={{ color: "white" }}>{this.state.newchqerr}</div>
        ) : (
          ""
        )}
        <div className="table-wrapper">
          <h2>Registered Cheque Name</h2>
          <table className="fl-table">
            <thead>
              <tr style={{ textTransform: "upperCase" }}>
                <th>Cheque Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{this.getChqName()}</tbody>
          </table>
        </div>
        <MyVerticallyCenteredModal
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
          deleteChq={this.state.deleteChq}
          d={(e) => {
            this.updateDelete(e);
          }}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(ChequeDetail);
