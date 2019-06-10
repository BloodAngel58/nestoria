let arr = [];
let arrList = [];
let arrFavorit = [];
let strNumber = "";
const size = 50;
let sizePage = 10;
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url =
  "https://api.nestoria.co.uk/api?encoding=json&pretty=1&action=search_listings&country=uk&listing_type=buy&place_name=";
let pagesCount = 1;

document.getElementById("listItem").addEventListener("click", updatCheck, true);
document.getElementById("buttonSearch").addEventListener("click", loadingData);
document.getElementById("myModal").addEventListener("click", deletetCheck);
document.getElementById("favorits").addEventListener("click", deletetFavorit);
document.getElementById("favorits").addEventListener("click", loadFavoritItem);
document.getElementById("main").addEventListener("click", updateRario);
document.getElementById("showMoreButton").addEventListener("click", showMore);
document.getElementById("pagination").addEventListener("click", pagination);
document
  .getElementById("paginatRadio")
  .addEventListener("click", updatePagination);
document
  .getElementById("list-str_number")
  .addEventListener("click", pageFlipping);
document.getElementById("returnButton").addEventListener("click", returnButton);
document.getElementById("addButton").addEventListener("click", addButton);

const inputTextSearch = document.getElementById("inputText");
const listItem = document.getElementById("listItem");
const list = document.getElementById("list");
const modalItem = document.getElementById("myModal");
const modalWindow = document.getElementById("md-w");
const favorits = document.getElementById("favorits");
const listFavorits = document.getElementById("listfavorits");
const showMoreButton = document.getElementById("showMoreButton");
const outStrNumber = document.getElementById("out-str");

function pageFlipping(event) {
  const target = event.target;
  if (target.tagName == "BUTTON" && target.type == "submit") {
    if (target.innerHTML) {
      let pageNumber = "&page=" + target.innerHTML;
      let urlNewPage = proxyurl + url + inputTextSearch.value + pageNumber;
      arrList.length = 0;
      searchData(urlNewPage);
    }
    activeButton();
    target.classList.add("active");
  }
}
function returnButton() {
  if (sizePage > 10) {
    sizePage -= 10;
    myPagination(sizePage);
  }
}
function addButton() {
  if (sizePage < 50) {
    sizePage += 10;
    myPagination(sizePage);
  }
}

function showMore(event) {
  event.preventDefault();
  pagesCount++;
  if (pagesCount) {
    let pageNumber = "&page=" + pagesCount;
    let urlNewPage = proxyurl + url + inputTextSearch.value + pageNumber;
    searchData(urlNewPage);
  }
}

function pagination(event) {
  const target = event.target;
  if (target.innerHTML) {
    let pageNumber = "&page=" + target.innerHTML;
    let urlNewPage = proxyurl + url + inputTextSearch.value + pageNumber;
    arrList.length = 0;
    searchData(urlNewPage);
  }
}

function updateRario(event) {
  const target = event.target;
  if (target.value == "Search") {
    listFavorits.classList.add("close-radio");
  } else listFavorits.classList.remove("close-radio");
  if (target.value == "favorits") {
    list.classList.add("close-radio");
  } else list.classList.remove("close-radio");
}

function updatePagination(event) {
  const target = event.target;
  if (target.value == "paginat") {
    showMoreButton.classList.add("close-radio");
  } else showMoreButton.classList.remove("close-radio");
  if (target.value == "show") {
    paginationList.classList.add("close-radio");
  } else paginationList.classList.remove("close-radio");
}

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
      arr.forEach(element => {
        arrList.push(element);
      });
      listItem.innerHTML = "";
      loadItem(arrList);
    })
    .catch(error => console.log(error));
}

function updatCheck(event) {
  const target = event.target;
  if (target.type == "submit") {
    let key = target.parentNode.getAttribute("key");
    addModalItem(arrList[key], key);
  }
}

function loadFavoritItem(event) {
  const target = event.target;
  let key = target.parentNode.getAttribute("key");
  if (target.tagName == "IMG") {
    addModalItem(arrFavorit[key], key);
    document.querySelector(".favorit-button").classList.add("close__button");
  }
}

function deletetFavorit(event) {
  const target = event.target;
  if (target.type == "reset") {
    let key = target.parentNode.getAttribute("key");
    arrFavorit.splice(key, 1);
    favorits.innerHTML = "";
    loadFavorit();
  }
}

function deletetCheck(event) {
  const target = event.target;
  if (target.type == "reset") {
    modalWindow.style.display = "none";
    target.parentNode.innerHTML = "";
  }
  if (target.type == "submit") {
    let key = target.parentNode.getAttribute("key");
    addToFavorit(key);
  }
}

function addToFavorit(key) {
  const obj = arrList[key];
  if (!arrFavorit.includes(obj)) {
    arrFavorit.push(obj);
    favorits.innerHTML = "";
    loadFavorit();
  }
}

function loadFavorit() {
  for (let key = 0; key < arrFavorit.length; key++) {
    drawingFavorit(
      key,
      arrFavorit[key].img_url,
      arrFavorit[key].title,
      arrFavorit[key].price_formatted
    );
  }
}

function drawingFavorit(key, img_url, title, price_formatted) {
  const divImg = document.createElement("img");
  const textTitle = document.createElement("h3");
  const divPrice_formatted = document.createElement("div");
  const exitButton = document.createElement("button");
  //
  const divContent = document.createElement("div"); // div для инфы
  const todoItem = document.createElement("div"); //Родитель
  //
  divImg.src = img_url;
  textTitle.innerHTML = title;
  divPrice_formatted.innerHTML = "Цена :" + price_formatted;
  exitButton.type = "reset";
  exitButton.innerHTML = "&#10006";
  ///
  todoItem.setAttribute("key", key);
  //
  exitButton.classList.add("favorit-exit__button");
  todoItem.classList.add("item-storage__Favorits");
  //
  ///
  divContent.appendChild(textTitle);
  divContent.appendChild(divPrice_formatted);
  todoItem.appendChild(divImg);
  todoItem.appendChild(divContent);
  todoItem.appendChild(exitButton);
  favorits.appendChild(todoItem);
}

