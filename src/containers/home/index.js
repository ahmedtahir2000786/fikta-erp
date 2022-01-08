import React, { Component } from "react";
import { connect } from "react-redux";
import { readData, set_data, storeData } from "../../store/action";
import Table from "../table.js";
import Form from "../form.js";
import DeletedTable from "../deleted_data";
import { Link } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import neworder from "../../icons/neworder.png";
import replacementorder from "../../icons/replacement.png";
import vieworders from "../../icons/viewdata.png";
import replacementrcvd from "../../icons/replacementrcvd.png";
import returnrcvd from "../../icons/returnrcvd.png";
import editordelete from "../../icons/editdelete.png";
import addprod from "../../icons/addprod.png";
import viewprod from "../../icons/viewprod.png";
import prodsaledata from "../../icons/viewproddata.png";
import regchq from "../../icons/regchq.png";
import valchq from "../../icons/validatechq.png";
import viewchq from "../../icons/viewchq.png";
import "../../css/table.css";
import fb from "../../config/firebase";
import axios from "axios";

class CardData extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card
        style={{ width: "18rem", margin: "auto" }}
        className="cardDashboard"
      >
        <Card.Img
          variant="top"
          src={this.props.imageLink}
          style={{ width: "50%", margin: "auto" }}
        />
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Text>{this.props.desc}</Card.Text>
          <Link to={this.props.link}>
            <Button variant="dark">Click To Proceed</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

class Home extends Component {
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
  }
  // try = () => {
  //   axios
  //     .get("http://localhost:80/phpfiles/api/view_prods.php")
  //     .then((response) => {
  //       console.log(response.data);

  //       //console.log("Check",response.data)
  //     })
  //     .catch((err) => console.log("Error", err));
  // };

  handleSignout = () => {
    const firebase = fb.firebase_;
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("signout is successful");
        this.props.history.push("/");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  componentDidMount = () => {};
  render() {
    //console.log("Mai Doobara Render hua")
    // {console.log("State available: ", this.props.state)}
    // {console.log("Read Data: ")}
    // {this.props.readData()}

    return (
      <Container style={{ padding: "10px", marginTop: "20px" }}>
        <div style={{ marginBottom: "35px" }}>
          <button
            className="btn btn-dark"
            onClick={() => this.handleSignout()}
            style={{ position: "absolute", right: 35, width: "20%" }}
          >
            Signout
          </button>
        </div>
        <Link to="/add_prod_detail">
          <Button variant="dark" style={{ margin: "10px" }}>
            Add Product Details
          </Button>
        </Link>
        <Link to="/shipper_detail">
          <Button variant="dark" style={{ margin: "10px" }}>
            Shipper Details
          </Button>
        </Link>
        <Link to="/city_detail">
          <Button variant="dark" style={{ margin: "10px" }}>
            City Details
          </Button>
        </Link>
        <Row style={{ textAlign: "center", padding: "10px" }}>
          <Col style={{ margin: "10px" }}>
            <CardData
              link="/neworder"
              title="New Order"
              desc=""
              imageLink={neworder}
            />
          </Col>
          <Col style={{ margin: "10px" }}>
            <CardData
              link="/replaceorder"
              title="Replacement Order"
              desc=""
              imageLink={replacementorder}
            />
          </Col>
          <Col style={{ margin: "10px" }}>
            <CardData
              link="/view_data"
              title="View Orders [Data]"
              desc=""
              imageLink={vieworders}
            />
            
            
          </Col>
        </Row>
        <Row style={{ textAlign: "center", padding: "10px" }}>
          <Col style={{ margin: "10px" }}>
            <CardData
              link="/table_data_without_product"
              title="View Data [Without Product]"
              desc=""
              imageLink={vieworders}
            />
          </Col>
          <Col style={{ margin: "10px" }}>
            <CardData
              link="/replacement_data"
              title="Replacement Rcvd. Update"
              desc=""
              imageLink={replacementrcvd}
            />
          </Col>
          <Col style={{ margin: "10px" }}>
            <CardData
              link="/return_data"
              title="Return Rcvd. Update"
              desc=""
              imageLink={returnrcvd}
            />
          </Col>
          
        </Row>
        <Row style={{ textAlign: "center", padding: "10px" }}>
        <Col style={{ margin: "10px" }}>
            <CardData
              link="/edit_delete"
              title="Edit OR Delete"
              desc=""
              imageLink={editordelete}
            />
          </Col>
          <Col style={{ margin: "10px" }}>
            <CardData
              link="/add_product_form"
              title="Add Product"
              desc=""
              imageLink={addprod}
            />
          </Col>
          <Col style={{ margin: "10px" }}>
            <CardData
              link="/product_data"
              title="View Products"
              desc=""
              imageLink={viewprod}
            />
          </Col>
          
        </Row>
        <Row style={{ textAlign: "center", padding: "10px" }}>
        <Col style={{ margin: "10px" }}>
            <CardData
              link="/single_product"
              title="Get Product Sale Data"
              desc=""
              imageLink={prodsaledata}
            />
          </Col>
          <Col style={{ margin: "10px" }}>
            <CardData
              link="/chq_detail"
              title="Register/Edit Cheque Details"
              desc=""
              imageLink={regchq}
            />
          </Col>
          <Col style={{ margin: "10px" }}>
            <CardData
              link="/validate_chq"
              title="Validate Cheque"
              desc=""
              imageLink={valchq}
            />
          </Col>
         
        </Row>
        <Row>
        <Col style={{ margin: "10px" }}>
            <CardData
              link="/chq_data"
              title="View Cheque [Data]"
              desc=""
              imageLink={viewchq}
            />
          </Col>
        </Row>
        {/* <button onClick={() => this.try()}>Try</button> */}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.entry,
});

const mapDispatchToProps = (dispatch) => ({
  storeData: (e) => dispatch(storeData(e)),
  set_data: (e) => dispatch(set_data(e)),
  readData: () => dispatch(readData()),
  //    facebook_login: () =>dispatch(facebook_login())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
