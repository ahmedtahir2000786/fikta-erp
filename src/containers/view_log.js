class ViewLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      status_reason: "",
      reasonarr: [],
      updateButton: false,
      updateSingle: [],
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
        });

        this.setState({
          data: response.data,
          reasonarr: reasonArr,
          updateSingle: this.state.updateSingle,
        });

        //console.log("Check",response.data)
      })
      .catch((err) => console.log("Error", err));
  };

  updateonebyone = (i) => {
    let date_create = moment().format("YYYY-MM-DD HH:mm:ss");
    let lst = this.state.data[0]["status_date"][i]["updated"];
    lst.push({ upd_date: date_create, upd_rsn: this.state.reasonarr[i] });
    //console.log("Status Data", this.state.data[0]["status_date"][i], "i", i);
    // this.state.data[0]["status_date"].map((v, i) => {
    //   v.reason = this.state.reasonarr[i];
    // });

    axios
      .post(
        "https://meatncuts.com.pk/phpfiles/api/update_comments.php?id=" +
          this.props.id +
          "&idx=" +
          i,
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
  updateComment = (e, i) => {
    e = e.replace(/[^0-9a-zA-Z\s]*/g, "");
    this.state.reasonarr[i] = e;
    this.state.updateSingle[i] = true;
    this.setState({
      reasonarr: this.state.reasonarr,
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
                    width: "40%",
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
              <Col style={{ textAlign: "center" }}>
                <div>
                <strong>Comment: </strong>
                 {length_of_array == 0?
                 <input
                 style={{ width: "80%" }}
                 value={this.state.reasonarr[i]}
                 onChange={(e) => this.updateComment(e.target.value, i)}
               />
                 :
                
                  <input
                    style={{ width: "80%" }}
                    value={this.state.data[0]["status_date"][i]["updated"][length_of_array-1]["upd_rsn"]}
                    onChange={(e) => this.updateComment(e.target.value, i)}
                  />
                 }
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
              </Col>
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