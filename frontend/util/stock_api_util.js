
export const fetchStocks = () => (
  $.ajax({
    method: "GET",
    url: `api/stocks`
})
);

export const fetchStock = symbol => (
  $.ajax({
    method: "GET",
    url: `api/stocks/${symbol}`
  })
);

export const fetchStockData = symbol => (
  $.ajax({
    method: "GET",
    url: `https://api.iextrading.com/1.0/stock/${symbol}/chart/5y`
  })
);

export const fetchStockInfo = symbol => (
  $.ajax({
    method: "GET",
    url: `https://api.iextrading.com/1.0/stock/${symbol}/company`
  })
);

export const fetchStockNews = symbol => (
  $.ajax({
    method: "GET",
    url: `https://api.iextrading.com/1.0/stock/${symbol}/news`
  })
);
