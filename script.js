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

function addItem(
  img_url,
  summary,
  construction_year,
  room_number,
  bedroom_number,
  price_formatted,
  title,
  keywords
) {
  const divImg = document.createElement("img");
  const divSummary = document.createElement("div");
  const divConstruction_year = document.createElement("div");
  const divRoom_number = document.createElement("div");
  const divBedroom_number = document.createElement("div");
  const divPrice_formatted = document.createElement("div");
  const textTitle = document.createElement("h3");
  const textKeywords = document.createElement("h4");

  //
  const divContent = document.createElement("div"); // div для инфы
  const todoItem = document.createElement("div"); //Родитель
  //
  divImg.src = img_url;
  divSummary.innerHTML = summary;
  divConstruction_year.innerHTML = "Дата постройки :" + construction_year;
  divRoom_number.innerHTML = "Количество комнат :" + room_number;
  divBedroom_number.innerHTML = "Количество спален :" + bedroom_number;
  divPrice_formatted.innerHTML = "Цена :" + price_formatted;
  textTitle.innerHTML = title;
  textKeywords.innerHTML = keywords;
  //
  divContent.classList.add("loaded-text__content");
  divImg.classList.add("loaded-img__item");
  todoItem.classList.add("loaded-itemList__search");
  textTitle.classList.add("loaded-text-content__item");
  textKeywords.classList.add("loaded-text-content__item");
  divConstruction_year.classList.add("loaded-text-content__item");
  divRoom_number.classList.add("loaded-text-content__item");
  divBedroom_number.classList.add("loaded-text-content__item");
  divPrice_formatted.classList.add("loaded-text-content__item");
  divSummary.classList.add("loaded-text-content__item");
  //
  todoItem.appendChild(divImg);
  divContent.appendChild(textTitle);
  divContent.appendChild(textKeywords);
  divContent.appendChild(divSummary);
  divContent.appendChild(divConstruction_year);
  divContent.appendChild(divRoom_number);
  divContent.appendChild(divBedroom_number);
  divContent.appendChild(divPrice_formatted);

  //родители
  todoItem.appendChild(divContent);
  listItem.appendChild(todoItem);
}
function loadItem(itemList) {
  for (let key = 0; key < itemList.length; key++) {
    addItem(
      itemList[key].img_url,
      itemList[key].summary,
      itemList[key].construction_year,
      itemList[key].room_number || "Информация отсутствует",
      itemList[key].bedroom_number || "Информация отсутствует",
      itemList[key].price_formatted,
      itemList[key].title,
      itemList[key].keywords
    );
  }
}
/*
construction_year;
img_url;
//keywords;
price_formatted;
room_number;
bedroom_number
summary;
*/
