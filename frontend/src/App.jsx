import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import RegisterPage from "./pages/RegisterPage";
import { makeStyles } from "@material-ui/core/styles";
import UserProfilePage from "./pages/admin/UserProfilePage";
import ProductEditPage from "./pages/admin/ProductEditPage";
import ProductCreatePage from "./pages/admin/ProductCreatePage";
import CartPage from "./pages/CartPage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/admin/OrdersPage";
import ProductsPage from "./pages/admin/ProductsPage";
import UsersPage from "./pages/admin/UsersPage";
import { Container } from "@material-ui/core";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route path="/admin/orders" component={OrdersPage} />
          <Route path="/admin/products" component={ProductsPage} />
          <Route path="/admin/users" component={UsersPage} />
          <Route path="/admin/order" component={OrdersPage} />
          <Route path="/admin/product/new" component={ProductCreatePage} />
          <Route path="/admin/product/:id" component={ProductEditPage} />
          <Route path="/admin/user/:id" component={UserProfilePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/shipping" component={ShippingPage} />
          <Route path="/payment" component={PaymentPage} />
          <Route path="/placeorder" component={PlaceOrderPage} />
          <Route path="/order/:id" component={OrderPage} />
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/products/:id" component={ProductDetailsPage} />
          <Route path="/search/:keyword" exact component={HomePage} />
          <Route path="/" exact component={HomePage} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
