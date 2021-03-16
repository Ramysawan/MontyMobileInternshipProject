import React, { Component } from "react";
import CustomerDataService from "../services/customer.service";

export default class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeCountryName = this.onChangeCountryName.bind(this);
    this.onChangeCountryCode = this.onChangeCountryCode.bind(this);
    this.onChangeOperatorName = this.onChangeOperatorName.bind(this);
    this.saveCustomer = this.saveCustomer.bind(this);
    this.newCustomer = this.newCustomer.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      phoneNumber: "",
      countryCode: "",
      countryName: "",
      operatorName: "",
      published: false,

      submitted: false,
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangePhoneNumber(e) {
    this.setState({
      phoneNumber: e.target.value,
    });
  }
  onChangeOperatorName(e) {
    this.setState({
      operatorName: e.target.value,
    });
  }
  onChangeCountryCode(e) {
    this.setState({
      countryCode: e.target.value,
    });
  }
  onChangeCountryName(e) {
    this.setState({
      countryName: e.target.value,
    });
  }

  saveCustomer() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      phoneNumber: this.state.phoneNumber,
      operatorName: this.state.operatorName,
      countryCode: this.state.countryCode,
      countryName: this.state.countryName,
    };

    CustomerDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          phoneNumber: response.data.phoneNumber,
          operatorName: response.data.operatorName,
          countryCode: response.data.countryCode,
          countryName: response.data.countryName,
          published: response.data.published,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newCustomer() {
    this.setState({
      id: null,
      title: "",
      description: "",
      phoneNumber: "",
      countryCode: "",
      countryName: "",
      operatorName: "",
      published: false,

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <br />
            <button className="btn btn-success" onClick={this.newCustomer}>
              Add
            </button>
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
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Full Name:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Address:</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                required
                value={this.state.phoneNumber}
                onChange={this.onChangePhoneNumber}
                name="phoneNumber"
              />
            </div>

            <button onClick={this.saveCustomer} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
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
