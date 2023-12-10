let selectWare = document.getElementById("selectAddWare");
let selectService = document.getElementById("selectAddService");
let divSelectWare = document.querySelector(".addWare");
let divSelectService = document.querySelector(".addService");
let plusButton = document.getElementById("add_more_product");

plusButton.hidden = true;

selectWare.addEventListener("change", () => {
  if(!selectWare.value) {
    divSelectService.hidden = false;
    plusButton.hidden = true;
  }else {
    divSelectService.hidden = true;
    plusButton.hidden = false;
  }
})

selectService.addEventListener("change", () => {
  if(!selectService.value) {
    divSelectWare.hidden = false;
  }else {
    divSelectWare.hidden = true;
  }
});

plusButton.addEventListener("click", () => {
  divSelectWare.innerHTML += divSelectWare.innerHTML;
});