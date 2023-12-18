import React, { useEffect, useState } from "react";
import LineItems from "./LineItems";

const InvoiceCom = (props) => {
  const locale = "en-US";
  const currency = "USD";
  useEffect(() => {
    props.total(calcLineItemsTotal());
  }, []);
  const mapServicesToLineItems = () => {
    const servicesData = props.services;
    let currentId = 1;
    const service = servicesData.map((item) => ({
      id: currentId++,
      name: item.serviceName,
      quantity: 1,
      price: item.price,
    }));

    return service;
  };

  const mapMedicine = () => {
    const medicineData = props.medicine;

    let currentId = 1;
    const medicine = medicineData.map((item) => ({
      id: currentId++,
      name: item.medicineName,
      quantity: item.quantity,
      price: item.price,
    }));

    return medicine;
  };

  const [lineItems, setLineItems] = useState(mapServicesToLineItems());
  const [lineMedicine, setLineMedicine] = useState(mapMedicine());
  const [taxRate, setTaxRate] = useState(10);

  const handleInvoiceChange = (event) => {
    const { name, value } = event.target;
    if (name === "taxRate") {
      setTaxRate(value);
    }
  };

  const handleLineItemChange = (elementIndex) => (event) => {
    setLineItems((prevLineItems) =>
      prevLineItems.map((item, i) =>
        elementIndex !== i ? item : { ...item, [event.target.name]: event.target.value }
      )
    );
  };

  const handleFocusSelect = (event) => {
    event.target.select();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const calcTaxAmount = (c) => {
    return c * (taxRate / 100);
  };

  const calcLineItemsTotal = () => {
    return (
      lineItems.reduce((prev, cur) => prev + cur.quantity * cur.price, 0) +
      lineMedicine.reduce((prev, cur) => prev + cur.quantity * cur.price, 0)
    );
  };

  const calcTaxTotal = () => {
    return calcLineItemsTotal() * (taxRate / 100);
  };

  const calcGrandTotal = () => {
    return calcLineItemsTotal() + calcTaxTotal();
  };

  return (
    <div className="max-w-[maxWidth] mx-auto border p-[2*20px] rounded-[4px] bg-[#ffffff]">
      <div className="mb-[2*20px]">
        <div className="inline-block rounded-[4px]">
          <img
            src="https://via.placeholder.com/150x50.png?text=logo"
            alt="Logo"
            className="logo"
          />
        </div>
      </div>
      <div className="flex flex-wrap  text-left  w-[750px]">
        <div
          className={`block font-normal mr-[10px] bg-[#efefef] border-1 border-[#ccc] p-[20px] rounded-[4px] w-1/3 max-w-[266px] from`}
        >
          <strong>Dencare</strong>
          <br />
          227 Đ. Nguyễn Văn Cừ
          <br />
          Thành phố Hồ Chí Minh
          <br />
          0988000000
        </div>
        <div className={`block w-[350px]  p-0`}>
          <div
            className={`value text-right block ml-[10px] p-0 p-[20px] rounded-[4px] w-2/3  `}
          >
            <div className="grid grid-cols-2 border-b border-[#ccc]">
              <div className="flex items-center justify-start font-bold">
                Customer #
              </div>
              <div className="text-right">123456</div>
            </div>
            <div className="grid grid-cols-2 border-b border-[#ccc]">
              <div className="flex items-center justify-start font-bold">
                Invoice #
              </div>
              <div className="text-right">123456</div>
            </div>
            <div className="grid grid-cols-2 border-b border-[#ccc]">
              <div className="flex items-center justify-start font-bold">
                Date
              </div>
              <div className="text-right">2019-01-01</div>
            </div>
          </div>
        </div>
      </div>

      <h2>Service</h2>

      <LineItems
        items={lineItems}
        currencyFormatter={formatCurrency}
        changeHandler={handleLineItemChange}
        focusHandler={handleFocusSelect}
      />
      <h2>Medicine</h2>

      <LineItems
        items={lineMedicine}
        currencyFormatter={formatCurrency}
        changeHandler={handleLineItemChange}
        focusHandler={handleFocusSelect}
      />
      <div className="totalContainer mt-5">
        <div className="w-[200px]">
          <div className="grid grid-cols-[1fr_0.5fr] border border-[#ccc] p-1">
            <div className="flex items-center justify-start font-bold">
              Tax Rate (%)
            </div>
            <div className="text-right">
              <input
                className="input"
                name="taxRate"
                value={10}
                onChange={handleInvoiceChange}
                onFocus={handleFocusSelect}
              />
            </div>
          </div>
        </div>
        <div className="valueTable">
          <div className="grid grid-cols-2 border-b border-[#ccc] p-1">
            <div className="flex items-center justify-start font-bold ">
              Subtotal
            </div>
            <div className={`text-right text-right break-words`}>
              {formatCurrency(calcLineItemsTotal())}
            </div>
          </div>
          <div className="grid grid-cols-2 border-b border-[#ccc] p-1">
            <div className="flex items-center justify-start font-bold">
              Tax ({10}%)
            </div>
            <div className={`text-right text-right break-words`}>
              {formatCurrency(calcTaxTotal())}
            </div>
          </div>
          <div className="grid grid-cols-2 border-b border-[#ccc] p-1">
            <div className="flex items-center justify-start font-bold">
              Total Due
            </div>
            <div className={`text-right text-right break-words`}>
              {formatCurrency(calcGrandTotal())}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCom;
