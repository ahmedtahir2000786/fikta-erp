import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/table.css";
import axios from "axios";
import { new_data } from "../store/action";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import fb from "../config/firebase";

class SingleProduct extends Component {
  constructor(props) {
    super(props);

    let prop = this.props;
    // firebase.auth().onAuthStateChanged(function(user) {
    //    if(user){
    //         ////console.log(user)
    //    }else{
    //     prop.history.push('')
    //    }
    //   });
    let date = new Date();
    date =
      date.getFullYear() +
      "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2);
    this.state = {
      fromDate: date,
      showDate: "",
      toDate: date,
      products: [],
      getProduct: "",
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
      prod_dtl: [],
      prod_typearr: [],
      prod_type: "",
      prodwithseltype: [],
      productcount: {},
      sole_typecount: {},
      banwar_typecount: {},
      heel_count: {},
      p_heelcount: {},
      showProducts: false,
      showpumpyheel: false,
    };
    this.key = 0;
    this.url = "";
    this.emptyProducts = [];
    this.emptyColors = {};
  }
  componentDidMount = () => {
    axios
      .get("https://meatncuts.com.pk/phpfiles/api/view_prod_dtl.php")
      .then((res) => {
        ////console.log(res.data)
        res.data.map((v, i) => {
          if (v.type == "prod_type") {
            this.state.prod_typearr[this.state.prod_typearr.length] = v.data;
          }
        });
        this.setState({ prod_typearr: this.state.prod_typearr });
      })
      .catch((err) => console.log("Error", err));
    // axios.get('https://meatncuts.com.pk/phpfiles/api/view_prods.php')
    // .then(response=>{
    //     this.setState({products: response.data})

    // })
    // .catch(err=>//console.log("Error", err))
  };
  reset = () => {
    this.key = 0;
    this.url = "";
    this.emptyProducts = [];
    this.emptyColors = {};
    this.setState({
      fromDate: this.state.fromDate,
      showDate: "",
      toDate: this.state.toDate,
      products: [],
      getProduct: "",
      url: "",
      name: "",
      sole_type: "",
      b_type: "",
      b_color: "",
      h_type: "",
      h_color: "",
      pumpy_heel: "",
      color: [],
      data: {},
      showData: false,
      prod_dtl: [],
      prod_typearr: this.state.prod_typearr,
      prod_type: this.state.prod_type,
      prodwithseltype: [],
      productcount: {},
      sole_typecount: {},
      banwar_typecount: {},
      heel_count: {},
      p_heelcount: {},
      showProducts: false,
    });
  };
  getProductTypes = () => {
    let list = [];
    list.push(<option value="no">Select Product Type</option>);
    this.state.prod_typearr.map((v, i) => {
      list.push(<option value={v}>{v}</option>);
    });
    ////console.log(this.state.products)
    return list;
  };
  Key = (e) => {
    this.setState({
      h_type: "",
      h_color: "",
      pumpy_heel: "",
    });
    ////console.log(e)
    this.state.products.map((v, i) => {
      ////console.log(v.name)
      if (v.name === e) {
        //  //console.log(v.name, i)
        this.key = i;

        let x = this.state.products[this.key].color;
        this.setState({
          url: v.pic_url,
          color: x,
          name: v.name,
          prod_type: v.type,
          sole_type: v.sole_type,
          b_color: v.b_color,
          b_type: v.b_type,
          h_type: v.h_type,
          h_color: v.h_color,
          pumpy_heel: v.p_heel,
        });
      }
    });
  };
  getAllIndexes = (arr, val) => {
    ////console.log("Arr", arr, "Val", val);
    // var indexes = [], i = -1;
    // while ((i = arr.indexOf(val, i+1)) != -1){
    //     indexes.push(i);
    // }
    // return indexes;
  };
  getsingle = (str, pname, pcolor) => {
    let k = "";
    this.state.prodwithseltype.map((v, i) => {
      if (v.name == pname) {
        let idx = v.color.indexOf(pcolor);
        if (str == "st") {
          k = v.sole_type[idx];
        } else if (str == "bt") {
          k = v.b_type[idx];
        } else if (str == "bc") {
          k = v.b_color[idx];
        } else if (str == "ht") {
          k = v.h_type[idx];
        } else if (str == "hc") {
          k = v.h_color[idx];
        } else if (str == "ph") {
          k = v.p_heel[idx];
        }
      }
    });
    return k;
  };

