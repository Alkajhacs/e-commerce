import React, { Component } from "react";
import axios from "axios";
import Table from "./Table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class AllUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
    };
  }

  componentDidMount() {
    this.fetchAllUsers();
  }

  fetchAllUsers() {
    axios.get("http://localhost:8000/api/getAllUsers").then((response) => {
      this.setState({
        allUsers: response.data,
      });
    });
  }

  handleDelete(userId) {
    console.log("hello");
    axios
      .delete(`http://localhost:8000/api/deleteUser/${userId}`)
      .then((response) => {
        toast.success(response.data, {
          autoClose: 3000,
        });
      })
      .catch((error) => {
        toast.error(error, {
          autoClose: 3000,
        });
      });
  }

  render() {
    const { allUsers = [] } = this.state;
    const header = [
      "User Id",
      "User Name",
      "User Mail",
      "User Phone Number",
      "Address",
      "User Role",
      "Action",
    ];
    return (
      <div className="common_bg padding_36">
        <ToastContainer />
        <Table
          header={header}
          tableData={allUsers}
          handleActionButton={this.handleDelete}
          isOrders={false}
        />
      </div>
    );
  }
}
export default AllUsers;
