import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/table.css";
import axios from "axios";
import { new_data } from "../store/action";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import moment from "moment";
import fb from "../config/firebase";

class Table extends Component {
  constructor(props) {
    super(props);
    const firebase = fb.firebase_;
    let prop = this.props;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        //console.log(user)
      } else {
        prop.history.push("/dataentry");
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
    };
  }

  componentDidMount = () => {
    axios
      .get(
        "https://meatncuts.com.pk/phpfiles/api/view_delete.php?date=" +
          this.state.selectedDate
      )
      .then((response) => {
        this.setState({ neworders: response.data });
        console.log("Response Data", this.state.deleted_data);
      })
      .catch((err) => console.log("Error", err));
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

  selectedData = (i, k, keyName) => {
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
            <select
              onChange={(e) => this.changeStatus(e.target.value, k)}
              style={{ width: "100%" }}
            >
              {this.getStatus(k)}
            </select>
          </div>
        );
      } else if (
        keyName == "status" &&
        this.state.neworders[k]["status"] == "Deleted"
      ) {
        return <td key={i}>{this.state.neworders[k][keyName]}</td>;
      }
      if (
        keyName != "ord_id" &&
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
    if (this.state.neworders[k]["delete_ord"] == "1") {
      this.s_num = this.s_num + 1;
      let x = this.s_num;
      return (
        <tr style={{ background: "#ffcccb" }} key={k}>
          <td>{this.s_num}</td>
          {Object.keys(this.state.neworders[k]).map((keyName, i) => {
            return this.selectedData(i, k, keyName);
          })}
        </tr>
      );
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
  render() {
    this.s_num = 0;
    if (
      this.props.state.new_data_rcv == true ||
      this.state.render1 == true ||
      this.state.showDate != ""
    ) {
      axios
        .get(
          "https://meatncuts.com.pk/phpfiles/api/view_delete.php?date=" +
            this.state.selectedDate
        )
        .then((response) => {
          this.setState({
            neworders: response.data,
            render1: false,
            showDate: "",
          });
          this.props.new_data(false);
          //console.log("Response Data",this.state.neworders)
        })
        .catch((err) => console.log("Error", err));
    }
    let counter = 0;
    return (
      <div>
        <div
          style={{
            width: "20%",
            textAlign: "center",
            margin: "auto",
            marginTop: "10px",
          }}
        >
          <label style={{ color: "white" }}>Select Date: </label>
          <input
            type="date"
            value={this.state.selectedDate}
            onChange={(e) =>
              this.setState({
                showDate: e.target.value,
                selectedDate: e.target.value,
              })
            }
          />
        </div>
        <div style={{ marginTop: "25px" }}>
          <button
            className="btn btn-dark"
            onClick={() => this.props.history.push("/dataentry/data")}
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
        <div>
          <h2>Deleted Orders</h2>
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
                  <th>Design Name</th>
                  <th>Status</th>
                  <th>Reason</th>
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

// import React, {Component} from 'react';
// import {connect} from 'react-redux'
// import "../css/table.css"
// import axios from 'axios';
// import { new_data } from '../store/action';
// import {Link} from "react-router-dom";

// class DeletedTable extends Component{
//     constructor(props){
//         super(props)
//         this.state={
//             render1:false,
//             deleted_data:[]
//         }
//         axios.get('https://meatncuts.com.pk/phpfiles/api/view_delete.php')
//         .then(response=>{
//             this.setState({deleted_data: response.data})
//             console.log("Response Data",this.state.deleted_data)
//         })
//         .catch(err=>console.log("Error", err))
//     }
//     selectedData = (i, k, keyName) =>{
//         console.log("keyName",keyName)
//         if(keyName!="ord_id" && keyName!="delete_ord" && keyName!="date" && keyName!="status"){
//             return(<td key={i}>{this.state.deleted_data[k][keyName]}</td>)
//         }
//     }
//     row = (k) =>{

//             return(
//             <tr key={k}>{Object.keys(this.state.deleted_data[k]).map((keyName, i) => {
//                 return(this.selectedData(i, k, keyName))

//     })}
//             </tr>
//             )

//     }
//     render(){

//         // let addTableContent = (e, k) =>{
//         //     console.log("e", e,"k", k)
//         //     return(<td key={k}>{e}</td>)
//         // }
//         // let addTableRow = (e) =>{
//         //     console.log("e", e)
//         //     console.log("Props STate",this.props.state.entry[e])
//         //     Object.entries(this.props.state.entry[e]).map(([key, val], i) => (
//         //         console.log("Key", key, "Val", val, i)
//         //     ))

//         //     return(<div key={e}>{
//         //        Object.entries(this.props.state.entry[e]).map(([key, val], i) => (
//         //             addTableContent(val, i)
//         //         ))}
//         //        </div>)
//         // }

//         let counter = 0;
//         return(
//             <div>
//                  <div style={{marginTop:"25px"}}>
//                    <button className="btn btn-dark" onClick={()=>this.props.history.push('/dataentry/data')} style={{position: 'absolute', right: 25, width:"20%", marginTop:"25px"}}>Back to Dashboard</button>
//                 </div>
//                 <div>
//                     <h2>Deleted Orders</h2>
//                     <div className="table-wrapper">
//                         <table className="fl-table">
//                             <thead>
//                             <tr style={{textTransform: 'upperCase'}}>
//                             <th>Cust ID</th>
//                             <th>Name</th>
//                             <th>Phone</th>
//                             <th>Address</th>
//                             <th>Amount</th>
//                             <th>Color</th>
//                             <th>Size</th>
//                             <th>Design Name</th>
//                                     {/* {Object.entries(this.props.state.entry[0]).map(([key,value],i) => {
//                                         let str = key.slice(2);
//                                         return (
//                                           <th>{str}</th>
//                                         )
//                                       })} */}
//                             {/* {keys.map((head) => (
//                                 <th>{head}</th>
//                             ))} */}
//                             </tr>
//                             </thead>
//                             <tbody>
//                                 {

//                                     this.state.deleted_data.map((v,k) => {
//                                         return(
//                                             this.row(k)

//                                             // <tr key={k}>{Object.keys(this.state.deleted_data[k]).map((keyName, i) => (
//                                             //     <td key={i}>{this.state.deleted_data[k][keyName]}</td>
//                                             // ))}
//                                             // <td><button className= "btn btn-primary" value={counter}>Edit</button></td>
//                                             // <td><button className= "btn btn-danger" value={counter}>Delete</button></td>
//                                             // </tr>
//                                             )
//                                     }

//                                     )
//                                 }

//                             {/* {

//                                 this.props.state.entry.map((v, k) => {
//                                     // if(k!=0){
//                                     //     //
//                                     // counter++;
//                                     // console.log("Counter", counter)
//                                     // console.log("Global", this.props.state)
//                                     // console.log("Counter", this.props.state.delete.indexOf(String(counter)) <= -1)
//                                     // if(this.props.state.delete.indexOf(counter) <= -1){
//                                     return(

//                                     <tr key={k}>{Object.keys(this.props.state.entry[k]).map((keyName, i) => (
//                                         <td key={i}>{this.props.state.entry[k][keyName]}</td>
//                                     ))}
//                                     <td><button className= "btn btn-primary" value={counter}>Edit</button></td>
//                                     <td><button className= "btn btn-danger" value={counter}>Delete</button></td>
//                                     </tr>
//                                     )
//                                     // )}else{
//                                     //     console.log("check")
//                                     //     return(
//                                     //         <h1>Hi</h1>

//                                             // <tr style={{background:"lightBlue"}} key={k}>{Object.keys(this.props.state.entry[k]).map((keyName, i) => (
//                                             //     <td key={i}>{this.props.state.entry[k][keyName]}</td>
//                                             // ))}
//                                             // <td><button value={counter} onClick={
//                                             //     (e) => {
//                                             //         if (this.props.state.delete.indexOf(e.target.value) <= -1){
//                                             //     this.props.state.delete.push(e.target.value)
//                                             //     //console.log(this.props.state)
//                                             //     this.setState(this.state)
//                                             //         }
//                                             //     }
//                                             //     }>Delete</button></td>
//                                             // </tr>

//                                     //         )
//                                     // }
//                                     // }
//                                 })
//                             } */}

//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// const mapStateToProps = (state) => ({
//     state: state
// })
// const mapDispatchToProps = (dispatch) => ({
//      new_data: (e) => dispatch(new_data(e)),
// //    facebook_login: () =>dispatch(facebook_login())
// })

// export default connect(mapStateToProps,mapDispatchToProps)(DeletedTable);
// ///
