export const addWatch = watch => (
  $.ajax({
    method: "POST",
    url: "api/watches",
    data: { watch }
  })
);

export const removeWatch = watch => {
  return $.ajax({
    method: "DELETE",
    url: `api/watches/${watch.ticker_symbol}`
  });
};