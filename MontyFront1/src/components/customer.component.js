import React, { Component } from "react";
import CustomerDataService from "../services/customer.service";

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeCountryName = this.onChangeCountryName.bind(this);
    this.onChangeCountryCode = this.onChangeCountryCode.bind(this);
    this.onChangeOperatorName = this.onChangeOperatorName.bind(this);
    this.getCustomer = this.getCustomer.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateCustomer = this.updateCustomer.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);

    this.state = {
      currentCustomer: {
        id: null,
        title: "",
        description: "",
        phoneNumber: "",
        countryCode: "",
        countryName: "",
        operatorName: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getCustomer(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentCustomer: {
          ...prevState.currentCustomer,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        description: description,
      },
    }));
  }
  onChangePhoneNumber(e) {
    const phoneNumber = e.target.value;

    this.setState((prevState) => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        phoneNumber: phoneNumber,
      },
    }));
  }
  onChangeCountryCode(e) {
    const countryCode = e.target.value;

    this.setState((prevState) => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        countryCode: countryCode,
      },
    }));
  }
  onChangeCountryName(e) {
    const countryName = e.target.value;

    this.setState((prevState) => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        countryName: countryName,
      },
    }));
  }
  onChangeOperatorName(e) {
    const operatorName = e.target.value;

    this.setState((prevState) => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        operatorName: operatorName,
      },
    }));
  }

  getCustomer(id) {
    CustomerDataService.get(id)
      .then((response) => {
        this.setState({
          currentCustomer: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentCustomer.id,
      title: this.state.currentCustomer.title,
      description: this.state.currentCustomer.description,
      phoneNumber: this.state.currentCustomer.phoneNumber,
      countryCode: this.state.currentCustomer.countryCode,
      countryName: this.state.currentCustomer.countryName,
      operatorName: this.state.currentCustomer.operatorName,
      published: status,
    };

    CustomerDataService.update(this.state.currentCustomer.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentCustomer: {
            ...prevState.currentCustomer,
            published: status,
          },
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateCustomer() {
    CustomerDataService.update(
      this.state.currentCustomer.id,
      this.state.currentCustomer
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The Customer was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteCustomer() {
    CustomerDataService.delete(this.state.currentCustomer.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/customers");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentCustomer } = this.state;

    return (
      <div>
        {currentCustomer ? (
          <div className="edit-form">
            <h4>Customer</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Full Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentCustomer.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentCustomer.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  value={currentCustomer.phoneNumber}
                  onChange={this.onChangePhoneNumber}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentCustomer.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentCustomer.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCustomer}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCustomer}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Customer...</p>
          </div>
        )}
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
