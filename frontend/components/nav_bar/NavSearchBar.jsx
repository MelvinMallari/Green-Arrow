import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStocks } from '../../actions/stock_actions';

class NavSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.state = {
      searchInput: "",
    }
  }

  componentDidMount() {
    if (!this.props.stocks.length) {
      this.props.fetchStocks();
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  queryStocks() {
    let { stocks } = this.props;
    stocks = Object.values(stocks);
    const { searchInput } = this.state;
    const cutoff = 10;

    let res=[];
    if (searchInput.length > 0) {
      for (let i = 0; i < stocks.length; i++) {
        if (res.length > cutoff) break;
        let stock = stocks[i];
        if (this.queryMatch(stock)) {
          res.push(
              <li key={stock.symbol}>
                <Link to={`/stocks/${stock.symbol}`}>
                  <span>{stock.symbol}</span>
                  <span>{stock.name}</span>
                </Link>
              </li>
          );
        }
      }
    }
    return res;
  }

  queryMatch(stock) {
    if (!stock.symbol || !stock.name) return false;
    let searchInput = this.state.searchInput.toLowerCase();
    let symbol = stock.symbol.toLowerCase(); 
    let name = stock.name.toLowerCase();
    if (symbol.includes(searchInput) || name.includes(searchInput)) return true;
    return false;
  }

  render() {
    return (
      <div>
        <input 
          type="text"
          placeholder="search"
          className="search-input"
          value={this.state.searchInput}
          onChange={this.update("searchInput")}/>
          <div>
            <ul className="search-result">
              {this.queryStocks()}
            </ul>
          </div>
      </div>
    ); 
  }
}

const msp = ({entities: { stocks }}) => {
  return ({
    stocks: stocks,
  });
}

const mdp = dispatch => ({
  fetchStocks: () => dispatch(fetchStocks())
});

export default connect(msp, mdp)(NavSearchBar)