  getData = () => {
    ////console.log("Product Count1", this.state.productcount);
    this.setState({ data: {} });
    axios
      .get(
        "https://meatncuts.com.pk/phpfiles/api/single_prod.php?getProducts=" +
          "type" +
          "&prod=" +
          this.state.prod_type +
          "&date=" +
          this.state.toDate +
          "&fromDate=" +
          this.state.fromDate
      )
      .then((response) => {
        ////console.log("Response", response.data);
        let prod_list = [];
        response.data.map((v, i) => {
          prod_list.push(v.name);
        });
        ////console.log(prod_list);
        let l = [];
        this.setState({ prodwithseltype: response.data });
        let colors = [];
        response.data.map((i, j) => {
          ////console.log(i);
          if (!(i.name in this.state.productcount)) {
            this.state.productcount[i.name] = {};
          }
          i.color.map((o, p) => {
            if (!(o in this.state.productcount[i.name])) {
              this.state.productcount[i.name][o] = {};
            }
            if (!(o in colors)) {
              colors.push(o);
            }
          });
          l.push(i.name);
        });
        response.data.map((g, h) => {
          g.sole_type.map((q, r) => {
            if (!(q in this.state.sole_typecount)) {
              this.state.sole_typecount[q] = {};
            }
          });
          g.b_type.map((q, r) => {
            if (!(q in this.state.banwar_typecount)) {
              this.state.banwar_typecount[q] = {};
            }
            g.b_color.map((j, k) => {
              if (!(j in this.state.banwar_typecount[q])) {
                this.state.banwar_typecount[q][j] = {};
              }
            });
          });
          g.h_type.map((q, r) => {
            if (!(q in this.state.heel_count)) {
              this.state.heel_count[q] = {};
            }
            g.h_color.map((j, k) => {
              if (!(j in this.state.heel_count[q])) {
                this.state.heel_count[q][j] = {};
              }
            });
          });
          g.p_heel.map((q, r) => {
            if (!(q in this.state.p_heelcount)) {
              this.state.p_heelcount[q] = {};
            }
          });
        });
        ////console.log("Sole Type", this.state);

        axios
          .post(
            "https://meatncuts.com.pk/phpfiles/api/single_prod.php?getProducts=" +
              "single" +
              "&prod=check" +
              "&date=" +
              this.state.toDate +
              "&fromDate=" +
              this.state.fromDate,
            l
          )
          .then((res) => {
            ////console.log("Res", res.data);
            ////console.log("Product Count", this.state.productcount);
            res.data.map((v, i) => {
              v.design_name.map((m, n) => {
                if (m in this.state.productcount) {
                  let size = res.data[i]["size"][n];
                  let col = res.data[i]["color"][n];
                  let sole = this.getsingle("st", m, col);
                  let banwar_t = this.getsingle("bt", m, col);
                  let banwar_c = this.getsingle("bc", m, col);
                  let heel_c = this.getsingle("hc", m, col);
                  let heel_t = this.getsingle("ht", m, col);
                  let pumpy_h = this.getsingle("ph", m, col);
                  ////console.log(
                  //   this.state.productcount[m][col],
                  //   this.state.sole_typecount[sole],
                  //   this.state.banwar_typecount[banwar_t][banwar_c],
                  //   this.state.heel_count[heel_t][heel_c],
                  //   this.state.p_heelcount[pumpy_h]
                  // );
                  if (!(size in this.state.productcount[m][col])) {
                    ////console.log("1");
                    this.state.productcount[m][col][size] = 1;
                  } else {
                    ////console.log("1");
                    this.state.productcount[m][col][size] =
                      this.state.productcount[m][col][size] + 1;
                  }
                  if (
                    sole != "" &&
                    !(size in this.state.sole_typecount[sole])
                  ) {
                    /////console.log("2");
                    this.state.sole_typecount[sole][size] = 1;
                  } else if (sole != "") {
                    //console.log("2");
                    this.state.sole_typecount[sole][size] =
                      this.state.sole_typecount[sole][size] + 1;
                  }
                  if (
                    banwar_t != "" &&
                    banwar_c != "" &&
                    !(size in this.state.banwar_typecount[banwar_t][banwar_c])
                  ) {
                    //console.log("3");
                    this.state.banwar_typecount[banwar_t][banwar_c][size] = 1;
                  } else if (banwar_t != "" && banwar_c != "") {
                    //console.log("3");
                    this.state.banwar_typecount[banwar_t][banwar_c][size] =
                      this.state.banwar_typecount[banwar_t][banwar_c][size] + 1;
                  }
                  if (
                    heel_c != "" &&
                    heel_t != "" &&
                    !(size in this.state.heel_count[heel_t][heel_c])
                  ) {
                    //console.log("4");
                    this.state.heel_count[heel_t][heel_c][size] = 1;
                  } else if (heel_c != "" && heel_t != "") {
                    //console.log("4");
                    this.state.heel_count[heel_t][heel_c][size] =
                      this.state.heel_count[heel_t][heel_c][size] + 1;
                  }

                  if (
                    pumpy_h != "" &&
                    !(size in this.state.p_heelcount[pumpy_h])
                  ) {
                    //console.log("5");
                    this.state.p_heelcount[pumpy_h][size] = 1;
                  } else if (pumpy_h != "") {
                    //console.log("5");
                    this.state.p_heelcount[pumpy_h][size] =
                      this.state.p_heelcount[pumpy_h][size] + 1;
                  }
                  //console.log("After ", this.state.productcount);
                }
              });
            });

            this.setState({
              productcount: this.state.productcount,
              showProducts: true,
            });
          })
          .catch((err) => console.log("Error", err));
        ////console.log(response.data[4].sole_type[0])
      })
      .catch((err) => console.log("Error", err));
  };

