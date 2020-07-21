import React from 'react';
import $ from 'jquery';
import Review from './Review.jsx';
import Price from './Price.jsx';
import Selection from './Selection.jsx';
import Distribution from './Distribution.jsx';
import Highlight from './Highlight.jsx';
import Description from './Description.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      productnumber: 0,
      productname: '',
      productdescription: '',
      productcategory: '',
      versions: {}
    }
    this.product = this.product.bind(this);
  }

  componentDidMount() {
    this.product();
  }

  product () {
    var url = new URL(window.location.href)
    var productNumber = window.location.pathname.split('/')[2]
    $.ajax({
      method: 'GET',
      url: `http://${url.hostname}:9000/products/${productNumber}`,
      success: results => {
        console.log(results)
        this.setState(results)
      },
      error: err => { throw err }
    })
  }

  sales () {
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    var sold = numberWithCommas(Math.floor(Math.random() * 2000));
    return (<div className="sales">{`${sold} sales`}</div>)
  }

  render() {
    return (
      <div className="product-service-container">
        <div className="category-review-wrapper">
          <span className="category-component">
            {this.state.productcategory}
          </span>
          <div className="category-divider">|</div>
          {this.sales()}
          <div className="category-divider">|</div>
          <Review/>
        </div>
          <div className="name-component">
            {this.state.productname}
          </div>
        <Price/>
        <Selection product={this.state}/>
        <Distribution/>
        <Highlight product={this.state}/>
        <Description product={this.state}/>
      </div>
    )
  }
}

export default App;