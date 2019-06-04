let arr = [];
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url =
  "https://api.nestoria.de/api?encoding=json&pretty=1&action=search_listings&country=de&listing_type=buy&place_name=";

document.getElementById("buttonSearch").addEventListener("click", loadingData);
const inputTextSearch = document.getElementById("inputText");
const listItem = document.getElementById("listItem");
function loadingData() {
  let textSearch = inputTextSearch.value;
  if (inputTextSearch.value) {
    let finalUrl = proxyurl + url + textSearch;
    searchData(finalUrl);
  } else alert("Вы не ввели данные для поиска");
}
function searchData(url) {
  fetch(url, {
    method: "GET",
    headers: "Access-Control-Allow-Origin",
    headers: {
      "content-type": "application/json"
    },
    mode: "cors"
  })
    .then(res => res.json())
    .then(res => {
      arr = res.response.listings.slice();
      loadItem(arr);
    })
    .catch(error => console.log(error));
}

function addItem(img_url, summary) {
  const divImg = document.createElement("img");
  const divText = document.createElement("div");
  //Родитель
  const todoItem = document.createElement("div");

  divImg.src = img_url;
  divText.innerHTML = summary;

  divText.classList.add("loaded-text__item");
  divImg.classList.add("loaded-img__item");
  todoItem.classList.add("loaded-itemList__search");

  todoItem.appendChild(divImg);
  todoItem.appendChild(divText);
  listItem.appendChild(todoItem);
}
function loadItem(itemList) {
  for (let key = 0; key < itemList.length; key++) {
    addItem(itemList[key].img_url, itemList[key].summary);
  }
}
/*
construction_year;
img_url;
//keywords;
price_formatted;
room_number;
summary;
*/