function addItem(key, img_url, summary, price_formatted, title, keywords) {
  const MoreDetailedButton = document.createElement("button");
  const divImg = document.createElement("img");
  const divSummary = document.createElement("div");
  const divPrice_formatted = document.createElement("div");
  const textTitle = document.createElement("h3");
  const textKeywords = document.createElement("h4");
  //
  const divContent = document.createElement("div"); // div для инфы
  const todoItem = document.createElement("div"); //Родитель
  //
  divImg.src = img_url;
  divSummary.innerHTML = summary;
  divPrice_formatted.innerHTML = "Цена :" + price_formatted;
  textTitle.innerHTML = title;
  textKeywords.innerHTML = keywords;
  MoreDetailedButton.innerHTML = "More Detailes";
  //
  MoreDetailedButton.classList.add("more-detaile__button");
  divContent.classList.add("loaded-text__content");
  divImg.classList.add("loaded-img__item");
  todoItem.classList.add("loaded-itemList__search");
  textTitle.classList.add("loaded-text-content__item");
  textKeywords.classList.add("loaded-text-content__item");
  divPrice_formatted.classList.add("loaded-text-content__item");
  divSummary.classList.add("loaded-text-content__item");
  //
  todoItem.setAttribute("key", key);
  //
  todoItem.appendChild(divImg);
  divContent.appendChild(textTitle);
  divContent.appendChild(textKeywords);
  divContent.appendChild(divSummary);
  divContent.appendChild(divPrice_formatted);
  //родители
  todoItem.appendChild(divContent);
  todoItem.appendChild(MoreDetailedButton);
  listItem.appendChild(todoItem);
}

function loadItem(itemList) {
  for (let key = 0; key < itemList.length; key++) {
    addItem(
      key,
      itemList[key].img_url,
      itemList[key].summary,
      itemList[key].price_formatted,
      itemList[key].title,
      itemList[key].keywords
    );
  }
}

function addModalItem(item, key) {
  modalWindow.style.display = "flex";
  const divContent = document.createElement("div"); // div для инфы
  //
  const exitButton = document.createElement("button");
  const addToFavoritesButton = document.createElement("button");
  const modalImg = document.createElement("img");
  const modalSummary = document.createElement("div");
  const modalPrice_formatted = document.createElement("div");
  const modalTextTitle = document.createElement("h3");
  const modalTextKeywords = document.createElement("h4");
  const modalLister_name = document.createElement("h5");
  const modalBedroom_number = document.createElement("div");
  const modalProperty_type = document.createElement("div");
  //
  exitButton.type = "reset";
  exitButton.innerHTML = "&#10006";
  addToFavoritesButton.innerHTML = "add to favorites";
  modalImg.src = item.img_url;
  modalSummary.innerHTML = item.summary;
  modalPrice_formatted.innerHTML = item.price_formatted;
  modalTextTitle.innerHTML = item.title;
  modalTextKeywords.innerHTML = item.keywords;
  //
  modalLister_name.innerHTML = "lister_name :" + item.lister_name;
  modalBedroom_number.innerHTML = "bedroom_number :" + item.bedroom_number;
  modalProperty_type.innerHTML = "Property_type :" + item.property_type;
  ////
  divContent.classList.add("modal-content");
  modalImg.classList.add("modal-img__item");
  exitButton.classList.add("modal-exit__button");
  addToFavoritesButton.classList.add("favorit-button");
  ////
  divContent.setAttribute("key", key);
  //
  divContent.appendChild(modalTextTitle);
  divContent.appendChild(modalTextKeywords);
  divContent.appendChild(modalLister_name);
  divContent.appendChild(modalSummary);
  divContent.appendChild(modalBedroom_number);
  divContent.appendChild(modalProperty_type);
  divContent.appendChild(modalPrice_formatted);
  divContent.appendChild(addToFavoritesButton);
  //
  modalItem.appendChild(modalImg);
  modalItem.appendChild(divContent);
  modalItem.appendChild(exitButton);
}

function myPagination(Page) {
  strNumber = "";
  outStrNumber.innerHTML = "";
  const oneNumberButton = document.createElement("button");
  const lastNumberButton = document.createElement("button");
  const ellipsis = document.createElement("div");
  //
  ellipsis.classList.add("ellipsis");
  oneNumberButton.classList.add("btn-number");
  lastNumberButton.classList.add("btn-number");
  //
  oneNumberButton.innerHTML = "1";
  lastNumberButton.innerHTML = "50";
  ellipsis.innerHTML = "...";
  strNumber += "<div class=ellipsis btn-number>" + "..." + "</div>";
  for (let i = Page - 10; i < Page; i++)
    strNumber += "<button class=btn-number>" + (i + 1) + "</button>";
  outStrNumber.innerHTML += strNumber;
  //
  outStrNumber.insertBefore(oneNumberButton, outStrNumber.firstChild);
  outStrNumber.appendChild(ellipsis);
  outStrNumber.appendChild(lastNumberButton);
}
myPagination(sizePage);

function activeButton() {
  const divFather = document.getElementById("out-str");
  const childrenButton = divFather.getElementsByClassName("btn-number");
  for (let i = 0; i < childrenButton.length; i++) {
    childrenButton[i].addEventListener("click", function() {
      let current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }
}
