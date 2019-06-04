const url =
  "https://api.nestoria.de/api?encoding=json&pretty=1&action=search_listings&country=de&listing_type=buy&place_name=bonn";

window.onload = function() {
  loadingData();
};
const proxyurl = "https://cors-anywhere.herokuapp.com/";
function loadingData() {
  fetch(proxyurl + url, {
    method: "GET",
    headers: "Access-Control-Allow-Origin",
    headers: {
      "content-type": "application/json"
    },
    mode: "cors",
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
    })
    .catch(error => console.log(error));
}
