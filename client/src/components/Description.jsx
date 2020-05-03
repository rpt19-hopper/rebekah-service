import React from 'react';

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }

    this.descriptionVisible = this.descriptionVisible.bind(this);
    this.descriptionHidden = this.descriptionHidden.bind(this);
    this.expand = this.expand.bind(this);
  }

  expand () {
    this.setState({ visible: !this.state.visible })
  }
  descriptionVisible (string) {
    string = string.replace(/\n/g, "\n\n");
    string = string.slice(0, string.indexOf("\n"))
    return string;
  }
  descriptionHidden (string) {
    string = string.replace(/\n/g, "\n\n");
    string = string.slice(string.indexOf("\n"))
    return string;
  }

  render() {
    if (this.state.visible) {
      return (
        <div className="description-component">
          {this.descriptionVisible(this.props.product.productDescription)}
          {this.descriptionHidden(this.props.product.productDescription)}
          <button className="less" onClick={() => this.expand()}>Less</button>
        </div>
      )
    } else {
      return (
        <div className="description-component">
          {this.descriptionVisible(this.props.product.productDescription)}
          <div className="fadeout"></div>
          <button className="learn-more-button" onClick={() => this.expand()}>Learn more about this item</button>
        </div>
      )
    }
  }
}

export default Description;
