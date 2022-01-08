import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import fb from "../config/firebase";
class Ticket extends Component {
  constructor(props) {
    super(props);
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
              <strong>City:</strong> {this.props.city}
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
              this.props.clearState();
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
class NewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      consignmentnum: 0,
      phone: 0,
      id: "",
      address: "",
      amount: 0,
      color: ["Select Color"],
      size: [0],
      designName: ["Select Product"],
      status: "Booked",
      amounterror: "",
      showMore: false,
      showCounter: 0,
      showTicket: false,
      products: [],
      category: "neworder",
      setCnsg: false,
      cnsgManual: 0,
      city: "no",
      render: false,
      product_clrerr: false,
      product_clrreason: "Please! fill all the fields",
      sizezero: false,
      sizezeroerr: "Size can't be zero",
      citylist: [],
      city_name: "",
      shipper_detail: [],
      disablesubmit: false,
    };
    this.getFirstProductColor = [];
    const firebase = fb.firebase_;
    let prop = this.props;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        //console.log(user)
      } else {
        prop.history.push("");
      }
    });
    this.city_name = [];
    this.city_short = [];
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

  getCity = () => {
    let list = [];
    if (this.state.city == "no") {
      list.push(
        <option value="no" selected>
          Select City
        </option>
      );
    } else {
      list.push(<option value="no">Select City</option>);
    }
    this.state.citylist.map((v, i) => {
      list.push(<option value={v.city_short}>{v.city_name}</option>);
    });
    return list;
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.designName.includes("Select Product") ||
      this.state.color.includes("Select Color") ||
      this.state.city == "no"
    ) {
      this.setState({ product_clrerr: true });
    } else {
      if (this.state.setCnsg == false) {
        if (this.state.amount >= 800) {
          this.setState({ disablesubmit: true });
          let proddtl = [];
          this.state.designName.map((v, i) => {
            if (proddtl.includes(v) == false) {
              proddtl.push({
                product_code: "0",
                product_name: v,
                product_price: "1000",
                product_weight: "0.5",
                product_quantity: "1",
                product_variations: "small-black",
                sku_code: "check123",
              });
            }
          });
          var data = {
            shipper_name: this.state.shipper_detail.name,
            shipper_email: this.state.shipper_detail.email,
            shipper_contact: this.state.shipper_detail.phone,
            shipper_address: this.state.shipper_detail.address,
            shipper_city: this.state.shipper_detail.city_short,
            customer_name: this.state.name,
            customer_email: "",
            customer_contact: this.state.phone,
            customer_address: this.state.address,
            customer_city: this.state.city,
            customer_country: "PK",
            customer_comment: "demo",
            shipping_charges: "150",
            payment_type: "COD",
            service_code: "BE",
            total_order_amount: this.state.amount,
            total_order_weight: "1",
            order_refernce_code: "bluedemo1",
            fragile: "N",
            parcel_type: "P",
            insurance_require: "N",
            insurance_value: "0",
            testbit: "Y",
            cn_generate: "Y",
            multi_pickup: "Y",
            products_detail: proddtl,
          };
          //  console.log(data)

          var config = {
            method: "post",
            url: "https://bigazure.com/api/json_v3/shipment/create_shipment.php",
            headers: {
              authorization: "Basic S0hJLTAwMDAwOjY0amt1eWVoNzVoa2pzdGdoODc=",
            },
            data: data,
          };
          //console.log(data)
          axios(config)
            .then((response) => {
              this.setState({ consignmentnum: response.data.cn });
              const obj = {
                name: this.state.name,
                consignmentnum: response.data.cn,
                cust_id: this.state.id,
                phone: this.state.phone,
                address: this.state.address,
                amount: this.state.amount,
                color: this.state.color,
                size: this.state.size,
                design_name: this.state.designName,
                status: this.state.status,
                category: this.state.category,
                city_name: this.state.city,
              };

              //console.log(obj)
              //console.log(this.state.consignmentnum)
              this.setState({ consignmentnum: response.data.cn });
              axios
                .post("https://meatncuts.com.pk/phpfiles/api/insert.php", obj)
                .then(this.setState({ showTicket: true, disablesubmit: false }))
                .catch((err) => console.log(err));
            })
            .catch(function (error) {
              console.log(error);
            });

          // this.props.new_data(true)
          // console.log("This.Props" )
        } else {
          this.setState({
            amounterror: "Amount must be greater than 800",
            amount: 0,
          });
        }
      } else {
        if (this.state.amount >= 800) {
          this.setState({ disablesubmit: true });
          const obj = {
            name: this.state.name,
            consignmentnum: this.state.consignmentnum,
            cust_id: this.state.id,
            phone: this.state.phone,
            address: this.state.address,
            amount: this.state.amount,
            color: this.state.color,
            size: this.state.size,
            design_name: this.state.designName,
            status: this.state.status,
            category: this.state.category,
            city_name: this.state.city,
          };

          axios
            .post("https://meatncuts.com.pk/phpfiles/api/insert.php", obj)
            .then(this.setState({ showTicket: true, disablesubmit: false }))
            .catch((err) => console.log(err));

          // this.props.new_data(true)
          // console.log("This.Props" )
        } else {
          this.setState({
            amounterror: "Amount must be greater than 800",
            amount: 0,
          });
        }
      }
      //console.log("Consignment Num", this.state.consignmentnum)
    }
  };

  showMore = (e) => {
    //console.log("Check")
    let list = [];
    for (let i = 0; i < e; i++) {
      list.push(
        <tr key={i}>
          <td>
            <label>Product:</label>

            <select
              className="form-select"
              value={this.state.designName[i + 1]}
              onChange={(z) => {
                let arr = [];
                for (let idx = 0; idx < this.state.products.length; idx++) {
                  if (this.state.products[idx].name == z.target.value) {
                    arr = this.state.products[idx];
                    break;
                  }
                }
                this.state.color[i + 1] = "Select Color";
                this.state.designName[i + 1] = z.target.value;
                this.setState({
                  designName: this.state.designName,
                  color: this.state.color,
                });
              }}
            >
              {this.getProducts(this.state.designName[i + 1])}
            </select>
          </td>
          <td>
            <label>Color:</label>
            <select
              className="form-select"
              value={this.state.color[i + 1]}
              onChange={(z) => {
                this.state.color[i + 1] = z.target.value;
                this.setState({ color: this.state.color });
              }}
            >
              {this.getColors(
                this.state.designName[i + 1],
                this.state.color[i + 1]
              )}
            </select>
          </td>
          <td>
            <div className="input-group">
              <label>Size:</label>
              <input
                required
                type="number"
                placeholder="Size"
                value={
                  this.state.size[i + 1] == 0 ? "" : this.state.size[i + 1]
                }
                onChange={(e) => {
                  this.state.size[i + 1] = e.target.value;
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
      .get(
        "https://meatncuts.com.pk/phpfiles/api/shipperdtl_city.php?cnd=shipper"
      )
      .then((response) => {
        console.log(response.data);
        this.setState({ shipper_detail: response.data });
      })
      .catch((err) => console.log("Error", err));
    axios
      .get("https://meatncuts.com.pk/phpfiles/api/view_prods.php")
      .then((response) => {
        // console.log(response.data)
        this.setState({ products: response.data });
      })
      .catch((err) => console.log("Error", err));
  };
  getProducts = (e) => {
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
    //console.log(e,z)
    let arr = [];
    if (this.state.products != undefined) {
      for (let i = 0; i < this.state.products.length; i++) {
        if (this.state.products[i].name == e) {
          //console.log("good", this.state.products[i].color[0])
          arr = this.state.products[i].color;
          break;
        }
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
    if (this.state.render == true) {
      axios
        .get("https://meatncuts.com.pk/phpfiles/api/view_prods.php")
        .then((response) => {
          this.setState({ products: response.data, render: false });
        })
        .catch((err) => console.log("Error", err));
    }
    return (
      <div style={{ margin: "30px" }}>
        <div>
          <div className="container1">
            <h4>Book New Order</h4>
            <form onSubmit={this.onSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <div className="input-group">
                        <label>Name:</label>
                        <input
                          required
                          type="text"
                          placeholder="Full Name"
                          value={this.state.name}
                          onChange={(e) =>
                            this.setState({
                              name: e.target.value.toUpperCase(),
                            })
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div className="input-group">
                        <label>Phone:</label>
                        <input
                          required
                          type="number"
                          placeholder="Phone"
                          value={this.state.phone == 0 ? "" : this.state.phone}
                          onChange={(e) =>
                            this.setState({ phone: e.target.value })
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div className="input-group">
                        <label>Cust_ID:</label>
                        <input
                          required
                          type="text"
                          placeholder="Cust ID"
                          value={this.state.id}
                          onChange={(e) =>
                            this.setState({ id: e.target.value })
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div className="input-group">
                        <label>Address:</label>
                        <input
                          required
                          type="text"
                          placeholder="Address"
                          value={this.state.address}
                          onChange={(e) =>
                            this.setState({
                              address: e.target.value.toUpperCase(),
                            })
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <label>City:</label>

                      <div>
                        <select
                          style={{ width: "100%" }}
                          onChange={(e) => {
                            let idx = this.city_short.indexOf(e.target.value);

                            this.setState({
                              city_name: this.city_name[idx],
                              city: e.target.value,
                            });
                          }}
                        >
                          {this.getCity()}
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="input-group">
                        <label>Amount:</label>
                        <input
                          required
                          type="number"
                          placeholder="Amount"
                          value={
                            this.state.amount == 0 ? "" : this.state.amount
                          }
                          onChange={(e) =>
                            this.setState({ amount: e.target.value })
                          }
                        />
                        <p style={{ color: "red", fontSize: "10px" }}>
                          {this.state.amounterror}
                        </p>
                      </div>
                    </td>
                  </tr>
                  {this.state.setCnsg == false ? (
                    <tr>
                      <td colSpan={3}>
                        <div
                          style={{
                            color: "blue",
                            float: "right",
                            display: "inline-block",
                          }}
                          onClick={(e) => this.setState({ setCnsg: true })}
                        >
                          +Add Consignment Number Manually
                        </div>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {this.state.setCnsg == true ? (
                    <tr>
                      <td colSpan={3}>
                        <div className="input-group">
                          <label>Manual Consignment Number:</label>
                          <input
                            required
                            type="text"
                            placeholder="Consignment Number"
                            value={this.state.consignmentnum}
                            onChange={(e) =>
                              this.setState({
                                consignmentnum: e.target.value.toUpperCase(),
                              })
                            }
                          />
                          <p>
                            Note: Add shipment manually on BlueEx portal then
                            add consignment number here! Make sure it's correct
                            you won't be able to rectify it.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                  {this.state.setCnsg == true ? (
                    <tr>
                      <td colSpan={3}>
                        <div
                          style={{
                            color: "red",
                            float: "right",
                            display: "inline-block",
                          }}
                          onClick={(e) => this.setState({ setCnsg: false })}
                        >
                          -Remove Consignment Number Manually
                        </div>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  <tr>
                    <td>
                      <label>Product:</label>
                      <select
                        className="form-select"
                        value={this.state.designName[0]}
                        onChange={(e) => {
                          this.state.color[0] = "Select Color";
                          this.state.designName[0] = e.target.value;

                          //let arr=[]
                          // this.state.products.map((v,i)=>{
                          //     if(v.name==this.state.designName[0]){
                          //         arr=this.state.products[i].color.split(",")
                          //         this.state.color[0]=arr[0]
                          //     }
                          // })

                          this.setState({
                            designName: this.state.designName,
                            color: this.state.color,
                          });
                        }}
                      >
                        {this.getProducts(this.state.designName[0])}
                      </select>
                    </td>
                    <td>
                      <label>Color:</label>
                      <select
                        className="form-select"
                        value={this.state.color[0]}
                        onChange={(e) => {
                          this.state.color[0] = e.target.value;
                          this.setState({ color: this.state.color });
                        }}
                      >
                        {this.getColors(
                          this.state.designName[0],
                          this.state.color[0]
                        )}
                      </select>
                    </td>
                    <td>
                      <div className="input-group">
                        <label>Size:</label>
                        <input
                          required
                          type="number"
                          placeholder="Size"
                          value={
                            this.state.size[0] == 0 ? "" : this.state.size[0]
                          }
                          onChange={(e) => {
                            this.state.size[0] = e.target.value;
                            this.setState({ size: this.state.size });
                          }}
                        />
                      </div>
                    </td>
                  </tr>

                  {this.state.showMore
                    ? this.showMore(this.state.showCounter)
                    : ""}
                  <tr>
                    <td colSpan={3}>
                      {this.state.showCounter > 0 ? (
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
                            color: this.state.color.concat("Select Color"),
                            designName:
                              this.state.designName.concat("Select Product"),
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
                      {this.state.product_clrerr == true ? (
                        <div style={{ color: "red", textAlign: "center" }}>
                          {this.state.product_clrreason}
                        </div>
                      ) : (
                        ""
                      )}
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
                        {this.state.disablesubmit ? (
                          <input
                            type="submit"
                            value="Submit Order"
                            disabled
                            className="btn btn-primary"
                            style={{ width: "40%", margin: "5px" }}
                          />
                        ) : (
                          <input
                            type="submit"
                            value="Submit Order"
                            className="btn btn-primary"
                            style={{ width: "40%", margin: "5px" }}
                          />
                        )}
                        {this.state.disablesubmit ? (
                          <button
                            disabled
                            className="btn btn-primary"
                            onClick={() => this.props.history.push("/data")}
                            style={{ width: "40%", margin: "5px" }}
                          >
                            Cancel
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary"
                            onClick={() => this.props.history.push("/data")}
                            style={{ width: "40%", margin: "5px" }}
                          >
                            Cancel
                          </button>
                        )}
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
            clearState={() =>
              this.setState({
                name: "",
                consignmentnum: 0,
                phone: 0,
                id: "",
                address: "",
                amount: 0,
                color: ["Select Color"],
                size: [0],
                designName: ["Select Product"],
                status: "Booked",
                amounterror: "",
                showMore: false,
                showCounter: 0,
                showTicket: false,
                category: "neworder",
                setCnsg: false,
                cnsgManual: 0,
                city: "no",
              })
            }
            name={this.state.name}
            address={this.state.address}
            phone={this.state.phone}
            cust_id={this.state.id}
            amount={this.state.amount}
            designName={this.state.designName}
            city={this.state.city}
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

export default connect(mapStateToProps, mapDispatchToProps)(NewOrder);
