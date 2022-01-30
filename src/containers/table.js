import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/table.css";
import axios from "axios";
import { new_data } from "../store/action";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import moment from "moment";
import fb from "../config/firebase";
import { Container, Row, Col } from "react-bootstrap";
import { renderIntoDocument } from "react-dom/test-utils";

class Ticket extends Component {
  constructor(props) {
    super(props);
  }

  getProductDetails = (ind) => {
    return (
      <div>
        <div>
          <strong>Product:</strong> {this.props.i.design_name[ind]}{" "}
        </div>
        <div>
          <span style={{ marginLeft: "10px" }}>
            <strong>Color:</strong> {this.props.i.color[ind]}{" "}
          </span>{" "}
          <span>
            <strong>Size:</strong> {this.props.i.size[ind]}{" "}
          </span>
        </div>
      </div>
    );
  };
  render() {
    //console.log(this.props.i);

    return (
      <Modal {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static" 
        keyboard = {false}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirmation Message
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <strong>Name:</strong> {this.props.i.name}
            </div>
            <div>
              <strong>Cust_ID:</strong> {this.props.i.cust_id}
            </div>
            <div>
              <strong>Consignment Number:</strong> {this.props.i.consignmentnum}
            </div>
            <div>
              <strong>Address:</strong> {this.props.i.address}
            </div>
            <div>
              <strong>City:</strong>{this.props.i.city}
            </div>
            <div>
              <strong>Contact no:</strong> {this.props.i.phone}
            </div>
            {this.props.i.design_name.map((v, i) => {
              return this.getProductDetails(i);
            })}
            <br />
            <div style={{ borderTop: "1px solid", borderBottom: "1px solid" }}>
              <strong>Total Amount:</strong> {this.props.i.amount}{" "}
            </div>
            <br />
            <div>
              <strong>Remarks:</strong>
              <div>
                <div>
                  We Are Own Manufacturers And Provide Best Quality To The
                  Customers So Due To This You Will Get Your Parcel In 10 To 15
                  Working Days Inshallah
                </div>
                <div style={{ marginTop: "10px" }}>
                  <strong>Thanks for connecting FIKRA</strong>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-primary"
            onClick={() => {
              //console.log(this.props)
              //this.setState({reason:""})
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
class ViewLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      status_reason: "",
      reasonarr: [],
      updateButton: false,
      updateSingle: [],
      input:[],
    };

    
  }
  componentDidMount = () => {
    axios
      .get(
        "https://meatncuts.com.pk/phpfiles/api/viewlog.php?id=" + this.props.id
      )
      .then((response) => {
        //console.log("Log Response: ", response.data);
        let reasonArr = [];
        response.data[0]["status_date"].map((v, i) => {
          reasonArr[i] = v.reason;
          this.state.updateSingle[i] = false;
          this.state.input.push("")
          let length_of_array = response.data[0]["status_date"][i]["updated"].length
          if(length_of_array == 0){
            this.state.input[i] =reasonArr[i];
          }else{
            this.state.input[i] =  response.data[0]["status_date"][i]["updated"][length_of_array-1]["upd_rsn"]
          }
        });

        this.setState({
          data: response.data,
          reasonarr: reasonArr,
          updateSingle: this.state.updateSingle,
          input: this.state.input
        });

        //console.log("Check",response.data)
      })
      .catch((err) => console.log("Error", err));
  };

  updateonebyone = (i) => {
    let date_create = moment().format("YYYY-MM-DD HH:mm:ss");
    let lst = this.state.data[0]["status_date"][i]["updated"];
    lst.push({ upd_date: date_create, upd_rsn: this.state.input[i] });
    //console.log("this.state.input[i]: ", this.state.input[i])
    //console.log("Status Data", this.state.data[0]["status_date"][i], "i", i);
    // this.state.data[0]["status_date"].map((v, i) => {
    //   v.reason = this.state.reasonarr[i];
    // });

    axios
      .post(
        "https://meatncuts.com.pk/phpfiles/api/update_comments.php?id=" +
          this.props.id +
          "&idx=" +
          i+"&lts_rsn=" +
          this.state.input[i],
        this.state.data[0]["status_date"]
      )
      .then((res) => {
        this.state.updateSingle[i] = false;
        this.setState({
          updateButton: false,
          updateSingle: this.state.updateSingle,
        });
      })
      .catch((err) => console.log(err));
  };
  updateCominDB = () => {
    // this.state.data[0]["status_date"].map((v, i) => {
    //   v.reason = this.state.reasonarr[i];
    // });

    axios
      .post(
        "https://meatncuts.com.pk/phpfiles/api/update_comments.php?id=" +
          this.props.id,
        this.state.data[0]["status_date"]
      )
      .then((res) => {
        this.setState({ updateButton: false });
      })
      .catch((err) => console.log(err));
  };
  updateComment = (e, i, cnd) => {
    //console.log("E: ", e)
    e = e.replace(/[^0-9a-zA-Z\s]*/g, "");
    this.state.input[i] = e;
  
    this.state.updateSingle[i] = true;
    this.setState({
      reasonarr: this.state.reasonarr,
      input:this.state.input,
      updateSingle: this.state.updateSingle,
      
    });
  };

  getUpdated = (i, v) => {
    let list = [];
    //console.log(v);

    v.updated.map((k, m) => {
      list.push(
        <div>
          <strong>Last Updated: </strong>
          {k.upd_date}
        </div>
      );
      list.push(
        <div>
          <strong>Comment: </strong>
          {k.upd_rsn}
        </div>
      );
    });
    return list;
  };

  getLog = () => {
    //console.log(this.state.data[0]["status_date"])
    let list = [];
    let len_data = this.state.data[0]["status_date"].length;
    this.state.data[0]["status_date"].map((v, i) => {
      let length_of_array = this.state.data[0]["status_date"][i]["updated"].length
      list.push(
        <div>
          <Container>
            <Row>
              <Col>
                <div
                  style={{
                    background: "blue",
                    color: "white",
                    padding: "10px",
                  }}
                >
                  {v.st}
                </div>
                <div>
                  <strong>On: </strong>
                  {v.date}
                </div>
                <div>
                  <strong>Comment: </strong>
                  {v.reason}
                </div>
               
                {this.getUpdated(i, v)}
              </Col>
              
              {len_data == i+1?<Col style={{ textAlign: "center" }}>
                <div>
                <strong>Comment: </strong>
                 
                
                  <input
                    style={{ width: "80%" }}
                    value={this.state.input[i]}
                    onChange={(e) => {
                      //console.log(e.target.value)
                      let cnd = false
                      this.updateComment(e.target.value, i, cnd)
                    }}
                  />
                 
                  <div>
                    <em style={{ fontSize: "12px" }}>
                      Note: Special character such as " or ' are not allowed.
                    </em>
                  </div>
                </div>
                {this.state.updateSingle[i] == true ? (
                  <button
                    className="btn-xs btn-primary"
                    onClick={() => {
                      this.updateonebyone(i);
                    }}
                  >
                    Update
                  </button>
                ) : (
                  ""
                )}
              </Col>:""}
              
            </Row>
          </Container>
        </div>
      );
    });
    return list;
  };

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
            Log of Order: {this.props.s}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{this.state.data.length > 0 ? this.getLog() : ""}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-danger"
            onClick={() => {
              //console.log(this.props)
              //this.setState({reason:""})
              this.props.render_data(true)
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
class Delete extends Component {
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
            Delete Data of S.No {this.props.s}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Reason:</h4>
          <p>
            <input
              required
              placeholder="Share any reason!"
              style={{ width: "100%" }}
              onChange={(e) => this.setState({ reason: e.target.value })}
              value={this.state.reason}
            />
            <span style={{ color: "red", fontSize: "10px" }}>
              {this.state.reasonErr}
            </span>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-danger"
            onClick={() => {
              if (this.state.reason != "") {
                this.props.sendReason(this.state.reason);
                this.setState({ reason: "" });
                this.props.onHide();
              } else {
                this.setState({ reasonErr: "Reason is compulsory" });
              }
            }}
          >
            Delete
          </Button>
          <Button
            className="btn-primary"
            onClick={() => {
              //console.log(this.props)
              this.setState({ reason: "" });
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

class StatusReason extends Component {
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
            <div>
              Change status from {this.props.fromsts} to {this.props.tosts}{" "}
            </div>
            <div>
              <strong>Consignment Num:</strong>
              {this.props.cnsg}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Reason:</h4>
          <p>
            <input
              required
              placeholder="Share any reason!"
              style={{ width: "100%" }}
              onChange={(e) => {
                let cleaned_val = e.target.value.replace(/[^0-9a-zA-Z\s]*/g, "");
                this.setState({ reason: cleaned_val })}}
              value={this.state.reason}
            />
            <span style={{ color: "red", fontSize: "10px" }}>
              {this.state.reasonErr}
            </span>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-danger"
            onClick={() => {
              if (this.state.reason != "") {
                this.props.sendstsReason(this.state.reason);
                this.setState({ reason: "" });
                this.props.onHide();
              } else {
                this.setState({ reasonErr: "Reason is compulsory" });
              }
            }}
          >
            Submit
          </Button>
          <Button
            className="btn-primary"
            onClick={() => {
              //console.log(this.props)
              this.setState({ reason: "" });
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

class Table extends Component {
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
    this.s_num = 0;
    let date = new Date();
    date =
      date.getFullYear() +
      "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2);
    this.state = {
      render1: false,
      fromDate: date,
      neworders: [],
      modalShow: false,
      logShow: false,
      s: 0,
      i: 0,
      del_reason: "",
      time: Date.now(),
      showDate: "",
      selectedDate: date,
      d: "",
      id: 0,
      showTicket: false,
      statuslist: [
        "Booked",
        "Temporary",
        "Call Pending",
        "Supply Pending",
        "Order Cancel",
        "In Transit",
        "Out for Delivery",
        "Dispatched",
        "Return",
        "Delivered",
        "Deleted",
      ],
      prevstslist: [
        "Booked",
        "Temporary",
        "Call Pending",
        "Supply Pending",
        "Order Cancel",
        "In Transit",
        "Out for Delivery",
        "Dispatched",
        "Return",
        "Delivered",
        "Deleted",
      ],
      statusselected: "all",
      catlist: ["neworder", "replacement"],
      paymentlist: ["Payment Not Rcvd", "Payment Rcvd"],
      paymentselected: 2,
      catselected: "all",
      prevcatselected: "all",
      prevselectedpayment:2,
      changeStatusfrom: "",
      changeStatusTo: "",
      askReasonforStatusChange: false,
      stsChangeReason: "",
      checkSts: [true, true, true, true, true, true, true,true, true, true, true],
      checkedlist: [
        "Booked",
        "Temporary",
        "Call Pending",
        "Supply Pending",
        "Order Cancel",
        "In Transit",
        "Out for Delivery",
        "Dispatched",
        "Return",
        "Delivered",
        "Deleted",
      ],
      prevfromDate: date,
      prevselectedDate: date,
      render0: false,
    };
    this.prevcheckedlist = [
      "Booked",
        "Temporary",
        "Call Pending",
        "Supply Pending",
        "Order Cancel",
        "In Transit",
        "Out for Delivery",
        "Dispatched",
        "Return",
        "Delivered",
        "Deleted",
    ];
  }

  updateDelete = (k, e, date) => {
    axios
      .post(
        "https://meatncuts.com.pk/phpfiles/api/delete.php?id=" +
          this.state.neworders[k]["ord_id"] +
          "&reason=" +
          e +
          "&date=" +
          this.state.neworders[k]["date"],
        true
      )
      .then(
        this.setState({
          render0: true,
        })
      )
      .catch();
  };

  updateCommentsIndatabase = (z) => {
    //console.log("Z in ", z);
    // axios
    //   .get(
    //     "https://meatncuts.com.pk/phpfiles/api/edit_status.php?id=" +
    //       this.state.neworders[k]["ord_id"] +
    //       "&status=" +
    //       this.state.changeStatusTo +
    //       "&date=" +
    //       this.state.neworders[k]["date"] +
    //       "&statusReason=" +
    //       e
    //   )
    //   .then((res) => {
    //     this.setState({ render1: true });
    //   })
    //   .catch((err) => console.log(err));
  };

  getTimeDifference = (sys_date, sql_date) => {
    var now = moment(sys_date);
    var then = moment(sql_date);
    var ms = moment(now, "YYYY-MM-DD HH:mm:ss").diff(
      moment(then, "YYYY-MM-DD HH:mm:ss")
    );
    let hr = Math.floor(ms / 3600000);
    let mins = Math.floor((ms - hr * 3600000) / 60000);
    let sec = Math.floor((ms - hr * 3600000 - mins * 60000) / 1000);
    let str = "";
    if (hr <= 47 && mins <= 59) {
      let rem_hr = Math.floor(48 - ms / 3600000);
      let rem_mins = Math.floor((48 - ms / 3600000 - rem_hr) * 60);
      let rem_sec = Math.floor(
        ((48 - ms / 3600000 - rem_hr) * 60 - rem_mins) * 60
      );
      if (rem_hr < 0) {
        str = "";
      } else {
        if (rem_mins != 0) {
          str = "rem: " + rem_hr + " hr " + rem_mins + " mins ";
        } else {
          str = "";
        }
      }
    } else {
      str = "";
    }
    return str;
  };

  getStatus = (k, prop) => {
    if (prop == "download") {
      return this.state.neworders[k]["status"];
    }
    let list = [];
    this.state.statuslist.map((status_val, status_key)=>{
      if(status_val != "Deleted"){
        if(status_val == this.state.neworders[k]["status"]){
          list.push(<option selected value={status_val}>{status_val}</option>)
        }else{
          list.push(<option value={status_val}>{status_val}</option>)
        }
      }
    })
    // if (this.state.neworders[k]["status"] == "Booked") {
    //   list.push(
    //     <option selected value="Booked">
    //       Booked
    //     </option>
    //   );
    //   list.push(<option value="In Process">In Process</option>);
    //   list.push(<option value="Dispatched">Dispatched</option>);
    //   list.push(<option value="Return">Return</option>);
    //   list.push(<option value="Delivered">Delivered</option>);
    // } else if (this.state.neworders[k]["status"] == "In Process") {
    //   list.push(<option value="Booked">Booked</option>);
    //   list.push(
    //     <option selected value="In Process">
    //       In Process
    //     </option>
    //   );
    //   list.push(<option value="Dispatched">Dispatched</option>);
    //   list.push(<option value="Return">Return</option>);
    //   list.push(<option value="Delivered">Delivered</option>);
    // } else if (this.state.neworders[k]["status"] == "Dispatched") {
    //   list.push(<option value="Booked">Booked</option>);
    //   list.push(<option value="In Process">In Process</option>);
    //   list.push(
    //     <option selected value="Dispatched">
    //       Dispatched
    //     </option>
    //   );
    //   list.push(<option value="Return">Return</option>);
    //   list.push(<option value="Delivered">Delivered</option>);
    // } else if (this.state.neworders[k]["status"] == "Return") {
    //   list.push(<option value="Booked">Booked</option>);
    //   list.push(<option value="In Process">In Process</option>);
    //   list.push(<option value="Dispatched">Dispatched</option>);
    //   list.push(
    //     <option selected value="Return">
    //       Return
    //     </option>
    //   );
    //   list.push(<option value="Delivered">Delivered</option>);
    // } else if (this.state.neworders[k]["status"] == "Delivered") {
    //   list.push(<option value="Booked">Booked</option>);
    //   list.push(<option value="In Process">In Process</option>);
    //   list.push(<option value="Dispatched">Dispatched</option>);
    //   list.push(<option value="Return">Return</option>);
    //   list.push(
    //     <option selected value="Delivered">
    //       Delivered
    //     </option>
    //   );
    // }

    return list;
  };

  changeStatus = (e, k) => {
    console.log(this.state.neworders[k]['date'], e)

    axios
      .get(
        "https://meatncuts.com.pk/phpfiles/api/edit_status.php?id=" +
          this.state.neworders[k]["ord_id"] +
          "&status=" +
          this.state.changeStatusTo +
          "&date=" +
          this.state.neworders[k]["date"] +
          "&statusReason=" +
          e
      )
      .then((res) => {
        this.setState({ render0: true, render1:true });
      })
      .catch((err) => console.log(err));
  };
  selectedData = (i, k, keyName, prop) => {
    if (i == 0) {
      return <td key={i}>{this.state.neworders[k]["only_date"]}</td>;
    } else {
      let temp = "";
      if (keyName == "color" || keyName == "size" || keyName == "design_name") {
        let arr = this.state.neworders[k][keyName];
        //let n =arr.length
        if (arr != null) {
          let x = this.state.neworders[k][keyName][0];
          if (arr.length > 1) {
            //console.log("keyName", keyName, k)
            for (let index = 1; index < arr.length; index++) {
              x = x + ", " + this.state.neworders[k][keyName][index];
            }
          }
          temp = x;
          //console.log("Arr", arr.length, keyName)
        } else {
          if (arr != null) {
            temp = this.state.neworders[k][keyName][0];
          }
        }
        return <td key={i}>{temp}</td>;
      }
      if (
        keyName == "status" &&
        this.state.neworders[k]["status"] != "Deleted"
      ) {
        return (
          <div style={{ marginTop: "20px" }}>
            {prop == "view" ? (
              <select
             
                onChange={(e) => {
                  this.setState({
                    changeStatusfrom: this.state.neworders[k]["status"],
                    changeStatusTo: e.target.value,
                    askReasonforStatusChange: true,
                    changeStatusData: k,
                  });
                  //console.log(this.state.stsChangeReason)
                }}
                className="status-select"
          
              >
                {this.getStatus(k, prop)}
              </select>
            ) : (
              <td>{this.state.neworders[k]["status"]}</td>
            )}
          </div>
        );
      } else if (
        keyName == "status" &&
        this.state.neworders[k]["status"] == "Deleted"
      ) {
        return <td key={i}>{this.state.neworders[k][keyName]}</td>;
      }
      if (
        keyName == "reason" &&
        this.state.neworders[k]["status"] == "Deleted"
      ) {
        return <td key={i}>{this.state.neworders[k][keyName]}</td>;
      }
      if (keyName == "paymentrcvd") {
        if (this.state.neworders[k]["paymentrcvd"] != 1) {
          return (
            <td key={i}>
              <strong>Not</strong> Received
            </td>
          );
        } else {
          return <td key={i}>Received</td>;
        }
      }
      if (
        keyName != "ord_id" &&
        keyName != "city" &&
        keyName != "delete_ord" &&
        keyName != "date" &&
        keyName != "only_time" &&
        keyName != "only_date" &&
        keyName != "status" 
      ) {
        return <td key={i}>{this.state.neworders[k][keyName]}</td>;
      }
    }
  };

  getEdit = (e) => {
    let date = new Date();
    date =
      date.getFullYear() +
      "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2) +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);
    let time = this.getTimeDifference(date, e["date"]);
    if (time != "") {
      return (
        <Link to={"/edit/" + e["ord_id"]}>
          <button className="btn-dark btn-xs" style={{display:"none"}}>Edit</button>
        </Link>
      );
    } else {
      return (
        <button className="btn btn-dark" disabled style={{display:"none"}}>
          Edit
        </button>
      );
    }
  };
  removeEle = (e) => {
    var arr = this.state.checkedlist;

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === e) {
        arr.splice(i, 1);
      }
    }
    this.setState({ checkedlist: arr });
  };
  row = (k, prop) => {
    let date = new Date();
    date =
      date.getFullYear() +
      "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2) +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);
    if (this.state.neworders[k]["delete_ord"] == "1") {
      return (
        <tr style={{ background: "#ffcccb" }} key={k}>
          <td>-</td>
          {Object.keys(this.state.neworders[k]).map((keyName, i) => {
            return this.selectedData(i, k, keyName, prop);
          })}
          <td></td>
        </tr>
      );
    } else {
      this.s_num = this.s_num + 1;
      let x = this.s_num;
      return (
        <tr key={k}>
          <td>{this.s_num}</td>
          {Object.keys(this.state.neworders[k]).map((keyName, i) => {
            return this.selectedData(i, k, keyName, prop);
          })}
          {prop == "view" ? (
            <td>
                  <button
                className="btn-dark btn-xs"
                style={{ marginBottom: "15px" }}
                onClick={() => {
                  this.setState({ showTicket: true, i: k });
                  //this.setState({logShow:true, s:x, id:this.state.neworders[k]['ord_id']})
                }}
              >
                Get Ticket
              </button>
              <br />
              <button
                className="btn-primary btn-xs"
             
                onClick={() => {
                  this.setState({
                    logShow: true,
                    s: x,
                    id: this.state.neworders[k]["ord_id"],
                  });
                }}
              >
                View Log
              </button>
              {/* <br />
              {this.getEdit(this.state.neworders[k])}
              <br />
              <span style={{display:"none"}}>
                {this.getTimeDifference(date, this.state.neworders[k]["date"])}
              </span> */}
            </td>
          ) : (
            ""
          )}

          {prop == "view" ? (
            <td>
          
            

              <button
                onClick={() => {
                  this.setState({
                    modalShow: true,
                    s: x,
                    i: k,
                    d: this.state.neworders[k]["date"],
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
    }
  };

  componentDidMount() {
    //this.setState({selectedDate:date})

    //this.interval = setInterval(() => this.setState({ render0: true }), 10000);
    axios
      .post(
        "https://meatncuts.com.pk/phpfiles/api/view_data.php?date=" +
          this.state.selectedDate +
          "&fdate=" +
          this.state.fromDate +
          "&catselected=" +
          this.state.catselected+"&paymentselected=" +
          this.state.paymentselected,
        this.state.checkedlist
      )
      .then((response) => {
        this.setState({ neworders: response.data });
        let len_data = response.data.length
        
        // if(response.data.length != 0){
        //   response.data.map((res_val,res_idx)=>{
        //     parseInt(res_val.ord_id)
        //     console.log()
        //   })
        // }
      })
      .catch((err) => console.log("Error", err));

      
  }
  componentWillUnmount() {
    //clearInterval(this.interval);
  }
  getStatusOption = () => {
    let list = [];
    list.push(
      <option selected value="all">
        All
      </option>
    );
    this.state.statuslist.map((v, i) => {
      list.push(<option value={v}>{v}</option>);
    });
    return list;
  };
  getCategoryOption = () => {
    let list = [];
    list.push(
      <option selected value="all">
        All
      </option>
    );
    this.state.catlist.map((v, i) => {
      list.push(<option value={v}>{v}</option>);
    });
    return list;
  };

  getPaymentOption = () => {
    let list = [];
    list.push(
      <option selected value={2}>
        All
      </option>
    );
    this.state.paymentlist.map((v, i) => {
      list.push(<option value={i}>{v}</option>);
    });
    return list;
  };
  getCheckboxfilter = () => {
    let list = [];
    this.state.statuslist.map((v, i) => {
      list.push(
        <div style={{ margin: "10px", display: "inline-block" }}>
          <input
            id={v}
            type="checkbox"
            checked={this.state.checkSts[i]}
            value={v}
            onChange={(e) => {
              let list = this.prevcheckedlist;

              if (this.state.checkSts[i] == true) {
                let idx = this.state.checkedlist.indexOf(e.target.value);
                this.state.checkedlist.splice(idx, 1);

                this.state.checkSts[i] = !this.state.checkSts[i];
              } else {
                this.state.checkedlist[this.state.checkedlist.length] =
                  e.target.value;
                this.state.checkSts[i] = !this.state.checkSts[i];
              }

              this.setState({ checkedlist: this.state.checkedlist });
            }}
          />
          <label for={v} style={{ color: "white" }}>
            {v}
          </label>
        </div>
      );
    });
    return list;
  };

  exportToExcel = () => {
    const uri = "data:application/vnd.ms-excel;base64,";
    const template =
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
    const base64 = function (s) {
      return window.btoa(unescape(encodeURIComponent(s)));
    };

    const format = function (s, c) {
      return s.replace(/{(\w+)}/g, function (m, p) {
        return c[p];
      });
    };

    let htmls = document.querySelector("#tbl_exporttable_to_xls").outerHTML;

    const ctx = {
      worksheet: "Worksheet",
      table: htmls,
    };

    const link = document.createElement("a");
    link.download = "fikta_data.xls";
    link.href = uri + base64(format(template, ctx));
    link.click();
  };

  gettableData = (prop) => {
    let list = [];
    this.state.neworders.map((v, k) => {
      list.push(this.row(k, prop));
    });
    return list;
  };
  render() {
    this.s_num = 0;
    if (this.state.render1 == true) {
      // console.log("Render 1 chal gya")
      axios
        .post(
          "https://meatncuts.com.pk/phpfiles/api/view_data.php?date=" +
            this.state.selectedDate +
            "&fdate=" +
            this.state.fromDate +
            "&catselected=" +
            this.state.catselected+"&paymentselected=" +
            this.state.paymentselected,
          this.state.checkedlist
        )
        .then((response) => {
          let x = [];
          this.state.checkedlist.map((v, i) => {
            x.push(v);
          });
          this.prevcheckedlist = x;
          this.setState({
            neworders: response.data,
            render1: false,
            showDate: "",
            prevcatselected: this.state.catselected,
            prevfromDate: this.state.fromDate,
            prevselectedDate: this.state.selectedDate,
            prevselectedpayment: this.state.paymentselected
          });

          //console.log("Response Data",response.data)
        })
        .catch((err) => console.log("Error", err));
    }
    if (this.state.render0 == true) {
      // console.log(
      //   this.state.prevselectedDate,
      //   this.state.prevfromDate,
      //   this.state.prevcatselected,
      //   this.prevcheckedlist
      // );

      axios
        .post(
          "https://meatncuts.com.pk/phpfiles/api/view_data.php?date=" +
            this.state.prevselectedDate +
            "&fdate=" +
            this.state.prevfromDate +
            "&catselected=" +
            this.state.prevcatselected+"&paymentselected=" +
            this.state.prevselectedpayment,
          this.prevcheckedlist
        )
        .then((response) => {
          this.setState({
            neworders: response.data,
            render0: false,
            showDate: "",
          });

          //console.log("Response Data",response.data)
        })
        .catch((err) => console.log("Error", err));
    }
    let counter = 0;
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
        <div style={{ textAlign: "center", margin: "auto", marginTop: "30px" }}>
          <div
            style={{
              textAlign: "center",
              display: "inline-block",
              marginRight: "10px",
            }}
          >
            <label style={{ color: "white" }}>From: </label>
            <input
              type="date"
              value={this.state.fromDate}
              onChange={(e) => this.setState({ fromDate: e.target.value })}
            />
          </div>
          <div style={{ textAlign: "center", display: "inline-block" }}>
            <label style={{ color: "white" }}>To: </label>
            <input
              type="date"
              value={this.state.selectedDate}
              onChange={(e) => this.setState({ selectedDate: e.target.value })}
            />
          </div>

          {/* <div style={{ textAlign:"center", display:"inline-block"}}>
                <label style={{color:"white"}} >Status: </label>
                <select style={{ width:"100%", marginLeft:"10px"}} onChange = {(e)=> this.setState({statusselected:e.target.value, render1:true})}>
                    {this.getStatusOption()}
                </select>
                </div> */}
          <div style={{ textAlign: "center", display: "inline-block", }}>
            <label style={{ color: "white" }}>Category: </label>
            <select
              style={{ width: "100%", marginLeft: "20px" }}
              onChange={(e) => this.setState({ catselected: e.target.value })}
            >
              {this.getCategoryOption()}
            </select>
          </div>
          <div style={{ textAlign: "center", display: "inline-block" }}>
            <label style={{ color: "white" }}>Payment Status: </label>
            <select
              style={{ width: "70%", }}
              onChange={(e) => this.setState({ paymentselected: e.target.value })}
            >
              {this.getPaymentOption()}
            </select>
          </div>
          <div style={{ textAlign: "center",width:"50%", margin:"auto" }}>
            <div>
              <label style={{ color: "white" }}>Filter By Status: </label>
            </div>
            {this.getCheckboxfilter()}
          </div>
          <div style={{ marginTop: "25px" }}>
            <button
              className="btn btn-dark"
              onClick={() => this.setState({ render1: true })}
            >
              Get Data
            </button>
          </div>
          <br />
          <button
            className="btn btn-danger"
            onClick={() => this.exportToExcel()}
          >
            Export to Excel
          </button>
        </div>
        {/* <div style={{width:"20%", textAlign:"center", margin:"auto", marginTop:"10px"}}>
                <label style={{color:"white"}} >To Date: </label>
                <input type="date" value={this.state.selectedDate} onChange={(e)=>this.setState({showDate:e.target.value, selectedDate:e.target.value})}/>
                </div>
                 <div style={{marginTop:"25px"}}>
                   <button className="btn btn-dark" onClick={()=>this.props.history.push('/data')} style={{position: 'absolute', right: 25, width:"20%", marginTop:"25px"}}>Back to Dashboard</button>
                </div> */}
        <div>
          <h2>All New Orders</h2>
          <div className="table-wrapper">
            <table className="fl-table">
              <thead>
                <tr style={{ textTransform: "upperCase" }}>
                  <th>S. no</th>
                  <th>Date</th>
                  <th>Consign. Num</th>
                  <th>Cust ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Amount</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Product Name</th>
                  <th>Payment Rcv/Not Rcv</th>
                  <th>Status</th>
                  <th>Latest Status Rsn</th>
                  <th colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody>{this.gettableData("view")}</tbody>
            </table>
            <table
              className="fl-table"
              id="tbl_exporttable_to_xls"
              style={{ display: "none" }}
            >
              <thead>
                <tr style={{ textTransform: "upperCase" }}>
                  <th>S. no</th>
                  <th>Date</th>
                  <th>Consign. Num</th>
                  <th>Cust ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Amount</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Product Name</th>
                  <th>Payment Rcv/Not Rcv</th>
                  <th>Status</th>
                  <th>Status-Reason</th>
                </tr>
              </thead>
              <tbody>{this.gettableData("download")}</tbody>
            </table>
          </div>
        </div>

        {this.state.modalShow ? (
          <Delete
            sendReason={(e) => {
              this.updateDelete(this.state.i, e, this.state.d);
            }}
            show={this.state.modalShow}
            onHide={() => this.setState({render1:true, modalShow: false })}
            s={this.state.s}
          />
        ) : (
          ""
        )}

        {this.state.askReasonforStatusChange ? (
          <StatusReason
            sendstsReason={(e) => {
              this.changeStatus(e, this.state.changeStatusData);
            }}
            cnsg={
              this.state.neworders[this.state.changeStatusData][
                "consignmentnum"
              ]
            }
            show={this.state.askReasonforStatusChange}
            onHide={() => this.setState({ askReasonforStatusChange: false })}
            fromsts={this.state.changeStatusfrom}
            tosts={this.state.changeStatusTo}
          />
        ) : (
          ""
        )}

        {this.state.logShow ? (
          <ViewLog
            updateReason={(e) => {
              this.updateCommentsIndatabase(e);
            }}
            render_data={(e) => {
              this.setState({render0:true, render1:true});
            }}
            show={this.state.logShow}
            onHide={() => this.setState({ logShow: false })}
            s={this.state.s}
            id={this.state.id}
          />
        ) : (
          ""
        )}
        {this.state.showTicket ? (
          <Ticket
            show={this.state.showTicket}
            onHide={() => this.setState({ showTicket: false })}
            i={this.state.neworders[this.state.i]}
          />
        ) : (
          ""
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Table);