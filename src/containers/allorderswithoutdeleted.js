import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/table.css";
import axios from "axios";
import { new_data } from "../store/action";
import { Link } from "react-router-dom";

class AllWithoutDeleteTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render1: false,
      neworders: [],
    };
    axios
      .get(
        "https://meatncuts.com.pk/phpfiles/api/view_allorderswithoutdeleted.php"
      )
      .then((response) => {
        this.setState({ neworders: response.data });
        console.log("Response Data", this.state.neworders);
      })
      .catch((err) => console.log("Error", err));
  }

  updateDelete = (k) => {
    console.log("Mai chal gya");
    axios
      .post(
        "https://meatncuts.com.pk/phpfiles/api/delete.php?id=" +
          this.state.neworders[k]["ord_id"],
        true
      )
      .then(
        this.setState({
          render1: true,
        })
      )
      .catch();
  };
  selectedData = (i, k, keyName) => {
    console.log("keyName", keyName);
    if (i == 0) {
      let list = [<td key={i}>{this.state.neworders[k]["only_date"]}</td>];
      list.push(<td key={i}>{this.state.neworders[k][keyName]}</td>);
      return list;
    } else {
      if (
        keyName == "cust_id" ||
        keyName == "name" ||
        keyName == "name" ||
        keyName == "phone" ||
        keyName == "status"
      ) {
        console.log("i=", i);

        return <td key={i}>{this.state.neworders[k][keyName]}</td>;
      }
    }
  };
  row = (k) => {
    console.log(this.props.match);
    if (this.state.neworders[k]["delete_ord"] == "1") {
      return (
        <tr style={{ background: "lightBlue" }} key={k}>
          {Object.keys(this.state.neworders[k]).map((keyName, i) => {
            return this.selectedData(i, k, keyName);
          })}
          <td>
            <button className="btn btn-primary" disabled>
              Edit
            </button>
          </td>
          <td>
            <button className="btn btn-danger" disabled>
              Delete
            </button>
          </td>
        </tr>
      );
    } else {
      return (
        <tr key={k}>
          {Object.keys(this.state.neworders[k]).map((keyName, i) => {
            return this.selectedData(i, k, keyName);
          })}
          <td>
            <Link to={"/edit/" + this.state.neworders[k]["ord_id"]}>
              <button className="btn btn-primary">Edit</button>
            </Link>
          </td>
          <td>
            <button
              onClick={() => this.updateDelete(k)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    }
  };
  render() {
    // let addTableContent = (e, k) =>{
    //     console.log("e", e,"k", k)
    //     return(<td key={k}>{e}</td>)
    // }
    // let addTableRow = (e) =>{
    //     console.log("e", e)
    //     console.log("Props STate",this.props.state.entry[e])
    //     Object.entries(this.props.state.entry[e]).map(([key, val], i) => (
    //         console.log("Key", key, "Val", val, i)
    //     ))

    //     return(<div key={e}>{
    //        Object.entries(this.props.state.entry[e]).map(([key, val], i) => (
    //             addTableContent(val, i)
    //         ))}
    //        </div>)
    // }

    if (this.props.state.new_data_rcv == true || this.state.render1 == true) {
      axios
        .get(
          "https://meatncuts.com.pk/phpfiles/api/view_allorderswithoutdeleted.php"
        )
        .then((response) => {
          this.setState({ neworders: response.data });
          this.setState({ render1: false });
          this.props.new_data(false);
          console.log("Response Data", this.state.neworders);
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
          <h2>All Orders [Without Deleted]</h2>
          <div className="table-wrapper">
            <table className="fl-table">
              <thead>
                <tr style={{ textTransform: "upperCase" }}>
                  <th>Date</th>
                  <th>Order ID</th>
                  <th>Cust ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th colSpan="2">Action</th>
                  {/* {Object.entries(this.props.state.entry[0]).map(([key,value],i) => {
                                        let str = key.slice(2);
                                        return (
                                          <th>{str}</th>
                                        )
                                      })} */}
                  {/* {keys.map((head) => (
                                <th>{head}</th>
                            ))} */}
                </tr>
              </thead>
              <tbody>
                {this.state.neworders.map((v, k) => {
                  return this.row(k);

                  // <tr key={k}>{Object.keys(this.state.neworders[k]).map((keyName, i) => (
                  //     <td key={i}>{this.state.neworders[k][keyName]}</td>
                  // ))}
                  // <td><button className= "btn btn-primary" value={counter}>Edit</button></td>
                  // <td><button className= "btn btn-danger" value={counter}>Delete</button></td>
                  // </tr>
                })}

                {/* {

                                this.props.state.entry.map((v, k) => {
                                    // if(k!=0){
                                    //     //
                                    // counter++;
                                    // console.log("Counter", counter)
                                    // console.log("Global", this.props.state)
                                    // console.log("Counter", this.props.state.delete.indexOf(String(counter)) <= -1)
                                    // if(this.props.state.delete.indexOf(counter) <= -1){
                                    return(

                                    <tr key={k}>{Object.keys(this.props.state.entry[k]).map((keyName, i) => (
                                        <td key={i}>{this.props.state.entry[k][keyName]}</td>
                                    ))}
                                    <td><button className= "btn btn-primary" value={counter}>Edit</button></td>
                                    <td><button className= "btn btn-danger" value={counter}>Delete</button></td>
                                    </tr>
                                    )
                                    // )}else{
                                    //     console.log("check")
                                    //     return(
                                    //         <h1>Hi</h1>


                                            // <tr style={{background:"lightBlue"}} key={k}>{Object.keys(this.props.state.entry[k]).map((keyName, i) => (
                                            //     <td key={i}>{this.props.state.entry[k][keyName]}</td>
                                            // ))}
                                            // <td><button value={counter} onClick={
                                            //     (e) => {
                                            //         if (this.props.state.delete.indexOf(e.target.value) <= -1){
                                            //     this.props.state.delete.push(e.target.value)
                                            //     //console.log(this.props.state)
                                            //     this.setState(this.state)
                                            //         }
                                            //     }
                                            //     }>Delete</button></td>
                                            // </tr>

                                    //         )
                                    // }
                                    // }
                                })
                            } */}
              </tbody>
            </table>
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
  new_data: (e) => dispatch(new_data(e)),
  //    facebook_login: () =>dispatch(facebook_login())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllWithoutDeleteTable);
