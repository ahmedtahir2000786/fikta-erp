import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/table.css";
import axios from "axios";
import { new_data } from "../store/action";
import { Link } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import moment from "moment";
import fb from "../config/firebase";

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
    //console.log(this.props.i)

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
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
              <strong>Address:</strong> {this.props.i.address}
            </div>
            <div>
              <strong>Contact no:</strong> {this.props.i.phone}
            </div>
            <div>
              <strong>Cust_ID:</strong> {this.props.i.cust_id}
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
    };
    axios
      .get(
        "https://meatncuts.com.pk/phpfiles/api/viewlog.php?id=" + this.props.id
      )
      .then((response) => {
        this.setState({ data: response.data });
        //console.log("Check",response.data)
      })
      .catch((err) => console.log("Error", err));
  }
  getLog = () => {
    console.log(this.state.data[0]["status_date"]);
    let list = [];
    this.state.data[0]["status_date"].map((v, i) => {
      list.push(
        <div>
          <div
            style={{
              background: "blue",
              color: "white",
              width: "40%",
              padding: "10px",
            }}
          >
            {v.st}
          </div>
          <div style={{ padding: "10px" }}>
            <strong>On: </strong>
            {v.date}
          </div>
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
            Delete Data of S.No {this.props.s}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Reason:</h4>
          <p>
            <textarea
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

class ReplacementData extends Component {
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
    let date = new Date();
    date =
      date.getFullYear() +
      "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2);
    this.state = {
      fromdate: date,
      todate: date,
      render1: false,
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
      consignmentSearch: "",
      showTable: true,
      clickCount: 0,
      showConsignmentSearch: false,
      showNameSearch: false,
      showPhoneSearch: false,
      nameSearch: "",
      phoneSearch: 0,
      searchby: "date",
      render: false,
    };
    this.rcvarr = [];
    this.norcvarr = [];
    this.delarr = [];
    this.newList = [];
    this.prevList = [];

    //this.setState({selectedDate:date})
    axios
      .get(
        "https://meatncuts.com.pk/phpfiles/api/return_data.php?SearchBy=" +
          "date" +
          "&todate=" +
          this.state.todate +
          "&fromdate=" +
          this.state.fromdate
      )
      .then((response) => {
        this.setState({ neworders: response.data });
        console.log(response.data);
        {
          Object.keys(response.data).map((keyName, i) => {
            if (
              response.data[i]["returnRcvd"] == 1 &&
              response.data[i]["status"] != "Deleted"
            ) {
              this.rcvarr.push(response.data[i]);
            } else if (
              response.data[i]["returnRcvd"] != 1 &&
              response.data[i]["status"] != "Deleted"
            ) {
              this.norcvarr.push(response.data[i]);
            } else {
              this.delarr.push(response.data[i]);
            }
          });
        }
        this.newList = this.state.neworders;
        this.prevList = this.state.neworders;
      })
      .catch((err) => console.log("Error", err));
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
          render1: true,
        })
      )
      .catch();
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

  getStatus = (k) => {
    let list = [];
    if (this.state.neworders[k]["status"] == "Booked") {
      list.push(
        <option selected value="Booked">
          Booked
        </option>
      );
      list.push(<option value="In Process">In Process</option>);
      list.push(<option value="Dispatched">Dispatched</option>);
      list.push(<option value="Return">Return</option>);
      list.push(<option value="Delivered">Delivered</option>);
    } else if (this.state.neworders[k]["status"] == "In Process") {
      list.push(<option value="Booked">Booked</option>);
      list.push(
        <option selected value="In Process">
          In Process
        </option>
      );
      list.push(<option value="Dispatched">Dispatched</option>);
      list.push(<option value="Return">Return</option>);
      list.push(<option value="Delivered">Delivered</option>);
    } else if (this.state.neworders[k]["status"] == "Dispatched") {
      list.push(<option value="Booked">Booked</option>);
      list.push(<option value="In Process">In Process</option>);
      list.push(
        <option selected value="Dispatched">
          Dispatched
        </option>
      );
      list.push(<option value="Return">Return</option>);
      list.push(<option value="Delivered">Delivered</option>);
    } else if (this.state.neworders[k]["status"] == "Return") {
      list.push(<option value="Booked">Booked</option>);
      list.push(<option value="In Process">In Process</option>);
      list.push(<option value="Dispatched">Dispatched</option>);
      list.push(
        <option selected value="Return">
          Return
        </option>
      );
      list.push(<option value="Delivered">Delivered</option>);
    } else if (this.state.neworders[k]["status"] == "Delivered") {
      list.push(<option value="Booked">Booked</option>);
      list.push(<option value="In Process">In Process</option>);
      list.push(<option value="Dispatched">Dispatched</option>);
      list.push(<option value="Return">Return</option>);
      list.push(
        <option selected value="Delivered">
          Delivered
        </option>
      );
    }

    return list;
  };

  changeStatus = (e, k) => {
    //console.log(this.state.neworders[k]['ord_id'], e)
    axios
      .get(
        "https://meatncuts.com.pk/phpfiles/api/edit_status.php?id=" +
          this.state.neworders[k]["ord_id"] +
          "&status=" +
          e +
          "&date=" +
          this.state.neworders[k]["date"]
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  changeRcvd = (e, v, d) => {
    v = Number(v);

    console.log("I am here", e);
    axios
      .post(
        "https://meatncuts.com.pk/phpfiles/api/update_rcvd.php?id=" +
          e +
          "&date=" +
          d +
          "&change=return",
        v
      )
      .then((res) => {
        if (this.state.clickCount == 0 && this.state.searchby == "date") {
          this.setState({ render1: true });
        } else if (
          this.state.clickCount != 0 &&
          this.state.searchby == "date"
        ) {
          this.newList.map((z, i) => {
            if (z["ord_id"] == e) {
              this.newList[i]["returnRcvd"] = v;
            }
          });
          //console.log(this.newList)
          this.setState({ render: true });
        } else {
          this.state.neworders.map((z, i) => {
            if (z["ord_id"] == e) {
              this.state.neworders[i]["returnRcvd"] = v;
            }
          });
          this.setState({ render: true });
        }
      })
      .catch((err) => console.log(err));
  };
  getCheckBox = (k, i) => {
    if (i == 1) {
      return (
        <td>
          <button
            className="btn btn-primary"
            value={-1}
            onClick={(e) => {
              this.changeRcvd(
                this.state.neworders[k]["ord_id"],
                e.target.value,
                this.state.neworders[k]["date"]
              );
            }}
          >
            Received
          </button>
        </td>
      );
    } else {
      return (
        <td>
          <button
            className="btn btn-danger"
            value={1}
            onClick={(e) => {
              this.changeRcvd(
                this.state.neworders[k]["ord_id"],
                e.target.value,
                this.state.neworders[k]["date"]
              );
            }}
          >
            Not Received
          </button>
        </td>
      );
    }
  };
  getsortCheckBox = (k, i) => {
    if (i == 1) {
      return (
        <td>
          <button
            className="btn btn-primary"
            value={-1}
            onClick={(e) => {
              this.changeRcvd(
                this.newList[k]["ord_id"],
                e.target.value,
                this.newList[k]["date"]
              );
            }}
          >
            Received
          </button>
        </td>
      );
    } else {
      return (
        <td>
          <button
            className="btn btn-danger"
            value={1}
            onClick={(e) => {
              this.changeRcvd(
                this.newList[k]["ord_id"],
                e.target.value,
                this.newList[k]["date"]
              );
            }}
          >
            Not Received
          </button>
        </td>
      );
    }
  };
  selectedData = (i, k, keyName) => {
    if (i == 0) {
      return <td key={i}>{this.state.neworders[k]["only_date"]}</td>;
    } else {
      let temp = "";

      if (
        keyName == "status" &&
        this.state.neworders[k]["status"] != "Deleted"
      ) {
        return <td key={i}>{this.state.neworders[k][keyName]}</td>;
      } else if (
        keyName == "status" &&
        this.state.neworders[k]["status"] == "Deleted"
      ) {
        return (
          <td key={i}>
            <div>{this.state.neworders[k][keyName]}</div>
            <div>
              <strong>Reason: </strong>
              {this.state.neworders[k]["reason"]}
            </div>
          </td>
        );
      }
      if (
        keyName == "returnRcvd" &&
        this.state.neworders[k]["status"] != "Deleted"
      ) {
        return this.getCheckBox(k, this.state.neworders[k][keyName]);
      }
      if (
        keyName == "name" ||
        keyName == "consignmentnum" ||
        keyName == "cust_id"
      ) {
        return <td key={i}>{this.state.neworders[k][keyName]}</td>;
      }
    }
  };
  sortData = (i, k, keyName) => {
    if (i == 0) {
      return <td key={i}>{this.newList[k]["only_date"]}</td>;
    } else {
      let temp = "";

      if (keyName == "status" && this.newList[k]["status"] != "Deleted") {
        return <td key={i}>{this.newList[k][keyName]}</td>;
      } else if (
        keyName == "status" &&
        this.newList[k]["status"] == "Deleted"
      ) {
        return (
          <td key={i}>
            <div>{this.newList[k][keyName]}</div>
            <div>
              <strong>Reason: </strong>
              {this.newList[k]["reason"]}
            </div>
          </td>
        );
      }
      if (keyName == "returnRcvd" && this.newList[k]["status"] != "Deleted") {
        return this.getsortCheckBox(k, this.newList[k][keyName]);
      }
      if (
        keyName == "name" ||
        keyName == "consignmentnum" ||
        keyName == "cust_id"
      ) {
        return <td key={i}>{this.newList[k][keyName]}</td>;
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
          <button className="btn-dark btn-xs">Edit</button>
        </Link>
      );
    } else {
      return (
        <button className="btn btn-dark" disabled>
          Edit
        </button>
      );
    }
  };
  row = (k) => {
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
    if (this.state.clickCount == 0) {
      if (this.state.neworders[k]["delete_ord"] == "1") {
        return (
          <tr style={{ background: "lightBlue" }} key={k}>
            <td>-</td>
            {Object.keys(this.state.neworders[k]).map((keyName, i) => {
              return this.selectedData(i, k, keyName);
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
              return this.selectedData(i, k, keyName);
            })}
          </tr>
        );
      }
    } else {
      if (this.newList[k]["delete_ord"] == "1") {
        return (
          <tr style={{ background: "lightBlue" }} key={k}>
            <td>-</td>
            {Object.keys(this.newList[k]).map((keyName, i) => {
              return this.sortData(i, k, keyName);
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
            {Object.keys(this.newList[k]).map((keyName, i) => {
              return this.sortData(i, k, keyName);
            })}
          </tr>
        );
      }

      // console.log(this.rcvarr)
      // let list2=[]
      // this.rcvarr.map((v,i)=>{
      //     let list=[]
      //     list.push(<td key={i}>{this.rcvarr[i]['only_date']}</td>)
      //     Object.keys(v).map((keyname, idx)=>{
      //        // console.log(keyname)

      //        list.push( this.sortData(i, this.rcvarr, keyname))
      //     })
      //     console.log("List",list)
      //     list2.push(<tr>{list}</tr>)

      // })
      // return(list2)

      //         this.s_num=this.s_num+1
      //         let x = this.s_num
      //         return(
      //         <tr key={k}>
      //             <td>{this.s_num}</td>
      //             {
      //            rcvarr.map((keyName, i) => {
      //             return(this.selectedData(i, k, keyName))

      // })}

      //         </tr>
      //         )
    }
  };

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ time: Date.now() }),
      10000
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ showTable: true });
    console.log(this.state.searchby);
    if (this.state.searchby == "consignment") {
      axios
        .get(
          "https://meatncuts.com.pk/phpfiles/api/return_data.php?SearchBy=" +
            "cnsg" +
            "&cnsg=" +
            this.state.consignmentSearch
        )
        .then((response) => {
          this.rcvarr = [];
          this.norcvarr = [];
          this.delarr = [];
          {
            Object.keys(response.data).map((keyName, i) => {
              if (
                response.data[i]["returnRcvd"] == 1 &&
                response.data[i]["status"] != "Deleted"
              ) {
                this.rcvarr.push(response.data[i]);
              } else if (
                response.data[i]["returnRcvd"] != 1 &&
                response.data[i]["status"] != "Deleted"
              ) {
                this.norcvarr.push(response.data[i]);
              } else {
                this.delarr.push(response.data[i]);
              }
            });
          }
          this.newList = this.rcvarr.concat(this.norcvarr);
          this.newList = this.newList.concat(this.delarr);
          this.setState({
            neworders: response.data,
            render1: false,
            showDate: "",
          });

          //this.props.new_data(false)
          //console.log("Response Data",this.state.neworders)
        });
    } else if (this.state.searchby == "name") {
      axios
        .get(
          "https://meatncuts.com.pk/phpfiles/api/return_data.php?SearchBy=" +
            "name" +
            "&cnsg=" +
            this.state.nameSearch
        )
        .then((response) => {
          this.rcvarr = [];
          this.norcvarr = [];
          this.delarr = [];
          {
            Object.keys(response.data).map((keyName, i) => {
              if (
                response.data[i]["returnRcvd"] == 1 &&
                response.data[i]["status"] != "Deleted"
              ) {
                this.rcvarr.push(response.data[i]);
              } else if (
                response.data[i]["returnRcvd"] != 1 &&
                response.data[i]["status"] != "Deleted"
              ) {
                this.norcvarr.push(response.data[i]);
              } else {
                this.delarr.push(response.data[i]);
              }
            });
          }
          this.newList = this.rcvarr.concat(this.norcvarr);
          this.newList = this.newList.concat(this.delarr);
          this.setState({
            neworders: response.data,
            render1: false,
            showDate: "",
          });

          //this.props.new_data(false)
          //console.log("Response Data",response.data)
        });
    } else if (this.state.searchby == "phone") {
      axios
        .get(
          "https://meatncuts.com.pk/phpfiles/api/return_data.php?SearchBy=" +
            "phone" +
            "&cnsg=" +
            this.state.phoneSearch
        )
        .then((response) => {
          this.rcvarr = [];
          this.norcvarr = [];
          this.delarr = [];
          {
            Object.keys(response.data).map((keyName, i) => {
              if (
                response.data[i]["returnRcvd"] == 1 &&
                response.data[i]["status"] != "Deleted"
              ) {
                this.rcvarr.push(response.data[i]);
              } else if (
                response.data[i]["returnRcvd"] != 1 &&
                response.data[i]["status"] != "Deleted"
              ) {
                this.norcvarr.push(response.data[i]);
              } else {
                this.delarr.push(response.data[i]);
              }
            });
          }
          this.newList = this.rcvarr.concat(this.norcvarr);
          this.newList = this.newList.concat(this.delarr);
          this.setState({
            neworders: response.data,
            render1: false,
            showDate: "",
          });

          //this.props.new_data(false)
          //console.log("Response Data",this.state.neworders)
        });
    }
  };
  render() {
    this.s_num = 0;

    if (
      this.props.state.new_data_rcv == true ||
      this.state.render1 == true ||
      this.state.showDate != ""
    ) {
      console.log("Re-Render");
      axios
        .get(
          "https://meatncuts.com.pk/phpfiles/api/return_data.php?SearchBy=" +
            "date" +
            "&todate=" +
            this.state.todate +
            "&fromdate=" +
            this.state.fromdate
        )
        .then((response) => {
          this.setState({
            neworders: response.data,
            render1: false,
            showDate: "",
            showTable: true,
          });
          this.rcvarr = [];
          this.norcvarr = [];
          this.delarr = [];
          {
            Object.keys(response.data).map((keyName, i) => {
              if (
                response.data[i]["returnRcvd"] == 1 &&
                response.data[i]["status"] != "Deleted"
              ) {
                this.rcvarr.push(response.data[i]);
              } else if (
                response.data[i]["returnRcvd"] != 1 &&
                response.data[i]["status"] != "Deleted"
              ) {
                this.norcvarr.push(response.data[i]);
              } else {
                this.delarr.push(response.data[i]);
              }
            });
          }
          this.newList = this.rcvarr.concat(this.norcvarr);
          this.newList = this.newList.concat(this.delarr);
          // console.log("New List",this.newList)

          //this.props.new_data(false)
          //console.log("Response Data",this.state.neworders)
        })
        .catch((err) => console.log("Error", err));
    }
    let counter = 0;
    return (
      <div>
        <div style={{ textAlign: "center", margin: "auto", marginTop: "10px" }}>
          {this.state.showConsignmentSearch == false ? (
            <button
              className="btn btn-dark"
              style={{ margin: "5px" }}
              onClick={() =>
                this.setState({
                  showConsignmentSearch: true,
                  showNameSearch: false,
                  showPhoneSearch: false,
                })
              }
            >
              Search By Consignment
            </button>
          ) : (
            ""
          )}
          {this.state.showNameSearch == false ? (
            <button
              className="btn btn-dark"
              style={{ margin: "5px" }}
              onClick={() =>
                this.setState({
                  showNameSearch: true,
                  showConsignmentSearch: false,
                  showPhoneSearch: false,
                })
              }
            >
              Search By Name
            </button>
          ) : (
            ""
          )}
          {this.state.showPhoneSearch == false ? (
            <button
              className="btn btn-dark"
              style={{ margin: "5px" }}
              onClick={() =>
                this.setState({
                  showPhoneSearch: true,
                  showNameSearch: false,
                  showConsignmentSearch: false,
                })
              }
            >
              Search By Phone
            </button>
          ) : (
            ""
          )}

          {this.state.showConsignmentSearch ? (
            <form onSubmit={this.onSubmit}>
              <div
                style={{
                  textAlign: "center",
                  margin: "auto",
                  display: "inline-block",
                }}
              >
                <label style={{ color: "white" }}>Search Consignment: </label>
                <input
                  style={{ display: "inline-block" }}
                  type="text"
                  required
                  value={this.state.consignmentSearch}
                  onChange={(e) =>
                    this.setState({
                      consignmentSearch: e.target.value,
                      showTable: false,
                    })
                  }
                />
                <div
                  style={{
                    textAlign: "center",
                    margin: "10px auto",
                    display: "inline-block",
                  }}
                >
                  <input
                    style={{ display: "inline-block" }}
                    type="submit"
                    value="Search"
                    onClick={() => this.setState({ searchby: "consignment" })}
                  />
                  <button
                    className="btn btn-danger"
                    style={{ margin: "5px" }}
                    onClick={() =>
                      this.setState({
                        showPhoneSearch: false,
                        showNameSearch: false,
                        showConsignmentSearch: false,
                      })
                    }
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          ) : (
            ""
          )}
          {this.state.showNameSearch ? (
            <form onSubmit={this.onSubmit}>
              <div
                style={{
                  textAlign: "center",
                  margin: "auto",
                  display: "inline-block",
                }}
              >
                <label style={{ color: "white" }}>Search Name: </label>
                <input
                  style={{ display: "inline-block" }}
                  type="text"
                  required
                  value={this.state.nameSearch}
                  onChange={(e) =>
                    this.setState({
                      nameSearch: e.target.value.toUpperCase(),
                      showTable: false,
                    })
                  }
                />
                <div
                  style={{
                    textAlign: "center",
                    margin: "10px auto",
                    display: "inline-block",
                  }}
                >
                  <input
                    style={{ display: "inline-block" }}
                    type="submit"
                    value="Search"
                    onClick={() => this.setState({ searchby: "name" })}
                  />
                  <button
                    className="btn btn-danger"
                    style={{ margin: "5px" }}
                    onClick={() =>
                      this.setState({
                        showPhoneSearch: false,
                        showNameSearch: false,
                        showConsignmentSearch: false,
                      })
                    }
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          ) : (
            ""
          )}
          {this.state.showPhoneSearch ? (
            <form onSubmit={this.onSubmit}>
              <div
                style={{
                  textAlign: "center",
                  margin: "auto",
                  display: "inline-block",
                }}
              >
                <label style={{ color: "white" }}>Search Phone: </label>
                <input
                  style={{ display: "inline-block" }}
                  type="number"
                  required
                  value={
                    this.state.phoneSearch == 0 ? "" : this.state.phoneSearch
                  }
                  onChange={(e) =>
                    this.setState({
                      phoneSearch: e.target.value,
                      showTable: false,
                    })
                  }
                />
                <div
                  style={{
                    textAlign: "center",
                    margin: "10px auto",
                    display: "inline-block",
                  }}
                >
                  <input
                    style={{ display: "inline-block" }}
                    type="submit"
                    value="Search"
                    onClick={() => this.setState({ searchby: "phone" })}
                  />
                  <button
                    className="btn btn-danger"
                    style={{ margin: "5px" }}
                    onClick={() =>
                      this.setState({
                        showPhoneSearch: false,
                        showNameSearch: false,
                        showConsignmentSearch: false,
                      })
                    }
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          ) : (
            ""
          )}

          {this.state.showConsignmentSearch == false &&
          this.state.showNameSearch == false &&
          this.state.showPhoneSearch == false ? (
            <div>
              <div
                style={{
                  textAlign: "center",
                  margin: "10px",
                  display: "inline-block",
                }}
              >
                <label style={{ color: "white" }}>From: </label>
                <input
                  type="date"
                  value={this.state.fromdate}
                  onChange={(e) =>
                    this.setState({
                      fromdate: e.target.value,
                      showDate: e.target.value,
                    })
                  }
                />
              </div>
              <div
                style={{
                  textAlign: "center",
                  margin: "10px",
                  marginTop: "10px",
                  display: "inline-block",
                }}
              >
                <label style={{ color: "white" }}>To: </label>
                <input
                  type="date"
                  value={this.state.todate}
                  onChange={(e) =>
                    this.setState({
                      todate: e.target.value,
                      showDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          ) : (
            ""
          )}

          {/* <label style={{color:"white"}} >Select Date: </label>
                <input type="date" value={this.state.selectedDate} onChange={(e)=>this.setState({showDate:e.target.value, selectedDate:e.target.value})}/> */}
        </div>
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
        {this.state.showTable == true ? (
          <div>
            <h2>Replacement Order</h2>
            <div className="table-wrapper">
              <table className="fl-table">
                <thead>
                  <tr style={{ textTransform: "upperCase" }}>
                    <th>S. no</th>
                    <th>Date</th>
                    <th>Consign. Num</th>
                    <th>Cust ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th
                      onClick={() => {
                        if (this.state.clickCount == 1) {
                          this.setState({ clickCount: 0 });
                        } else {
                          this.setState({ clickCount: 1 });
                        }
                      }}
                    >
                      Replacement Rcvd.
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.neworders.map((v, k) => {
                    return this.row(k);
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          ""
        )}

        {this.state.modalShow ? (
          <MyVerticallyCenteredModal
            sendReason={(e) => {
              this.updateDelete(this.state.i, e, this.state.d);
            }}
            show={this.state.modalShow}
            onHide={() => this.setState({ modalShow: false })}
            s={this.state.s}
          />
        ) : (
          ""
        )}
        {this.state.logShow ? (
          <ViewLog
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

export default connect(mapStateToProps, mapDispatchToProps)(ReplacementData);

// import React, {Component} from 'react';
// import {connect} from 'react-redux'
// import "../css/table.css"
// import axios from 'axios';
// import { new_data } from '../store/action';
// import {Link} from "react-router-dom";
// import { Button, Modal, Form } from 'react-bootstrap';
// import moment from 'moment';
// import fb from '../config/firebase';

// class Ticket extends Component{
//     constructor(props){
//         super(props)

//     }

//     getProductDetails = (ind) =>{

//             return(
//                 <div>
//                 <div><strong>Product:</strong> {this.props.i.design_name[ind]} </div>
//                 <div><span style={{marginLeft:"10px"}}><strong>Color:</strong> {this.props.i.color[ind]} </span> <span><strong>Size:</strong> {this.props.i.size[ind]} </span></div>
//                 </div>

//             )

//     }
//     render(){

//             //console.log(this.props.i)

//     return (
//       <Modal
//         {...this.props}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header>
//           <Modal.Title id="contained-modal-title-vcenter">
//           Confirmation Message
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//          <div>
//             <div><strong>Name:</strong> {this.props.i.name}</div>
//             <div><strong>Address:</strong> {this.props.i.address}</div>
//             <div><strong>Contact no:</strong> {this.props.i.phone}</div>
//             <div><strong>Cust_ID:</strong> {this.props.i.cust_id}</div>
//             {
//                 this.props.i.design_name.map((v, i)=>{
//                     return(this.getProductDetails(i))
//                 })
//             }
//             <br />
//             <div style={{borderTop:"1px solid", borderBottom:"1px solid"}}><strong>Total Amount:</strong> {this.props.i.amount} </div>
//             <br />
//             <div>
//                 <strong>Remarks:</strong>
//                 <div>
//                     <div>
//                         We Are Own Manufacturers And Provide Best Quality To The Customers So Due To This You Will Get Your Parcel In 10 To 15 Working Days Inshallah
//                     </div>
//                     <div style={{marginTop:"10px"}}>
//                         <strong>Thanks for connecting FIKRA</strong>
//                     </div>

//                 </div>
//             </div>
//         </div>
//         </Modal.Body>
//         <Modal.Footer>

//           <Button className="btn-primary" onClick={() =>{
//                 //console.log(this.props)
//                   //this.setState({reason:""})
//                   this.props.onHide()
//           }

//             } >Close</Button>
//           {/* onClick={this.props.onHide} */}
//         </Modal.Footer>
//       </Modal>
//     );
//     }
//   }
// class ViewLog extends Component{
//     constructor(props){
//         super(props)
//         this.state={
//             data:[]
//         }
//         axios.get('https://meatncuts.com.pk/phpfiles/api/viewlog.php?id='+this.props.id)
//             .then(response=>{
//                 this.setState({data:response.data})
//                 //console.log("Check",response.data)
//             })
//             .catch(err=>console.log("Error", err))
//     }
//     getLog = () =>{
//         console.log(this.state.data[0]["status_date"])
//         let list = []
//         this.state.data[0]["status_date"].map((v,i) => {
//             list.push(<div>
//                 <div style={{background:"blue", color:"white", width:"40%", padding:"10px"}}>{v.st}</div>
//                 <div style={{padding:"10px"}}><strong>On: </strong>{v.date}</div>

//                 </div>)
//         })
//         return(list)
//     }

//     render(){

//     return (
//       <Modal
//         {...this.props}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header>
//           <Modal.Title id="contained-modal-title-vcenter">
//             Log of Order: {this.props.s}

//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//          <div>{this.state.data.length >0 ? this.getLog():""}</div>
//         </Modal.Body>
//         <Modal.Footer>

//           <Button className="btn-primary" onClick={() =>{
//                 //console.log(this.props)
//                   //this.setState({reason:""})
//                   this.props.onHide()
//           }

//             } >Close</Button>
//           {/* onClick={this.props.onHide} */}
//         </Modal.Footer>
//       </Modal>
//     );
//     }
//   }

// class MyVerticallyCenteredModal extends Component{
//     constructor(props){
//         super(props)
//         this.state={
//             reason:"",
//             reasonErr:""
//         }
//     }
//     render(){
//     return (
//       <Modal
//         {...this.props}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header>
//           <Modal.Title id="contained-modal-title-vcenter">
//             Delete Data of S.No {this.props.s}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <h4>Reason:</h4>
//           <p>
//             <textarea required placeholder="Share any reason!" style={{width:"100%"}} onChange={(e) => this.setState({reason:e.target.value})} value={this.state.reason}/>
//             <span style={{color:"red", fontSize:"10px"}}>{this.state.reasonErr}</span>
//           </p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button className="btn-danger" onClick={() =>{
//               if(this.state.reason!=""){
//                 this.props.sendReason(this.state.reason)
//                 this.setState({reason:""})
//                 this.props.onHide()
//               }else{
//                   this.setState({reasonErr:"Reason is compulsory"})
//               }
//           } } >Delete</Button>
//           <Button className="btn-primary" onClick={() =>{
//                 //console.log(this.props)
//                   this.setState({reason:""})
//                   this.props.onHide()
//           }

//             } >Close</Button>
//           {/* onClick={this.props.onHide} */}
//         </Modal.Footer>
//       </Modal>
//     );
//     }
//   }

// class ReturnData extends Component{
//     constructor(props){
//         super(props)
//         const firebase = fb.firebase_
//         let prop = this.props
//         firebase.auth().onAuthStateChanged(function(user) {
//            if(user){
//                 //console.log(user)
//            }else{
//             prop.history.push('')
//            }
//           });
//         this.s_num = 0
//         let date=new Date()
//         date = date.getFullYear() + '-' +
//             ('00' + (date.getMonth()+1)).slice(-2) + '-' +
//             ('00' + date.getDate()).slice(-2)
//         this.state={
//             fromdate:date,
//             todate:date,
//             render1:false,
//             neworders:[],
//             modalShow:false,
//             logShow:false,
//             s:0,
//             i:0,
//             del_reason:"",
//             time:Date.now(),
//             showDate:"",
//             selectedDate:date,
//             d:"",
//             id:0,
//             showTicket:false,
//             consignmentSearch:0,
//             showTable:true
//         }

//         //this.setState({selectedDate:date})
//         axios.get('https://meatncuts.com.pk/phpfiles/api/return_data.php?SearchBy='+'date'+'&todate='+this.state.todate+'&fromdate='+this.state.fromdate)
//         .then(response=>{
//             this.setState({neworders: response.data})
//            console.log("Response Data",this.state.neworders)
//         })
//         .catch(err=>console.log("Error", err))
//     }

//     updateDelete = (k, e, date) =>{

//             axios.post("https://meatncuts.com.pk/phpfiles/api/delete.php?id="+this.state.neworders[k]['ord_id']+"&reason="+e+"&date="+this.state.neworders[k]['date'], true)
//             .then(

//                 this.setState({
//                     render1:true
//                 })
//             )
//             .catch()

//     }

//     getTimeDifference =(sys_date, sql_date) => {

//         var now = moment(sys_date);
// var then = moment(sql_date);
// var ms = moment(now,"YYYY-MM-DD HH:mm:ss").diff(moment(then,"YYYY-MM-DD HH:mm:ss"));
// let hr = Math.floor(ms/3600000)
// let mins = Math.floor((ms-(hr*3600000))/60000)
// let sec =  Math.floor((ms-(hr*3600000)-(mins*60000))/1000)
// let str=""
// if(hr <=47 && mins <=59){
// let rem_hr= Math.floor(48-ms/3600000)
// let rem_mins=Math.floor(((48-ms/3600000)-rem_hr)*60)
// let rem_sec=Math.floor(((((48-ms/3600000)-rem_hr)*60)-rem_mins)*60)
//     if(rem_hr<0){
//         str=""
//     }else{
//         if(rem_mins!=0){
//         str="rem: "+rem_hr+" hr "+rem_mins+" mins "
//         }else{
//             str=""
//         }
//     }
// }else{
//     str=""
// }
// return(str)

//     }

//     getStatus = (k) =>{
//         let list=[]
//         if(this.state.neworders[k]['status']=="Booked"){
//             list.push(<option selected value="Booked">Booked</option>)
//             list.push(<option value="In Process">In Process</option>)
//             list.push(<option value="Dispatched">Dispatched</option>)
//             list.push(<option value="Return">Return</option>)
//             list.push(<option value="Delivered">Delivered</option>)
//         }else if(this.state.neworders[k]['status']=="In Process"){
//             list.push(<option value="Booked">Booked</option>)
//             list.push(<option selected value="In Process">In Process</option>)
//             list.push(<option value="Dispatched">Dispatched</option>)
//             list.push(<option value="Return">Return</option>)
//             list.push(<option value="Delivered">Delivered</option>)
//         }else if(this.state.neworders[k]['status']=="Dispatched"){
//             list.push(<option value="Booked">Booked</option>)
//             list.push(<option value="In Process">In Process</option>)
//             list.push(<option selected value="Dispatched">Dispatched</option>)
//             list.push(<option value="Return">Return</option>)
//             list.push(<option value="Delivered">Delivered</option>)
//         }else if(this.state.neworders[k]['status']=="Return"){
//             list.push(<option value="Booked">Booked</option>)
//             list.push(<option value="In Process">In Process</option>)
//             list.push(<option value="Dispatched">Dispatched</option>)
//             list.push(<option selected value="Return">Return</option>)
//             list.push(<option value="Delivered">Delivered</option>)
//         }else if(this.state.neworders[k]['status']=="Delivered"){
//             list.push(<option value="Booked">Booked</option>)
//             list.push(<option value="In Process">In Process</option>)
//             list.push(<option value="Dispatched">Dispatched</option>)
//             list.push(<option value="Return">Return</option>)
//             list.push(<option selected value="Delivered">Delivered</option>)
//         }

//         return(list)
//     }

//     changeStatus = (e, k) => {
//         //console.log(this.state.neworders[k]['ord_id'], e)
//         axios.get('https://meatncuts.com.pk/phpfiles/api/edit_status.php?id='+this.state.neworders[k]['ord_id']+"&status="+ e +"&date="+this.state.neworders[k]['date'])
//         .then(
//             res => {console.log(res.data)
//            }

//             )
//         .catch(
//             err => console.log(err)
//         )
//     }

//     changeRcvd = (e, v, d) =>{

//         v= Number(v)

//         axios.post('https://meatncuts.com.pk/phpfiles/api/update_rcvd.php?id='+e+'&date='+d+'&change=return', v)
//         .then(
//            this.setState({render1:true})

//             )
//         .catch(
//             err => console.log(err)
//         )

//     }
//     getCheckBox = (k, i) =>{
//         if(i==1){
//             return(<td>
//               <button className="btn btn-primary" value={-1} onClick = {(e)=>{
//                  this.changeRcvd(this.state.neworders[k]['ord_id'], e.target.value, this.state.neworders[k]['date'])
//               }}>Received</button>
//             {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
//             <p>{this.state.neworders[k]['ord_id']}</p>
//                 <Form.Check type="checkbox" checked label="Received" value={-1} style={{border:"1px solid", padding:"10px"}} onClick={(e)=>{
//                     console.log(this.state.neworders[k]['ord_id'])
//                    // this.changeRcvd(this.state.neworders[k]['ord_id'], e.target.value, this.state.neworders[k]['date'])
//                 }} />
//             </Form.Group>
//             <p>{this.state.neworders[k]['ord_id']}</p> */}
//             </td>)
//         }else{
//             return(
//                 <td>
//                       <button className="btn btn-danger" value= {1} onClick = {(e)=>{
//                   this.changeRcvd(this.state.neworders[k]['ord_id'], e.target.value, this.state.neworders[k]['date'])
//               }}>Not Received</button>

//                 {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
//                 <p>{this.state.neworders[k]['ord_id']}</p>
//                     <Form.Check type="checkbox" label="Not Received" value={1} style={{border:"1px solid", padding:"10px"}} onClick={(e)=>{
//                         console.log(this.state.neworders[k]['ord_id'])
//                         //this.changeRcvd(this.state.neworders[k]['ord_id'], e.target.value, this.state.neworders[k]['date'])
//                     }} />
//                 </Form.Group>
//                 <p>{this.state.neworders[k]['ord_id']}</p> */}
//                 </td>
//             )
//         }
//     }
//     selectedData = (i, k, keyName) =>{

//         if(i==0){
//             return(<td key={i}>{this.state.neworders[k]['only_date']}</td>)
//         }else{
//             let temp=""

//             if(keyName == "status" && this.state.neworders[k]['status']!="Deleted"){
//                 return(<div style={{marginTop:"20px"}} ><select onChange={(e) => this.changeStatus(e.target.value, k)} style={{width:"100%"}}>{this.getStatus(k)}</select></div>)
//             }else if(keyName == "status" && this.state.neworders[k]['status']=="Deleted"){
//                 return(<td key={i}>{this.state.neworders[k][keyName]}</td>)
//             }
//             if(keyName == "returnRcvd" && this.state.neworders[k]['status']!="Deleted"){
//                 console.log("yahan aya")
//                     return(
//                         this.getCheckBox(k, this.state.neworders[k][keyName]))
//             }
//         if(keyName=="name" || keyName=="consignmentnum" || keyName=="cust_id" || keyName=="category" ){
//                 return(<td key={i}>{this.state.neworders[k][keyName]}</td>)
//         }}
//     }

//     getEdit=(e)=>{
//         let date = new Date();
//         date = date.getFullYear() + '-' +
//             ('00' + (date.getMonth()+1)).slice(-2) + '-' +
//             ('00' + date.getDate()).slice(-2) + ' ' +
//             ('00' + date.getHours()).slice(-2) + ':' +
//             ('00' + date.getMinutes()).slice(-2) + ':' +
//             ('00' + date.getSeconds()).slice(-2);
//         let time=this.getTimeDifference(date, e['date'])
//         if(time !=""){
//             return(
//                 <Link to={"/edit/"+e['ord_id']}><button className= "btn-dark btn-xs">Edit</button></Link>

//             )
//         }else{
//             return(

//             <button className= "btn btn-dark" disabled>Edit</button>
//             )
//         }
//     }
//     row = (k) =>{
//         let date = new Date();
//         date = date.getFullYear() + '-' +
//             ('00' + (date.getMonth()+1)).slice(-2) + '-' +
//             ('00' + date.getDate()).slice(-2) + ' ' +
//             ('00' + date.getHours()).slice(-2) + ':' +
//             ('00' + date.getMinutes()).slice(-2) + ':' +
//             ('00' + date.getSeconds()).slice(-2);
//         if(this.state.neworders[k]['delete_ord'] == "1"){
//             return(
//                 <tr style={{background:"lightBlue"}}key={k}>

//                     <td>-</td>
//                     {Object.keys(this.state.neworders[k]).map((keyName, i) => {
//                     return(this.selectedData(i, k, keyName))

//         })}
//         <td></td>
//         <td></td>
//         <td></td>

//                 </tr>
//             )
//         }else{
//             this.s_num=this.s_num+1
//             let x = this.s_num
//             return(
//             <tr key={k}>
//                 <td>{this.s_num}</td>
//                 {
//                 Object.keys(this.state.neworders[k]).map((keyName, i) => {
//                 return(this.selectedData(i, k, keyName))

//     })}

//              <td>
//              <button  className= "btn-primary btn-xs" style={{marginBottom:"15px"}}

//                 onClick={() => {
//                     this.setState({logShow:true, s:x, id:this.state.neworders[k]['ord_id']})
//                 }}

//                 >View Log</button><br />
//                  {this.getEdit(this.state.neworders[k])}
//                  <br />
//                 <span>{this.getTimeDifference(date, this.state.neworders[k]['date'])}</span>

//              </td>
//             <td>
//             <button  className= "btn-primary btn-xs" style={{marginBottom:"15px"}}
//                   onClick={() => {
//                     this.setState({showTicket:true, i:k})
//                     //this.setState({logShow:true, s:x, id:this.state.neworders[k]['ord_id']})
//                 }}

//                 >Get Ticket</button><br />

//                 <button onClick={() => {
//                 this.setState({modalShow:true, s:x, i:k, d:this.state.neworders[k]['date']})
//             }
//                 } className= "btn btn-danger">Delete</button></td>
//             </tr>
//             )
//         }
//     }

//     componentDidMount(){
//         this.interval = setInterval(() => this.setState({ time: Date.now() }), 10000);
//     }
//     componentWillUnmount(){
//         clearInterval(this.interval);
//     }
//     onSubmit = (e) =>{
//         this.setState({showTable:true})
//         e.preventDefault()
//         axios.get('https://meatncuts.com.pk/phpfiles/api/return_data.php?SearchBy='+'cnsg'+'&cnsg='+this.state.consignmentSearch)
//         .then(response=>{
//             this.setState({neworders: response.data, render1:false, showDate:""})
//             //this.props.new_data(false)
//             //console.log("Response Data",this.state.neworders)
//         })
//     }
//     render(){

//         this.s_num=0

//         if(this.props.state.new_data_rcv == true || this.state.render1==true || this.state.showDate != ""){
//             console.log("Re-Render")
//             axios.get('https://meatncuts.com.pk/phpfiles/api/return_data.php?SearchBy='+'date'+'&todate='+this.state.todate+'&fromdate='+this.state.fromdate)
//             .then(response=>{
//                 this.setState({neworders: response.data, render1:false, showDate:"", showTable:true})
//                 //this.props.new_data(false)
//                 //console.log("Response Data",this.state.neworders)
//             })
//             .catch(err=>console.log("Error", err))

//         }
//         let counter = 0;
//         return(
//             <div>

//                 <div style={{textAlign:"center", margin:"auto", marginTop:"10px"}}>
//                 <form onSubmit={this.onSubmit}>
//                     <div style={{ textAlign:"center", margin:"auto", display:"inline-block"}}>
//                 <label style={{color:"white"}} >Search Consignment: </label>
//                 <input style={{display:"inline-block"}} type="number" required value={this.state.consignmentSearch == 0? "":this.state.consignmentSearch} onChange={(e)=>this.setState({consignmentSearch:e.target.value, showTable:false})}/>
//                 <div style={{ textAlign:"center", margin:"10px auto", display:"inline-block"}}>
//                 <input  style={{display:"inline-block"}} type="submit" value="Search"/>
//                 </div>
//                 </div>
//                 </form>
//                 {this.state.consignmentSearch == 0?
//                 <div>
//                 <div style={{ textAlign:"center", margin:"10px", display:"inline-block"}}>
//                     <label style={{color:"white"}} >From: </label>
//                     <input type="date" value={this.state.fromdate} onChange={(e)=>this.setState({fromdate:e.target.value, showDate:e.target.value})}/>
//                 </div>
//                 <div style={{ textAlign:"center", margin:"10px", marginTop:"10px", display:"inline-block"}}>
//                 <label style={{color:"white"}} >To: </label>
//                 <input type="date" value={this.state.todate} onChange={(e)=>this.setState({todate:e.target.value, showDate:e.target.value})}/>
//                 </div>
//                 </div> :""}

//                 {/* <label style={{color:"white"}} >Select Date: </label>
//                 <input type="date" value={this.state.selectedDate} onChange={(e)=>this.setState({showDate:e.target.value, selectedDate:e.target.value})}/> */}
//                 </div>
//                  <div style={{marginTop:"25px"}}>
//                    <button className="btn btn-dark" onClick={()=>this.props.history.push('/data')} style={{position: 'absolute', right: 25, width:"20%", marginTop:"25px"}}>Back to Dashboard</button>
//                 </div>
//                 {this.state.showTable==true?
//                   <div>
//                   <h2>Status: Return</h2>
//                   <div className="table-wrapper">
//                       <table className="fl-table">
//                           <thead>
//                           <tr style={{textTransform: 'upperCase'}}>
//                           <th>S. no</th>
//                           <th>Date</th>
//                           <th>Consign. Num</th>
//                           <th>Cust ID</th>
//                           <th>Name</th>
//                           <th>Status</th>
//                           <th>Return Rcvd.</th>
//                           <th colSpan="2">Category</th>
//                           <th colSpan="2">Action</th>

//                           </tr>
//                           </thead>
//                           <tbody>
//                               {
//                                   this.state.neworders.map((v,k) => {
//                                       return(
//                                           this.row(k)
//                                           )
//                                   }
//                                   )
//                               }

//                           </tbody>
//                       </table>
//                   </div>
//               </div>

//                 :""}

//                 {this.state.modalShow?<MyVerticallyCenteredModal
//         sendReason={(e) => {
//             this.updateDelete(this.state.i, e, this.state.d)
//     }}
//         show={this.state.modalShow}
//         onHide={() => this.setState({modalShow:false})}
//         s={this.state.s}
//       />:""}
//        {this.state.logShow?<ViewLog
//         show={this.state.logShow}
//         onHide={() => this.setState({logShow:false})}
//         s={this.state.s}
//         id={this.state.id}
//       />:""}
//       {this.state.showTicket?<Ticket
//         show={this.state.showTicket}
//         onHide={() => this.setState({showTicket:false})}
//         i={this.state.neworders[this.state.i]}
//       />:""}

//             </div>
//         )
//     }
// }
// // this.setState({del_reason:e})
// const mapStateToProps = (state) => ({
//     state: state
// })
// const mapDispatchToProps = (dispatch) => ({
//      new_data: (e) => dispatch(new_data(e)),
// //    facebook_login: () =>dispatch(facebook_login())
// })

// export default connect(mapStateToProps,mapDispatchToProps)(ReturnData);
