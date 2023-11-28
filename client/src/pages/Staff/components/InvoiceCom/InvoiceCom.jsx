import React, { Component } from 'react'
import LineItems from './LineItems'

class InvoiceCom extends Component {
  locale = 'en-US'
  currency = 'USD'
  mapServicesToLineItems = () => {
    const servicesData = this.props.services;

    const lineItems = [];

    for (let i = 0; i < servicesData.name.length; i++) {
      lineItems.push({
        id: i + 1, 
        name: servicesData.name[i],
        quantity: 1, 
        price: servicesData.servicePrices[i], 
      });
    }

    return lineItems;
  };

  mapMedicine = () => {
    const medicineData = this.props.medicine;

    const lineMedicine = [];

    for (let i = 0; i < medicineData.name.length; i++) {
      lineMedicine.push({
        id: i + 1, 
        name: medicineData.name[i],
        quantity: medicineData.quantity[i], 
        price: medicineData.Prices[i], 
      });
    }

    return lineMedicine;
  };
  state = {
    lineItems: this.mapServicesToLineItems(),
    lineMedicine: this.mapMedicine(),
  }

  handleInvoiceChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleLineItemChange = (elementIndex) => (event) => {
    let lineItems = this.state.lineItems.map((item, i) => {
      if (elementIndex !== i) return item
      return {...item, [event.target.name]: event.target.value}
    })
    this.setState({lineItems})
  }


  handleFocusSelect = (event) => {
    event.target.select()
  }

  formatCurrency = (amount) => {
    return (new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount))
  }

  calcTaxAmount = (c) => {
    return c * (this.state.taxRate / 100)
  }

  calcLineItemsTotal = () => {
    return this.state.lineItems.reduce((prev, cur) => (prev + (cur.quantity * cur.price)), 0) + this.state.lineMedicine.reduce((prev, cur) => (prev + (cur.quantity * cur.price)), 0)
  }

  calcTaxTotal = () => {
    return this.calcLineItemsTotal() * (10 / 100)
  }

  calcGrandTotal = () => {
    return this.calcLineItemsTotal() + this.calcTaxTotal()
  }

  render = () => {
    return (

      <div className="max-w-[maxWidth] mx-auto border p-[2*20px] rounded-[4px] bg-[#ffffff]">
        <div className="mb-[2*20px]">
          <div className="inline-block rounded-[4px]">
            <img src="https://via.placeholder.com/150x50.png?text=logo" alt="Logo" className="logo" />
          </div>
        </div>
        <div className="flex flex-wrap  text-left  w-[750px]">
          <div className={`block font-normal mr-[10px] bg-[#efefef] border-1 border-[#ccc] p-[20px] rounded-[4px] w-1/3 max-w-[266px] from`}>
            <strong>Dencare</strong><br />
            227 Đ. Nguyễn Văn Cừ<br />
            Thành phố Hồ Chí Minh<br />
            0988000000
          </div>
          <div className={`block w-[350px]  p-0`}>
            <div className={`value text-right block ml-[10px] p-0 p-[20px] rounded-[4px] w-2/3  `}>
              <div className="grid grid-cols-2 border-b border-[#ccc]">
                <div className="flex items-center justify-start font-bold">Customer #</div>
                <div className="text-right">123456</div>
              </div>
              <div className="grid grid-cols-2 border-b border-[#ccc]">
                <div className="flex items-center justify-start font-bold">Invoice #</div>
                <div className="text-right">123456</div>
              </div>
              <div className="grid grid-cols-2 border-b border-[#ccc]">
                <div className="flex items-center justify-start font-bold">Date</div>
                <div className="text-right">2019-01-01</div>
              </div>
            </div>
          </div>
        </div>

        <h2>Service</h2>

          <LineItems
            items={this.state.lineItems}
            currencyFormatter={this.formatCurrency}
            changeHandler={this.handleLineItemChange}
            focusHandler={this.handleFocusSelect}
          />
        <h2>Medicine</h2>

          <LineItems
            items={this.state.lineMedicine}
            currencyFormatter={this.formatCurrency}
            changeHandler={this.handleLineItemChange}
            focusHandler={this.handleFocusSelect}
          />
        <div className="totalContainer mt-5">
            <div className ="w-[200px]">
              <div className="grid grid-cols-[1fr_0.5fr] border border-[#ccc] p-1">
                <div className="flex items-center justify-start font-bold">Tax Rate (%)</div>
                <div className="text-right"><input className ="input" name="taxRate" value={10} onChange={this.handleInvoiceChange} onFocus={this.handleFocusSelect} /></div>
              </div>
            </div>
            <div className="valueTable">
              <div className="grid grid-cols-2 border-b border-[#ccc] p-1">
                <div className="flex items-center justify-start font-bold ">Subtotal</div>
                <div className={`text-right text-right break-words`}>{this.formatCurrency(this.calcLineItemsTotal())}</div>
              </div>
              <div className="grid grid-cols-2 border-b border-[#ccc] p-1">
                <div className="flex items-center justify-start font-bold">Tax ({10}%)</div>
                <div className={`text-right text-right break-words`}>{this.formatCurrency(this.calcTaxTotal())}</div>
              </div>
              <div className="grid grid-cols-2 border-b border-[#ccc] p-1">
                <div className="flex items-center justify-start font-bold">Total Due</div>
                <div className={`text-right text-right break-words`}>{this.formatCurrency(this.calcGrandTotal())}</div>
              </div>
            </div>
        </div>

      </div>

    )
  }

}

export default InvoiceCom
