export const fetchStock = symbol =>
  $.ajax({
    method: 'GET',
    url: `api/stocks/${symbol}`,
  });

export const fetchStocks = () =>
  $.ajax({
    method: 'GET',
    url: `api/stocks`,
  });

export const fetchStockData = symbol =>
  $.ajax({
    method: 'GET',
    url: `https://www.worldtradingdata.com/api/v1/history?symbol=${symbol}&sort=newest&api_token=3byQgXtIwUX4TsXM5ph7P2owTntgiAlEpNexNgDaeNVISVmxyIGJbPKXA7UA`,
  });

export const fetchStockIntradayData = symbol =>
  $.ajax({
    method: 'GET',
    url: `https://api.iextrading.com/1.0/stock/${symbol}/chart/1D?filter=close,label`,
    // url: `https://intraday.worldtradingdata.com/api/v1/intraday?symbol=${symbol}&range=1&interval=1&api_token=3byQgXtIwUX4TsXM5ph7P2owTntgiAlEpNexNgDaeNVISVmxyIGJbPKXA7UA`,
  });

export const fetchStockInfo = symbol =>
  $.ajax({
    method: 'GET',
    url: `https://api.iextrading.com/1.0/stock/${symbol}/batch?types=stats,company`,
  });

export const fetchStockNews = symbol =>
  $.ajax({
    method: 'GET',
    url: `https://newsapi.org/v2/everything?q=${symbol}&sortBy=relevancy&pageSize=5&language=en&domains=yahoo.com,fool.com,forbes.com&apiKey=b20ba9a311bf4fa6b83c4f00e739bb02`,
  });
