import React, { useState } from "react";
import "./App.css";
import CustomerList from "./components/CustomerList";
import CustomerDetails from "./components/CustomerDetails";
import { customers } from "./utils/customers";

const App: React.FC = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null
  );

  const selectedCustomer =
    customers.find((customer) => customer.id === selectedCustomerId) || null;

  return (
    <div>
      <h1 style={{ textAlign: "center", fontWeight: "lighter" }}>
        Customer Management System
      </h1>
      <div className="app">
        <div className="customer-list-section">
          <CustomerList
            customers={customers}
            selectedCustomerId={selectedCustomerId!}
            onSelectCustomer={setSelectedCustomerId}
          />
        </div>
        <div className="customer-details-section">
          <CustomerDetails customer={selectedCustomer} />
        </div>
      </div>
    </div>
  );
};

export default App;
