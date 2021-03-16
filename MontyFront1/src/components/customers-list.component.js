import React, { Component } from "react";
import CustomerDataService from "../services/customer.service";
import { Link } from "react-router-dom";

export default class CustomersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveCustomers = this.retrieveCustomers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCustomer = this.setActiveCustomer.bind(this);
    this.removeAllCustomers = this.removeAllCustomers.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      customers: [],
      currentCustomer: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.retrieveCustomers();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  retrieveCustomers() {
    CustomerDataService.getAll()
      .then((response) => {
        this.setState({
          customers: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCustomers();
    this.setState({
      currentCustomer: null,
      currentIndex: -1,
    });
  }

  setActiveCustomer(customer, index) {
    this.setState({
      currentCustomer: customer,
      currentIndex: index,
    });
  }

  removeAllCustomers() {
    CustomerDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentCustomer: null,
      currentIndex: -1,
    });

    CustomerDataService.findByTitle(this.state.searchTitle)
      .then((response) => {
        this.setState({
          customers: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const {
      searchTitle,
      customers,
      currentCustomer,
      currentIndex,
    } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Customers List</h4>

          <ul className="list-group">
            {customers &&
              customers.map((customer, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCustomer(customer, index)}
                  key={index}
                >
                  {customer.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllCustomers}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentCustomer ? (
            <div>
              <h4>Customer</h4>
              <div>
                <label>
                  <strong>Full Name:</strong>
                </label>{" "}
                {currentCustomer.title}
              </div>
              <div>
                <label>
                  <strong>Address:</strong>
                </label>{" "}
                {currentCustomer.description}
              </div>
              <div>
                <label>
                  <strong>Phone Number:</strong>
                </label>{" "}
                {currentCustomer.phoneNumber}
              </div>
              <div>
                <label>
                  <strong>Country Code:</strong>
                </label>{" "}
                {currentCustomer.countryCode}
              </div>
              <div>
                <label>
                  <strong>Country Name:</strong>
                </label>{" "}
                {currentCustomer.countryName}
              </div>
              <div>
                <label>
                  <strong>Operator Name:</strong>
                </label>{" "}
                {currentCustomer.operatorName}
              </div>

              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentCustomer.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/customers/" + currentCustomer.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Customer...</p>
            </div>
          )}
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}
