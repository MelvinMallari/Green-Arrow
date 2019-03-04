import React from 'react';

class SplashSideBarIndex extends React.Component {
  componentDidMount() {
    this.props.fetchStocks();
  }
  
  render() {
    debugger;
    return (
      <div>
        hello world
      </div>
    );
  }
}

export default SplashSideBarIndex;