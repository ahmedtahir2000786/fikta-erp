import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../containers/home";
import Chat from "../containers/chat";
import Login from "../containers/login";
import Edit from "../containers/edit";
import DeletedTable from "../containers/deleted_data";
import Table from "../containers/table";
import DeliveredReturnTable from "../containers/delivered";
import AllWithoutDeleteTable from "../containers/allorderswithoutdeleted";
import NewOrder from "../containers/neworder";
import ProductForm from "../containers/add_product_form";
import Products from "../containers/product_table";
import SingleProduct from "../containers/single_product";
import ValidateCheque from "../containers/validate_cheque";
import ChequeDetail from "../containers/chq_detail";
import ChequeData from "../containers/chq_data";
import BookReplace from "../containers/bookreplace";
import EditDelete from "../containers/edit_delete";
import ReplacementData from "../containers/replacement_data";
import ReturnData from "../containers/return_rcv";
import ChangePass from "../containers/changepass";
import AddProductDtl from "../containers/add_product_detail_predef";
import ShipperDetail from "../containers/shipper_detail";
import CityDetail from "../containers/citydtl";

class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/data" component={Home} />
        <Route exact path="/view_data" component={Table} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/deleted_orders" component={DeletedTable} />
        <Route
          exact
          path="/returndelivered_orders"
          component={DeliveredReturnTable}
        />
        <Route
          exact
          path="/allorders_withoutdeleted"
          component={AllWithoutDeleteTable}
        />
        <Route exact path="/edit/:id" component={Edit} />
        <Route exact path="/neworder" component={NewOrder} />
        <Route exact path="/add_product_form" component={ProductForm} />
        <Route exact path="/product_data" component={Products} />
        <Route exact path="/single_product" component={SingleProduct} />
        <Route exact path="/validate_chq" component={ValidateCheque} />
        <Route exact path="/chq_detail" component={ChequeDetail} />
        <Route exact path="/chq_data" component={ChequeData} />
        <Route exact path="/replaceorder" component={BookReplace} />
        <Route exact path="/edit_delete" component={EditDelete} />
        <Route exact path="/replacement_data" component={ReplacementData} />
        <Route exact path="/return_data" component={ReturnData} />
        <Route exact path="/changepass" component={ChangePass} />
        <Route exact path="/add_prod_detail" component={AddProductDtl} />
        <Route exact path="/shipper_detail" component={ShipperDetail} />
        <Route exact path="/city_detail" component={CityDetail} />
      </Router>
    );
  }
}

export default AppRouter;
