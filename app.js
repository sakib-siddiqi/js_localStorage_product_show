let pname = document.querySelector("#product");
let count = document.querySelector("#count");
let boxToShow = document.querySelector("#boxToShow .row");
let added = document.getElementById("added");
let notAdded = document.getElementById("notAdded");
let getLS = localStorage.getItem("ProductList");
// arrs
let productDetails = [];
if (getLS !== null) {
  productDetails = JSON.parse(getLS);
} else {
  productDetails = productDetails;
}
// getting input values to array > object
function addToLS() {
  let nameVal = pname.value;
  let countVal = parseInt(count.value);
  if (nameVal.length !== 0) {
    let singleProduct = { name: nameVal, count: countVal };
    let thatProduct = productDetails.map((product) => product);
    let thatProductName = thatProduct.map((product) => product.name);
    let thatProductIndex = thatProductName.indexOf(nameVal);
    thatProductName.indexOf(singleProduct.name) !== -1
      ? (thatProduct[thatProductIndex].count += countVal)
      : productDetails.unshift(singleProduct);

    addMsz(added);
    sendToLS(productDetails);
  } else {
    pname.value.length === 0 ? borderColorFor(pname) : addMsz(notAdded);
  }
  getFromLS();
  pname.value = "";
  count.value = 1;
}
getFromLS();
document.getElementById("adder").addEventListener("click", addToLS);
// sending to localstorage
function sendToLS(productList) {
  localStorage.setItem("ProductList", JSON.stringify(productList));
}
// bring from localStorage
function getFromLS() {
  let getLS = localStorage.getItem("ProductList");
  let LSdata = JSON.parse(getLS);
  if (getLS !== null) {
    boxToShow.innerHTML = "";
    LSdata.forEach((element) => {
      let productHTML = `<div class="col-6 col-sm-4 col-md-2"><button type="button" class="px-4 py-2 rounded-3 text-white bg-primary border-0 fw-bold position-relative" style="letter-spacing: 1px;">${element.name}<span class="position-absolute top-0  start-100 translate-middle badge rounded-pill bg-dark">${element.count}<span class="visually-hidden">unread messages</span></span></button></div>`;
      boxToShow.innerHTML += productHTML;
    });
  } else {
    boxToShow.innerHTML = `<div class="alert alert-primary" role="alert"> A simple primary alert—check it out!</div> `;
  }
}
// successFully added
function addMsz(msz) {
  msz.style.display = "inline";
  setTimeout(() => {
    msz.style.display = "none";
  }, 2000);
}
// border color change depending on input
function borderColorFor(elem) {
  elem.style.borderColor = "red";
  setTimeout(() => {
    elem.style.borderColor = "#ced4da";
  }, 2000);
}
