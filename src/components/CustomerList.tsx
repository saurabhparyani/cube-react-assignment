import React, { useEffect, useRef } from "react";

type Customer = {
  id: number;
  name: string;
  title: string;
};

type Props = {
  customers: Customer[];
  selectedCustomerId: number;
  onSelectCustomer: (id: number) => void;
};

const CustomerList: React.FC<Props> = ({
  customers,
  selectedCustomerId,
  onSelectCustomer,
}) => {
  const selectedCustomerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedCustomerRef.current) {
      selectedCustomerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [selectedCustomerId]);

  return (
    <div className="customer-list">
      {customers.map((customer) => (
        <div
          key={customer.id}
          ref={selectedCustomerId === customer.id ? selectedCustomerRef : null}
          className={`customer-card ${
            selectedCustomerId === customer.id ? "selected" : ""
          }`}
          onClick={() => onSelectCustomer(customer.id)}
        >
          <h3>{customer.name}</h3>
          <p>{customer.title}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomerList;
