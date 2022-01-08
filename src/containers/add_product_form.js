import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import fb from "../config/firebase";

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      p_name: "",
      p_pic: [{}],
      p_color: ["no"],
      p_type: ["no"],
      b_type: ["no"],
      b_color: ["no"],
      h_type: ["no"],
      h_color: ["no"],
      p_heel: ["no"],
      sole_type: ["no"],
      data: [],
      banwar_typearr: [],
      banwar_clrarr: [],
      sole_typearr: [],
      heel_clrarr: [],
      heel_typearr: [],
      pumpy_heelarr: [],
      prod_typearr: [],
      prod_clrarr: [],
      shownoerr: false,
      noerr: "All fields are required!",
      showCounter: 0,
      showexisterr: false,
      existerr: "Product Name already exist",
      boolp_typeerr: false,
      p_typeerr: "Fill Product Type First",
      prodNames: [],
      theInputKey: "",
      disablesubmit: false,
      colordup: false,
      colorduperr: "Select another color! this is already selected",
    };
    //console.log(this.state);
    const firebase = fb.firebase_;
    let prop = this.props;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        //console.log(user)
      } else {
        prop.history.push("/");
      }
    });
  }

  componentDidMount = () => {
    axios
      .get("https://meatncuts.com.pk/phpfiles/api/view_prods.php")
      .then((response) => {
        response.data.map((v, i) => {
          this.state.prodNames[i] = v.name;
        });
      })
      .catch((err) => console.log("Error", err));
    axios
      .get("https://meatncuts.com.pk/phpfiles/api/view_prod_dtl.php")
      .then((res) => {
        //console.log(res.data)
        res.data.map((v, i) => {
          if (v.type == "prod_type") {
            this.state.prod_typearr[this.state.prod_typearr.length] = v.data;
          } else if (v.type == "prod_color") {
            this.state.prod_clrarr[this.state.prod_clrarr.length] = v.data;
          } else if (v.type == "banwar_color") {
            this.state.banwar_clrarr[this.state.banwar_clrarr.length] = v.data;
          } else if (v.type == "banwar_type") {
            this.state.banwar_typearr[this.state.banwar_typearr.length] =
              v.data;
          } else if (v.type == "sole_type") {
            this.state.sole_typearr[this.state.sole_typearr.length] = v.data;
          } else if (v.type == "heel_color") {
            this.state.heel_clrarr[this.state.heel_clrarr.length] = v.data;
          } else if (v.type == "heel_type") {
            this.state.heel_typearr[this.state.heel_typearr.length] = v.data;
          } else if (v.type == "pumpy_heel") {
            this.state.pumpy_heelarr[this.state.pumpy_heelarr.length] = v.data;
          }
        });
        this.setState({ prod_typearr: this.state.prod_typearr });
      })
      .catch((err) => console.log("Error", err));
  };

  sendProductData(obj, data) {
    obj["url"] = data;
    return axios.post(
      "https://meatncuts.com.pk/phpfiles/api/new_product_to_database.php",
      obj
    );
  }
  async uploadFile(file) {
    const formData = new FormData();

    formData.append("avatar", file);
    console.log(file);

    return await axios.post(
      "https://meatncuts.com.pk/phpfiles/api/new_product.php",
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
  }

  checkHeels = (i) => {
    if (this.state.h_type[i] == "no" || this.state.h_color[i] == "no") {
      //console.log("Heel Masla")
      return 0;
    }
    return 1;
  };
  pumpyHeels = (i) => {
    if (this.state.p_heel[i] == "no") {
      // console.log("Pumpy Masla")
      return 0;
    }
    return 1;
  };
  onSubmit = async (e) => {
    e.preventDefault();

    //console.log(e)
    //console.log(this.state.p_pic)
    this.setState({ shownoerr: false });
    if (this.state.prodNames.includes(this.state.p_name)) {
      this.setState({ showexisterr: true });
    } else {
      if (
        this.state.p_type.includes("no") ||
        this.state.p_color.includes("no") ||
        this.state.p_type.includes("no") ||
        this.state.b_type.includes("no") ||
        this.state.b_color.includes("no")
      ) {
        //console.log("Main Masla")
        this.setState({ shownoerr: true });
      } else {
        let err = 0;
        for (var i = 0; i < this.state.p_type.length; i++) {
          if (this.checkHeels(i) == 0) {
            err = 1;
            break;
          }

          if (this.pumpyHeels(i) == 0) {
            err = 1;
            break;
          }
        }

        if (err == 1) {
          this.setState({ shownoerr: true });
        } else {
          // console.log("sab set h")
          this.setState({ disablesubmit: true });
          let obj = {
            p_name: this.state.p_name,
            p_color: this.state.p_color,
            p_type: this.state.p_type[0],
            b_type: this.state.b_type,
            b_color: this.state.b_color,
            h_type: this.state.h_type,
            h_color: this.state.h_color,
            p_heel: this.state.p_heel,
            p_sole_type: this.state.sole_type,
          };
          let pic_urls = [];
          for (let j = 0; j < this.state.p_pic.length; j++) {
            await this.uploadFile(this.state.p_pic[j]).then((res) => {
              console.log("Pic URLS", res.data);
              pic_urls.push(res.data[3]);
              //this.setState({data:res.data})
              //console.log(this.state.data)
            });
          }
          let sendData = this.sendProductData(obj, pic_urls);
          axios
            .get("https://meatncuts.com.pk/phpfiles/api/view_prods.php")
            .then((response) => {
              response.data.map((v, i) => {
                this.state.prodNames[i] = v.name;
              });
            })
            .catch((err) => console.log("Error", err));
          let randomString = Math.random().toString(36);
          this.setState({
            p_name: "",
            p_pic: [{}],
            p_color: ["no"],
            p_type: ["no"],
            b_type: ["no"],
            b_color: ["no"],
            h_type: ["no"],
            h_color: ["no"],
            p_heel: ["no"],
            sole_type: ["no"],
            data: [],
            banwar_typearr: [],
            banwar_clrarr: [],
            sole_typearr: [],
            heel_clrarr: [],
            heel_typearr: [],
            pumpy_heelarr: [],
            prod_typearr: [],
            prod_clrarr: [],
            shownoerr: false,
            noerr: "All fields are required!",
            showCounter: 0,
            boolp_typeerr: false,
            p_typeerr: "Fill Product Type First",
            theInputKey: randomString,
          });
          //console.log(this.state.p_heel);
          axios
            .get("https://meatncuts.com.pk/phpfiles/api/view_prod_dtl.php")
            .then((res) => {
              //console.log(res.data)
              res.data.map((v, i) => {
                if (v.type == "prod_type") {
                  this.state.prod_typearr[this.state.prod_typearr.length] =
                    v.data;
                } else if (v.type == "prod_color") {
                  this.state.prod_clrarr[this.state.prod_clrarr.length] =
                    v.data;
                } else if (v.type == "banwar_color") {
                  this.state.banwar_clrarr[this.state.banwar_clrarr.length] =
                    v.data;
                } else if (v.type == "banwar_type") {
                  this.state.banwar_typearr[this.state.banwar_typearr.length] =
                    v.data;
                } else if (v.type == "sole_type") {
                  this.state.sole_typearr[this.state.sole_typearr.length] =
                    v.data;
                } else if (v.type == "heel_color") {
                  this.state.heel_clrarr[this.state.heel_clrarr.length] =
                    v.data;
                } else if (v.type == "heel_type") {
                  this.state.heel_typearr[this.state.heel_typearr.length] =
                    v.data;
                } else if (v.type == "pumpy_heel") {
                  this.state.pumpy_heelarr[this.state.pumpy_heelarr.length] =
                    v.data;
                }
              });
              this.setState({
                prod_typearr: this.state.prod_typearr,
                disablesubmit: false,
              });
            })
            .catch((err) => console.log("Error", err));
        }
      }
    }
  };
  getOptionList = (e) => {
    let list = [];
    if (e == this.state.prod_typearr) {
      list.push(<option value="no">Select Product Type</option>);
    } else if (e == this.state.sole_typearr) {
      list.push(<option value="no">Select Sole Type</option>);
    } else if (e == this.state.banwar_typearr) {
      list.push(<option value="no">Select Banwar Type</option>);
    } else if (e == this.state.banwar_clrarr) {
      list.push(<option value="no">Select Banwar Color</option>);
    } else if (e == this.state.prod_clrarr) {
      list.push(<option value="no">Select Product Color</option>);
    } else if (e == this.state.heel_clrarr) {
      list.push(<option value="no">Select Heel Color</option>);
    } else if (e == this.state.heel_typearr) {
      list.push(<option value="no">Select Heel Type</option>);
    } else if (e == this.state.pumpy_heelarr) {
      //console.log("P_Heel Arr", this.state.p_heel);
      list.push(<option value="no">Select Pumpy Heel</option>);
    }

    e.map((v, i) => {
      list.push(<option value={v}>{v}</option>);
    });
    if (e == this.state.heel_clrarr) {
      list.push(<option value="NIL">NIL</option>);
    } else if (e == this.state.heel_typearr) {
      list.push(<option value="NIL">NIL</option>);
    } else if (e == this.state.pumpy_heelarr) {
      list.push(<option value="NIL">NIL</option>);
    }

    return list;
  };

  showMore = () => {
    let list = [];
    for (let i = 1; i <= this.state.showCounter; i++) {
      list.push(
        <tr>
          <td>
            <label className="form-label">Product Color</label>
            <select
              className="form-select"
              onChange={(e) => {
                if (this.state.p_color.includes(e.target.value)) {
                  this.setState({ colordup: true });
                } else {
                  this.state.p_color[i] = e.target.value;
                  this.setState({
                    p_color: this.state.p_color,
                    colordup: false,
                  });
                }
              }}
            >
              {this.getOptionList(this.state.prod_clrarr)}
            </select>
            {this.state.colordup ? (
              <span style={{ color: "red" }}>{this.state.colorduperr}</span>
            ) : (
              ""
            )}
          </td>
          <td>
            <label className="form-label">Sole Type</label>
            <select
              className="form-select"
              onChange={(e) => {
                this.state.sole_type[i] = e.target.value;
                this.setState({ sole_type: this.state.sole_type });
              }}
            >
              {this.getOptionList(this.state.sole_typearr)}
            </select>
          </td>
        </tr>
      );
      list.push(
        <tr>
          <td>
            <label className="form-label">Banwar Type</label>
            <select
              className="form-select"
              onChange={(e) => {
                this.state.b_type[i] = e.target.value;
                this.setState({ b_type: this.state.b_type });
              }}
            >
              {this.getOptionList(this.state.banwar_typearr)}
            </select>
          </td>
          <td>
            <label className="form-label">Banwar Color</label>
            <select
              className="form-select"
              onChange={(e) => {
                this.state.b_color[i] = e.target.value;
                this.setState({ b_color: this.state.b_color });
              }}
            >
              {this.getOptionList(this.state.banwar_clrarr)}
            </select>
          </td>
        </tr>
      );

      list.push(
        <tr>
          <td>
            <label className="form-label">Heel Type</label>
            <select
              className="form-select"
              onChange={(e) => {
                this.state.h_type[i] = e.target.value;
                this.setState({ h_type: this.state.h_type });
              }}
            >
              {this.getOptionList(this.state.heel_typearr)}
            </select>
          </td>

          <td>
            <label className="form-label">Heel Color</label>
            <select
              className="form-select"
              onChange={(e) => {
                this.state.h_color[i] = e.target.value;
                this.setState({ h_color: this.state.h_color });
              }}
            >
              {this.getOptionList(this.state.heel_clrarr)}
            </select>
          </td>
        </tr>
      );
      list.push(
        <tr>
          <td>
            <label className="form-label">Pumpy Heel</label>
            <select
              className="form-select"
              onChange={(e) => {
                this.state.p_heel[i] = e.target.value;
                this.setState({ p_heel: this.state.p_heel });
              }}
            >
              {this.getOptionList(this.state.pumpy_heelarr)}
            </select>
          </td>
        </tr>
      );

      list.push(
        <tr>
          {" "}
          <td colSpan="2">
            <div className="input-group">
              <label className="form-label">Picture</label>
              <input
                required
                type="file"
                name="fileToUpload"
                id="fileToUpload"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    this.state.p_pic[i] = e.target.files[0];
                    this.setState({ p_pic: this.state.p_pic });
                  }
                }}
              />
            </div>
          </td>
        </tr>
      );
    }
    return list;
  };
  render() {
    //console.log("ProdNames",this.state.prodNames)
    return (
      <div style={{ margin: "30px" }}>
        <div>
          <div className="container1">
            <h4>Add Product</h4>
            <form onSubmit={this.onSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <div className="input-group">
                        <label className="form-label">Product Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Enter Product Name"
                          value={this.state.p_name}
                          onChange={(e) =>
                            this.setState({
                              p_name: e.target.value.toUpperCase(),
                              showexisterr: false,
                            })
                          }
                        />
                        {this.state.showexisterr == true ? (
                          <div style={{ color: "red" }}>
                            {this.state.existerr}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </td>

                    <td>
                      <label className="form-label">Product Color</label>
                      <select
                        className="form-select"
                        onChange={(e) => {
                          this.state.p_color[0] = e.target.value;
                          this.setState({ p_color: this.state.p_color });
                        }}
                      >
                        {this.getOptionList(this.state.prod_clrarr)}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="form-label">Sole Type</label>
                      <select
                        className="form-select"
                        onChange={(e) => {
                          this.state.sole_type[0] = e.target.value;
                          this.setState({ sole_type: this.state.sole_type });
                        }}
                      >
                        {this.getOptionList(this.state.sole_typearr)}
                      </select>
                    </td>

                    <td>
                      <label className="form-label">Product Type</label>

                      <select
                        className="form-select"
                        onChange={(e) => {
                          this.state.p_type[0] = e.target.value;
                          for (let i = 1; i < this.state.p_type.length; i++) {
                            this.state.p_type[i] = this.state.p_type[0];
                          }
                          this.setState({
                            p_type: this.state.p_type,
                            boolp_typeerr: false,
                          });
                        }}
                      >
                        {this.getOptionList(this.state.prod_typearr)}
                      </select>
                      {this.state.boolp_typeerr == true ? (
                        <div style={{ color: "red" }}>
                          {this.state.p_typeerr}
                        </div>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="form-label">Banwar Type</label>
                      <select
                        className="form-select"
                        onChange={(e) => {
                          this.state.b_type[0] = e.target.value;
                          this.setState({ b_type: this.state.b_type });
                        }}
                      >
                        {this.getOptionList(this.state.banwar_typearr)}
                      </select>
                    </td>
                    <td>
                      <label className="form-label">Banwar Color</label>
                      <select
                        className="form-select"
                        onChange={(e) => {
                          this.state.b_color[0] = e.target.value;
                          this.setState({ b_color: this.state.b_color });
                        }}
                      >
                        {this.getOptionList(this.state.banwar_clrarr)}
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label className="form-label">Heel Type</label>
                      <select
                        className="form-select"
                        onChange={(e) => {
                          this.state.h_type[0] = e.target.value;
                          this.setState({ h_type: this.state.h_type });
                        }}
                      >
                        {this.getOptionList(this.state.heel_typearr)}
                      </select>
                    </td>

                    <td>
                      <label className="form-label">Heel Color</label>
                      <select
                        className="form-select"
                        onChange={(e) => {
                          this.state.h_color[0] = e.target.value;
                          this.setState({ h_color: this.state.h_color });
                        }}
                      >
                        {this.getOptionList(this.state.heel_clrarr)}
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label className="form-label">Pumpy Heel</label>
                      <select
                        className="form-select"
                        onChange={(e) => {
                          this.state.p_heel[0] = e.target.value;
                          this.setState({ p_heel: this.state.p_heel });
                        }}
                      >
                        {this.getOptionList(this.state.pumpy_heelarr)}
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="2">
                      <div className="input-group">
                        <label className="form-label">Picture</label>
                        <input
                          required
                          type="file"
                          name="fileToUpload"
                          id="fileToUpload"
                          key={this.state.theInputKey || ""}
                          accept="image/*"
                          onChange={(e) => {
                            this.state.p_pic[0] = e.target.files[0];
                            this.setState({ p_pic: this.state.p_pic });
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                  {this.showMore()}
                  <tr>
                    <td colSpan={3}>
                      {this.state.showCounter > 0 ? (
                        <div
                          style={{ color: "red", display: "inline-block" }}
                          onClick={(e) => {
                            this.state.p_type.pop();
                            this.state.b_type.pop();
                            this.state.h_type.pop();
                            this.state.sole_type.pop();
                            this.state.b_color.pop();
                            this.state.p_color.pop();
                            this.state.h_color.pop();
                            this.state.p_heel.pop();
                            this.setState({
                              showMore: true,
                              showCounter: this.state.showCounter - 1,
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
                        onClick={(e) => {
                          if (this.state.colordup) {
                          } else {
                            if (
                              this.state.showCounter == 0 &&
                              this.state.p_type[0] == "no"
                            ) {
                              this.setState({ boolp_typeerr: true });
                            } else {
                              this.setState({
                                showCounter: this.state.showCounter + 1,
                                p_type: this.state.p_type.concat(
                                  this.state.p_type[0]
                                ),
                                p_color: this.state.p_color.concat("no"),
                                p_color: this.state.p_color.concat("no"),
                                b_type: this.state.b_type.concat("no"),
                                p_heel: this.state.p_heel.concat("no"),
                                sole_type: this.state.sole_type.concat("no"),
                                h_type: this.state.h_type.concat("no"),
                                b_color: this.state.b_color.concat("no"),
                                h_color: this.state.h_color.concat("no"),
                                h_color: this.state.h_color.concat("no"),
                              });
                            }
                          }
                        }}
                      >
                        +Add Product
                      </div>
                    </td>
                  </tr>
                  {this.state.colordup ? (
                    <span style={{ color: "red" }}>
                      {this.state.colorduperr}
                    </span>
                  ) : (
                    ""
                  )}
                  {this.state.shownoerr ? (
                    <tr>
                      <td colSpan={3}>
                        <div style={{ color: "red", textAlign: "center" }}>
                          {this.state.noerr}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                  <tr>
                    <td colSpan={3}>
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
                            value="Register Product"
                            disabled
                            className="btn btn-primary"
                            style={{ width: "40%", margin: "5px" }}
                          />
                        ) : (
                          <input
                            type="submit"
                            value="Register Product"
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
            {/* <button onClick={() =>{

      this.props.storeData(this.state, this.props.state)
      this.props.set_data(this.state)
    }}>Submit</button> */}

            {/* <button onClick={()=>this.props.readData()}> Read Data
    </button> */}
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
