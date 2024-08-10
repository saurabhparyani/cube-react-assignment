import React from "react";
import PhotoGrid from "./PhotoGrid";

type CustomerDetailsProps = {
  customer: {
    id: number;
    name: string;
    title: string;
    address: string;
  } | null;
};

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  if (!customer)
    return (
      <div className="customer-details">Select a customer to view details</div>
    );

  return (
    <div className="customer-details">
      <h2 style={{ textAlign: "center", fontFamily: "sans-serif" }}>
        {customer.name}
      </h2>
      <h4 style={{ fontWeight: "lighter" }}>{customer.title}</h4>
      <p style={{ font: "message-box", fontSize: "25px" }}>
        {customer.address}
      </p>
      <PhotoGrid />
    </div>
  );
};

export default CustomerDetails;