  showTableData = (k) => {
    ////console.log("DAta", this.state.data[k]);
    let list = [];

    Object.keys(this.state.data[k]).map((key) => {
      list.push(
        <tr>
          <td>{key}</td>
          <td>{this.state.data[k][key]}</td>
        </tr>
      );
    });
    return list;
  };

  showData = () => {
    let list = [];
    Object.keys(this.state.data).map((key) => {
      ////console.log("Key ",key)
      list.push(
        <div className="table-wrapper">
          <h3>{key}</h3>
          <table className="fl-table">
            <thead>
              <tr style={{ textTransform: "upperCase" }}>
                <th>Sizes</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>{this.showTableData(key)}</tbody>
          </table>
        </div>
      );
    });
    return list;
  };
  showDataProduct = () => {
    let list = [];
    for (var key in this.state.productcount) {
      var value = this.state.productcount[key];
      for (var k in value) {
        var val = value[k];
        //console.log(val);

        // do something with "key" and "value" variables
      }

      // do something with "key" and "value" variables
    }
    return list;
  };
  getsizequantity = (dict) => {
    let list = [];
    for (var key in dict) {
      var value = dict[key];
      list.push(
        <tr>
          <td>{key}</td>
          <td>{value}</td>
        </tr>
      );
    }
    return list;
  };

