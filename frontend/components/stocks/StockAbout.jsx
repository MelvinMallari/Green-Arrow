import React from 'react';

class StockAbout extends React.Component {
  render() {
    const { stock } = this.props;
    return(
      <section>
        <header>
          <div>
            <h2>About </h2>
          </div>
        </header>
        <div>
          <h3>{stock.description}</h3>
        </div>
        <div>
          <div>
            <div>CEO</div>
            <div>{stock.ceo}</div>
          </div>
          <div>
            <div>Industry</div>
            <div>{stock.industry}</div>
          </div>
          <div>
            <div></div>
            <div></div>
          </div>
          <div>
            <div></div>
            <div></div>
          </div>
          <div>
            <div></div>
            <div></div>
          </div>
          <div>
            <div></div>
            <div></div>
          </div>
          <div>
            <div></div>
            <div></div>
          </div>
          <div>
            <div></div>
            <div></div>
          </div>

        </div>

      </section>
    );
  }
}

export default StockAbout;
