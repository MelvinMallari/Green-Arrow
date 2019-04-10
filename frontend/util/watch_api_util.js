export const addWatch = watch => (
  $.ajax({
    method: "POST",
    url: "api/watches",
    data: { watch }
  })
);

export const removeWatch = watch => (
  $.ajax({
    // GET due to custom rails routing
    method: "GET",
    url: `api/watches/${watch.ticker_symbol}`
  })
);