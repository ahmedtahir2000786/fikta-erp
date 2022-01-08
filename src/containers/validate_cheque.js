import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/table.css";
import axios from "axios";
import { new_data } from "../store/action";
import { Link } from "react-router-dom";
import fb from "../config/firebase";

class ValidateCheque extends Component {
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
      neworderchq: true,
      neworderchqAmount: 0,
      neworderchqCn: "",
      showExtraCNTable: false,
      extraCN: [],
      response: [],
      paymentRcv: [],
      showAmountTable: false,
      amountIssueCn: [],
      amountDiff: [],
      chqNames: [],
      showPaymentRcv: false,
      name: "no",
      extraCNreason: [],
      amountIssuereason: [],
      chqNameErr: "Select Cheque Name Please!",
      chqNameBool: false,
      returnchq: false,
      replacementchq: false,
      CNnotreplacement: false,
      CNnotreturnarr: [],
      CNnotreplacementarr: [],
      CNnotreturn: false,
      CNnotreplacementreason: [],
      CNnotreturnreason: [],
      submitButton: true,
      countErr: false,
      countErrmsg: "Amount and CN numbers are not of same length",
    };
  }
  componentDidMount = () => {
    axios
      .get("https://meatncuts.com.pk/phpfiles/api/view_cn.php")
      .then((res) => {
        this.setState({ response: res.data });
      })
      .catch((err) => console.log("Error", err));

    axios
      .get("https://meatncuts.com.pk/phpfiles/api/viewchq.php")
      .then((res) => {
        this.setState({ chqNames: res.data });
      })
      .catch();
  };
  onSubmit = (e) => {
    e.preventDefault();
    let array = [];
    if (this.state.neworderchq == true) {
      if (this.state.neworderchqAmount != 0) {
        array = this.state.neworderchqAmount.split("\n");
      }

      let arr = this.state.neworderchqCn.split("\n");

      let cnsg = [];
      this.state.response.map((v, i) => {
        cnsg.push(v["consignmentnum"]);
      });
      //console.log(cnsg)
      let amount = [];
      this.state.response.map((v, i) => {
        amount.push(v["amount"]);
      });
      if (array.length == arr.length) {
        // console.log(amount)
        //this.setState({neworders: this.state.response, render1:false, showDate:""})
        arr.map((v, i) => {
          v.toString();
          // console.log(cnsg.includes(v))
          //console.log("Mai CN laya hun");

          if (cnsg.includes(v)) {
            let idx = cnsg.indexOf(v);
            if (array[i] !== amount[idx]) {
              this.state.amountIssueCn.push(v);
              this.state.amountIssuereason.push("");
              this.state.amountDiff.push(array[i] - amount[idx]);
              //console.log("Not Equal")
            } else {
              this.state.paymentRcv.push(v);
              //  console.log("Equal")
            }
          } else {
            if (v != "") {
              this.state.extraCN.push(v);
              this.state.extraCNreason.push("");
            }
          }
        });
        if (this.state.extraCN.length !== 0) {
          this.setState({ showExtraCNTable: true });
        }

        if (this.state.amountIssueCn.length !== 0) {
          this.setState({ showAmountTable: true });
        }

        if (this.state.paymentRcv.length != 0) {
          this.setState({ showPaymentRcv: true });
        }
        //console.log("Response Data",this.state.neworders)
      } else {
        this.setState({ countErr: true });
      }
      //console.log(arr, array)
    } else {
      let arr = this.state.neworderchqCn.split("\n");

      //console.log(this.state.response)
      let cnsg = [];
      this.state.response.map((v, i) => {
        cnsg.push(v["consignmentnum"]);
      });

      let status = [];
      this.state.response.map((v, i) => {
        status.push(v["status"]);
      });
      let cat = [];
      this.state.response.map((v, i) => {
        cat.push(v["category"]);
      });

      arr.map((v, i) => {
        v.toString();
        // console.log(cnsg.includes(v))
        if (cnsg.includes(v)) {
          let idx = cnsg.indexOf(v);
          console.log(cat[idx], status[idx]);
          if (this.state.replacementchq == true && cat[idx] != "replacement") {
            this.state.CNnotreplacementarr.push(v);
            console.log("Mai replacement mai hun");
          } else if (this.state.returnchq == true && status[idx] != "Return") {
            this.state.CNnotreturnarr.push(v);
            console.log("Mai return mai h");
          }
        } else {
          if (v != "") {
            this.state.extraCN.push(v);
            this.state.extraCNreason.push("");
          }
        }
      });
      if (this.state.extraCN.length !== 0) {
        this.setState({ showExtraCNTable: true });
      }
      if (this.state.CNnotreplacementarr.length !== 0) {
        this.setState({ CNnotreplacement: true });
      }
      if (this.state.CNnotreturnarr.length !== 0) {
        this.setState({ CNnotreturn: true });
      }
    }
    this.setState({ submitButton: false });
  };
  getExtraCnData = () => {
    let list = [];
    this.state.extraCN.map((v, i) => {
      list.push(
        <tr key={i}>
          <td>{v}</td>
          <td>
            <textarea
              value={this.state.extraCNreason[i]}
              onChange={(e) => {
                this.state.extraCNreason[i] = e.target.value;
                this.setState({ extraCNreason: this.state.extraCNreason });
              }}
              style={{ width: "100%" }}
            />
          </td>
        </tr>
      );
    });

    return list;
  };

  getReplacementCnData = () => {
    let list = [];
    this.state.CNnotreplacementarr.map((v, i) => {
      list.push(
        <tr key={i}>
          <td>{v}</td>
          <td>
            <textarea
              value={this.state.CNnotreplacementreason[i]}
              onChange={(e) => {
                this.state.CNnotreplacementreason[i] = e.target.value;
                this.setState({
                  CNnotreplacementreason: this.state.CNnotreplacementreason,
                });
              }}
              style={{ width: "100%" }}
            />
          </td>
        </tr>
      );
    });

    return list;
  };

  getReturnCnData = () => {
    let list = [];
    this.state.CNnotreturnarr.map((v, i) => {
      list.push(
        <tr key={i}>
          <td>{v}</td>
          <td>
            <textarea
              value={this.state.CNnotreturnreason[i]}
              onChange={(e) => {
                this.state.CNnotreturnreason[i] = e.target.value;
                this.setState({
                  CNnotreturnreason: this.state.CNnotreturnreason,
                });
              }}
              style={{ width: "100%" }}
            />
          </td>
        </tr>
      );
    });

    return list;
  };

  paymentRcv = () => {
    let list = [];
    this.state.paymentRcv.map((v, i) => {
      list.push(
        <tr key={i}>
          <td>{v}</td>
          <td>Payment Received</td>
        </tr>
      );
    });

    return list;
  };
  showPaymentRcv = () => {
    return (
      <div>
        <h2>Payment Status</h2>
        <div className="table-wrapper">
          <table className="fl-table">
            <thead>
              <tr style={{ textTransform: "upperCase" }}>
                <th>CN# Number</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{this.paymentRcv()}</tbody>
          </table>
        </div>
      </div>
    );
  };
  showExtraCNTable = () => {
    return (
      <div>
        <h2>Extra CN Issue</h2>
        <div className="table-wrapper">
          <table className="fl-table">
            <thead>
              <tr style={{ textTransform: "upperCase" }}>
                <th>Extra CN</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>{this.getExtraCnData()}</tbody>
          </table>
        </div>
      </div>
    );
  };

  CNnotreplacement = () => {
    return (
      <div>
        <h2>CN not as "Replacement"</h2>
        <div className="table-wrapper">
          <table className="fl-table">
            <thead>
              <tr style={{ textTransform: "upperCase" }}>
                <th>CN not as 'Replacement'</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>{this.getReplacementCnData()}</tbody>
          </table>
        </div>
      </div>
    );
  };
  CNnotreturn = () => {
    return (
      <div>
        <h2>CN not as "Return"</h2>
        <div className="table-wrapper">
          <table className="fl-table">
            <thead>
              <tr style={{ textTransform: "upperCase" }}>
                <th>CN not as "Return"</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>{this.getReturnCnData()}</tbody>
          </table>
        </div>
      </div>
    );
  };

  getAmountIssueData = () => {
    let list = [];
    let cnsg = [];
    this.state.response.map((v, i) => {
      cnsg.push(v["consignmentnum"]);
    });
    let amount = [];
    this.state.response.map((v, i) => {
      amount.push(v["amount"]);
    });
    this.state.amountIssueCn.map((v, i) => {
      let idx = cnsg.indexOf(v);
      let z = Number(amount[idx]);
      let amountbyinput = z + this.state.amountDiff[i];
      console.log(typeof amountbyinput);
      list.push(
        <tr key={i}>
          <td>{cnsg[idx]}</td>
          <td>{amount[idx]}</td>
          <td>{amountbyinput}</td>
          <td>
            <textarea
              value={this.state.amountIssuereason[i]}
              onChange={(e) => {
                this.state.amountIssuereason[i] = e.target.value;
                this.setState({
                  amountIssuereason: this.state.amountIssuereason,
                });
              }}
              style={{ width: "100%" }}
            />
          </td>
        </tr>
      );
    });

    return list;
  };
  amountTable = () => {
    return (
      <div>
        <h2>Amount Issue</h2>
        <div className="table-wrapper">
          <table className="fl-table">
            <thead>
              <tr style={{ textTransform: "upperCase" }}>
                <th>CN. Num</th>
                <th>Amount By Staff</th>
                <th>Amount Rcvd</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>{this.getAmountIssueData()}</tbody>
          </table>
        </div>
      </div>
    );
  };

  addChqName = () => {
    axios
      .post(
        "https://meatncuts.com.pk/phpfiles/api/add_chq.php",
        this.state.newchqName
      )
      .then()
      .catch();
  };

  getOption = () => {
    let list = [];
    list.push(<option value="no">Select Chq</option>);
    this.state.chqNames.map((v, i) => {
      list.push(<option value={v}>{v}</option>);
    });
    return list;
  };

  updateDatabase = () => {
    if (this.state.name == "no") {
      this.setState({ chqNameBool: true });
    } else {
      let obj = {};
      if (this.state.neworderchq == true) {
        this.state.paymentRcv.map((cn_got_payment, idx) => {
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
                  console.log(res.data);
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        });
      }
      this.state.extraCN.map((v, i) => {
        if (this.state.neworderchq == true) {
          obj = {
            name: this.state.name,
            status: "extra_cn",
            sub_status: "neworder",
            consignmentnum: parseInt(v),
            reason: this.state.extraCNreason[i],
          };
        } else if (this.state.replacementchq == true) {
          obj = {
            name: this.state.name,
            status: "extra_cn",
            sub_status: "replacement",
            consignmentnum: parseInt(v),
            reason: this.state.extraCNreason[i],
          };
        } else {
          obj = {
            name: this.state.name,
            status: "extra_cn",
            sub_status: "return",
            consignmentnum: parseInt(v),
            reason: this.state.extraCNreason[i],
          };
        }

        axios
          .post("https://meatncuts.com.pk/phpfiles/api/chq_data.php", obj)
          .then(this.setState({ extraCN: [] }))
          .catch((err) => console.log(err));
      });
      if (this.state.neworderchq == true) {
        this.state.amountIssueCn.map((v, i) => {
          let obj = {};
          obj = {
            name: this.state.name,
            status: "amount_issue",
            sub_status: "neworder",
            consignmentnum: parseInt(v),
            reason: this.state.amountIssuereason[i],
          };

          axios
            .post("https://meatncuts.com.pk/phpfiles/api/chq_data.php", obj)
            .then(this.setState({ amountIssueCn: [] }))
            .catch((err) => console.log(err));
        });
      }
      if (this.state.replacementchq == true) {
        this.state.CNnotreplacementarr.map((v, i) => {
          let obj = {};

          obj = {
            name: this.state.name,
            status: "CN not as Replacement",
            sub_status: "replacement",
            consignmentnum: parseInt(v),
            reason: this.state.CNnotreplacementreason[i],
          };

          axios
            .post("https://meatncuts.com.pk/phpfiles/api/chq_data.php", obj)
            .then(this.setState({ CNnotreplacementarr: [] }))
            .catch((err) => console.log(err));
        });
      }
      if (this.state.returnchq == true) {
        this.state.CNnotreturnarr.map((v, i) => {
          let obj = {};

          obj = {
            name: this.state.name,
            status: "CN not as Return",
            sub_status: "return",
            consignmentnum: parseInt(v),
            reason: this.state.CNnotreturnreason[i],
          };

          axios
            .post("https://meatncuts.com.pk/phpfiles/api/chq_data.php", obj)
            .then(this.setState({ CNnotreturnarr: [] }))
            .catch((err) => console.log(err));
        });
      }
    }
  };

  render() {
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

        <label style={{ color: "white", marginRight: "10px" }}>
          Select Prev. Cheque Name:{" "}
        </label>
        <select
          style={{ width: "10%" }}
          onChange={(e) => this.setState({ name: e.target.value })}
        >
          {this.getOption()}
        </select>

        <div>
          {this.state.neworderchq == false ? (
            <button
              className="btn btn-dark"
              style={{ margin: "10px" }}
              onClick={(e) => {
                this.setState({
                  neworderchq: true,
                  returnchq: false,
                  replacementchq: false,
                  addchq: false,
                  newchqName: "",
                  neworderchqAmount: 0,
                  neworderchqCn: "",
                  showExtraCNTable: false,
                  extraCN: [],
                  paymentRcv: [],
                  showAmountTable: false,
                  amountIssueCn: [],
                  amountDiff: [],
                  showPaymentRcv: false,
                  name: "no",
                  extraCNreason: [],
                  amountIssuereason: [],
                  chqNameBool: false,
                  CNnotreplacement: false,
                  CNnotreturnarr: [],
                  CNnotreplacementarr: [],
                  CNnotreturn: false,
                  CNnotreplacementreason: [],
                  CNnotreturnreason: [],
                  chqNameErr: "Select Cheque Name Please!",
                  chqNameBool: false,
                  submitButton: true,
                });
              }}
            >
              New Order
            </button>
          ) : (
            <button className="btn btn-danger" style={{ margin: "10px" }}>
              New Order
            </button>
          )}
          {this.state.replacementchq == false ? (
            <button
              className="btn btn-dark"
              style={{ margin: "10px" }}
              onClick={(e) => {
                this.setState({
                  replacementchq: true,
                  returnchq: false,
                  neworderchq: false,
                  addchq: false,
                  newchqName: "",
                  neworderchqAmount: 0,
                  neworderchqCn: "",
                  showExtraCNTable: false,
                  extraCN: [],
                  paymentRcv: [],
                  showAmountTable: false,
                  amountIssueCn: [],
                  amountDiff: [],
                  showPaymentRcv: false,
                  name: "no",
                  extraCNreason: [],
                  amountIssuereason: [],
                  chqNameBool: false,
                  CNnotreplacement: false,
                  CNnotreturnarr: [],
                  CNnotreplacementarr: [],
                  CNnotreturn: false,
                  CNnotreplacementreason: [],
                  CNnotreturnreason: [],
                  chqNameErr: "Select Cheque Name Please!",
                  chqNameBool: false,
                  submitButton: true,
                });
              }}
            >
              Replacement/Non-COD
            </button>
          ) : (
            <button className="btn btn-danger" style={{ margin: "10px" }}>
              Replacement/Non-COD
            </button>
          )}
          {this.state.returnchq == false ? (
            <button
              className="btn btn-dark"
              style={{ margin: "10px" }}
              onClick={(e) => {
                this.setState({
                  returnchq: true,
                  replacementchq: false,
                  neworderchq: false,
                  addchq: false,
                  newchqName: "",
                  neworderchqAmount: 0,
                  neworderchqCn: "",
                  showExtraCNTable: false,
                  extraCN: [],
                  paymentRcv: [],
                  showAmountTable: false,
                  amountIssueCn: [],
                  amountDiff: [],
                  showPaymentRcv: false,
                  name: "no",
                  extraCNreason: [],
                  amountIssuereason: [],
                  chqNameBool: false,
                  CNnotreplacement: false,
                  CNnotreturnarr: [],
                  CNnotreplacementarr: [],
                  CNnotreturn: false,
                  CNnotreplacementreason: [],
                  CNnotreturnreason: [],
                  chqNameErr: "Select Cheque Name Please!",
                  chqNameBool: false,
                  submitButton: true,
                });
              }}
            >
              Return
            </button>
          ) : (
            <button className="btn btn-danger" style={{ margin: "10px" }}>
              Return
            </button>
          )}
        </div>
        <div className="container1">
          {this.state.neworderchq == true ? (
            <h4>Validate Chq [New Order]</h4>
          ) : (
            ""
          )}
          {this.state.replacementchq == true ? (
            <h4>Validate Chq [Replacement/Non-COD]</h4>
          ) : (
            ""
          )}
          {this.state.returnchq == true ? <h4>Validate Chq [Return]</h4> : ""}
          <form onSubmit={(e) => this.onSubmit(e)}>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td>
                    <div className="input-group">
                      <label className="form-label">CN# Number</label>
                      <textarea
                        style={{ width: "100%" }}
                        placeholder="CN# Number"
                        value={this.state.neworderchqCn}
                        onChange={(e) =>
                          this.setState({ neworderchqCn: e.target.value })
                        }
                      />
                    </div>
                  </td>
                </tr>

                {this.state.neworderchq == true ? (
                  <tr>
                    <td>
                      <div className="input-group">
                        <label className="form-label">Amount</label>
                        <textarea
                          style={{ width: "100%" }}
                          placeholder="Amount"
                          value={
                            this.state.neworderchqAmount == 0
                              ? ""
                              : this.state.neworderchqAmount
                          }
                          onChange={(e) =>
                            this.setState({ neworderchqAmount: e.target.value })
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ) : (
                  ""
                )}
                <tr>
                  <td colSpan={2}>
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
                      {this.state.countErr ? (
                        <div style={{ color: "red" }}>
                          {this.state.countErrmsg}
                        </div>
                      ) : (
                        ""
                      )}
                      {this.state.submitButton ? (
                        <input
                          type="submit"
                          value="Submit Order"
                          className="btn btn-primary"
                          style={{ width: "40%", margin: "5px" }}
                        />
                      ) : (
                        <input
                          type="submit"
                          value="Submit"
                          disabled
                          className="btn btn-primary"
                          style={{ width: "40%", margin: "5px" }}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <button
            className="btn btn-danger"
            style={{ width: "40%", margin: "5px" }}
            onClick={(e) =>
              this.setState({
                submitButton: true,
                addchq: false,
                newchqName: "",

                neworderchqAmount: 0,
                neworderchqCn: "",
                showExtraCNTable: false,
                extraCN: [],
                response: [],
                paymentRcv: [],
                showAmountTable: false,
                amountIssueCn: [],
                amountDiff: [],
                chqNames: [],
                showPaymentRcv: false,
                name: "no",
                extraCNreason: [],
                amountIssuereason: [],
                chqNameErr: "Select Cheque Name Please!",
                chqNameBool: false,
                CNnotreplacement: false,
                CNnotreturnarr: [],
                CNnotreplacementarr: [],
                CNnotreturn: false,
                CNnotreplacementreason: [],
                CNnotreturnreason: [],
              })
            }
          >
            Clear
          </button>
        </div>
        {this.state.showExtraCNTable == true ? this.showExtraCNTable() : ""}
        {this.state.showAmountTable == true ? this.amountTable() : ""}
        {this.state.showPaymentRcv == true ? this.showPaymentRcv() : ""}
        {this.state.CNnotreplacement == true ? this.CNnotreplacement() : ""}
        {this.state.CNnotreturn == true ? this.CNnotreturn() : ""}
        {this.state.chqNameBool == true ? (
          <div style={{ color: "white" }}>!!! {this.state.chqNameErr}</div>
        ) : (
          ""
        )}
        {this.state.showPaymentRcv ||
        this.state.showAmountTable ||
        this.state.showExtraCNTable ||
        this.state.CNnotreplacement ||
        this.state.CNnotreturn ? (
          <button
            onClick={() => {
              this.updateDatabase();
            }}
            className="btn btn-dark"
            style={{ marginBottom: "20px" }}
          >
            Update Database
          </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ValidateCheque);
