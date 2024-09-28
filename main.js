let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("tax");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");

let mood = "create";
let tmp;

//get total

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "rgb(47, 48, 52)";
  }
}

//cretate product

let data;
if (localStorage.product != null) {
  data = JSON.parse(localStorage.product);
} else {
  data = []; // Ensure `data` is correctly initialized
}

create.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if(title.value != '' && price.value != '' && count.value <100 && category.value != ''){
    if (mood === "create") {
      if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
          data.push(newpro);
        }
      } else {
        data.push(newpro);
      }
    } else {
      data[tmp] = newpro;
      mood = "create";
      create.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }
 
  //create local storage
  localStorage.setItem("product", JSON.stringify(data));
  showData();

};

//clear inputs

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//read

function showData() {
  getTotal();

  let table = "";

  for (i = 0; i < data.length; i++) {
    table += ` <tr>
              <td>${i + 1}</td>
              <td>${data[i].title}</td>
              <td>${data[i].price}</td>
              <td>${data[i].taxes}</td>
              <td>${data[i].ads}</td>
              <td>${data[i].discount}</td>
              <td>${data[i].count}</td>
              <td>${data[i].category}</td>
              <td><button onclick="updateData(${i})" id="update">Update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr> `;
  }

  document.getElementById("tbody").innerHTML = table;

  let btnDelete = document.getElementById("deleteAll");
  if (data.length > 0) {
    btnDelete.innerHTML = `<button onclick="deleteAll()"> Delete All (${data.length}) </button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}

showData();

//delete

function deleteData(i) {
  data.splice(i, 1);
  localStorage.product = JSON.stringify(data);
  showData();
}

function deleteAll() {
  localStorage.clear();
  data.splice(0);
  showData();
}

//count

//update
function updateData(i) {
  title.value = data[i].title;
  price.value = data[i].price;
  ads.value = data[i].ads;
  discount.value = data[i].discount;
  category.value = data[i].category;
  count.style.display = "none";
  create.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  getTotal();
}
//search

let searchMode = "title";

function getSearchMode(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMode = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMode = "category";
    search.placeholder = "Search By Category";
  }
  search.placeholder = "Search By" + searchMode;
  m;
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < data.length; i++) {
      if (searchMode == "title") {
        if (data[i].title.includes(value.toLowerCase())) {
          table += ` <tr>
                  <td>${i}</td>
                  <td>${data[i].title}</td>
                  <td>${data[i].price}</td>
                  <td>${data[i].taxes}</td>
                  <td>${data[i].ads}</td>
                  <td>${data[i].discount}</td>
                  <td>${data[i].count}</td>
                  <td>${data[i].category}</td>
                  <td><button onclick="updateData(${i})" id="update">Update</button></td>
                  <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr> `;
        }
      } else {
        if (data[i].title.includes(value.toLowerCase())) {
          table += ` <tr>
                  <td>${i}</td>
                  <td>${data[i].title}</td>
                  <td>${data[i].price}</td>
                  <td>${data[i].taxes}</td>
                  <td>${data[i].ads}</td>
                  <td>${data[i].discount}</td>
                  <td>${data[i].count}</td>
                  <td>${data[i].category}</td>
                  <td><button onclick="updateData(${i})" id="update">Update</button></td>
                  <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr> `;
        }
      }
  }

  document.getElementById("tbody").innerHTML = table;
}

//clean data