  getFeatures = (dict, idx) => {
    let d = {
      "SOLE TYPE": dict["sole_type"][idx],
      "BANWAR TYPE": dict["b_type"][idx],
      "BANWAR COLOR": dict["b_color"][idx],
      "HEEL TYPE": dict["h_type"][idx],
      "HEEL COLOR": dict["h_color"][idx],
      "PUMPY HEEL": dict["p_heel"][idx],
    };
    let list = [];
    for (var key in d) {
      var value = d[key];
      if (value != "no") {
        list.push(
          <tr>
            <td>{key}</td>
            <td>{value}</td>
          </tr>
        );
      }
    }
    return list;
  };
  getColorCard = (i, n) => {
    if (
      !this.emptyColors[this.state.prodwithseltype[i].name].includes(
        this.state.prodwithseltype[i].color[n]
      )
    ) {
      return (
        <Col>
    
              <Card
                style={{
                  width: "70%",
                  margin: "auto",
                  marginTop: "20px",
                }}
              >
                <Card.Body>
                  <Card.Title>
                    <h3>
                      Color:{" "}
                      <strong>{this.state.prodwithseltype[i].color[n]}</strong>
                    </h3>
                  </Card.Title>
                  <Card.Img
                    variant="top"
                    style={{
                      width: "40%",
                      margin: "auto",
                      padding: "10px",
                    }}
                    src={this.state.prodwithseltype[i].pic_url[n]}
                  />
                  <Card.Text>
                   
                        <div className="table-wrapper">
                          <table className="fl-table">
                            <thead>
                              <tr>
                                <th>Sizes</th>
                                <th>Quantity</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.getsizequantity(
                                this.state.productcount[
                                  this.state.prodwithseltype[i].name
                                ][this.state.prodwithseltype[i].color[n]]
                              )}
                            </tbody>
                          </table>
                        </div>
                     
                  </Card.Text>
                </Card.Body>
              </Card>
           
       
        </Col>
      );
    }
  };
  getProductCard = (i, n) => {
    //console.log(this.state.prodwithseltype[i].name, this.emptyProducts);
    //console.log(!this.emptyProducts);
    if (!this.emptyProducts.includes(this.state.prodwithseltype[i].name) ) {
      if(!this.emptyColors[this.state.prodwithseltype[i].name].includes(
        this.state.prodwithseltype[i].color[n]
      )){
        return (
      
         
         
          <Col>{this.getColorCard(i, n)}</Col>
         
    );
      }
     
    }
  };

  Export2Word = () => {
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml+document.getElementById("#worddoc").innerHTML+postHtml;

    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });
    
    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    
    // Specify file name
    let filename = "Product"+'.doc';
    
    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = url;
        
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
    
    document.body.removeChild(downloadLink);
}
  checkEmpty = () => {
    Object.keys(this.state.productcount).map((v) => {
      this.emptyColors[v] = [];
    });
    ////console.log(this.state.productcount);
    Object.keys(this.state.productcount).map((v) => {
      Object.keys(this.state.productcount[v]).map((j) => {
        ////console.log(this.state.productcount[v][j], v, j);
        if (Object.keys(this.state.productcount[v][j]).length == 0) {
          ////console.log("mai yahan aya");
          this.emptyColors[v].push(j);
        }
      });
    });
    Object.keys(this.state.productcount).map((v) => {
      let list_colors = Object.keys(this.state.productcount[v]);
      if (list_colors.length == this.emptyColors[v].length) {
        this.emptyProducts.push(v);
      }
    });
    //console.log("Empty Products: ", this.emptyProducts);
    //console.log("Empty Colors: ", this.emptyColors);
  };

  getAllProductCard = () => {
    let list = [];
    this.checkEmpty();
    //console.log("Empty Products: ", this.emptyProducts);
    //console.log("Empty Colors: ", this.emptyColors);
    this.state.prodwithseltype.map((v, i) => {
     
      v.color.map((m, n) => {
        if (!this.emptyProducts.includes(this.state.prodwithseltype[i].name)){
          if(n==0){
            list.push(<div>
              <div
                style={{
                  background: "white",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
              >
                <h2 style={{ color: "black" }}>
                   Product Name:{" "}
                  <strong>{this.state.prodwithseltype[i].name}</strong>
                </h2>
              </div>
              <div style={{width:"50%", margin:"auto"}}>
              <table className="fl-table">
                              <thead>
                                <tr>
                                  <th>Feature</th>
                                  <th>Value</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.getFeatures(
                                  this.state.prodwithseltype[i],
                                  n
                                )}
                                {/* <tr>
                                              <td>Banwar Type</td>
                                              <td>Value</td>
                                          </tr> */}
                              </tbody>
                            </table>
                            </div>
                            </div>)
          }

        }
        
       
        list.push(this.getProductCard(i, n));
      });
    });
    return (<Row>{list}</Row>);
  };
  getsinglesoletype = (type, arr) => {
    let list = [];
    for (var i in arr[type]) {
      let value = arr[type][i];
      list.push(
        <tr>
          <td>{i}</td>
          <td>{value}</td>
        </tr>
      );
    }
    return list;
  };

  getsinglesoletypecol = (arr) => {
    let list = [];

    for (var i in arr) {
      list.push(
        <Col>
          <h3>{i}</h3>
          <div className="table-wrapper">
            <table className="fl-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>{this.getsinglesoletype(i, arr)}</tbody>
            </table>
          </div>
        </Col>
      );
    }
    return list;
  };

  getsoletypedata = (arr, str) => {
    console.log("Sole data", arr);
    return (
      <div>
        <div
          style={{
            background: "black",
            padding: "20px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <h3 style={{ color: "white" }}>{str}</h3>
        </div>
        <Container>
          <Row>
            <Col>
              <Card style={{ width: "70%", margin: "auto", marginTop: "20px" }}>
                <Card.Body>
                  <Card.Text>{this.getsinglesoletypecol(arr)}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
  getsinglebanwartype = (j, k, arr) => {
    let list = [];
    for (var i in arr[j][k]) {
      let value = arr[j][k][i];
      list.push(
        <tr>
          <td>{i}</td>
          <td>{value}</td>
        </tr>
      );
    }
    return list;
  };
  getsinglebanwarcolortype = (j, arr) => {
    let list = [];

    for (var i in arr[j]) {
      list.push(
        <Col>
          <h3>{i}</h3>
          <div className="table-wrapper">
            <table className="fl-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>{this.getsinglebanwartype(j, i, arr)}</tbody>
            </table>
          </div>
        </Col>
      );
    }
    return list;
  };

  getsinglebanwartypecol = (arr) => {
    let list = [];

    for (var i in arr) {
      list.push(
        <Col>
          <h3 style={{ background: "blue", color: "white", padding: "10px" }}>
            {i}
          </h3>
          {this.getsinglebanwarcolortype(i, arr)}
        </Col>
      );
    }
    return list;
  };

  getbanwartypedata = (arr, str) => {
    return (
      <div>
        <div
          style={{
            background: "black",
            padding: "20px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <h3 style={{ color: "white" }}>{str}</h3>
        </div>
        <Container>
          <Row>
            <Col>
              <Card style={{ width: "70%", margin: "auto", marginTop: "20px" }}>
                <Card.Body>
                  <Card.Text>{this.getsinglebanwartypecol(arr)}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  render() {
    return (
      <div style={{ textAlign: "center", margin: "auto" }}>
        <div style={{ marginBottom: "25px" }}>
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
            marginTop: "50px",
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
          <label style={{ color: "white" }}>Product Type: </label>
          <select
            style={{ textAlign: "center", width: "100%" }}
            onChange={(e) => {
              //this.Key(e.target.value)
              // //console.log(this.key)
              this.setState({
                prod_type: e.target.value,
              });
            }}
          >
            {this.getProductTypes()}
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
              // //console.log("Try")
              this.reset();
              this.getData();
              // this.setState({
              //     getProduct:"",
              //     url:"",
              //     name:"",
              //     prod_type:"",
              //     sole_type:"",
              //     b_type:"",
              //     b_color:"",
              //     h_type:"",
              //     h_color:"",
              //     pumpy_heel:"",
              //     color:[],
              //     data:{}

              // })
            }}
          >
            Get Details
          </button>
          <button
            style={{marginLeft:"10px"}}
            className="btn btn-danger"
            onClick={() => this.Export2Word()}
          >
            Export to Word
          </button>
        </div>

        <div id="#worddoc">
          {this.state.showProducts == true ? (
            this.getAllProductCard()
          ) : (
            <div style={{ color: "white", padding: "20px" }}>
              No Record Found...
            </div>
          )}

          {this.state.showProducts == true
            ? this.getsoletypedata(this.state.sole_typecount, "SOLE TYPE")
            : ""}
          {this.state.showProducts == true
            ? this.getbanwartypedata(this.state.banwar_typecount, "BANWAR TYPE")
            : ""}
          {this.state.showProducts == true
            ? this.getbanwartypedata(this.state.heel_count, "HEEL TYPE")
            : ""}

          {this.state.showProducts == true
            ? this.getsoletypedata(this.state.p_heelcount, "PUMPY HEEL")
            : ""}
          {/* <div style={{marginTop:"20px"}}>
                    <img src={this.state.url} alt="this is product Image" style={{width:"300px", height:"300px"}}/>
                    <div><strong>Name: </strong>{this.state.name}</div>
                </div>
                <Container>
                    <Row>
                        
                        <Col><strong>Prod. Type: </strong>{this.state.prod_type}</Col>
                        <Col><strong>Sole Type:</strong>{this.state.sole_type}</Col>
                    </Row>
                    <Row>
                        <Col><strong>Banwar Type:</strong>{this.state.b_type}</Col>
                        <Col><strong>Banwar Color:</strong>{this.state.b_color}</Col>
                    </Row>
                    {this.state.prod_type == "Heels"?
                    <Row>
                    <Col><strong>Heel Type:</strong>{this.state.h_type}</Col>
                    <Col><strong>Heel Color:</strong>{this.state.h_color}</Col>
                    </Row>:
                    ""
                }
                {this.state.prod_type == "Pumpy"?
                    <Row>
                    <Col><strong>Pumpy Heel:</strong>{this.state.pumpy_heel}</Col>
                    <Col></Col>
                    </Row>:
                    ""
                }
                </Container> */}
          {/* <div>
                    {this.state.showData == true ? this.showData(): ""}
                </div> */}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
