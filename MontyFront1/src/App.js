import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddCustomer from "./components/add-customer.component";
import Customer from "./components/customer.component";
import CustomersList from "./components/customers-list.component";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselComponent from "./components/carouselComponent";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            MontyApp
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/customers"} className="nav-link">
                Customers
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Customer
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/" component={CarouselComponent} />
            <Route exact path={["/customers"]} component={CustomersList} />
            <Route exact path="/add" component={AddCustomer} />
            <Route path="/customers/:id" component={Customer} />
          </Switch>
        </div>

        <div>
          <footer class="footer text-center text-lg-start">
            <div class="container p-4">
              <div class="row">
                <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                  <h5 class="text-uppercase">MontyApp</h5>

                  <p>
                    MontyApp is a web app where you can add customer's phone
                    number and get all information about this phone number.
                  </p>
                </div>
                <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase">Links</h5>
                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="http://twitter.com" class="primary">
                        Our Twitter page
                      </a>
                    </li>
                    <li>
                      <a href="http://facebook.com" class="primary">
                        Our Facebook Page
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase">Sponsors</h5>
                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="http://google.com" class="primary">
                        Google
                      </a>
                    </li>
                    <li>
                      <a href="http://www.montymobile.com" class="primary">
                        MontyMobile
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="text-center p-3 footer-color">
              <h5>
                © 2020 Copyright:
                <a class="primary" href="https://google.com/">
                  {" "}
                  MontyApp.com
                </a>
              </h5>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
