export const fetchStock = symbol => (
  $.ajax({
    method: "GET",
    url: `api/stocks/${symbol}`
  })
);

export const fetchStocks = () => (
  $.ajax({
    method: "GET",
    url: `api/stocks`
  })
);

export const fetchStockData = symbol => (
  $.ajax({
    method: "GET",
    url: `https://api.iextrading.com/1.0/stock/${symbol}/chart/5Y/?filter=close,date`
  })
);

export const fetchStockIntradayData = symbol => (
  $.ajax({
    method: "GET",
    url: `https://api.iextrading.com/1.0/stock/${symbol}/chart/1D?filter=close,date`
  })
);

export const fetchStockInfo = symbol => (
  $.ajax({
    method: "GET",
    url: `https://api.iextrading.com/1.0/stock/${symbol}/company?filter=CEO,companyName,description,exchange,symbol,website`
  })
);

export const fetchStockNews = symbol => (
  $.ajax({
    method: "GET",
    url: `https://api.iextrading.com/1.0/stock/${symbol}/news`
  })
);
