export const fetchSplashNews = () => (
  $.ajax({
    method: "GET",
    url: `https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=15&apiKey=b20ba9a311bf4fa6b83c4f00e739bb02`
  })
);
