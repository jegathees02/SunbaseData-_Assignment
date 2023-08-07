import React, { useState, useEffect } from "react";
import axios from "axios";
import '../assets/css/customerlist.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    // Get the token from the local storage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }

    // Get the customer list from the API
    const url = "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list";
    const headers = {
      Authorization: `Bearer ${token}`
    };
    axios.get(url, { headers })
      .then((response) => {
        if (response.status === 200) {
          setCustomers(response.data);
        } else {
          console.log(response.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const handleEdit = (uuid) => {
    window.location.href = `/customers/edit/${uuid}`;
  };

  const handleDelete = (uuid) => {
    // Make a DELETE request to the API
    const url = `https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp`;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    axios.delete(url, { headers, params: { uuid: uuid } })
      .then((response) => {
        if (response.status === 204) {
          console.log("Customer deleted successfully");
          // Refresh the customer list
          setCustomers([]);
        } else {
          console.log(response.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="customer-list-container">
      <h1 className="customer-list-title">Customer List</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.uuid}>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>
                <button
                  onClick={() => handleEdit(customer.uuid)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(customer.uuid)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
