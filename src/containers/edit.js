import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import fb from "../config/firebase";
class Ticket extends Component {
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
  }

  getProductDetails = (ind) => {
    return (
      <div>
        <div>
          <strong>Product:</strong> {this.props.designName[ind]}{" "}
        </div>
        <div>
          <span style={{ marginLeft: "10px" }}>
            <strong>Color:</strong> {this.props.color[ind]}{" "}
          </span>{" "}
          <span>
            <strong>Size:</strong> {this.props.size[ind]}{" "}
          </span>
        </div>
      </div>
    );
  };
  render() {
    // console.log(this.props.i)

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirmation Message {}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <strong>Name:</strong> {this.props.name}
            </div>
            <div>
              <strong>Consignment Num:</strong> {this.props.cn}
            </div>
            <div>
              <strong>Address:</strong> {this.props.address}
            </div>
            <div>
              <strong>Contact no:</strong> {this.props.phone}
            </div>
            <div>
              <strong>Cust_ID:</strong> {this.props.cust_id}
            </div>
            {this.props.designName.map((v, i) => {
              return this.getProductDetails(i);
            })}
            <br />
            <div style={{ borderTop: "1px solid", borderBottom: "1px solid" }}>
              <strong>Total Amount:</strong> {this.props.amount}{" "}
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
              //this.props.onHide()
              this.props.his.push("/data");
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
class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      consignmentnum: 0,
      phone: 0,
      id: 0,
      address: "",
      amount: 0,
      color: [""],
      size: [0],
      designName: [""],
      status: "Booked",
      amounterror: "",
      showMore: false,
      showCounter: 0,
      scounter: 0,
      showTicket: false,
      products: [],
      category: "neworder",
      setCnsg: false,
      cnsgManual: 0,
      fetchCounter: 0,
    };
    this.firstProductColors = [];
  }

  onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      name: this.state.name,
      cust_id: this.state.id,
      phone: this.state.phone,
      address: this.state.address,
      amount: this.state.amount,
      color: this.state.color,
      size: this.state.size,
      design_name: this.state.designName,
    };
    axios
      .post(
        "https://meatncuts.com.pk/phpfiles/api/update.php?id=" +
          this.props.match.params.id,
        obj
      )
      .then((res) => {
        this.props.history.goBack();
      })
      .catch((err) => console.log(err));
    console.log(obj);
  };

  showMore = (e) => {
    //console.log("Check")
    let list = [];
    this.state.size.map((v, i) => {
      if (i < this.state.fetchCounter) {
        list.push(
          <tr>
            <td>
              <label>Product:</label>

              <select
                className="form-select"
                value={this.state.designName[i]}
                onChange={(e) => {
                  let arr = [];
                  for (let idx = 0; idx < this.state.products.length; idx++) {
                    if (this.state.products[idx].name == e.target.value) {
                      arr = this.state.products[idx].color;
                      break;
                    }
                  }
                  this.state.color[i] = arr[0];
                  this.state.designName[i] = e.target.value;
                  this.setState({ designName: this.state.designName });
                }}
              >
                {this.getProducts(this.state.designName[i])}
              </select>
            </td>
            <td>
              <label>Colors:</label>
              <select
                className="form-select"
                value={this.state.color[i]}
                onChange={(e) => {
                  this.state.color[i] = e.target.value;
                  this.setState({ color: this.state.color });
                }}
              >
                {this.getColors(this.state.designName[i], this.state.color[i])}
              </select>
            </td>
            <td>
              <label>Size:</label>
              <div className="input-group">
                <input
                  type="number"
                  placeholder="Size"
                  value={v}
                  onChange={(e) => {
                    this.state.size[i] = Number(e.target.value);
                    this.setState({ size: this.state.size });
                  }}
                />
              </div>
            </td>
          </tr>
        );
      }
    });
    for (let i = this.state.fetchCounter; i < e; i++) {
      list.push(
        <tr key={i + 1}>
          <td>
            <label>Select Product:</label>
            <select
              className="form-select"
              value={this.state.designName[i]}
              onChange={(z) => {
                let a = [];
                for (let idx = 0; idx < this.state.products.length; idx++) {
                  if (this.state.products[idx].name == z.target.value) {
                    a = this.state.products[idx];
                    break;
                  }
                }
                this.state.color[i] = a[0];
                this.state.designName[i] = z.target.value;
                this.setState({ designName: this.state.designName });
              }}
            >
              {this.getProducts(this.state.designName[i])}
            </select>
          </td>
          <td>
            <label>Select Color:</label>
            <select
              className="form-select"
              value={this.state.color[i]}
              onChange={(z) => {
                this.state.color[i] = z.target.value;
                this.setState({ color: this.state.color });
              }}
            >
              {this.getColors(this.state.designName[i], this.state.color[i])}
            </select>
          </td>
          <td>
            <label>Select Size:</label>
            <div className="input-group">
              <input
                type="number"
                placeholder="Size"
                value={this.state.size[i] == 0 ? "" : this.state.size[i]}
                onChange={(e) => {
                  console.log(this.state.size);
                  this.state.size[i] = Number(e.target.value);
                  this.setState({ size: this.state.size });
                }}
              />
            </div>
          </td>
        </tr>
      );
    }

    return list;
  };

  componentDidMount = () => {
    axios
      .get("https://meatncuts.com.pk/phpfiles/api/view_prods.php")
      .then((response) => {
        this.setState({ products: response.data });

        this.firstProductColors = this.state.products[0].color;
      })
      .catch((err) => console.log("Error", err));
    axios
      .get(
        "https://meatncuts.com.pk/phpfiles/api/edit.php?id=" +
          this.props.match.params.id
      )
      .then((res) => {
        // res.data.amount=Number(res.data.amount);
        // res.data.phone=Number(res.data.phone);
        // res.data.size=Number(res.data.size[0]);
        let listofsize = [];
        res.data.size.map((v, i) => {
          listofsize.push(Number(v));
        });
        this.setState({
          name: res.data.name,
          cnsg: res.data.consignmentnum,
          phone: Number(res.data.phone),
          id: res.data.cust_id,
          address: res.data.address,
          amount: Number(res.data.amount),
          color: res.data.color,
          size: listofsize,
          designName: res.data.design_name,
          showMore: false,
          showTicket: false,
          showCounter: res.data.design_name.length,
          fetchCounter: res.data.design_name.length,
          showMore: true,
        });
        // this.setState({
        //    name:res.data.name,
        //    id:res.data.cust_id,
        //     address:res.data.address,
        //    amount:res.data.amount,
        //     color:res.data.color,
        //     phone:res.data.phone,
        //     designName:res.data.design_name,
        //     size:res.data.size,
        //     status:res.data.status
        // })
      })
      .catch();
  };
  recursivProductDetail = () => {
    let list = [];
    this.state.size.map((v, i) => {
      list.push(
        <tr>
          <td>
            <label>Product:</label>

            <select
              className="form-select"
              onChange={(e) => {
                this.state.designName[0] = e.target.value;
                this.setState({ designName: this.state.designName });
              }}
            >
              {this.getProducts(this.state.designName[i])}
            </select>
          </td>
          <td>
            <label>Colors:</label>
            <select
              className="form-select"
              onChange={(e) => {
                this.state.color[i] = e.target.value;
                this.setState({ color: this.state.color });
              }}
            >
              {this.getColors(this.state.designName[i], this.state.color[i])}
            </select>
          </td>
          <td>
            <label>Size:</label>
            <div className="input-group">
              <input
                type="number"
                placeholder="Size"
                value={v}
                onChange={(e) => {
                  this.state.size[i] = e.target.value;
                  this.setState({ size: this.state.size });
                }}
              />
            </div>
          </td>
        </tr>
      );
    });
    return list;
  };
  getProducts = (e) => {
    //console.log("Check",typeof this.state.size[0])
    let list = [];

    list.push(<option value={e}>{e}</option>);

    this.state.products.map((v, k) => {
      if (v.name != e) {
        list.push(<option value={v.name}>{v.name}</option>);
      }
    });

    return list;
  };
  getColors = (e, z) => {
    let arr = [];
    for (let i = 0; i < this.state.products.length; i++) {
      if (this.state.products[i].name == e) {
        arr = this.state.products[i].color;
        break;
      }
    }
    let list = [];

    list.push(<option value={z}>{z}</option>);

    arr.map((v, k) => {
      if (v != z) {
        list.push(<option value={v}>{v}</option>);
      }
    });

    return list;
  };
  render() {
    return (
      <div style={{ margin: "30px" }}>
        <div>
          <div className="container1">
            <h4>Edit Consignment: {this.state.cnsg}</h4>
            <form onSubmit={this.onSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <div className="input-group">
                        <label>
                          <strong>Name:</strong>
                        </label>
                        <div>{this.state.name}</div>
                      </div>
                    </td>
                    <td>
                      <div className="input-group">
                        <label>
                          <strong>Phone:</strong>
                        </label>
                        <div>{this.state.phone}</div>
                      </div>
                    </td>
                    <td>
                      <div className="input-group">
                        <label>
                          <strong>Cust_ID:</strong>
                        </label>
                        <div>{this.state.id}</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div className="input-group">
                        <label>
                          <strong>Address:</strong>
                        </label>
                        <div>{this.state.address}</div>
                      </div>
                    </td>
                    <td>
                      <div className="input-group">
                        <label>
                          <strong>Amount:</strong>
                        </label>
                        <div>{this.state.amount}</div>
                      </div>
                    </td>
                  </tr>

                  {/* {this.recursivProductDetail()} */}
                  {this.state.showMore
                    ? this.showMore(this.state.showCounter)
                    : ""}
                  <tr>
                    <td colSpan={3}>
                      {console.log("ShowCounter", this.state.showCounter)}

                      {console.log("fetchCounter", this.state.fetchCounter)}
                      {this.state.showCounter > 1 &&
                      this.state.fetchCounter - this.state.showCounter == 0 ? (
                        <div
                          style={{ color: "red", display: "inline-block" }}
                          onClick={(e) => {
                            this.state.color.pop();
                            this.state.size.pop();
                            this.state.designName.pop();
                            this.setState({
                              showMore: true,
                              fetchCounter: this.state.fetchCounter - 1,
                              showCounter: this.state.showCounter - 1,
                              color: this.state.color,
                              size: this.state.size,
                              designName: this.state.designName,
                            });
                          }}
                        >
                          -Reduce
                        </div>
                      ) : (
                        ""
                      )}
                      {this.state.showCounter > 1 &&
                      this.state.showCounter - this.state.fetchCounter > 0 ? (
                        <div
                          style={{ color: "red", display: "inline-block" }}
                          onClick={(e) => {
                            this.state.color.pop();
                            this.state.size.pop();
                            this.state.designName.pop();
                            this.setState({
                              showMore: true,
                              showCounter: this.state.showCounter - 1,
                              color: this.state.color,
                              size: this.state.size,
                              designName: this.state.designName,
                            });
                          }}
                        >
                          -Reduce
                        </div>
                      ) : (
                        ""
                      )}
                      <div
                        style={{
                          color: "blue",
                          float: "right",
                          display: "inline-block",
                        }}
                        onClick={(e) =>
                          this.setState({
                            showMore: true,
                            showCounter: this.state.showCounter + 1,
                            color: this.state.color.concat(
                              this.firstProductColors[0]
                            ),
                            designName: this.state.designName.concat(
                              this.state.products[0].name
                            ),
                            size: this.state.size.concat(0),
                          })
                        }
                      >
                        +Add Product
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
                          value="Submit Order"
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
        </div>
        {this.state.showTicket ? (
          <Ticket
            show={this.state.showTicket}
            onHide={() => this.setState({ showTicket: false })}
            name={this.state.name}
            address={this.state.address}
            phone={this.state.phone}
            cust_id={this.state.id}
            amount={this.state.amount}
            designName={this.state.designName}
            color={this.state.color}
            size={this.state.size}
            cn={this.state.consignmentnum}
            his={this.props.history}
          />
        ) : (
          ""
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Edit);

// import React, {Component} from 'react';
// import {connect} from 'react-redux'
// import "../css/form.css"
// import firebase from "../config/firebase"
// import {set_data,storeData, readData, new_data} from '../store/action'
// import axios from 'axios';
// import {Link} from "react-router-dom";

// class Edit extends Component{
//     constructor(props){
//         super(props);
//         this.state={
//             name:"",
//            phone:0,
//             id:0,
//             address:"",
//            amount:0,
//             color:"",
//             size:0,
//             designName:"",
//             status:"Booked"
//         }
//     }
//     componentDidMount(){
// axios.get("https://meatncuts.com.pk/phpfiles/api/edit.php?id="+this.props.match.params.id)
// .then(res => {
//     res.data.amount=Number(res.data.amount);
//     res.data.phone=Number(res.data.phone);
//     res.data.size=Number(res.data.size[0]);

//     this.setState({
//        name:res.data.name,
//        id:res.data.cust_id,
//         address:res.data.address,
//        amount:res.data.amount,
//         color:res.data.color,
//         phone:res.data.phone,
//         designName:res.data.design_name,
//         size:res.data.size,
//         status:res.data.status
//     })
//     console.log(res.data)
//     console.log(res.data['design_name'][0])
// })
// .catch()
//     }

//     getOptionList = () =>{
//         let list=[]
//         if(this.state.status=="Booked"){
//             list.push(<option selected value="Booked">Booked</option>)
//             list.push(<option value="In Process">In Process</option>)
//             list.push(<option value="Dispatched">Dispatched</option>)
//             list.push(<option value="Return">Return</option>)
//             list.push(<option value="Delivered">Delivered</option>)
//         }else if(this.state.status=="In Process"){
//             list.push(<option value="Booked">Booked</option>)
//             list.push(<option selected value="In Process">In Process</option>)
//             list.push(<option value="Dispatched">Dispatched</option>)
//             list.push(<option value="Return">Return</option>)
//             list.push(<option value="Delivered">Delivered</option>)
//         }else if(this.state.status=="Dispatched"){
//             list.push(<option value="Booked">Booked</option>)
//             list.push(<option value="In Process">In Process</option>)
//             list.push(<option selected value="Dispatched">Dispatched</option>)
//             list.push(<option value="Return">Return</option>)
//             list.push(<option value="Delivered">Delivered</option>)
//         }else if(this.state.status=="Return"){
//             list.push(<option value="Booked">Booked</option>)
//             list.push(<option value="In Process">In Process</option>)
//             list.push(<option value="Dispatched">Dispatched</option>)
//             list.push(<option selected value="Return">Return</option>)
//             list.push(<option value="Delivered">Delivered</option>)
//         }else if(this.state.status=="Delivered"){
//             list.push(<option value="Booked">Booked</option>)
//             list.push(<option value="In Process">In Process</option>)
//             list.push(<option value="Dispatched">Dispatched</option>)
//             list.push(<option value="Return">Return</option>)
//             list.push(<option selected value="Delivered">Delivered</option>)
//         }

//         return(list)
//     }
//     onSubmit = (e) => {
//         e.preventDefault();
// const obj = {
//     name: this.state.name,
//     cust_id: this.state.id,
//     phone: this.state.phone,
//     address: this.state.address,
//     amount: this.state.amount,
//     color:this.state.color,
//     size:this.state.size,
//     design_name:this.state.designName,
//     status:this.state.status
// }
// axios.post('https://meatncuts.com.pk/phpfiles/api/update.php?id='+this.props.match.params.id, obj)
// .then(
//     res => {console.log(res.data)
//     this.props.history.goBack()}

//     )
// .catch(
//     err => console.log(err)
// )

//         // axios.post('https://meatncuts.com.pk/phpfiles/api/insert.php', obj)
//         // .then(
//         //     res => console.log(res.data)

//         //     )
//         // .catch(
//         //     err => console.log(err)
//         // )
//         // this.props.new_data(true)
//         // console.log("This.Props" )
//         // this.setState({
//         //         name:"",
//         //        phone:0,
//         //         id:0,
//         //         address:"",
//         //        amount:0,
//         //         color:"",
//         //         size:0,
//         //         designName:"",
//         //         status:"Booked"

//         // })

//         //this.myFormRef.reset();
//         //console.log(obj)
//     }

//     render(){
//         console.log(this.props.match.params.id)
//         return(
//             <div>
//                 <div>

// <div className="container1">
// <h4>Edit The Following Order</h4>

// <form onSubmit={this.onSubmit}>
//     <table>
//         <tbody>
//         <tr>
//             <td>
//                 <div className="input-group">
//                     <label className="form-label">Name</label>
//                     <input type="text" placeholder="Full Name" value={this.state.name}  onChange={(e)=>this.setState({name:e.target.value})} />
//                 </div>
//             </td>
//             <td>
//                 <div className="input-group">

//                 <label className="form-label">Phone</label>
//                 <input type="tel" placeholder="Phone" value={this.state.phone == 0 ? "":this.state.phone} onChange={(e)=>this.setState({phone:e.target.value})}/>
//                 </div>
//             </td>
//             <td>
//                 <div className="input-group">
//                 <label className="form-label">Cust ID</label>
//                 <input required type="number" placeholder="ID" value={this.state.id == 0 ? "":this.state.id} onChange={(e)=>this.setState({id:e.target.value})} />
//                 </div>
//             </td>
//         </tr>
//         <tr>
//             <td colSpan={2}>
//                 <div className="input-group">
//                 <label className="form-label">Address</label>
//                 <input type="text" placeholder="Address" value={this.state.address} onChange={(e)=>this.setState({address:e.target.value})}/>
//                 </div>
//             </td>
//             <td>
//                 <div className="input-group">
//                 <label className="form-label">Amount</label>
//                 <input type="number" placeholder="Amount" value={this.state.amount == 0 ? "":this.state.amount} onChange={(e)=>this.setState({amount:e.target.value})} />
//                 </div>
//             </td>
//         </tr>
//         <tr>
//         <td >
//                 <div className="input-group">
//                 <label className="form-label">Design Name</label>
//                 <input type="text" placeholder="Design Name" value={this.state.designName} onChange={(e)=>this.setState({designName:e.target.value, status:"Booked"})}/>
//                 </div>
//             </td>
//             <td>
//                 <div className="input-group">
//                 <label className="form-label">Color</label>
//                 <input type="text" placeholder="Color" value={this.state.color} onChange={(e)=>this.setState({color:e.target.value})}/>
//                 </div>
//             </td>
//             <td>
//                 <div className="input-group">
//                 <label className="form-label">Size</label>
//                 <input type="number" placeholder="Size" value={this.state.size == 0 ? "":this.state.size} onChange={(e)=>this.setState({size:e.target.value})} />
//                 </div>
//             </td>

//         </tr>

//         <tr>
//             <td colSpan={3}>
//                 <div className="input-group"  style={{textAlign:"center", display: "flex",
//           justifyContent: "center",
//           alignItems: "center"}}>
//     <input type="submit" value="Submit Order"  className="btn btn-primary" style={{width:"40%", margin:"5px"}}/>
//    <button className="btn btn-primary" onClick={()=>this.props.history.push('/data')} style={{width:"40%", margin:"5px"}}>Cancel</button>
//                     </div>

//             </td>
//         </tr>
//         </tbody>
//     </table>
//     </form>
//   {/* <button onClick={() =>{

//       this.props.storeData(this.state, this.props.state)
//       this.props.set_data(this.state)
//     }}>Submit</button> */}

//     {/* <button onClick={()=>this.props.readData()}> Read Data
//     </button> */}
// </div>
//                 </div>

//             </div>
//         )
//     }
// }

// const mapStateToProps = (state) => ({
//     state: state
// })

// const mapDispatchToProps = (dispatch) => ({
//     storeData: (e,f) => dispatch(storeData(e, f)),
//     set_data: (e) => dispatch(set_data(e)),
//     readData: () => dispatch(readData()),
//     new_data: (e) => dispatch(new_data(e))
// //    facebook_login: () =>dispatch(facebook_login())
// })

// export default connect(mapStateToProps,mapDispatchToProps)(Edit);
